<template>
	<div class="g-breadcrumb">
		<!-- 面包屑 -->
		<Breadcrumb>
		  <Breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :href="item.path">{{ item.name }}</Breadcrumb-item>
		</Breadcrumb>
  </div>
</template>

<script>
	// Vuex
    import { mapGetters } from 'vuex'
	export default {
		computed: {
            ...mapGetters([ 'breadcrumb' ]),
        },
	}
</script>

<style>
</style>
