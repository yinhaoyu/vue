<template>
	<div id="app">
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
export default {
	name: 'app'
};
</script>
<style lang="scss">
@charset 'utf-8';
@import './common/global.scss', './common/animation.scss', './common/modal.scss', './common/reset.scss';
</style>
