import instance from "../utils/http"

// 获取轮播图的接口
export const getSwiperApi = () => {
    return instance({
        url: "/api1/getCarousels.do"
    })
}

// 获取店铺的接口
export const getAllShopsApi = () => {
    return instance({
        url: "/api1/getAllShops.do"
    })
}

// 获取注册的接口
export const getuserRegisterApi = (data) => {
    return instance({
        url: `/api1/userRegister.do?username=${data.username}&userpass=${data.userpass}&mobilenum=${data.mobilenum}&address=${data.address}&comment=${data.comment}`
    })
}

// 获取登录的接口
export const getuserLoginApi = (data) => {
    return instance({
        url: `/api1/userLogin.do?username=${data.username}&userpass=${data.userpass}`
    })
}

// 获取菜单的接口
export const getFoodByShopApi = (id) => {
    return instance({
        url: `/api1/getFoodByShop.do?shop_id=${id}`
    })
}

// 获取店铺详情的接口
export const getShopByIdApi = (id) => {
    return instance({
        url: `/api1/getShopById.do?shop_id=${id}`
    })
}

// 获取菜谱详情的接口
export const getFoodByIdApi = (id) => {
    return instance({
        url: `/api1/getFoodById.do?food_id=${id}`
    })
}

// 添加购物车的接口
export const addCartApi = (data) => {
    return instance({
        url: `/api1/addCart.do?user_id=${data.userId}&food_id=${data.foodId}&num=1`
    })
}

// 获取购物车的接口
export const getMyCartByUserApi = (id) => {
    return instance({
        url: `/api1/getMyCartByUser.do?user_id=${id}`
    })
}

// 删除购物车的接口
export const deleteCartItemApi = (id) => {
    return instance({
        url: `/api1/deleteCartItem.do?item_id=${id}`
    })
}

// 直接购买的接口
export const insertOrderApi = (data) => {
    return instance({
        url: `/api1/insertOrder.do?user_id=${data.userId}&food_id=${data.foodId}&num=${data.num}&sum=${data.sum}&suggesttime=${data.suggesttime}&address_id=7`
    })
}

// 获取评论的接口
export const getAllCommentsByFoodApi = (id) => {
    return instance({
        url: `/api1/getAllCommentsByFood.do?food_id=${id}`
    })
}

// 从购物车购买的接口
export const insertOrder2Api = (data) => {
    return instance({
        url: `/api1/insertOrder2.do?user_id=${data.userId}&address_id=7&sum=${data.sum}&suggesttime=9:00-
        --12:00&items=${data.items}`
    })
}

// 获取下单数据的接口
export const getItemsFromCartApi = (id) => {
    return instance({
        url: `/api1/getItemsFromCart.do?items=${id}`
    })
}

// 获取用户数据的接口
export const getUserByIdApi = (id) => {
    return instance({
        url: `/api1/getUserById.do?user_id=${id}`
    })
}

// 获取订单的接口
export const getAllOrdersByUserApi = (id) => {
    return instance({
        url: `/api1/getAllOrdersByUser.do?user_id=${id}`
    })
}

// 添加评论的接口
export const insertCommentApi = (data) => {
    return instance({
        url: `/api1/insertComment.do?item_id=${data.itemId}&content=${data.content}`
    })
}

// 获取评论数据的接口
export const getAllCommentsByUserApi = (id) => {
    return instance({
        url: `/api1/getAllCommentsByUser.do?user_id=${id}`
    })
}

// 修改评论的接口
export const updateCommentApi = (data) => {
    return instance({
        url: `/api1/updateComment.do?item_id=${data.itemId}&content=${data.content}`
    })
}

// 删除评论数据的接口
export const deleteCommentrApi = (id) => {
    return instance({
        url: `/api1/deleteComment.do?item_id=${id}`
    })
}

// 查看收藏的接口
export const getAllUserCollectionApi = (data) => {
    return instance({
        url: `/api1/getAllUserCollection.do?user_id=${data.userId}&flag=${data.flag}`
    })
}

// 收藏店铺数据的接口
export const userCollectShopApi = (data) => {
    return instance({
        url: `/api1/userCollectShop.do?user_id=${data.userId}&shop_id=${data.shopId}`
    })
}

// 收藏菜谱数据的接口
export const userCollectFoodApi = (data) => {
    return instance({
        url: `/api1/userCollectFood.do?user_id=${data.userId}&food_id=${data.foodId}`
    })
}

// 判断收藏的接口
export const isCollectedApi = (data) => {
    return instance({
        url: `/api1/isCollected.do?user_id=${data.userId}&shop_food_id=${data.id}&flag=${data.flag}`
    })
}

// 搜索的接口
export const getFoodBySearchApi = (data) => {
    return instance({
        url: `/api1/getFoodBySearch.do?search=${data}`
    })
}