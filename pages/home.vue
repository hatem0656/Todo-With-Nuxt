<template>
  <TaskInput />
  <TaskList v-if="store.user.isAuth" />
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

onNuxtReady(async () => {
  try {
    await store.getUser();
    // console.log(store.user);
  } catch (err) {
    await navigateTo("/sign-in");
  }
});
</script>

<style lang="scss" scoped></style>
