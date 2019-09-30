<template>
  <div class="sidebar-button" @click="toggle">
    <i :class="isClose ? 'icon close' : 'icon'"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isClose: false
    }
  },
  methods: {
    toggle () {
      this.isClose = !this.isClose
      this.$emit('toggle-sidebar')
    }
  }
}
</script>


<style lang="stylus">
@import './../styles/config.styl'

.sidebar-button
  display flex
  justify-content center
  align-items center
  display none
  width 1.25rem
  height 1.25rem
  line-height 1.25rem
  position absolute
  padding 0.6rem
  top 0.6rem
  left 1rem
  
  .icon
    position: relative;
    top -5px
    display: inline-block;
    zoom: 1;
    width: 20px;
    height: 2px;
    text-indent: -55px;
    background: #000;
    transition: all .2s ease-out;
    transition: 0.2s;
    &::before, &::after  {
      content: '';
      width: 20px;
      height: 2px;
      background: #000;
      position: absolute;
      left: 0;
      -webkit-transition: 0.2s;
      -o-transition: 0.2s
    }
    &::before {
      top -7px
    }
    &::after {
      bottom -7px
    }

  .close {
    width 0
    &::before {
      height 5px
      top 0px!important
      transform: rotateZ(-45deg);
    }
    &::after {
      height 5px
      top 0px!important
      transform: rotateZ(45deg);
    }
  }
@media (max-width: $MQMobile)
  .sidebar-button
    display block


</style>
