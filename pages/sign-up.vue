<template>
  <form @submit.prevent="handleSignUp">
    <label for="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="enter your name..."
      maxlength="20"
      class="custom-container field"
    />

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

    <input type="submit" value="Sign Up" class="submit" />
    <NuxtLink class="btn" to="/sign-in">Already have account</NuxtLink>
  </form>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
const link = "http://localhost:4000/sign_up";
const handleSignUp = async () => {
  try {
    await $fetch(link, {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
  } catch (err) {
    console.log(err);
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
</style>
