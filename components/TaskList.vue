<template>
  <div class="loading" v-if="isLoading">Loading ....</div>

  <div class="task-list" v-else>
    <div class="custom-container" v-for="task in store.allTasks">
      <div class="checkbox">
        <Icon name="typcn:tick" />
      </div>
      <div class="task">{{ task.content }}</div>
      <Icon
        name="ic:baseline-close"
        class="delete"
        @click="store.deleteTask(task._id)"
      />
    </div>

    <div class="filter-container">
      <h3>3 left</h3>
      <span class="all">All</span>
      <span>Active</span>
      <span class="completed">Completed</span>
      <span class="clear">Clear Completed</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";

const isLoading = ref<Boolean>(false);

const store = useTaskStore();

onMounted(() => {
  store.fetchTasks();
});
</script>

<style lang="scss">
.loading {
  margin: 10px auto;
  background-color: darkblue;
  color: white;
  font-size: 1.5rem;
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
    cursor: pointer;
    svg {
      color: white;
      visibility: hidden;
    }
  }
  .checkbox.checked {
    background-color: #8b94e9;
    svg {
      visibility: visible;
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
</style>
