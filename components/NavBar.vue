<template>
  <nav :class="{ light: isLightMode }">
    <h2>todo</h2>
    <Icon :name="icon" @click="changeMode" class="mode-icon" />
  </nav>
</template>

<script setup lang="ts">
const icon = ref<String>("bi:sun-fill");
const isLightMode = ref<Boolean>(false);

const changeMode = () => {
  isLightMode.value = !isLightMode.value;
  if (isLightMode.value) {
    icon.value = "bi:moon-fill";
  } else {
    icon.value = "bi:sun-fill";
  }
};
</script>

<style lang="scss">
nav {
  margin-top: 40px;
  @include justify-between;
  .mode-icon {
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: $main-Fcolor;
      transform: rotateZ(360deg);
    }
  }
}
h2 {
  text-transform: uppercase;
  color: white;
  letter-spacing: 12px;
}
</style>
