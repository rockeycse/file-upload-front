<template>
  <div id="">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <!-- <h1>hello</h1> -->
    <div v-if="!isSummit">
      <file-upload></file-upload>
    </div>

    <div v-else>
      <progress-page></progress-page>
    </div>
  </div>
  <!-- <router-view/> -->
</template>

<script>
import FileUpload from './components/FileUpload.vue'
import ProgressPage from './components/ProgressPage.vue'

export default {
  data() {
    return {
      loading: true,
      isSummit: false
    };
  },
  components: {
    FileUpload,
    ProgressPage
    // Inventory,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
