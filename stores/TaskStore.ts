import { defineStore } from "pinia";
import Task from "models/todoModel";

export type RootState = {
  tasks: Task[];
  apiLink: string;
};
import { useUserStore } from "@/stores/UserStore";

export const useTaskStore = defineStore("taskStore", {
  state: (): RootState => ({
    tasks: [],
    apiLink: useRuntimeConfig().public.Todos_URL,
  }),

  getters: {
    allTasks(): Task[] {
      return this.tasks;
    },
    completedTasks(): Task[] {
      return this.tasks.filter((task) => task.isFinished);
    },
    leftTasks(): Task[] {
      return this.tasks.filter((task) => !task.isFinished);
    },
  },
  actions: {
    async fetchTasks() {
      const store = useUserStore();
      this.tasks = await $fetch(this.apiLink + store.user._id);
    },

    async addTask(content: string) {
      const store = useUserStore();
      await $fetch(this.apiLink + store.user._id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }).catch((err) => {
        console.log(err.data.errors);
      });
      await this.fetchTasks();
    },
    async deleteTask(id: string) {
      const store = useUserStore();
      await $fetch(this.apiLink + store.user._id + "/" + id, {
        method: "DELETE",
      }).catch((err) => {
        console.log(err.data.errors);
      });
      await this.fetchTasks();
    },
    async clearCompleted() {
      this.completedTasks.forEach(
        async (task) => await this.deleteTask(task._id)
      );
      await this.fetchTasks();
    },
    toggleFinished(id: string) {
      const task = this.tasks.find((t) => t._id === id) as Task;
      task.isFinished = !task.isFinished;
    },
  },
});
