<template>
  <div id="">
    <img alt="Vue logo" src="./assets/logo.png">
    test
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
  mounted() {
    chrome.contextMenus.create({
      title: "测试右键菜单",
      onclick: function(){
        alert('右键')
        chrome.notifications.create(null, {
          type: 'basic',
          iconUrl: 'img/icon.png',
          title: '这是标题',
          message: '您刚才点击了自定义右键菜单！'
        });
      }
    });
    chrome.contextMenus.create({
      title: '使用度娘搜索：%s', // %s表示选中的文字
      contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
      onclick: function(params:any)
      {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
      }
    });
  }
}
</script>
<style lang="stylus">
#background
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
