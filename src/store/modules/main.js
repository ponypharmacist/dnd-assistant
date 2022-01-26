import {
  readLocalStorage,
  updateLocalStorage,
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

    updateProperty(state, { param, value }) {
      state.characters[state.currentCharacter][param] = value;
    },

    toggleSkill(state, skill) {
      const target = state.characters[state.currentCharacter].skills;

      if (target.includes(skill)) {
        const index = target.indexOf(skill);
        target.splice(index, 1);
      } else {
        target.push(skill);
      }
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

    nextCharacter(state) {
      // eslint-disable-next-line prefer-destructuring
      const length = state.characters.length;
      const current = state.currentCharacter;
      const next = current + 1 === length ? 0 : current + 1;

      state.currentCharacter = next;
    },
  },

  actions: {
    onStartup({ commit }) {
      const characters = readLocalStorage('localCharactersList');

      if (characters?.length) {
        commit('updateState', { param: 'characters', value: characters });
        commit('updateState', { param: 'mode', value: 'view' });
        commit('updateState', { param: 'currentCharacter', value: 0 });
      } else {
        commit('updateState', { param: 'mode', value: 'create' });
      }
    },

    updateProperty({
      state,
      commit,
    }, change) {
      commit('updateProperty', change);
      updateLocalStorage(state.characters, 'localCharactersList');
    },

    toggleSkill({
      state,
      commit,
    }, skill) {
      commit('toggleSkill', skill);
      updateLocalStorage(state.characters, 'localCharactersList');
    },
  },
};
