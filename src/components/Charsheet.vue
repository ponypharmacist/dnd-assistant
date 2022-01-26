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
      dnd-input(
        v-model="customRollValue"
        label="Roll custom"
      )
      dnd-button(
        label="Roll"
        small
        class="ml-2 mr-auto"
        @click="rollCustom(customRollValue)"
      )

      dnd-button(
        v-show="characters.length > 1"
        label="Next"
        small
        class="ml-2"
        @click="nextCharacter"
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
        .character-class
          b {{ `Lvl.${character.level} ` }}
          | {{ (character.subrace || character.race) | capitalize }}
          | {{ (character.clas) | capitalize }}

      div.ml-auto.pt-1.d-flex
        dnd-button(
          label="Edit"
          small
          class="ml-2"
          @click="editMode = !editMode"
        )
        dnd-button(
          label="Save"
          small
          class="ml-2"
        )
        dnd-button(
          v-if="character.level < 20"
          label="Level Up"
          small
          class="ml-2"
        )

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

    pre.mt-4 {{ characters }}
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
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57
$bg-transparent: rgba(255,255,255,0.1)

.clickable
  text-decoration: underline
  color: #fff
  cursor: pointer

  &:hover
    color: $yellow

// Roll log window
.roll-queue
  position: fixed
  text-align: left
  z-index: 10
  width: calc(100% - 24px)
  right: 12px
  bottom: 12px
  color: #000

.queue-item
  display: flex
  align-items: center
  flex-wrap: wrap
  background-color: rgba(255,255,255,1)
  padding: 3px 12px 3px
  margin: 4px 0
  border-radius: 2px
  // font-family: 'Open Sans', Arial, sans-serif
  cursor: default

.roll-date
  color: #999
  font-size: 12px
  padding-right: 6px
  white-space: nowrap

.roll-string

.roll-note
  font-weight: bold

// Name
.character-name
  font-size: 20px
  color: #fff

.character-class
  font-size: 14px
  font-family: 'Open Sans', Arial, sans-serif

  b
    color: #fff

// Attributes
.attributes
  display: flex
  justify-content: space-between
  margin: 8px 0

  .attribute
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  .attribute-label
    display: flex
    text-align: center

    .attribute-title
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
      margin-right: 6px
      background-image: url('~@/assets/minus.svg')
      background-size: 60%

  .attribute-save
    height: 18px
    margin-top: 4px
    font-size: 14px

// Skills
.skills
  display: flex
  flex-wrap: wrap

  .skill
    display: flex
    align-items: center
    width: 50%
    color: #fff
    cursor: pointer

    &.star
      color: $yellow

    .skill-value
      width: 23px
      text-align: right
      padding-right: 4px

    .dnd-checkbox
      margin-right: 6px
      height: auto
</style>
