<template lang="pug">
  div#popup
    .container
      .history 今天打开过{{historyNum}}个书签
      input(type='text' placeholder='搜索|多个关键字用空格分隔')
      .bookmarks(v-for="(item, index) in bookmarks")
        .title {{item.title}}
        .children
          .child(v-if='item.children&&item.children.length>0' v-for="(childItem, childIndex) in item.children")
            .item.folder(v-if="childItem.children" @click="openChild(childItem)") {{childItem.title}}
              img.next( src='./assets/next.png')
            .item(v-else @click="openWebpage(childItem.url)")
              img.logo( :src="'chrome://favicon/'+childItem.url")
              span {{childItem.title}}
      ChildBook(:isShowChild="isShowChild" :selectedChildItem="selectedChildItem" v-on:closeChildBook="closeChildBook" v-on:changeChildBook="changeChildBook")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChildBook from './components/ChildBook.vue';

  @Component({
    components: {
      ChildBook,
    },
  })
export default class App extends Vue {
    historyNum: number = 0;

    isShowChild: boolean = false;

    selectedChildItemArr: any[] = [];

    selectedChildItem: any = {};

    bookmarks: any[] = [];

    bookmarksTets: any[] = [{
      children: [{
        dateAdded: 1450340148500,
        id: '2',
        index: 0,
        parentId: '1',
        title: '百度一下',
        url: 'https://www.baidu.com/?tn=98012088_10_dg&ch=3',
      }, {
        dateAdded: 1539829632406,
        id: '6',
        index: 1,
        parentId: '1',
        title: 'Google 翻译',
        url: 'https://translate.google.cn/#en/zh-CN/connection%20is%20established',
      }, {
        dateAdded: 1539841081855,
        id: '8',
        index: 2,
        parentId: '1',
        title: '我的地盘 - 禅道',
        url: 'http://220.231.134.17:81/zentao/my/',
      }, {
        dateAdded: 1540344958182,
        id: '10',
        index: 3,
        parentId: '1',
        title: '微信小程序_页面传值 - 简书',
        url: 'https://www.jianshu.com/p/0135769db89c',
      }, {
        dateAdded: 1541486374301,
        id: '12',
        index: 4,
        parentId: '1',
        title: 'MVC Model Binding with an Ajax Form Submit - Madison Web Design, Wordpress Services, and Search Engine Optimization',
        url: 'https://www.kruegerwebdesign.com/2014/04/24/mvc-model-binding-ajax-form-submit/',
      }, {
        dateAdded: 1541655756451,
        id: '14',
        index: 5,
        parentId: '1',
        title: 'Home · abplusgroup/Home Wiki · GitHub',
        url: 'https://github.com/abplusgroup/Home/wiki',
      }, {
        dateAdded: 1541841116580,
        id: '16',
        index: 6,
        parentId: '1',
        title: 'Rijndael Class (System.Security.Cryptography) | Microsoft Docs',
        url: 'https://docs.microsoft.com/zh-cn/dotnet/api/system.security.cryptography.rijndael?redirectedfrom=MSDN&view=netframework-4.7.2',
      }, {
        dateAdded: 1542091337777,
        id: '18',
        index: 7,
        parentId: '1',
        title: 'Troubleshooting high memory usage with ASP.NET Core on Kubernetes',
        url: 'https://blog.markvincze.com/troubleshooting-high-memory-usage-with-asp-net-core-on-kubernetes/',
      }, {
        dateAdded: 1544151998049,
        id: '20',
        index: 8,
        parentId: '1',
        title: '产品信息统计表 - 禅道',
        url: 'http://220.231.134.17:81/zentao/report-productinfo.html',
      }, {
        dateAdded: 1544152008162,
        id: '21',
        index: 9,
        parentId: '1',
        title: 'Untitled Board | Trello',
        url: 'https://trello.com/b/RrTqmjDp/untitled-board',
      }, {
        dateAdded: 1544515296500,
        id: '23',
        index: 10,
        parentId: '1',
        title: "lcomplete's Blog",
        url: 'http://lcomplete.github.io/',
      }, {
        dateAdded: 1545615861383,
        id: '25',
        index: 11,
        parentId: '1',
        title: 'CSS Modules 用法教程 - 阮一峰的网络日志',
        url: 'http://www.ruanyifeng.com/blog/2016/06/css_modules.html',
      }, {
        dateAdded: 1559205110028,
        id: '27',
        index: 12,
        parentId: '1',
        title: '安卓手机维修|苹果手机维修|手机刷机解锁|专业维修平台|安心修手机维修',
        url: 'http://127.0.0.1:8081/chat?workerId=2499',
      }, {
        children: [{
          dateAdded: 1560499065001,
          id: '33',
          index: 0,
          parentId: '29',
          title: '百度一下，你就知道',
          url: 'https://www.baidu.com/',
        }, {
          dateAdded: 1560499065001,
          id: '33',
          index: 0,
          parentId: '29',
          title: '百度一下，你就知道',
          url: 'https://www.baidu.com/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        }, {
          dateAdded: 1560499083297,
          id: '34',
          index: 1,
          parentId: '29',
          title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
          url: 'https://www.acfun.cn/',
        },{
          children: [{
            dateAdded: 1560499065001,
            id: '33',
            index: 0,
            parentId: '29',
            title: '百度一下，你就知道',
            url: 'https://www.baidu.com/',
          }, {
            dateAdded: 1560499065001,
            id: '33',
            index: 0,
            parentId: '29',
            title: '百度一下，你就知道',
            url: 'https://www.baidu.com/',
          }, {
            dateAdded: 1560499083297,
            id: '34',
            index: 1,
            parentId: '29',
            title: 'AcFun弹幕视频网 - 认真你就输啦 (・ω・)ノ- ( ゜- ゜)つロ',
            url: 'https://www.acfun.cn/',
          }, {
            dateAdded: 1560499118257,
            id: '35',
            index: 2,
            parentId: '29',
            title: '主页 | AMAX',
            url: 'http://www.amaxchina.com/',
          }],
          dateAdded: 1559292080192,
          dateGroupModified: 1560499118257,
          id: '29',
          index: 13,
          parentId: '1',
          title: 'tes',
        }, {
          dateAdded: 1560499118257,
          id: '35',
          index: 2,
          parentId: '29',
          title: '主页 | AMAX',
          url: 'http://www.amaxchina.com/',
        }],
        dateAdded: 1559292080192,
        dateGroupModified: 1560499118257,
        id: '29',
        index: 13,
        parentId: '1',
        title: 'tes',
      }, {
        dateAdded: 1560483277260,
        id: '31',
        index: 14,
        parentId: '1',
        title: '背景页',
        url: 'chrome-extension://lecldefeeiapdickaghamicjoafbbdba/background.html#',
      }],
      dateAdded: 1450340042983,
      dateGroupModified: 1560499065001,
      id: '1',
      index: 0,
      parentId: '0',
      title: '书签栏',
    }, {
    children: [], dateAdded: 1450340042983, id: '3', index: 1, parentId: '0', title: '其他书签',
  }];

    closeChildBook() {
      if (this.selectedChildItemArr.length === 0){
        this.isShowChild = false;
      } else {
        this.selectedChildItem = this.selectedChildItemArr.pop();
      }
    }

    openChild(child: any[]) {
      this.selectedChildItem = child;
      this.isShowChild = true;
    }

    changeChildBook(child: any[]) {
      this.selectedChildItemArr.push(this.selectedChildItem);
      this.selectedChildItem = child;
      this.isShowChild = true;
    }

    openBack() {
      window.open(chrome.extension.getURL('background.html'));
    }

    openWebpage(url: string) {
      window.open(url);
      // chrome.tabs.create({url: url, active: true})
    }

    // getBookmarksHTML(bookmarks: any[]) {
    //   let bookmarksHTML = '';
    //   for (let i = 0; i < bookmarks.length; i += 1) {
    //     if (bookmarks[i].children && bookmarks[i].children.length > 0) {
    //       bookmarksHTML += `<div class="folders ${bookmarks[i].isShow ? '' : 'not-show'}" data-id="${bookmarks[i].id}">${bookmarks[i].title}`;
    //       bookmarksHTML += this.getBookmarksHTML(bookmarks[i].children);
    //     } else if (bookmarks[i].url) {
    //       bookmarksHTML += `<a class="bookmark" href="${bookmarks[i].url}"><img alt="" src="chrome://favicon/${bookmarks[i].url}"/>${bookmarks[i].title}</a>`;
    //     } else {
    //       bookmarksHTML += `</div><div class="folders ${bookmarks[i].isShow ? '' : 'not-show'}" data-id="${bookmarks[i].id}">${bookmarks[i].title}`;
    //     }
    //   }
    //   bookmarksHTML += '</div>';
    //   return bookmarksHTML;
    // }

    // clickShow(e: any) {
    //   const { id } = e.target.dataset;
    //   console.log(id)
    //   this.setBookmarks(this.bookmarks, id);
    // }
    //
    // setBookmarks(bookmarks: any[], id: string) {
    //   for (let i = 0; i < bookmarks.length; i += 1) {
    //     if (bookmarks[i].children && bookmarks[i].children.length > 0) {
    //       this.setBookmarks(bookmarks[i].children, id);
    //     }
    //     if (bookmarks[i].id == id) {
    //       bookmarks[i].isShow = !bookmarks[i].isShow;
    //       if(arguments.length>2){
    //
    //         this.bookmarks[]
    //       }
    //
    //     }
    //   }
    // }


    // get bookmarksHTML() {
    //   console.log();
    //   return this.getBookmarksHTML(this.bookmarks);
    // }


    mounted() {
      // this.bookmarks = this.bookmarksTets;
      chrome.bookmarks.getTree((c: any) => {
        this.bookmarks = c[0].children;
        console.log(JSON.stringify(this.bookmarks));
      });
    }
}
</script>
<style lang="stylus">
  #popup {
    font-family 'Microsoft YaHei UI'
    width 480px
    max-height 600px

    .container {
      padding 10px
      .history {
        font-size 16px;
        margin-bottom 10px;
      }

      > input {
        font-size: 14px;
        box-sizing: border-box;
        padding: 12px 0px 12px 10px;
        background: transparent;
        border: 1px solid #aaa;
        outline: none;
        width 100%;
        margin-bottom 10px;
      }

      .bookmarks {
        font-size: 15px;
        line-height 42px;


        .title {
          height 30px;
          line-height 30px;
        }
        .clear-fix {
          clear: both;
        }

        .children {
          display flex;
          justify-content space-between;
          flex-flow: row wrap;


          .item {
            width: 225px;
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

          .folder {
            justify-content space-between
            padding 0 10px
            box-sizing border-box
          }
        }

      }
    }

  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:2px;
    background-color: #eee;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:1px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:1px;
    background:#999;
  }
</style>
