<template>
  <div id="app">
    <Diagram />
  </div>
</template>

<script>
import Diagram from "./components/Diagram.vue";
export default {
  name: "App",
  components: { Diagram },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
