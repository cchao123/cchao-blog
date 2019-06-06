<!-- 骨架屏 -->
<template>
  <div>
    <template v-for="item in 3">
      <div class="article-skeleton animated-background">
        <div class="background-masker padding pt30"></div>
        <div class="title">
          <div class="background-masker left"></div>
          <div class="center"></div>
          <div class="background-masker right"></div>
        </div>
        <div class="background-masker padding"></div>
        <div class="time">
          <div class="background-masker left"></div>
          <div class="center"></div>
          <div class="background-masker right"></div>
        </div>
        <div class="background-masker padding"></div>
        <div class="description-long">
          <div class="background-masker left"></div>
          <div class="center"></div>
          <div class="background-masker right"></div>
        </div>
        <div class="background-masker padding"></div>
        <div class="description-short">
          <div class="background-masker left"></div>
          <div class="center"></div>
          <div class="background-masker right"></div>
        </div>
        <div class="background-masker padding"></div>
      </div>
    </template>
  </div>
</template>


<style lang="stylus">
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.animated-background {
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  // f4f8fb
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
}

.article-skeleton {
  margin-bottom: 20px;

  .pt30 {
    padding-top: 25px;
  }

  .background-masker {
    background: #fff;
  }

  .padding {
    width: 100%;
    height: 20px;
  }

  .title {
    display: flex;
    width: 100%;
    height: 30px;

    .left {
      width: 30px;
    }

    .center {
      width: 10em;
    }

    .right {
      flex: 1;
    }
  }

  .time {
    display: flex;
    width: 100%;
    height: 20px;

    .left {
      width: 30px;
    }

    .center {
      width: 18em;
    }

    .right {
      flex: 1;
    }
  }

  .description-long {
    display: flex;
    width: 100%;
    height: 20px;

    .left {
      width: 30px;
    }

    .center {
      flex: 1;
    }

    .right {
      width: 30px;
    }
  }

  .description-short {
    display: flex;
    width: 100%;
    height: 20px;

    .left {
      width: 30px;
    }

    .center {
      width: 10em !important;
    }

    .right {
      flex: 1;
    }
  }
}
</style>