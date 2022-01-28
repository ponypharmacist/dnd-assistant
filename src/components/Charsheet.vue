<template lang="pug">
  .charsheet
    .roll-queue
      .queue-item(
        v-for="(roll, index) in rollQueue"
        @click="removeFromQueue(index)"
      )
        span.roll-date {{ roll.date }}
        span.roll-string {{ roll.message }}
        span.roll-note {{ roll.note }}

    //- Character
    .d-flex
      dnd-input.roll-custom(
        v-model="customRollValue"
        label="Roll custom"
      )
      dnd-button(
        label="Roll"
        small
        class="ml-1"
        @click="rollCustom(customRollValue)"
      )

      dnd-button(
        label="d4"
        tiny
        class="ml-1"
        @click="rollDiceSingle(4)"
      )
      dnd-button(
        label="d6"
        tiny
        class="ml-1"
        @click="rollDiceSingle(6)"
      )
      dnd-button(
        label="d8"
        tiny
        class="ml-1"
        @click="rollDiceSingle(8)"
      )
      dnd-button(
        label="d10"
        tiny
        class="ml-1"
        @click="rollDiceSingle(10)"
      )
      dnd-button(
        label="d12"
        tiny
        class="ml-1"
        @click="rollDiceSingle(12)"
      )
      dnd-button(
        label="d100"
        tiny
        class="ml-1 mr-auto"
        @click="rollDiceSingle(100)"
      )

      dnd-button(
        label="New"
        small
        class="ml-2"
        @click="updateState({ param: 'mode', value: 'create' })"
      )

    .character.d-flex.mt-2
      div
        .character-name {{ character.name }}

      div.ml-auto.pt-1.d-flex
        dnd-button(
          label="Edit"
          small
          class="ml-2"
          @click="editMode = !editMode"
        )

        dnd-button(
          v-show="characters.length > 1"
          label="Next"
          small
          class="ml-2"
          @click="nextCharacter"
        )

    .character-class.d-flex
      .d-flex.mr-2.align-center(
        v-show="editMode"
      )
        .attr-minus(
          @click="updateProperty({ param: 'level', value: character.level - 1 })"
        )
        .attr-plus(
          class="ml-1"
          @click="updateProperty({ param: 'level', value: character.level + 1 })"
        )

      div
        b {{ `Lvl.${character.level} ` }}
        span.pr-1 {{ character.race | capitalize }}
        span.pr-1(v-if="character.subrace") ({{ character.subrace | capitalize }})
        span {{ (character.clas) | capitalize }}
        br
        span Proficiency Bonus: {{ proficiencyBonus | decoratePositive }}

    //- Health
    .health
      .health-controls
        .attr-plus(
          @click="updateProperty({ param: 'currentHealth', value: character.currentHealth + 1 })"
        )
        .attr-minus(
          @click="updateProperty({ param: 'currentHealth', value: character.currentHealth - 1 })"
        )
      .health-value {{ character.currentHealth }}
      span of
      .health-controls(v-show="editMode")
        .attr-plus(
          @click="updateProperty({ param: 'maxHealth', value: character.maxHealth + 1 })"
        )
        .attr-minus(
          @click="updateProperty({ param: 'maxHealth', value: character.maxHealth - 1 })"
        )
      .health-value {{ character.maxHealth }}
      span Hit Points

    //- Derived stats
    .combat-stats.d-flex
      .combat-stat
        .stat-icon.fas.fa-shield-alt
        | AC: {{ armorClass }}
      .combat-stat.clickable(
        @click="rollAttribute('dexterity', 'Initiative')"
      )
        .stat-icon.fas.fa-skiing
        | Initiative: {{ character.dexterity | getModifier | decoratePositive }}
      .combat-stat
        .stat-icon.fas.fa-tachometer-alt
        | Speed: {{ character.speed }}

    //- Attributes
    .attributes
      .attribute(
        v-for="attr in attributes"
        :key="attr"
      )
        .attribute-label
          .attribute-title {{ attr.slice(0,3 ) | capitalize }}
          .attribute-modifier {{ character[attr] | getModifier | decoratePositive }}

        .attribute-value(
          @click="rollAttribute(attr)"
        ) {{ character[attr] }}

        .attribute-controls(v-show="editMode")
          .attr-minus(
            @click="updateProperty({ param: attr, value: character[attr] - 1 })"
          )
          .attr-plus(
            @click="updateProperty({ param: attr, value: character[attr] + 1 })"
          )

        .attribute-save(
          v-show="!editMode"
          class="clickable"
          @click="rollSkill(attr, attr)"
        ) Save {{ getSkillBonus(attr, attr) | decoratePositive }}

    //- Weapons
    .arms-block
      .d-flex.mt-4.mb-2
        dnd-select(
          :value="character.melee"
          placeholder="Melee Weapon"
          label="Melee Weapon"
          :list="meleeList()"
          idField="id"
          valueField="title"
          @change="(val) => updateProperty({ param: 'melee', value: val})"
        )
          template(#option="{item}") {{ `${item.title} (${item.damage})` }}

        dnd-button(
          label="Attack"
          small
          class="ml-2"
          @click="rollMeleeAttack"
        )

        dnd-button(
          label="Damage"
          small
          class="ml-2"
          @click="rollMeleeDamage"
        )

      .d-flex.mt-4.mb-2
        dnd-select(
          :value="character.ranged"
          placeholder="Ranged Weapon"
          label="Ranged Weapon"
          :list="rangedList()"
          idField="id"
          valueField="title"
          @change="(val) => updateProperty({ param: 'ranged', value: val})"
        )
          template(#option="{item}") {{ `${item.title} (${item.damage})` }}

        dnd-button(
          label="Attack"
          small
          class="ml-2"
          @click="rollRangedAttack"
        )

        dnd-button(
          label="Damage"
          small
          class="ml-2"
          @click="rollRangedDamage"
        )

    //- Skills
    .skills
      .skill(
        v-for="(skill, key) in skills"
        :key="key"
        :class="{ star: character.skills.includes(key) }"
      )
        .skill-value(
          v-show="!editMode"
        ) {{ getSkillBonus(skill.attribute, key) }}
        dnd-checkbox(
          v-show="editMode"
          :value="character.skills.includes(key)"
          @click.native="toggleSkill(key)"
        )
        span(
          @click="rollSkill(skill.attribute, key)"
        ) {{ skill.title }}

    //- Loot and tools

    .mt-4.mb-2
      dnd-input.input-gold(
        :value="character.gold"
        placeholder="Gold"
        label="Gold"
        @input="(val) => updateProperty({ param: 'gold', value: val})"
      )

    .mt-4.mb-2
      dnd-textarea(
        :value="character.items"
        placeholder="Equipment and loot"
        label="Equipment and loot"
        :rows="12"
        @input="(val) => updateProperty({ param: 'items', value: val})"
      )

    .mt-4.mb-2
      dnd-select.mt-4.mb-1(
        :value="character.armor"
        placeholder="Armor"
        label="Armor"
        :list="armorsList()"
        idField="id"
        valueField="title"
        @change="(val) => updateProperty({ param: 'armor', value: val})"
      )
        template(#option="{item}") {{ `${item.title} (AC: ${item.ac}, ${item.type})` }}

      .shield-checkbox
        dnd-checkbox(
          :value="character.shield"
          label="Shield"
          @input="(val) => updateProperty({ param: 'shield', value: val})"
        ) Shield

      .d-flex.modifiers.mt-2.mb-4
        dnd-select(
          :value="character.armorModifier"
          placeholder="Armor Bonus"
          label="Armor Bonus"
          :list="modifiers"
          idField="id"
          valueField="title"
          @change="(val) => updateProperty({ param: 'armorModifier', value: val})"
        )
        dnd-select(
          :value="character.meleeModifier"
          placeholder="Melee Bonus"
          label="Melee Bonus"
          :list="modifiers"
          idField="id"
          valueField="title"
          @change="(val) => updateProperty({ param: 'meleeModifier', value: val})"
        )
        dnd-select(
          :value="character.rangedModifier"
          placeholder="Ranged Bonus"
          label="Ranged Bonus"
          :list="modifiers"
          idField="id"
          valueField="title"
          @change="(val) => updateProperty({ param: 'rangedModifier', value: val})"
        )

      dnd-input(
        :value="character.languages"
        placeholder="Languages"
        label="Languages"
        @input="(val) => updateProperty({ param: 'languages', value: val})"
      )

    .mt-4.mb-2
      dnd-textarea(
        :value="character.proficienciesCombat"
        placeholder="Combat proficiencies"
        label="Combat proficiencies"
        :rows="3"
        @input="(val) => updateProperty({ param: 'proficienciesCombat', value: val})"
      )

    .mt-4.mb-2
      dnd-textarea(
        :value="character.tools"
        placeholder="Tool proficiencies"
        label="Tool proficiencies"
        :rows="3"
        @input="(val) => updateProperty({ param: 'tools', value: val})"
      )

    //- Feats
    template(v-if="character.feats.length")
      h2.mt-4 Feats
      ul.feat-list
        li.feat-list-item(v-for="feat in character.feats")
          .feat-name {{ feats[feat].title }}
          .feat-description {{ feats[feat].description }}

</template>

<script>
import {
  mapActions,
  mapMutations,
  mapState,
} from 'vuex';

import {
  capitalize,
  rollDice,
  rollString,
  getModifier,
  decoratePositive,
  // decoratePositiveSmart,
  // flattenArray,
  // readLocalStorage,
  // updateLocalStorage,
} from '../helpers';

import races from '../tables/races';
import backgrounds from '../tables/backgrounds';
import classes from '../tables/classes';
import feats from '../tables/feats';
import customfeats from '../tables/customfeats';
import armors from '../tables/armors';
import weapons from '../tables/weapons';
import skills from '../tables/skills';
import modifiers from '../tables/modifiers';

import {
  armorsList,
  meleeList,
  rangedList,
} from '../helpers/common';

export default {
  name: 'charsheet',

  data: () => ({
    customRollValue: '1d20',

    editMode: false,

    // Tables
    races,
    backgrounds,
    classes,
    feats,
    customfeats,
    armors,
    weapons,
    skills,
    armorsList,
    meleeList,
    rangedList,
    modifiers,

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
      'characters',
      'currentCharacter',
      'rollQueue',
    ]),

    character() {
      return this.characters[this.currentCharacter];
    },

    proficiencyBonus() {
      return Math.ceil(this.character.level / 4) + 1;
    },

    armorClass() {
      const my = this.character;
      const dexModifier = getModifier(my.dexterity);
      const conModifier = getModifier(my.constitution);
      const wisModifier = getModifier(my.wisdom);

      let attributeModifier = dexModifier;
      let baseAC = 10;
      const shield = my.shield ? 2 : 0;
      const myArmor = armors[my.armor];

      if (my.clas === 'barbarian' && my.armor === 'noArmor') {
        attributeModifier += conModifier;
      } else if (my.clas === 'monk' && my.armor === 'noArmor' && !my.shield) {
        attributeModifier += wisModifier;
      } else if (myArmor.type === 'heavy') {
        baseAC = myArmor.ac;
        attributeModifier = 0;
      } else if (myArmor.type === 'medium') {
        baseAC = myArmor.ac;
        attributeModifier = dexModifier >= 2 ? 2 : dexModifier;
      } else {
        baseAC = myArmor.ac;
      }
      return baseAC + attributeModifier + shield + my.armorModifier;
    },

    meleeAttackBonus() {
      const my = this.character;
      const finesse = weapons[my.melee].modifiers.includes('finesse');
      const highestModifier = Math.max(getModifier(my.strength), getModifier(my.dexterity));
      return finesse ? highestModifier : getModifier(my.strength);
    },
  },

  // Filters
  filters: {
    capitalize,
    decoratePositive,
    // decoratePositiveSmart,
    // flattenArray,
    getModifier,
  },

  methods: {
    ...mapMutations('main', [
      'updateState',
      'updateRollQueue',
      'removeFromQueue',
      'nextCharacter',
    ]),

    ...mapActions('main', [
      'updateProperty',
      'toggleSkill',
    ]),

    getSkillBonus(attribute, skill) {
      const profBonus = this.character.skills.includes(skill) ? this.proficiencyBonus : 0;
      return profBonus + getModifier(this.character[attribute]);
    },

    rollSkill(attribute, skill) {
      const bonus = this.getSkillBonus(attribute, skill);
      const rollResult = rollDice(20);
      const criticalSuccess = rollResult === 20 ? ' CRITICAL SUCCESS!' : '';
      const criticalFail = rollResult === 1 ? ' CRITICAL FAIL!' : '';
      const message = `You roll ${capitalize(skill)} for ${rollResult + bonus}. `;
      const note = criticalSuccess + criticalFail;

      this.updateRollQueue({ message, note });
    },

    rollAttribute(attribute, title = false) {
      const rollResult = rollDice(20);
      const bonus = getModifier(this.character[attribute]);
      const name = title || attribute;
      const message = `You roll ${capitalize(name)} for ${(rollResult + bonus)}. `;

      this.updateRollQueue({ message });
    },

    rollCustom(diceString) {
      const message = `You roll ${diceString} for ${rollString(diceString)}. `;

      this.updateRollQueue({ message });
    },

    rollDiceSingle(sides) {
      this.updateRollQueue({ message: `You roll a d${sides} for ${rollDice(sides)}.` });
    },

    rollMeleeAttack() {
      const my = this.character;
      const weaponName = weapons[my.melee].title;
      const rollResult = rollDice(20);

      let note = '';
      if (rollResult === 20) note = 'CRITICAL HIT!';
      if (rollResult === 1) note = 'CRITICAL MISS!';

      const message = `You attack with ${weaponName} and roll ${rollResult + my.meleeModifier + this.meleeAttackBonus + this.proficiencyBonus}.`;

      this.updateRollQueue({ message, note });
    },

    rollMeleeDamage() {
      const my = this.character;
      const weaponName = weapons[my.melee].title;
      const weaponDamage = weapons[my.melee].damage;
      const rollResult = rollString(weaponDamage) + my.meleeModifier + this.meleeAttackBonus;

      const message = `You hit with your ${weaponName} for ${rollResult} damage.`;

      this.updateRollQueue({ message });
    },

    rollRangedAttack() {
      const my = this.character;
      const weaponName = weapons[my.ranged].title;
      const rollResult = rollDice(20);
      const bonus = getModifier(my.dexterity) + this.proficiencyBonus + my.rangedModifier;

      let note = '';
      if (rollResult === 20) note = 'CRITICAL HIT!';
      if (rollResult === 1) note = 'CRITICAL MISS!';

      const message = `You attack with ${weaponName} and roll ${rollResult + bonus}.`;

      this.updateRollQueue({ message, note });
    },

    rollRangedDamage() {
      const my = this.character;
      const weaponName = weapons[my.ranged].title;
      const weaponDamage = weapons[my.ranged].damage;
      const rollResult = rollString(weaponDamage) + my.rangedModifier;

      const finesse = weapons[my.ranged].modifiers.includes('finesse');
      const bonus = finesse ? getModifier(my.dexterity) : getModifier(my.strength);
      // ToDo: str damage bonus for thrown weapons

      const message = `You shoot your ${weaponName} for ${rollResult + bonus} damage.`;

      this.updateRollQueue({ message });
    },
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57
$green: #4dde14
$bg-transparent: rgba(255,255,255,0.1)

.clickable
  text-decoration: underline
  color: #fff
  cursor: pointer

  &:hover
    color: $green

.roll-custom
  width: 48px

// Roll log window
.roll-queue
  position: fixed
  text-align: left
  z-index: 10
  width: calc(100% - 24px)
  right: 12px
  bottom: 4px
  color: #000

.queue-item
  display: flex
  align-items: center
  flex-wrap: wrap
  background-color: rgba(255,255,255,1)
  padding: 3px 8px 3px
  margin: 4px 0
  border-radius: 2px
  // font-family: 'Open Sans', Arial, sans-serif
  cursor: default

.roll-date
  color: #999
  font-size: 12px
  padding-right: 6px
  padding-top: 1px
  white-space: nowrap

.roll-string
  font-size: 14px

.roll-note
  font-weight: bold
  padding-left: 4px

// Name
.character-name
  font-size: 20px
  color: #fff

.character-class
  font-size: 14px
  font-family: 'Open Sans', Arial, sans-serif

  b
    color: #fff

// Plus|minus
.attr-plus,
.attr-minus
  width: 18px
  height: 18px
  background: $bg-transparent url('~@/assets/plus.svg') no-repeat 50% 50% / 75%
  border-radius: 3px
  cursor: pointer

  &:hover
    opacity: 0.85

.attr-minus
  background-image: url('~@/assets/minus.svg')
  background-size: 60%

// Attributes
.attributes
  display: flex
  justify-content: space-between
  margin: 8px 0 12px

  .attribute
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  .attribute-label
    display: flex
    text-align: center

    .attribute-modifier
      padding-left: 4px
      color: #fff

  .attribute-value
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    font-size: 22px
    padding-bottom: 2px
    background: transparent url('~@/assets/deco-sq-fancy.svg') no-repeat 0 0 / cover
    cursor: pointer
    user-select: none

    &:hover
      color: #fff

  .attribute-controls
    display: flex
    align-items: center
    justify-content: center
    height: 18px
    margin-top: 4px

    .attr-minus
      margin-right: 6px

  .attribute-save
    height: 18px
    margin-top: 4px
    font-size: 14px

// Health
.health
  display: flex
  margin: 12px 0 8px
  color: #fff

  span
    height: 44px
    padding: 0 6px
    font-size: 22px
    line-height: 41px

  .health-value
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    font-size: 22px
    padding-bottom: 2px
    background: transparent url('~@/assets/deco-sq-fancy.svg') no-repeat 0 0 / cover

  .health-controls
    display: flex
    flex-direction: column
    justify-content: center
    height: 44px
    height: 44px
    margin-right: 6px

    .attr-minus
      margin-top: 6px

// Skills
.skills
  display: flex
  flex-wrap: wrap

  .skill
    display: flex
    align-items: center
    width: 50%
    color: #fff
    user-select: none

    &.star
      color: $yellow

    .skill-value
      width: 23px
      text-align: right
      padding-right: 4px

    .dnd-checkbox
      margin-right: 6px
      height: auto

    span
      text-decoration: underline
      cursor: pointer

      &:hover
        color: $green

// Derivative stats
.combat-stats
  .combat-stat
    margin-right: 12px

    .stat-icon
      width: 16px
      height: 16px
      margin-right: 8px
      color: #fff

// Feats
.feat-list
  list-style-type: none

  .feat-list-item
    margin-bottom: 12px

  .feat-description
    font-family: 'Open Sans', Arial, Helvetica, sans-serif
    color: #fff

// Weapons block
.arms-block
  .dnd-select
    width: 100%

// Modifiers
.modifiers
  justify-content: space-between

  .dnd-select
    width: 32%
</style>
