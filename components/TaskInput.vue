<template>
  <div class="custom-container">
    <div class="checkbox"></div>
    <input
      type="text"
      placeholder="write your todo..."
      class="create-todo"
      v-model="content"
      @keyup.enter="
        () => {
          store.addTask(content);
          content = '';
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";

const store = useTaskStore();
const content = ref<string>("");
</script>

<style lang="scss">
.checkbox {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  border: 0.5px solid $border-color;
}
.custom-container {
  .checkbox {
    margin-right: 10px;
  }
}

.create-todo {
  height: 30px;
  @include input-styled;
  background-color: inherit;
}
</style>
