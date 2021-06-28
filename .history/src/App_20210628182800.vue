<template>
  <!-- <script src="path/to/vue.js"></script>
  <script src="path/to/vue-simple-progress.js"></script> -->
  <div id="">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <!-- <h1>hello</h1> -->
    <div v-if="!isSummit && progressStatus == false">
      <file-upload @getBatchId="getBatchData"></file-upload>
    </div>
    <div v-if="progressStatus == true">
      <h1>Processing...</h1>
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
const URL = "http://127.0.0.1:8000/api";

export default {
  data() {
    return {
      loading: true,
      batchData: [],
      isSummit: false,
      progressData: [],
      progressStatus: false,
      batchID: null,
      batchDetailsData: []
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
      this.batchData = batchData;
      this.batchId = batchData.id;
      // console.log(this.batchData.id);
    },
    getProgress() {
        axios
          .get(`http://127.0.0.1:8000/api/batch/in-progress`)
          .then(response => {
            this.progressData = response.data;

            if (response.data.progress > 0) {
              this.progressStatus = true;
              this.isSummit = true;
            }
          });
    },
    batchDetails() {
      if (this.batchDetailsData.progress != 100) {
        axios
          .get(`http://127.0.0.1:8000/api/batch/id=` + this.batchData.id)
          .then(response => {
            this.progressData = response.data;

            if (response.data.progress > 0) {
              this.progressStatus = true;
              this.isSummit = true;
            }
          });
      }
    },
    batchInfo() {
      if (this.batchData.id != null) {
        setInterval(() => {
          if(this.progressData.progress < 100){
            clearInterval()
          }
          batchDetails();
        }, 2000);
      }
    }
  },
  created() {
    this.batchInfo();
    // this.getProgress();
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
