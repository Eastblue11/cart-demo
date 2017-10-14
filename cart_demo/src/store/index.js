import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 购物车商品列表（里面存储着（购物车商品对象---一会儿会设计一下对象的结构））
    cartProductList: []
}

const mutations = {
    // 添加购物车的逻辑
    ADD(state, item) {
        // 用来判断所添加的商品是否存在的标识
        let isExist = false

        // 存在的话，把当前购物车中的商品对象数量+1
        for (let tempItem of state.cartProductList) {
            if (tempItem.id == item.id) {
                // 把标识改成true
                isExist = true
                tempItem.count++
                break;
            }
        }

        // 如果不存在，则是新添加的商品
        if (!isExist) {
            // 设计购物车商品对象
            let cartProduct = {
                id: item.id,
                name: item.name,
                price: item.price,
                count: 1
            }
            state.cartProductList.push(cartProduct)
        }
    },
    // 购物车中某个商品数量增加的逻辑
    UP(state, id) {
        for (let item of state.cartProductList) {
            if (item.id == id) {
                item.count++
                break;
            }
        }
    },
    // 购物车中某个商品数量减少的逻辑
    DOWN(state, id) {
        for (let item of state.cartProductList) {
            if (item.id == id) {
                if (item.count > 1) {
                    item.count--
                }
                break;
            }
        }
    },
    // 删除购物车中某个商品的逻辑
    REMOVE(state, id) {
        for (let index in state.cartProductList) {
            if (state.cartProductList[index].id == id) {
                state.cartProductList.splice(index, 1)
                break;
            }
        }
    }

}

const actions = {
    add(context, item) {
        context.commit('ADD', item)
    },
    up({ commit }, id) {
        commit('UP', id)
    },
    down({ commit }, id) {
        commit('DOWN', id)
    },
    remove({ commit }, id) {
        commit('REMOVE', id)
    }
}

const getters = {
    // 获取商品总数
    totalCount(state) {
        let resultTotalCount = 0
        for (let item of state.cartProductList) {
            resultTotalCount += Number(item.count)
        }
        return resultTotalCount
    },
    // 获取商品总价格
    totalPrice(state) {
        let resultTotalPrice = 0
        for (let item of state.cartProductList) {
            resultTotalPrice += Number(item.count * item.price)
        }
        return resultTotalPrice
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})