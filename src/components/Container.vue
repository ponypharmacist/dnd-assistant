<template lang="pug">
  .container.golden-border
    create(v-if="mode === 'create'")

    charsheet(v-if="mode === 'view'")
</template>

<script>
import {
  mapState,
} from 'vuex';
// import {
//   clearLocalStorage,
// } from '../helpers';

import Create from './Create.vue';
import Charsheet from './Charsheet.vue';

export default {
  name: 'container',

  components: {
    Create,
    Charsheet,
  },

  mounted() {
    // clearLocalStorage('localCharactersList');
  },

  computed: {
    ...mapState('main', [
      'mode',
    ]),
  },
};
</script>

<style lang="sass" scoped>
.container
  // height: 100%
</style>
