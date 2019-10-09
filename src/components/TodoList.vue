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
      v-for="todo in filtredCollection"
      :key="`todo-${todo.id}`"
      :todo="todo"
      @change-status="$emit('change-status', $event)"
      @remove="$emit('remove', $event)"
    />
    <div
      v-if="collections.length"
      class="todo-list--footer"
    >
      <div class="items">
        <span>{{ countActiveTodo }}</span>
        <span> item{{ countActiveTodo > 1 ? 's' : '' }} left</span>
      </div>
      <div class="filters">
        <button
          v-for="(item, i) in filters"
          :key="`filter-${i}`"
          @click="setVisibility(item)"
          :class="['button', {
            active: visibility === item
          }]"
        >{{ item }}</button>
      </div>
      <div class="spacer" />
    </div>
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
  private visibility: string;
  private filters: string[];

  constructor() {
    super();
    this.status = false;
    this.visibility = 'all';
    this.filters = ['all', 'active', 'completed'];
  }

  get countActiveTodo() {
    return this.collections
      .filter((item) => !item.status).length;
  }

  get filtredCollection() {
    switch (this.visibility) {
      case 'active':
        return this.collections.filter((item) => !item.status);
        break;
      case 'completed':
        return this.collections.filter((item) => item.status);
        break;
      default:
        return this.collections;
        break;
    }
  }

  private setVisibility(visibility: string): void {
    this.visibility = visibility;
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
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;

    .items {
      opacity: .8;
    }
    .filters {
      .button {
        border: none;
        background-color: transparent;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid transparent;

        &:last-child {
          margin-right: 0;
        }
        &:hover {
          border-color: rgba(0, 0, 0, .5)
        }
        &.active {
          border-color: rgba(0, 0, 0, .75)
        }
      }
    }
    .spacer {}
  }
}
</style>
