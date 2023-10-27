import { defineStore } from 'pinia';

interface KeepAliveState {
  nameComponents: string[];
}

export const useKeepAliveStore = defineStore({
  id: 'app-keep-alive',

  state: (): KeepAliveState => ({
    nameComponents: [],
  }),

  getters: {
    getNameComponents(): string[] {
      return this.nameComponents;
    },
  },

  actions: {
    add(name: string) {
      !this.nameComponents.includes(name) && this.nameComponents.push(name);
    },

    remove(name: string) {
      this.nameComponents = this.nameComponents.filter(item => {
        return item !== name;
      });
    },

    revoke() {
      this.nameComponents = [];
    },
  },
});
