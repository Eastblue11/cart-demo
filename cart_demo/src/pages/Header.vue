<template>
	<div class="container-fluid">
		<div class="navbar navbar-inverse">
			<!-- <a href="#" class="navbar-brand">商品</a> -->
			<router-link to="/productList" class="navbar-brand">商品</router-link>
			<div class="navbar-right">
				<div class="navbar-text">
					<b>你的购物车</b>
					{{ totalCount }} 件,￥{{ totalPrice }}
				</div>
				<!-- <a href="#" class="btn btn-default navbar-btn">checkout</a> -->
				<router-link to="/cart" class="btn btn-default navbar-btn">checkout</router-link>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	computed: {
		totalCount() {
			// this.$store.state.cartProductList
			return this.$store.getters.totalCount
		},
		totalPrice() {
			return this.$store.getters.totalPrice
		}
	}
}
</script>
<style>
.navbar-right{
	float: right !important;
	margin-right: 5px;
}
.navbar-text{
	margin-right: 10px;
}	
</style>
