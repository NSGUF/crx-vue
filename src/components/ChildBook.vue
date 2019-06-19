<template lang="pug">
  .child-book(v-if='isShowChild')
    Mask
    MaskComponent
    .container
      .title
        .left( @click="colseChild")
          img.next( src='./../assets/back.svg')
          span {{selectedChildItem.title}}
      .children
        .child(v-if='selectedChildItem.children&&selectedChildItem.children.length>0' v-for="(childItem, childIndex) in selectedChildItem.children")
          .item.folder(v-if="childItem.children" @click="openChild(childItem)") {{childItem.title}}
            img.next( src='./../assets/next.png')
          .item(v-else @click="openWebpage(childItem.url)")
            img.logo( :src="'chrome://favicon/'+childItem.url")
            span {{childItem.title}}
</template>

<script lang="ts">
  import {Component, Vue, Model} from 'vue-property-decorator';
  import MaskComponent from './common/MaskComponent.vue';

  @Component({
    components: {
      MaskComponent,
    },
  })
  export default class ChildBook extends Vue {
    @Model('isShowChild', {type: Boolean})
    readonly isShowChild!: boolean;

    @Model('selectedChildItem')
    selectedChildItem!: any;

    openWebpage(url: string) {
      window.open(url);
      // chrome.tabs.create({url: url, active: true})
    }


    openChild(child: any[]) {
      this.$emit('changeChildBook', child);
    }
    colseChild(){
      this.$emit('closeChildBook');
    }
  }
</script>

<style scoped lang="stylus">
  .child-book {

    .container {
      position: fixed;
      background #fff;
      top: 20px;
      width 440px
      max-height 540px;
      border-radius 10px;
      left: 20px;
      min-height: 30px;
      font-size 15px;

      .title {
        display flex
        line-height 30px;
        height: 30px;
        padding-bottom 10px;

        .left {
          display flex
          align-items center;
          cursor pointer;

          > img {
            height: 17px;
            width: 17px;
            margin-right 10px;
          }
        }
      }

      .children {
        display flex;
        justify-content space-between;
        flex-flow: row wrap;
        max-height 500px;
        overflow-y: auto;
        overflow-x: hidden;

        .child {
          cursor pointer


          .item {
            width: 440px;
            height 42px;
            background #eee;
            margin-bottom 10px;
            display flex;
            align-items center;
            cursor: pointer;
            text-decoration none;
            color: #424242;
            border-radius 3px;

            .next {
              width: 20px;
              height: 20px;
            }

            .logo {
              margin-left 10px;
              margin-right 10px;
            }

            > span {
              white-space nowrap;
              overflow hidden
              text-overflow ellipsis;
            }
          }

          .item:hover {
            background #cccccc;
            transition: all .3s ease-out 0s;
          }
        }

        .folder {
          justify-content space-between
          padding 0 10px
          box-sizing border-box
        }
      }

      /* 设置滚动条的样式 */
      .children::-webkit-scrollbar {
        width:2px;
        background-color: #eee;
      }

      /* 滚动槽 */
      .children::-webkit-scrollbar-track {
        border-radius:1px;
      }

      /* 滚动条滑块 */
      .children::-webkit-scrollbar-thumb {
        border-radius:1px;
        background:#999;
      }
    }


  }
</style>
