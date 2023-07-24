<template>
  <form @submit.prevent="handleSignIn">
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="enter your email..."
      required
      class="custom-container field"
      :class="[formError.email !== '' ? 'err-input' : '']"
      v-model="email"
    />
    <p class="error">{{ formError.email }}</p>

    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="enter your password..."
      minlength="6"
      maxlength="20"
      required
      class="custom-container field"
      :class="[formError.password !== '' ? 'err-input' : '']"
      v-model="password"
    />
    <p class="error">{{ formError.password }}</p>

    <input class="submit" type="submit" value="Sign In" />

    <NuxtLink class="btn" to="/sign-up">Create Account</NuxtLink>
  </form>
</template>

<script setup lang="ts">
import error from "@/models/errorModel";
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

const email = ref<string>("");
const password = ref<string>("");
const formError = ref<error>({ email: "", password: "" });

const handleSignIn = async () => {
  try {
    await store.signIn(email.value, password.value);
    await navigateTo("/home");
  } catch (err) {
    formError.value = err as error;
  }
};
</script>

<style lang="scss">
.btn {
  float: left;
  background-color: transparent;
  text-decoration: underline;
  color: $main-Fcolor;
  font-size: 0.9rem;
  box-shadow: initial;
  border: none;
  border-radius: 4px;
  letter-spacing: 1px;
  margin-top: 35px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: darken($main-Fcolor, 10%);
  }
}
</style>
