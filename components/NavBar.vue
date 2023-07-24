<template>
  <nav>
    <h1>todo</h1>

    <div class="profile" v-if="store.user.isAuth">
      <Icon name="iconamoon:profile" @click="" class="p-icon" />
      <h2>{{ store.user.name }}</h2>
    </div>
    <div
      class="log-out"
      title="Log Out"
      @click="handleSignOut"
      v-if="store.user.isAuth"
    >
      <Icon name="tabler:logout" class="out-icon" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const store = useUserStore();

const handleSignOut = async () => {
  try {
    await store.signOut();
    navigateTo("/sign-in");
  } catch (err) {}
};
</script>

<style lang="scss" scoped>
nav {
  margin-top: 40px;
  margin-bottom: 20px;
  @include align-vertical;
}
h1 {
  text-transform: uppercase;
  flex: 1;
  color: white;
  letter-spacing: 12px;
  font-size: 1.5rem;
}

.profile {
  padding: 10px 15px;
  @include align-vertical;
  border-radius: 27px;

  .p-icon {
    margin-bottom: 3px;
    color: white;
    font-size: 1.5rem;
  }
  h2 {
    color: white;
    margin: 0;
    margin-left: 10px;
    font-size: 1rem;
  }
}
.log-out {
  margin-left: 10px;
  cursor: pointer;

  .out-icon {
    font-size: 1.5rem;
    color: white;
  }
  &:hover {
    .out-icon {
      color: $main-Fcolor;
    }
  }
}
</style>
