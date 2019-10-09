<template>
  <div class="todo-view">
    <h1 class="title">Todo App Example</h1>
    <form
      @submit.prevent="onSubmit"
      class="form-text"
    >
      <input
        class="text-input"
        type="text"
        placeholder="What needs to be done?"
        v-model="text"
        autofocus
      />
    </form>
    <TodoList
      :collections="collections"
      @change-status="CHANGE_STATUS"
      @remove="DELETE_TODO"
      @check-all="CHECK_ALL"
      @clear-all="CLEAR_ALL"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from '@/components/TodoList.vue';
import { mapGetters, mapMutations } from 'vuex';

@Component({
  name: 'todo-view',
  computed: {
    ...mapGetters(['collections']),
  },
  methods: {
    ...mapMutations([
      'CHANGE_STATUS',
      'DELETE_TODO',
      'CHECK_ALL',
      'CLEAR_ALL',
    ]),
  },
  components: {
    TodoList,
  },
})

export default class TodoView extends Vue {
  private text: string;

  constructor() {
    super();
    this.text = '';
  }

  private onSubmit(): void {
    this.$store.dispatch('addTodo', this.text);
    this.text = '';
  }
}
</script>

<style scoped lang="scss">
.todo-view {
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .title {
    margin: 0 0 40px;
  }
  .form-text {
    width: 100%;
    margin-bottom: 40px;
    .text-input {
      width: 100%;
      padding: 10px;
      line-height: 1.5;
      font-size: 20px;
      border: none;
      box-shadow: 1px 2px 12px rgba(0, 0, 0, .25);
    }
  }
}
</style>
