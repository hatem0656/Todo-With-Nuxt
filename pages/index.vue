<template>
  <Head>
    <Title>Todo App | Welcome</Title>
    <Meta
      name="description"
      content="A Todo app used for making todo list and manage your tasks easily"
    />
  </Head>
  <div class="welcome">
    <h1 class="w-text">Welcome</h1>
    <h1 class="w-text">Here you can make your todo list easily</h1>
    <div>
      <h2 class="w-text">First Time Here ?</h2>
      <NuxtLink to="/sign-up">Create a new account</NuxtLink>
    </div>
    <div>
      <h2 class="w-text">have an account ?</h2>
      <NuxtLink to="/sign-in">Sign in</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

onNuxtReady(async () => {
  try {
    await store.getUser();
    await navigateTo("/home");
  } catch (err) {
    // console.log(err);
  }
});
</script>

<style lang="scss" scoped>
.welcome {
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 10px;
  width: calc(100% - 20px);
  @include page-center;
  background-color: $main-color;

  @media screen and (min-width: 520px) {
    width: 500px;
    height: 300px;
  }
  .w-text {
    text-transform: capitalize;
    color: $main-Fcolor;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 3px;
    text-align: center;
    margin: 20px 0;
  }
  div {
    margin-left: 20px;

    margin-top: 20px;
    @include align-vertical;
  }
  a {
    margin-left: 40px;
    text-decoration: underline;
    color: $main-Fcolor;
    letter-spacing: 2px;
  }
}
</style>
