<template>
  <form @submit.prevent="handleSignUp">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="enter your name..."
      required
      maxlength="50"
      class="custom-container field"
      v-model="name"
    />

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

    <input type="submit" value="Sign Up" class="submit" />

    <NuxtLink class="btn" to="/sign-in">Already have account</NuxtLink>
  </form>
</template>

<script setup lang="ts">
import error from "@/models/errorModel";
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const formError = ref<error>({ email: "", password: "" });

const handleSignUp = async () => {
  try {
    await store.signUp(name.value, email.value, password.value);
    await navigateTo("/sign-in");
  } catch (err) {
    formError.value = err as error;
  }
};
</script>

<style lang="scss">
form {
  width: 400px;
  margin-top: 50px;
  padding: 20px;
  @include page-center;
  background-color: #383b5c;
  border-radius: 4px;
}

label {
  display: block;
  margin-top: 25px;
  color: $main-Fcolor;
}
.field {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  @include input-styled;
}
.submit {
  @include input-styled;
  margin-top: 25px;
  padding: 12px 10px;
  float: right;
  width: 30%;
  height: initial;
  cursor: pointer;
  background-color: $main-color;
  border-radius: 4px;
  color: $main-Fcolor;

  &:hover {
    background-color: lighten($main-color, 30%);
  }
}

.error {
  margin-top: 12px;
  color: darken(red, 3%);
  font-size: 0.9rem;
  text-decoration: underline;
  margin-left: 5px;
}
.err-input {
  border: 2px solid red;
}
</style>
