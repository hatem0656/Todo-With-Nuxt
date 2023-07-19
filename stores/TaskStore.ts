import { defineStore } from "pinia";

const apiLink: string = "https://todo-app-an4y.onrender.com/api/todos/";
export type Task = {
  _id: string;
  content: string;
  isFinished: boolean;
};

export type RootState = {
  tasks: Task[];
};

export const useTaskStore = defineStore("taskStore", {
  state: (): RootState => ({
    tasks: [],
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
      this.tasks = await $fetch(apiLink);
    },

    async addTask(content: string) {
      try {
        await fetch(apiLink, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        this.fetchTasks();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTask(id: string) {
      await $fetch(apiLink + id, {
        method: "DELETE",
      });
      this.fetchTasks();
    },

    toggleFinished(id: string) {
      const task = this.tasks.find((t) => t._id === id) as Task;
      task.isFinished = !task.isFinished;
    },
  },
});
