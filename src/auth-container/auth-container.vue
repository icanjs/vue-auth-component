<template>
<div class='vue-auth-component'>
  <div class='auth-ui-container'>
    <slot></slot>
		
  </div>
</div>
</template>

<script>
export default {
	name: 'auth-container'
}
</script>

<style lang="less">
div.vue-auth-component {
	display: block;
	color: #4A4A4A;
	width: 100%;
	.bp-mobile-medium({
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	});

	a {
		text-decoration: none;
	}

	div.auth-ui-container {
		padding-bottom: 11px;
		background: white;
		.bp-mobile-medium({
			-webkit-box-shadow: 0px 0px 24px 0px rgba(110,110,110,0.75);
			-moz-box-shadow: 0px 0px 24px 0px rgba(110,110,110,0.75);
			box-shadow: 0px 0px 24px 0px rgba(110,110,110,0.75);
			width: 290px;
		});
	}
}

.auth-branding {
	padding: 30px 0;
	text-align: center;
}

.auth-error {
	text-align: center;
	background: #FFDCDC;
	border: 1px solid #FF0000;
	font-weight: 500;
	margin: 0 15px;
	padding: 4px;
	font-size: 14px;
	color: #FF0A0A;
}

/* MEDIUM MOBILE DEVICES ~375px+ */
.bp-mobile-medium(@rules) {
	@media only screen and (min-width: 375px) { @rules(); }
}

/* LARGE MOBILE DEVICES ~425px+ */
.bp-mobile-large(@rules) {
	@media only screen and (min-width: 425px) { @rules(); }
}

/* TABLET & SMALLER LAPTOPS ~768px+ */
.bp-tablet(@rules) {
  @media only screen and (min-width: 768px) { @rules(); }
}

/* DESKTOP ~1030px+ */
.bp-desktop(@rules) {
  @media only screen and (min-width: 1030px) { @rules(); }
}

/* LARGE VIEWING SIZE ~1240px+ */
.bp-large-screen(@rules) {
  @media only screen and (min-width: 1240px) { @rules(); }
}
</style>