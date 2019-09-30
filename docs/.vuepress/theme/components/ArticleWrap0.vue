<template>
  <div class="article-wrap">
    <div class="article-flow">
      <div class="article-flow-item-test">
        <div class="left">
          <div class="box"></div>
        </div>
        <div class="right">
        </div>
      </div>
      <div class="article-flow-item-test">
        <div class="left" style="background-image: url(https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=777242464,306041244&fm=173&app=25&f=JPEG?w=640&h=320&s=DCC9C20B1A2008909605ECDC0100C0B3)">
          <div class="box"></div>
        </div>
        <div class="right">
        </div>
      </div>
      <div class="article-flow-item-test">
        <div class="left" style="background-image: url(http://cchao.123hao123.top/%E6%9C%AA%E6%A0%87%E9%A2%98-4.png)">
          <div class="box"></div>
        </div>
        <div class="right">
        </div>
      </div>
    </div>
      <!-- 龙骨屏 -->
      <skeleton v-if="currentPost.length === 0 && this.$page.path === '/' "/>
      <!-- 文章列表 -->
      <transition-group appear tag="div" v-else class="article-flow-item" v-for="(item, ind) in currentPost">
        <div :key="item.title" :style="`transition-delay: ${(ind + 1) * 0.1}s`">
          <div v-if="item.frontmatter.coverMap" class="article-coverMap" :style="{backgroundImage: `url(${item.frontmatter.coverMap})`}"></div>
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
      <!-- 标签分类 -->
      <Tags ref="Tags" :tags="tags" @tag-fillter="tagFillter" v-if="tagShow"/>
      <!-- 导航 -->
      <Categories :categories="sidebarItems"/>
    </div>
  </div>
</template>

<script>
import Tags from "./Tags.vue";
import Search from "./Search.vue";
import AboutMe from "./AboutMe.vue";
import Pagination from "./Pagination.vue";
import Categories from "./Categories.vue";
import Skeleton from "./Skeleton.vue";
import { formatTime } from "./../util/date.js";
import { resolveSidebarItems } from "./../util/util";

export default {
  components: {
    Tags,
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
      currentPage: 1,
      pageSize: 3
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
  display: flex;

  .article-flow {
    max-width: 880px;
    position: relative;
    flex: 1;
    width: 100%;

    .article-flow-item {
      overflow: hidden;

      &:hover {
        .article-coverMap {
          // transform: scale(1.005);
          // filter: blur(1px);
        }
      }
    }

    .article-coverMap {
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
      box-shadow: 5px 5px 10px rgb(224, 246, 249);

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

  .article-coverMap {
    border-radius: 0px !important;
  }

  .article-item {
    border-radius: 0px !important;
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
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  height: 200px;

  &:hover {
    .left {
      width: 50%;
    }
  }

  .left {
    // h5 不显示
    position: relative;
    transition: 0.3s;
    width: 250px;
    width: 40%;
    height: 100%;
    background-image: url('http://cchao.123hao123.top/images/eventloop.webp'); // cchao.123hao123.top/images/eventloop.webp)
    background-size: auto 230px;
    background-position: center center;
    .box {
      position: absolute;
      right: 0;
      width: 0;
      height: 0;
      border-top: 100px solid transparent;
      border-right: 30px solid #fff;
      border-bottom: 100px solid #fff;
      border-left: 30px solid transparent;
    }
  }

  .right {
    flex: 1;
    background: #fff;
    .article-item {
      padding-right 0
    }
  }
}
</style>