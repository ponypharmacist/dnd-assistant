<template lang="pug">
  .character-create
    h2.pb-2 Make a new adventurer

    dnd-input.mb-2(
      v-model="character.name"
      placeholder="Name"
    )

    dnd-select.mb-2(
      v-model="character.race"
      placeholder="Race"
      :list="makeList(races)"
      idField="id"
      valueField="title"
      @change="updateRaceDependencies"
    )

    dnd-select.mb-2(
      v-if="character.race && races[character.race].subraces"
      v-model="character.subrace"
      placeholder="Subrace"
      :list="subracesList"
      idField="id"
      valueField="title"
      @change="updateSubraceDependencies"
    )

    dnd-select.mb-2(
      v-model="character.clas"
      placeholder="Class"
      :list="makeList(classes)"
      idField="id"
      valueField="title"
      @change="updateClassDependencies"
    )

    dnd-select.mb-2(
      v-model="character.background"
      placeholder="Background"
      :list="makeList(backgrounds)"
      idField="id"
      valueField="title"
      @change="updateBackgroundDependencies"
    )

    .feat-checkbox.mb-2(
      v-if="character.race === 'human'"
    )
      dnd-checkbox(
        v-model="character.extraFeat"
        label="Extra Feat"
      ) Extra feat instead of stat bonus (humans only)

    dnd-select.mb-2(
      v-if="character.extraFeat"
      v-model="character.extraFeatList"
      placeholder="Extra Feat"
      :list="makeList(customfeats)"
      idField="id"
      valueField="title"
    )

    h2.mt-4.mb-1 Attributes total: {{ sumOfStats }}

    .attributes
      .attribute(
        v-for="(attr, index) in attributes"
        :key="attr"
      )
        .attribute-label
          .attribute-title {{ attr.slice(0, 3) | capitalize }}
          .attribute-modifier(
            :class="{ 'text-green': hasBonus(attr) }"
          ) {{ attributeTotal(attr) }}
        .attribute-control
          dnd-input(
            v-model="character[attr]"
            centered
          )
        .attribute-arrows
          .arrow-left(@click="shiftAttribute(index, 'left')")
          .arrow-right(@click="shiftAttribute(index, 'right')")

    .d-flex.justify-center.mt-5.mb-4
      dnd-button(
        label="Roll attributes"
        d20
        @click="roll4d6"
      )

    .combat-stats.d-flex
      .combat-stat
        .stat-icon.fas.fa-shield-alt
        | AC: {{ armorClass }}
      .combat-stat
        .stat-icon.fas.fa-heart
        | Health: {{ maxHealth }}

    .combat-stats.d-flex
      .combat-stat
        .stat-icon.fas.fa-skiing
        | Initiative: {{ attributeTotal('dexterity') | getModifier | decoratePositive }}
      .combat-stat
        .stat-icon.fas.fa-tachometer-alt
        | Speed: {{ characterSpeed }}

    .mt-4.mb-2
      dnd-input(
        v-model="character.languages"
        placeholder="Languages"
        label="Languages"
      )

    .mt-4.mb-2
      dnd-input(
        v-model="character.proficienciesCombat"
        placeholder="Combat proficiencies"
        label="Combat proficiencies"
      )

    .mt-4.mb-2
      dnd-input(
        v-model="character.tools"
        placeholder="Tool proficiencies"
        label="Tool proficiencies"
      )

    .mt-4.mb-2
      dnd-input.input-gold(
        v-model="character.gold"
        placeholder="Gold"
        label="Gold"
      )

    <pre>{{ character }}</pre>
</template>

<script>
import {
  mapState,
} from 'vuex';

import races from '../tables/races';
import backgrounds from '../tables/backgrounds';
import classes from '../tables/classes';
import feats from '../tables/feats';
import customfeats from '../tables/customfeats';
import armors from '../tables/armors';
import weapons from '../tables/weapons';

import {
  capitalize,
  rollDice,
  // roll4d6Stats,
  getModifier,
  decoratePositive,
  flattenArray,
  flattenArrayMultiline,
  // readLocalStorage,
  // updateLocalStorage,
} from '../helpers';

export default {
  name: 'character-create',

  data: () => ({
    races,
    backgrounds,
    classes,
    feats,
    customfeats,
    armors,
    weapons,
    // Character
    character: {
      name: null,
      race: null,
      subrace: null,
      clas: null,
      background: null,
      extraFeat: false,
      extraFeatList: null,

      strength: 16,
      dexterity: 14,
      constitution: 13,
      intelligence: 12,
      wisdom: 10,
      charisma: 9,

      languages: '',
      proficienciesCombat: '',
      tools: '',
      gold: 0,
      armor: 'noArmor',
      shield: false,
    },

    // Misc
    attributes: [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ],
  }),

  computed: {
    ...mapState('main', [
      'mode',
    ]),

    subracesList() {
      // eslint-disable-next-line prefer-destructuring
      const subraces = races[this.character.race]?.subraces;

      return subraces ? this.makeList(subraces) : null;
    },

    sumOfStats() {
      return this.attributes.map((a) => this.character[a]).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
    },

    armorClass() {
      const my = this.character;
      let attributeModifier = getModifier(my.dexterity);
      let baseAC = 10;
      const shield = my.shield ? 2 : 0;
      const myArmor = this.armors[my.armor];

      if (my.clas === 'barbarian' && my.armor === 'noArmor') {
        attributeModifier += getModifier(my.constitution);
      } else if (my.clas === 'monk' && my.armor === 'noArmor' && !my.shield) {
        attributeModifier += getModifier(my.wisdom);
      } else if (myArmor.type === 'heavy') {
        baseAC = myArmor.ac;
        attributeModifier = 0;
      } else if (myArmor.type === 'medium') {
        baseAC = myArmor.ac;
        attributeModifier = getModifier(my.dexterity) >= 2 ? 2 : getModifier(my.dexterity);
      } else {
        baseAC = myArmor.ac;
      }
      return baseAC + attributeModifier + shield;
    },

    characterFeats() {
      const my = this.character;
      const fromRace = (my.race && this.races[my.race].feats) || [];
      const fromSubrace = (my.subrace && this.races[my.race].subraces[my.subrace].feats) || [];
      const fromClass = (my.clas && this.classes[my.clas].feats[1]) || [];
      const fromBackground = (my.background && this.backgrounds[my.background].feats) || [];
      const extraFeat = my.extraFeat ? my.extraFeatList : [];

      return Array.from(new Set(fromRace.concat(fromSubrace).concat(extraFeat).concat(fromClass).concat(fromBackground)));
    },

    maxHealth() {
      const my = this.character;
      const toughness = this.characterFeats.includes('dwarvenToughness') ? 1 : 0;
      const bonus = getModifier(my.constitution);
      return my.clas ? this.classes[my.clas].hitDie + bonus + toughness : 0;
      // ToDo: custom feat bonus or something, read up
    },

    characterSpeed() {
      const my = this.character;
      const raceSpeed = (my.race && this.races[my.race].speed) || 30;
      const subraceSpeed = (my.subrace && this.races[my.race].subraces[my.subrace].speed) || false;

      return subraceSpeed || raceSpeed;
    },

    characterLanguages() {
      const my = this.character;
      const fromRace = my.race ? this.races[my.race].languages : [];
      const fromSubrace = (my.subrace && this.races[my.race].subraces[my.subrace].languages) || [];

      return Array.from(new Set(fromRace.concat(fromSubrace)));
    },

    extraLanguages() {
      const my = this.character;
      const subraceLang = (my.subrace && this.races[my.race].subraces[my.subrace].extraLanguage) || 0;
      const raceLang = (my.race && this.races[my.race].extraLanguage) || 0;
      const bgLang = (my.background && this.backgrounds[my.background].extraLanguage) || 0;

      return subraceLang + raceLang + bgLang;
    },

    totalLanguages: {
      get() {
        const str = flattenArray(this.characterLanguages) + (this.extraLanguages > 0 ? ` (add ${this.extraLanguages} more)` : '');

        return str;
      },
      set(langString) {
        this.character.languages = langString;
        return langString;
      },
    },

    combatProficienciesList: {
      get() {
        const my = this.character;
        const fromRace = my.race ? this.races[my.race].profCombat : [];
        const fromSubrace = my.subrace ? this.races[my.race].subraces[my.subrace].profCombat : [];
        const fromClass = my.clas ? this.classes[my.clas].profCombat : [];
        const cleanList = Array.from(new Set(fromClass.concat(fromSubrace).concat(fromRace)));
        let finalList = '';

        // eslint-disable-next-line no-restricted-syntax
        for (const prof of cleanList) {
          finalList += `${capitalize(prof)}, `;
        }
        finalList = finalList.slice(0, -2);
        return finalList;
      },
      set(profString) {
        this.character.proficienciesCombat = profString;
        return profString;
      },
    },

    characterToolsList: {
      get() {
        const my = this.character;
        const fromRace = (my.race && this.races[my.race].tools) || [];
        const fromClass = my.clas ? this.classes[my.clas].tools : [];
        const fromBackground = my.background ? this.backgrounds[my.background].tools : [];

        return Array.from(new Set(fromRace.concat(fromClass).concat(fromBackground)));
      },
      set(toolsString) {
        this.character.tools = toolsString;
        return toolsString;
      },
    },
  },

  // Filters
  filters: {
    capitalize,
    getModifier,
    decoratePositive,
    flattenArray,
    flattenArrayMultiline,
  },

  methods: {
    makeList(table) {
      return Object.keys(table).map((key) => ({
        id: key,
        title: table[key].title,
      }));
    },

    updateRaceDependencies() {
      this.character.subrace = null;
      this.character.languages = this.totalLanguages;
      this.character.proficienciesCombat = this.combatProficienciesList;
      this.character.tools = this.characterToolsList;
    },

    updateSubraceDependencies() {
      this.character.languages = this.totalLanguages;
      this.character.proficienciesCombat = this.combatProficienciesList;
    },

    updateClassDependencies() {
      this.character.proficienciesCombat = this.combatProficienciesList;
      this.character.tools = this.characterToolsList;
    },

    updateBackgroundDependencies() {
      this.character.languages = this.totalLanguages;
      this.character.tools = this.characterToolsList;
    },

    roll4d6() {
      this.character.strength = this.rollAttribute();
      this.character.dexterity = this.rollAttribute();
      this.character.constitution = this.rollAttribute();
      this.character.intelligence = this.rollAttribute();
      this.character.wisdom = this.rollAttribute();
      this.character.charisma = this.rollAttribute();
    },

    rollAttribute() {
      const fourDice = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
      const smallest = Math.min.apply(null, fourDice);
      const pos = fourDice.indexOf(smallest);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      return fourDice.slice(0, pos).concat(fourDice.slice(pos + 1)).reduce(reducer);
    },

    shiftAttribute(index, direction) {
      const fromVal = this.character[this.attributes[index]];
      let toIndex = null;

      if (direction === 'left') {
        toIndex = this.attributes[index - 1] ? index - 1 : this.attributes.length - 1;
      } else {
        toIndex = this.attributes[index + 1] ? index + 1 : 0;
      }

      const toVal = this.character[this.attributes[toIndex]];
      this.character[this.attributes[toIndex]] = fromVal;
      this.character[this.attributes[index]] = toVal;
    },

    attributeTotal(attr) {
      return parseInt(this.character[attr], 10) + parseInt(this.hasBonus(attr), 10);
    },

    hasBonus(attribute) {
      const my = this.character;

      const fromRace = (my.race && this.races[my.race][attribute]) || 0;
      const fromSubrace = (my.subrace && this.races[my.race].subraces[my.subrace][attribute]) || 0;

      return this.extraFeat ? 0 : fromRace + fromSubrace;
    },
  },
};
</script>

<style lang="sass" scoped>
h2
  font-size: 20px
  text-align: center

// Main attributes
.attributes
  display: flex

  .attribute
    flex: 0 0 auto
    width: calc(100% / 6)

.attribute-label
  display: flex
  align-items: center
  justify-content: center
  margin: 0 0 4px

  .attribute-title
    padding-right: 4px

  .attribute-modifier
    color: #fff

    &.text-green
      color: #4dde14

.attribute-control
  display: flex
  align-items: center
  justify-content: center
  padding: 0 4px

.attribute-arrows
  display: flex
  align-items: center
  justify-content: center
  margin: 8px 0 0

  .arrow-left,
  .arrow-right
    width: 20px
    height: 20px
    border-radius: 4px
    background: rgba(255,255,255,0.1) url('~@/assets/select-arrow.svg') no-repeat 50% 50% / 8px 12px
    cursor: pointer

    &:hover
      opacity: 0.9

  .arrow-left
    margin-right: 4px
    transform: rotate(180deg)

// Derivative stats
.combat-stats
  .combat-stat
    width: 40%
    margin-right: 12px

    .stat-icon
      width: 16px
      height: 16px
      margin-right: 8px
      color: #fff
</style>
