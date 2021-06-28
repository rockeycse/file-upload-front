<template>
  <div class="container">
    <div class="row mb-4">
      <h1>File Upload</h1>
    </div>
    <div class="large-12 medium-12 small-12 cell">
      <label
        >File
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
      <button v-on:click.prevent="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ProgressBar from "vue-simple-progress";
export default {
  // components: {
  //   ProgressBar,
  // },
  data() {
    return {
      file: "",
      // batchDetails: [],
      // progressDetails: [],
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("mycsv", this.file);
      console.log(formData);
      axios
        .post("http://127.0.0.1:8000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // console.log(response.data.id);
          // this.batchDetails = response.data;
          // if (this.batchDetails.id != null) {
            this.$emit('batchDetails',response.data);
            // this.$emit('iSubmit',1);
          // }
          // console.log(this.batchDetails.id);
        });
    },

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
