import {
  readLocalStorage,
} from '@/helpers';

export default {
  namespaced: true,

  state: {
    mode: null,
    characters: [],
    currentCharacter: null,
  },

  getters: {
  },

  mutations: {
    updateState(state, { param, value }) {
      state[param] = value;
    },
  },

  actions: {
    onStartup({ commit }) {
      const characters = readLocalStorage('localCharactersList');

      if (characters) {
        commit('updateState', { param: 'characters', value: characters });
        commit('updateState', { param: 'mode', value: 'view' });
      } else {
        commit('updateState', { param: 'mode', value: 'create' });
      }

      console.log('on startup...', characters);
    },
  },
};
