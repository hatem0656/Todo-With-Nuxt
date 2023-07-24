import { defineStore } from "pinia";
import User from "@/models/userModel";

export type RootState = {
  user: User;
  apiLink: string;
};

export const useUserStore = defineStore(
  "userStore",

  {
    state: (): RootState => ({
      user: {
        _id: "",
        name: "",
        isAuth: false,
      },
      apiLink: useRuntimeConfig().public.API_BASE_URL,
    }),

    getters: {},
    actions: {
      //-----------------------*****Sign UP*****-----------------------------///
      async signUp(name: string, email: string, password: string) {
        await $fetch(this.apiLink + "sign_up", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }).catch((err) => {
          throw err.data.errors;
        });
      },

      //-----------------------*****Sign IN*****-----------------------------///
      async signIn(email: string, password: string) {
        await $fetch(this.apiLink + "sign_in", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).catch((err) => {
          throw err.data.errors;
        });
      },

      async getUser() {
        const res: any = await $fetch(this.apiLink + "user", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((res) => res.data.errors);

        this.user._id = res._id;
        this.user.name = res.name;
        this.user.isAuth = true;
      },
      async signOut() {
        await $fetch(this.apiLink + "sign_out", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).catch((res) => res.data.errors);

        this.user._id = "";
        this.user.name = "";
        this.user.isAuth = false;
      },
    },
  }
);
