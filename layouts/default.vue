<template>
  <div class="bk"></div>
  <div class="home">
    <div class="container">
      <NavBar />
      <div><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.bk {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 40vh;
  background-size: cover;
  background-image: $bk-image;
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding: 0 30px;
  transition: 0.3s;
  @media (min-width: 576px) {
    width: 540px;
  }
  @media (min-width: 768px) {
    width: 720px;
  }
}
.custom-container {
  max-width: 100%;
  padding: 10px 12px;
  background-color: $main-color;
  display: flex;
  align-items: center;
  border-radius: 4px;
}
</style>
