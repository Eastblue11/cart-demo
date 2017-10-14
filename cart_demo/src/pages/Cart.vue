<template>
<div class="container-fluid">
	<h2>你的购物车</h2>
	<div class="alert alert-warning" v-show="isShow == 0">
		这个购物车中没有任何商品
		<!-- <a href="#" class="alert-link" 点击这里返回购物></a> -->
		<!-- <a href="#" class="alert-link" 点击这里返回购物></a> -->
		<router-link to="/productList" class="alert-link">点击这里返回购物</router-link>
	</div>
	<div v-show="isShow > 0">
		<table class="table">
			<thead>
				<tr>
					<th>数量</th>
					<th>商品名称</th>
					<th class="text-right">单价</th>
					<th>小计</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in cartProductList" :key="item.id">
					<td class="text-center store-number">
						<div class="input-group">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default" 
								@click="down(item.id)">-</button>
						  </div>
						  <input type="number" class="form-control" v-model="item.count">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default" 
								@click="up(item.id)">+</button>
						  </div>
						</div>
					</td>
					<td class="text-left">{{ item.name }}</td>
					<td class="text-right">￥{{ item.price }}</td>
					<td class="text-right">{{ item.price * item.count }}</td>
					<td>
						<button class="btn btn-sm btn-warning" 
						@click="remove(item.id)">删除</button>
					</td>
				</tr>
				<!-- <tr>
					<td class="text-center store-number">
						<div class="input-group">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default">-</button>
						  </div>
						  <input type="number" class="form-control">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default">+</button>
						  </div>
						</div>
					</td>
					<td class="text-left">商品1</td>
					<td class="text-right">￥23</td>
					<td class="text-right">50</td>
					<td>
						<button class="btn btn-sm btn-warning">删除</button>
					</td>
				</tr> -->
			</tbody>
		</table>
	</div>
</div>
</template>
<script type="text/javascript">
export default {
	computed: {
		// 购物车商品列表
		cartProductList() {
			return this.$store.state.cartProductList	
		},
		isShow() {
			return this.$store.getters.totalCount
		}
	},
	methods: {
		// 购物车中某个商品数量增加的方法
		up(id) {
			this.$store.dispatch('up', id)
		},
		// 购物车中某个商品数量减少的方法
		down(id) {
			this.$store.dispatch('down', id)
		},
		// 删除购物车中商品的方法
		remove(id) {
			this.$store.dispatch('remove', id)
		}
	}
}
</script>
<style type="text/css">
.store-number{
	width: 20%;
}	
</style>
