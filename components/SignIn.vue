<template>
  <form @submit.prevent="handleSignIn">
    <label for="email">Email</label>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="enter your email..."
      class="custom-container field"
      v-model="form.email"
      :class="[apiError.email !== '' || $v.email.$error ? 'err-input' : '']"
      @change="
        () => {
          $v.email.$touch;
          apiError.email = '';
        }
      "
    />
    <p class="error" v-for="error in $v.email.$errors">
      {{ error.$message }}
    </p>
    <p class="error">
      {{ apiError.email }}
    </p>

    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="enter your password..."
      class="custom-container field"
      v-model="form.password"
      :class="[
        apiError.password !== '' || $v.password.$error ? 'err-input' : '',
      ]"
      @change="
        () => {
          $v.password.$touch;
          apiError.password = '';
        }
      "
    />
    <p class="error" v-for="error in $v.password.$errors">
      {{ error.$message }}
    </p>
    <p class="error">
      {{ apiError.password }}
    </p>

    <input class="submit" type="submit" value="Sign In" />

    <NuxtLink class="btn" to="/sign-up">Create Account</NuxtLink>
  </form>
</template>

<script setup lang="ts">
//----------------Vueildate---------------------//
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, helpers } from "@vuelidate/validators";
import err from "@/models/errorModel";

//----------------Pinia---------------------//
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

type formData = {
  email: string;
  password: string;
};
const form = ref<formData>({ email: "", password: "" });
const apiError = ref<err>({ email: "", password: "" });

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage(
        "Password must be at least 6 charcters or digits ",
        minLength(6)
      ),
    },
  };
});

const $v = useVuelidate(rules, form);

const handleSignIn = async () => {
  const validate: boolean = await $v.value.$validate();
  if (validate) {
    try {
      await store.signIn(form.value.email, form.value.password);
      await navigateTo("/home");
    } catch (err) {
      apiError.value = err as err;
    }
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
