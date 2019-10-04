import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const CHANGE_STATUS = 'CHANGE_STATUS';
const CLEAR_ALL = 'CLEAR_ALL';
const CHECK_ALL = 'CHECK_ALL';

export default new Vuex.Store<RootState>({
  state: {
    collections: [],
  },
  mutations: {
    [ADD_TODO](state, todo: Todo) {
      state.collections.push(todo);
    },
    [DELETE_TODO](state, id: string) {
      state.collections = state.collections
        .filter((todo) => todo.id !== id);
    },
    [CLEAR_ALL](state) {
      state.collections = [];
    },
    [CHECK_ALL](state) {
      state.collections = state.collections
        .map((item) => {
          item.status = !item.status;
          return item;
        });
    },
    [CHANGE_STATUS](state, { id, status }: ChangeStatus) {
      const todo: any = state.collections
        .find((item) => item.id === id);
      todo.status = status;
    },
  },
  getters: {
    collections: (state) => state.collections,
  },
  actions: {
    addTodo({ commit }, text: string) {
      const id: string = Math.random().toString(36).substring(7);
      const info: string = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
      const status: boolean = false;

      commit(ADD_TODO, {
        id,
        text,
        info,
        status,
      });
    },
  },
});
