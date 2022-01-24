<template lang="pug">
  .container.golden-border
    create(v-if="mode === 'create'")
</template>

<script>
import {
  mapState,
} from 'vuex';

import Create from './Create.vue';

export default {
  name: 'container',

  components: {
    Create,
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
