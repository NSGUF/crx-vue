<template>
  <div id="popup">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="openBack">打开background</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';


@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {

  openBack() {
    window.open(chrome.extension.getURL('background.html'));
  }

  mounted() {
    chrome.bookmarks.getTree(function (c: any) {
      console.log(c)
    })
  }
}
</script>
<style lang="stylus">
#popup
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
