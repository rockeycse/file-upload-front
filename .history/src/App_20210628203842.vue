<template>
  <!-- <script src="path/to/vue.js"></script>
  <script src="path/to/vue-simple-progress.js"></script> -->
  <div id="">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <!-- <h1>hello</h1> -->
    <div v-if="!isSummit && progressStatus == false">
      <file-upload @batchDetails="getBatchData"></file-upload>
    </div>
    <div v-if="progressStatus == true">
      <h1>Progressing...</h1>
    </div>

    <div v-if="null != progressData.id">
      <h1>Progress ({{ progressData.progress }}%)</h1>
      <!-- <progress-page></progress-page> -->
    </div>
  </div>
  <!-- <router-view/> -->
</template>

<script>
import axios from "axios";
import FileUpload from "./components/FileUpload.vue";
import ProgressPage from "./components/ProgressPage.vue";
// import ProgressBar from  'vue-simple-progress'

export default {
  data() {
    return {
      loading: true,
      batchDetails: [],
      batchId: null,
      isSummit: false,
      progressData: [],
      progressStatus: false,
      progress: 0,
      complete:
    };
  },
  components: {
    FileUpload,
    ProgressPage
    // ProgressBar,
    // Inventory,
  },
  methods: {
    getBatchData(batchData) {
      this.batchDetails = batchData;
      this.batchId = this.batchDetails.id;
      // console.log("test getBatchData "+this.batchId);
      this.progressInfo(this.batchId);
    },
    getProgress() {
      // console.log(this.batchData.id);

          axios
            .get(`http://127.0.0.1:8000/api/batch/in-progress`)
            .then(response => {
              // console.log(response.data.progress);
              // this.isSummit = true;
              this.progressData = response.data;

              if (response.data.progress > 0) {
                this.progressStatus = true;
                this.isSummit = true;
              }
            });

    },
    progressInfo() {
      setInterval(

        function() {
          // console.log("test progressInfo "+value);
          // if (!this.batchId) {
            this.getProgress();
          // }
        }.bind(this),
        3000
      );
    }
  },
  created() {
    // this.progressInfo(this.batchId);
    this.getProgress();
  }
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
