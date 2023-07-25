<template>
  <form @submit.prevent="handleSignUp">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="enter your name..."
      class="custom-container field"
      v-model="form.name"
      :class="[$v.name.$error ? 'err-input' : '']"
      @change="$v.email.$touch"
    />
    <p class="error" v-for="error in $v.name.$errors">
      {{ error.$message }}
    </p>

    <label for="email">Email</label>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="enter your email..."
      class="custom-container field"
      v-model="form.email"
      :class="[apiError.email !== '' || $v.email.$error ? 'err-input' : '']"
      @change="$v.email.$touch"
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
      :class="[$v.password.$error ? 'err-input' : '']"
      @change="$v.password.$touch"
    />
    <p class="error" v-for="error in $v.password.$errors">
      {{ error.$message }}
    </p>

    <input type="submit" value="Sign Up" class="submit" />

    <NuxtLink class="btn" to="/sign-in">Already have account</NuxtLink>
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
  name: string;
  email: string;
  password: string;
};
const form = ref<formData>({ name: "", email: "", password: "" });
const apiError = ref<err>({ email: "", password: "" });

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
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

const handleSignUp = async () => {
  const validate: boolean = await $v.value.$validate();
  if (validate) {
    try {
      await store.signUp(
        form.value.name,
        form.value.email,
        form.value.password
      );
      await navigateTo("/sign-in");
    } catch (err) {
      apiError.value = err as err;
    }
  } else {
    apiError.value = { email: "", password: "" };
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
