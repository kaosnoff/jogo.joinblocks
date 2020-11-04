<template>
  <div id="app">
		<nav>
			<div class="nav-wrapper">
				<div class="container">
					<a href="" class="brand-logo">
						Join Blocks!
					</a>
				</div>
			</div>
		</nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'join-blocks'
  }
</script>

<style lang="scss">
@import './assets/sass/materialize.scss';

html, body {
	font-size: 2vmin;
}
body {
	color: #fff;
	background:
		radial-gradient(
			ellipse at top left,
			rgba(0, 0, 0, 1) 40%,
			rgba(41, 41, 41, .9) 100%
		);
	height: 100vh;
	//padding: 60px 80px;
	width: 100%;
}
</style>
