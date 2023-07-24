<template>
  <div class="loading" v-if="isLoading">Loading Tasks...</div>
  <div class="task-list" v-else>
    <div class="custom-container" v-for="task in viewTodos">
      <div class="checkbox" @click="store.toggleFinished(task._id)">
        <Icon name="typcn:tick" v-if="task.isFinished" />
      </div>
      <div class="task" :class="[task.isFinished ? 'checked' : '']">
        {{ task.content }}
      </div>
      <Icon
        name="ic:baseline-close"
        class="delete"
        @click="store.deleteTask(task._id)"
      />
    </div>

    <div class="filter-container">
      <h3>{{ store.leftTasks.length }} tasks left</h3>
      <span
        class="all"
        :class="[showState === 'all' ? 'active' : '']"
        @click="showState = 'all'"
        >All</span
      >
      <span
        :class="[showState === 'left' ? 'active' : '']"
        @click="showState = 'left'"
        >Active</span
      >
      <span
        class="completed"
        :class="[showState === 'completed' ? 'active' : '']"
        @click="showState = 'completed'"
        >Completed</span
      >
      <span class="clear" @click="store.clearCompleted()">Clear Completed</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
const store = useTaskStore();

const showState = ref<string>("all");

const viewTodos = computed(() => {
  switch (showState.value) {
    case "all": {
      return store.allTasks;
    }
    case "completed": {
      return store.completedTasks;
    }
    case "left": {
      return store.leftTasks;
    }
    default: {
      return store.allTasks;
    }
  }
});

const isLoading = ref<Boolean>(false);

onNuxtReady(async () => {
  isLoading.value = true;
  await store.fetchTasks();
  isLoading.value = false;
});
</script>

<style lang="scss">
.loading {
  margin: 10px auto;
  background-color: #2b2a2a;
  color: white;
  font-size: 1.4rem;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 10px;
  @include all-center;
}

.task-list {
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  .checkbox {
    @include all-center;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      color: white;
      background-color: #8b94e9;
    }
  }

  .custom-container:hover .delete {
    visibility: visible;
  }
}
.delete {
  font-size: 1.4rem;
  margin-right: 5px;
  color: $main-Fcolor;
  cursor: pointer;
  visibility: hidden;
}

.task {
  flex: 1;
  height: 30px;
  padding: 0;
  margin-top: 20px;
  background-color: inherit;
  color: $main-Fcolor;
  font-weight: 700;
  font-size: 0.9rem;
  position: relative;

  &::after {
    content: "";
    width: calc(100% + 74px);
    height: 1px;
    background-color: $border-color;
    position: absolute;
    bottom: -10px;
    left: -41px;
  }

  &.checked {
    text-decoration: line-through;
  }
}

.filter-container {
  max-width: 100%;
  padding: 10px 12px;
  background-color: $main-color;
  @include align-vertical;
  flex-wrap: wrap;

  border-radius: 4px;

  span,
  h3 {
    letter-spacing: 1px;
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    color: $options-color;

    @media (width > 576px) {
      font-size: 0.85rem;
    }
  }

  span {
    cursor: pointer;
  }
}

.all {
  margin-left: auto;
  margin-right: 7px;
  @media (width > 576px) {
    margin-right: 20px;
  }
}

.completed {
  margin-left: 7px;
  @media (width > 576px) {
    margin-left: 20px;
  }
  @media (width > 420px) {
    margin-right: auto;
  }
}

.clear {
  width: 100%;
  margin-top: 5px;
  text-align: center;
  @media (width > 420px) {
    text-align: initial;
    width: initial;
    margin-top: 0;
  }
}

.filter-container span:hover {
  color: $hover-color;
}

span.active {
  color: $selection-color;
}
</style>
