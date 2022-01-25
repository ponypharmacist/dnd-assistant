import {
  readLocalStorage,
} from '@/helpers';

export default {
  namespaced: true,

  state: {
    mode: null,
    characters: [],
    currentCharacter: null,

    rollQueue: [],
  },

  getters: {
  },

  mutations: {
    updateState(state, { param, value }) {
      state[param] = value;
    },

    updateRollQueue(state, payload) {
      const rollObject = {
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: payload.message,
        note: payload.note,
      };
      if (state.rollQueue.length >= 3) {
        state.rollQueue.shift();
      }
      state.rollQueue.push(rollObject);
    },

    removeFromQueue(state, index) {
      state.rollQueue.splice(index, 1);
    },
  },

  actions: {
    onStartup({ commit }) {
      const characters = readLocalStorage('localCharactersList');

      if (characters?.length) {
        commit('updateState', { param: 'characters', value: characters });
        commit('updateState', { param: 'mode', value: 'view' });
        commit('updateState', { param: 'currentCharacter', value: '0' });
      } else {
        commit('updateState', { param: 'mode', value: 'create' });
      }
    },
  },
};
