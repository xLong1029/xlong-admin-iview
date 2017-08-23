<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      	<router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  	name: 'app'
}
</script>

<style lang="less">
	.fl{
		float:left;
	}
	.fr{
		float:right;
	}
	.clearfix{
		clear:both;
	}
	.fade-enter-active,.fade-leave-active {
		transition: opacity .1s ease;
	}
	.fade-enter,.fade-leave-active {
		opacity: 0;
	}
</style>
