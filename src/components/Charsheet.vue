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
        class="ml-2 mr-2"
        @click="rollCustom(customRollValue)"
      )

      dnd-button(
        label="Next"
        small
        class="ml-2"
      )
      dnd-button(
        label="New"
        small
        class="ml-2"
      )

    .character.d-flex.mt-2
      div
        .character-name {{ character.name }}
        .character-class
          b {{ `Lvl.${character.level} ` }}
          | {{ (character.subrace || character.race) | capitalize }}
          | {{ (character.clas) | capitalize }}

      div.ml-auto.pt-1
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
        .attribute-controls

    pre.mt-4 {{ character.subrace }}
</template>

<script>
import {
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

export default {
  name: 'charsheet',

  data: () => ({
    customRollValue: '1d20',

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
      'updateRollQueue',
      'removeFromQueue',
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
      const message = `You roll {capitalize(skill)} for ${rollResult + bonus}. `;
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
</style>
