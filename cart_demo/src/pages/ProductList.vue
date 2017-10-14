<template>
	<div class="container-fluid">
		<div class="panel panel-default row">
			<div class="col-xs-3">
				<a class="btn btn-block btn-default btn-lg" href="###" 
				 :class="{'btn-primary': categoryType == 'all'}" 
				 @click="changeCategoryType('all')">所有商品</a>
				<!--  btn-primary -->
				<a class="btn btn-block btn-default btn-lg" 
                    href="###" 
					v-for="(item, index) in categoryBtnList" 
					:key="item.id" 
					:class="{'btn-primary': categoryType == item}" 
					@click="changeCategoryType(item)">分类 {{ item }}</a>
			</div>
			<div class="col-xs-8">
				<div class="well" 
					v-for="(item, index) in nowPageProductList" 
					:key="item.id">
					<h3>
						<strong>{{ item.name }}</strong>
						<span class="pull-right label label-primary">￥{{ item.price }}</span>
					</h3>
					<div class="description">
						<span class="lead">{{ item.text }}</span>
						<button class="btn btn-success pull-right" 
						@click="add(item)">添加到购物车</button>
					</div>
				</div>
				<div class="pull-right btn-group">
					<!-- btn-primary -->
					<a class="btn btn-default" 
						v-for="(item, index) in pageBtnList" 
						:key="item.id" 
						@click="activePageBtnIndex = index" 
						:class="{'btn-primary': index == activePageBtnIndex}">
						{{ index + 1 }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">

export default {
	created() {
		// 获取原始数据列表
		this.axios.get('http://localhost:4001/getProductList')
			.then(res => {
				console.log(res)
				this.productList = res.data;
			}, err => {
				console.log(err);
			})
	},
   data() {
	   return {
		   // 原始商品列表
			productList: [],
			// 分类类型
			categoryType: 'all',
			// 每页显示条目（产品经理定的）
			pageSize: 2,
			// 当前分页按钮点击的索引
			activePageBtnIndex: 0
			
	   }
   },
   computed: {
	   // 分类按钮列表(存储的是分类值1、2、3)
	   categoryBtnList() {
		   var resultArr = [];
		   for (var item of this.productList) {
			   if (resultArr.indexOf(item.category) == -1) {
				   resultArr.push(item.category);
			   }
		   }
		   return resultArr;
	   },
	   // 根据点击不同分类返回的当前分类下的数据列表
	   nowCategoryProductList() {
		   if (this.categoryType == 'all') {
			   return this.productList;
		   }
		   return this.productList.filter(item => this.categoryType == item.category);
	   },
	   // 当前分类下的分页按钮个数列表
	   pageBtnList() {
		   return Math.ceil(this.nowCategoryProductList.length / this.pageSize);
	   },
	   // 根据点击不同分页按钮返回当前分类下的某一页的数据列表
	   nowPageProductList() {
		   // 起始下标
		   var startIndex = this.activePageBtnIndex * this.pageSize;
		   var endIndex = startIndex + this.pageSize;
		   return this.nowCategoryProductList.slice(startIndex, endIndex);
	   }
   },
   methods: {
	   // 切换分类的方法（还要处理没次切换分类后，初始化当前activePageBtn的值为0）
		changeCategoryType(type) {
			this.categoryType = type;
			//
			this.activePageBtnIndex = 0;
		},
		// 添加到购物车的方法
		add(item) {
			// 调用actions里的add
			this.$store.dispatch('add', item)
		}
   }
}

</script>


<style type="text/css">
.well{
	overflow: hidden;
}
.lead{
	float: left;
	width: 70%;
	text-align: left;
}
</style>
