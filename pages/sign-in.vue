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
      v-model="email"
    />

    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="enter your password..."
      maxlength="20"
      required
      class="custom-container field"
      v-model="password"
    />
    <input class="submit" type="submit" value="Sign In" />

    <NuxtLink class="btn" to="/sign-up">Create Account</NuxtLink>
  </form>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const link = "http://localhost:4000/sign_in";

const handleSignIn = async () => {
  try {
    await $fetch(link, {
      method: "POST",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
  } catch (err) {
    console.log(err);
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
