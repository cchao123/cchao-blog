<template>
  <div class="art-wrap">
    <div class="art-flow">
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
            <div class="art-date">
              <i class="iconfont iconrili"></i>
              {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
              <template
                class="art-tag"
                v-if="item.frontmatter.tags"
              >
                <span v-for="tag in item.frontmatter.tags" @click="tagFillter(tag)">/ {{ tag }}</span>
              </template>
            </div>
            <div class="art-des" style="-webkit-box-orient: vertical">{{ item.frontmatter.description }}</div>
            <div class="art-read iconfont iconxiazai9"></div>
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
import UAParser from 'cchao-util/uaparser.js'
import Tags from "./Tags.vue";
import Classification from "./Classification.vue";
import Search from "./Search.vue";
import AboutMe from "./AboutMe.vue";
import Pagination from "./Pagination.vue";
import Categories from "./Categories.vue";
import Skeleton from "./Skeleton.vue";
import { formatTime } from "./../util/date.js";
import { resolveSidebarItems } from "./../util/util";
const uaparser$ = new UAParser()
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
    console.log('\n' + ' %c cchao https://github.com/2020807070/vuepress-theme-cchao ' + '\n', 'color: rgb(54, 72, 94); background: rgb(68, 182, 132); padding:5px 0; font-size:18px;');
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
  padding: $navbarHeight 0rem 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  min-height 86vh;
  display: flex;

  .art-flow {
    max-width: 880px;
    position: relative;
    flex: 1;
    width: 100%;
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
    padding 30px
    flex 1
    .art-tit {
      // @TODO 变量
      a {
        color #000
      }
    }
    .art-date {
      margin-bottom 10px
      color #8a92a9
    }
    .art-des {
      font-size 14px
      display -webkit-box
      -webkit-line-clamp 3
      overflow hidden
      color #062743
      line-height 16px
    }
    .art-read {
      position absolute  
      right 20px
      bottom 20px
    }
  }
}
@media (max-width: $MQNarrow) {
  .article-aside {
    display: none;
  }

  .art-wrap {
    margin-top: 0;
  }

  .art-flow {
    padding 10px
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

