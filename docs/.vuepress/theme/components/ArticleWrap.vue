<template>
  <div class="art-wrap">
    <div :class="isSidebarOpen ? 'art-flow push' : 'art-flow'">
      <!-- 龙骨屏 -->
      <skeleton v-if="currentPost.length === 0 && this.$page.path === '/' "/>
      <!-- 文章列表 -->
      <transition-group appear tag="article" v-else class="art-flow-item" v-for="(item, ind) in currentPost">
        <!-- 手机端用这个 -->
        <div :key="item" class="art-content" :style="`transition-delay: ${(ind + 1) * 0.08}s`">
          <div class="art-coverMap" v-if="item.frontmatter.coverMap" :style="{backgroundImage: `url(${item.frontmatter.coverMap})`}"></div>
          <div class="art-info">
            <h3 class="art-tit">
              <router-link :to="item.frontmatter.link || item.path">{{ item.title }}</router-link>
            </h3>
            <div class="art-des" style="-webkit-box-orient: vertical">{{ item.frontmatter.description }}</div>
            <div class="art-more" :style="!item.frontmatter.coverMap ? 'position: static;margin-top: 10px' : '' ">
              <div class="art-date">
                {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
                <!-- <i class="iconfont iconrili"></i>
                {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
                <template v-if="item.frontmatter.tags">
                  <span class="art-tag" v-for="tag in item.frontmatter.tags" @click="tagFillter(tag)">/ {{ tag }}</span>
                </template> -->
              </div>
              <div class="art-read iconfont iconxiazai9"></div>
            </div>
          </div>
        </div>
      </transition-group>
      <!-- 文章主题 -->
      <slot name="content"></slot>
      <!-- 分页器 -->
      <Pagination
        v-if="posts.length"
        :currentPage="currentPage"
        :total="total"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 侧边栏 -->
    <div class="article-aside" v-show="!this.$page.frontmatter.isAsideHide">
      <!-- 关于作者 -->
      <AboutMe v-show="!$page.frontmatter.hideInfo"/>
      <!-- 搜索 -->
      <Search/>
      <!-- 标签 -->
      <Tags ref="Tags" :tags="tags" @tag-fillter="tagFillter" v-if="tagShow" />
      <!-- 分类 -->
      <Classification v-if="tagShow" />
      <!-- 导航 -->
      <Categories :categories="sidebarItems"/>
    </div>
  </div>
</template>

<script>
// import UAParser from 'cchao-util/uaparser.js'
import Tags from "./Tags.vue";
import Classification from "./Classification.vue";
import Search from "./Search.vue";
import AboutMe from "./AboutMe.vue";
import Pagination from "./Pagination.vue";
import Categories from "./Categories.vue";
import Skeleton from "./Skeleton.vue";
import { formatTime } from "./../util/date.js";
import { resolveSidebarItems } from "./../util/util";
import { $BUS } from "./../util/bus.js"
// const uaparser$ = new UAParser()
export default {
  components: {
    Tags,
    Classification,
    Search,
    AboutMe,
    Categories,
    Pagination,
    Skeleton
  },
  filters: {
    formatTime(time, format) {
      return formatTime(time, format);
    }
  },
  data() {
    return {
      isFirst: true,
      isSidebarOpen: false,
      tags: [],
      postsArr: [], // 文章列表
      currentPage: 1, // 当前页码
      pageSize: 3 // 显示文章数目
    };
  },
  computed: {
    tagShow() {
      return this.$route.path === "/";
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      );
    },
    total() {
      return this.postsArr.length;
    },
    currentPost() {
      return this.postsArr.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    this.getPosts();
    $BUS.$on('is-sidebar-open', (isSidebarOpen) => {
      this.isSidebarOpen = isSidebarOpen
    })
    console.log("\n %c vuepress-theme-cchao %chttps://123hao123.cn \n\n","color: #fff; background-image: linear-gradient(90deg, rgb(50, 71, 94) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;","background-image: linear-gradient(90deg, rgb(68, 185, 132) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");
  },
  methods: {
    goDetail(item) {
      var path = item.frontmatter.link || item.path;
      this.$router.push(path);
    },
    // 标签筛选
    tagFillter(tagItem) {
      this.$refs.Tags.tagItem = tagItem;
      this.currentPage = 1;
      this.postsArr = [];
      if (!tagItem) {
        this.posts.map((postItem, ind) => {
          if (/posts/.test(postItem.path)) {
            this.postsArr.push(postItem);
          }
        });
        return false;
      }
      this.postsArr = [];
      this.posts.map((postItem, ind) => {
        if (/posts/.test(postItem.path) && postItem.frontmatter.tags) {
          if (postItem.frontmatter.tags.indexOf(tagItem) != -1) {
            this.postsArr.push(postItem);
          }
        }
      });
      this.$emit("toast-show", this.postsArr.length);
    },
    // 收集文章并
    getPosts() {
      this.posts.map((postItem, ind) => {
        if (/posts/.test(postItem.path)) {
          // 收集标签
          if (postItem.frontmatter.tags) {
            postItem.frontmatter.tags.map(tagItem => {
              if (this.tags.indexOf(tagItem) == -1) this.tags.push(tagItem);
            });
          }
          this.postsArr.push(postItem);
          // TODO 添加一个排序 时间 or hot值
          // console.log(postItem.lastUpdated)
        }
      });
      if (!sessionStorage.getItem("postsNum")) {
        sessionStorage.setItem("postsNum", this.postsArr.length);
        sessionStorage.setItem("tagsNum", this.tags.length);
      }
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
    }
  }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';
.content {
  background: #fff;
  border-radius: 8px;
}

.art-wrap {
  overflow-x hidden
  padding: $navbarHeight 0rem 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  min-height 86vh;
  display: flex;

  .art-flow {
    // left 0;
    // width 880px;
    max-width: 880px;
    position: relative;
    flex: 1;
    transition .2s ease;
  }
  .push {
    transform translateX(262px)
  }

  .article-aside {
    // @TODO 变量$间隙
    margin-bottom: 25px;
    width: 300px;
    margin-left: 20px;
  }
}

.art-content {
  transition .3s
  &:hover {
    box-shadow 5px 5px 10px #c8e9ee
  }
}

.art-content {
  transition .3s
  padding 20px 20px
  position relative
  // overflow hidden
  box-shadow 5px 5px 10px #e0f6f9
  border-radius 5px
  background #fff
  margin-bottom 25px
  display flex
  .art-coverMap {
    box-shadow: 0px 10px 30px -10px rgba(45, 55, 86, 0.1);
    background-color #eee
    border-radius 5px
    // flex 600
    width 440px
    height 250px
    width 300px
    height 220px
    background-size cover
    background-position center center
  }
  .art-info {
    position relative
    padding 0 30px
    flex 1
    .art-tit {
      line-height 30px
      font-weight normal
      // @TODO 变量
      a {
        color #000
        &:first-letter {
          // font-size 26px
        }
      }
    }
    .art-date {
      // opacity 0
      color #8a92a9
      font-size 14px
    }
    .art-tag {

    }
    .art-des {
      font-size 16px
      display -webkit-box
      -webkit-line-clamp 4
      overflow hidden
      color rgba(0, 0, 0, .8)
      line-height 28px
      margin-top 20px
    }
    .art-more {
      width 100%
      position absolute
      bottom 0px
      display flex
      justify-content space-between
    }
    .art-read {
      position relative
      right 30px
      padding 5px
      transition 0.3s
      border-radius 50%
      &:hover {
        transform scale(1.2)
      }
    }
  }
}
@media (max-width: $MQNarrow) {
  .art-more {
    position static!important
  }
  .article-aside {
    display: none;
  }

  .art-wrap {
    margin-top: 0;
  }

  .art-flow {
    padding 10px
    width 90%
  }
  .art-content {
    .art-coverMap {
      width 100%
    }
    .art-info {
      padding 0
    }
    display block
  }
  .art-read {
    display none
  }
  .art-des {
    margin-bottom 10px!important  
  }
}

@media (max-width: $MQNarrow) and (min-width: $MQMobile) {
  .article-aside {
    display: none;
  }
}

.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-active, .v-leave-active {
  transition: all 0.6s ease;
}
</style>

