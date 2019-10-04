<template>
  <div class="todo-list">
    <TodoItem
      v-if="collections.length"
      :todo="{
        id: 'all',
        text: 'todo text',
        info: 'Clear all',
        status: status,
      }"
      :isHeader="true"
      @change-status="changeAllStatus"
      @remove="$emit('clear-all')"
    />
    <TodoItem
      v-for="todo in collections"
      :key="`todo-${todo.id}`"
      :todo="todo"
      @change-status="$emit('change-status', $event)"
      @remove="$emit('remove', $event)"
    />
    <div
      v-if="collections.length"
      class="todo-list--footer"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoItem from './TodoItem.vue';

@Component({
  components: { TodoItem },
})
export default class TodoList extends Vue {
  @Prop() private collections!: Todo[];

  private status: boolean;

  constructor() {
    super();
    this.status = false;
  }

  private changeAllStatus({ status }: ChangeStatus): void {
    this.status = status;
    this.$emit('check-all');
  }
}
</script>

<style scoped lang="scss">
.todo-list {
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, .25);

  &--footer {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
  }
}
</style>
