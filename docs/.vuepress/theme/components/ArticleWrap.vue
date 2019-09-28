<template>
  <div class="article-wrap">
    <div class="article-flow">
      <!-- 龙骨屏 -->
      <skeleton v-if="currentPost.length === 0 && this.$page.path === '/' "/>
      <!-- 文章列表 -->
      <transition-group appear tag="article" v-else class="article-flow-item" v-for="(item, ind) in currentPost">
        <!-- 手机端用这个 -->
        <!-- <div :key="item" :style="`transition-delay: ${(ind + 1) * 0.1}s`">
          <div v-if="item.frontmatter.headimg" class="article-headimg" :style="{backgroundImage: `url(${item.frontmatter.headimg})`}"></div>
          <div class="article-item">
            <h3 class="article-title">
              <router-link :to="item.frontmatter.link || item.path">{{ item.title }}</router-link>
            </h3>
            <div class="article-date">
              <i class="iconfont iconrili"></i>
              {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
              <template
                class="article-tag"
                v-if="item.frontmatter.tags"
              >
                <span v-for="tag in item.frontmatter.tags" @click="tagFillter(tag)">/ {{ tag }}</span>
              </template>
            </div>
            <div class="article-description">{{ item.frontmatter.description }}</div>
            <div class="article-more" @click="goDetail(item)">READ MORE</div>
          </div>
        </div> -->
        
        <!-- <div class="article-flow-item-test" :key="item" :style="`transition-delay: ${(ind + 1) * 0.1}s`">
          <div class="cover-map" :style="{backgroundImage: `url(${item.frontmatter.headimg})`}"><div class="cover-map-mask"></div></div>
          <div class="right">
            <div class="article-item" style="padding-bottom: 0">
              <h3 class="article-title">
                <router-link :to="item.frontmatter.link || item.path">{{ item.title }}</router-link>
              </h3>
              <div class="article-date">
                <i class="iconfont iconrili"></i>
                {{ item.frontmatter.date || item.lastUpdated | formatTime('yyyy-MM-dd') }}
                <template
                  class="article-tag"
                  v-if="item.frontmatter.tags"
                >
                  <span v-for="tag in item.frontmatter.tags" @click="tagFillter(tag)">/ {{ tag }}</span>
                </template>
              </div>
              <div class="article-description">{{ item.frontmatter.description }}</div>
            </div>
          </div>
        </div> -->


        <article class="article-flow-item-3" :key="item" :style="`transition-delay: ${(ind + 1) * 0.1}s`">
          <div class="art-bg" :style="{backgroundImage: `url(${item.frontmatter.headimg})`}">

          </div>
          
        </article>
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

.article-wrap {
  padding: $navbarHeight 0rem 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  min-height 86vh;
  display: flex;

  .article-flow {
    max-width: 880px;
    position: relative;
    flex: 1;
    width: 100%;

    .article-flow-item {
      overflow: hidden;

      &:hover {
        .article-headimg {
          // transform: scale(1.005);
          // filter: blur(1px);
        }
      }
    }

    .article-headimg {
      transition: 1s;
      background-color: #959dae;
      widht: 100%;
      height: 15rem;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-size: cover;
      background-position: center center;
    }

    .article-item {
      background: #fff;
      margin-bottom: 20px;
      padding: 20px 30px;
      border-radius: 8px;
      transition: 0.5s;
      // box-shadow: 5px 5px 10px rgb(224, 246, 249);

      .article-title {
        a {
          transition: 0.5s;
          font-size: 20px;
          color: #262626;

          &:hover {
            color: #b09dae;
          }
        }
      }
    }
  }

  .article-aside {
    margin-bottom: 20px;
    width: 300px;
    margin-left: 20px;
  }

  .article-date {
    font-size: 14px;
    color: #565656;
    cursor: pointer;
  }

  .article-description {
    line-height: 30px;
    margin: 16px 0;
    font-size: 16px;
    color: #393939;
    color: #656565;
    font-size: 14px;
    // color: #976666;
  }

  .article-more {
    font-size: 12px;
    cursor: pointer;
    transition: 0.5s;
    border: 1px solid #959dae;
    color: #959dae;
    padding: 2px 0;
    width: 7em;
    text-align: center;

    &:hover {
      background: #959dae;
      color: #fff;
    }
  }
}

@media (max-width: $MQNarrow) {
  .article-aside {
    display: none;
  }

  .article-wrap {
    margin-top: 0;
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

.article-flow-item-test {
  overflow hidden
  margin-bottom: 30px;
  display: flex;
  width: 100%;
  height: 230px;
  // .article-title {
  //   position relative
  //   left -10px
  // }
  // .article-date {
  //   position relative
  //   left -25px
  // }
  .article-description {
    color: gray;
    font-size: 12px;
    padding-top: 10px;
    height: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &:hover {
    .cover-map {
      width: 350px;
    }
  }

  .cover-map {
    // h5 不显示
    position: relative;
    transition: 0.3s;
    width: 250px;
    width: 30%;
    height: 100%;
    background-size: auto 350px;
    background-position: center center;
    background-color #eee
    .cover-map-mask {
      position: absolute;
      right: 0;
      width: 0;
      height: 0;
      border-top: 115px solid transparent;
      border-right: 20px solid #fff;
      border-bottom: 115px solid #fff;
      border-left: 20px solid transparent;
    }
  }

  .right {
    flex: 1;
    background: #fff;
  }
}


.article-flow-item-3 {
  width 100%
  height 300px
  background #fff
  margin-bottom 20px
  .art-bg {
    width 100%
    height 100%
    background-size cover
  }
}
</style>