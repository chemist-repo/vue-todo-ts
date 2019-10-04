<template>
  <div
    :class="['todo-list-item', {
      top: isHeader,
      shadow: todo.status && !isHeader
    }]"
  >
    <span
      :class="['checkbox', {
        active: todo.status
      }]"
      @click="$emit('change-status', {
        id: todo.id,
        status: !todo.status,
      })"
    />
    <span class="text">{{ todo.text }}</span>
    <span class="info">{{ todo.info }}</span>
    <span
      class="remove"
      @click="$emit('remove', todo.id)"
    >×</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TodoItem extends Vue {
  @Prop() private todo!: Todo;
  @Prop() private isHeader!: boolean;
}
</script>

<style scoped lang="scss">
.todo-list-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .25);

  &.top {
    border-bottom-width: 3px;

    .text {
      font-size: 20px;
    }
  }

  &.shadow {
    opacity: .5;
  }

  &:hover {
    opacity: 1;
  }

  .checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid;
    position: relative;
    cursor: pointer;

    &.active:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: 10px;
      height: 10px;
      background-color: currentColor;
    }
  }
  .text {
    margin-left: 20px;
    margin-right: auto;
    font-size: 16px;
    font-weight: bold;

    &:first-letter {
      text-transform: uppercase;
    }
  }
  .info {
    opacity: .8;
  }
  .remove {
    cursor: pointer;
    margin-left: 20px;
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
