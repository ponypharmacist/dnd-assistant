<template lang="pug">
  .charsheet
    <pre>{{ characters }}</pre>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  name: 'charsheet',

  computed: {
    ...mapState('main', [
      'characters',
    ]),
  },
};
</script>

<style lang="sass" scoped>
</style>
