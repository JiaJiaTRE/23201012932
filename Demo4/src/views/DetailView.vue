<template>
    <div class="box">

        <van-icon style="z-index: 999; margin: 10px" color="#fff" size="25" @click="gotolastPage" name="clear" />

        <img class="box-img" :src="getImg(foodList.pic)">
        <div class="box-data">
            <div>
                <span>￥</span><span>{{ foodList.price }}</span>
            </div>
            <div>
                <span>{{ foodList.foodname }}</span>
                <span>
                    <van-icon name="star-o" /><span>收藏</span>
                </span>
            </div>
            <div>
                1人份
            </div>
            <div>
                <span>月售10</span>
                <button>选规格</button>
            </div>
            <div class="box-details">
                <div>
                    <span>商品详情</span>
                </div>
                <div>
                    <span>掌柜描述：</span>
                    <span>{{ foodList.intro }}</span>
                </div>
                <div>
                    <span>套餐内容：</span>
                    <span>套餐</span>
                </div>
                <div>价格说明</div>
            </div>
        </div>

        <div class="box-comments">
            <div>
                <span>外卖评价</span>
                <span>(好评度100%)</span>
                <span>{{ num }}条评论</span>
            </div>
            <div v-for="value in comments" class="box-user">
                <div>
                    <img
                        src="https://s3plus.sankuai.com/v1/mss_00c90c47614241978d32cca9bc6e44a4/h5i/userpic_defalut.c741e924.png">
                    <div>{{ value.username }}</div>
                    <div>{{ value.order_time }}</div>
                </div>
                <div>{{ value.content }}</div>
            </div>

        </div>

        <div class="footer">
            <van-action-bar>
                <van-action-bar-icon icon="chat-o" color="#F8E34C" text="客服" to="/" />
                <van-action-bar-icon icon="shop-o" color="#F8E34C" text="购物车" to="/card" />
                <van-action-bar-icon :icon="[collected ? icon.name2 : icon.name1]" color="#F8E34C" text="收藏" @click="onCollent" />
                <van-action-bar-button type="warning" text="加入购物车" @click="onInser" />
                <van-action-bar-button type="danger" text="立即购买"
                    :to="{ path: '/buy1', query: { foodId: foodList.food_id } }" />
            </van-action-bar>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFoodByIdApi, addCartApi, getAllCommentsByFoodApi, isCollectedApi, userCollectFoodApi } from "../api/index.js"
import { useCounterStore } from '@/stores/counter';
import { showSuccessToast, showFailToast } from 'vant';

const userInfo = useCounterStore();

const route = useRoute();
const router = useRouter();

const foodList = ref([]);
const comments = ref([]);

const num  = ref(0);

const FoodById = async (e) => {
    const res = await getFoodByIdApi(e);
    foodList.value = res;
}

const icon = ref({
    name1: 'star-o',
    name2: 'star'
})

const collected = ref(false);

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const addCart = async (e) => {
    console.log('2')
    const res = await addCartApi(e);
    if (res.success === '0') {
        showFailToast('添加失败！')
    }
    if (res.success === '1') {
        showSuccessToast('添加成功！')
    }
}

const onInser = () => {
    console.log('1')
    addCart({
        userId: userInfo.userId,
        foodId: foodList.value.food_id
    })
}

const getAllCommentsByFood = async (e) => {
    const res = await getAllCommentsByFoodApi(e);
    comments.value.push(...res);
    num.value = comments.value.length;
}

const gotolastPage = () => {
    window.history.go(-1)
}

const userCollectFood = async (e) => {
    const res = await userCollectFoodApi(e);
    collected.value = !collected.value;
    console.log(res)
}

const isCollected = async (e) => {
    
    if (userInfo.userId === null || userInfo.userId === '') {
        showFailToast('请先登录！在收藏！');
        router.push({
            path: '/login'
        })
    } else {
        const res = await isCollectedApi(e);
        if (res.collected === '0') {
            collected.value = false;
        }
        if (res.collected === '1') {
            collected.value = true;
        }
    }

}

const onCollent = () => {
    console.log(userInfo.userId)
    console.log(route.query.foodId)
    userCollectFood({
        userId: userInfo.userId,
        foodId: route.query.foodId
    });
}

onMounted(() => {
    console.log(route.query.foodId);
    FoodById(route.query.foodId);
    getAllCommentsByFood(route.query.foodId);
    isCollected({
        userId: userInfo.userId,
        id: route.query.foodId,
        flag: 1
    });
})


</script>

<style scoped>
.box-img {
    width: 100%;
    height: 300px;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(1px);
    -webkit-filter: blur(1px);
    /* chrome, opera */
    -ms-filter: blur(1px);
    -moz-filter: blur(1px);
}

.box-data {
    position: absolute;
    width: 100%;
    top: 200px;
    height: 270px;
    background-color: #fcfcfc;
    z-index: 200;
    border-radius: 15px 15px 0 0;
}

.box-data>div {
    margin-top: 5px;
}

.box-data>div:nth-child(1) {
    margin-top: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #FF4A26;
    margin-left: 15px;
}

.box-data>div:nth-child(1)>span:nth-child(1) {
    font-size: 12px;
    color: #FF4A26;
}

.box-data>div:nth-child(2) {
    position: relative;
    margin-left: 15px;
}

.box-data>div:nth-child(2)>span:nth-child(1) {
    font-weight: bold;
    font-size: 20px;
}

.box-data>div:nth-child(2)>span:nth-child(2) {
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 12px;
}

.box-data>div:nth-child(2)>span:nth-child(2)>span {
    margin-left: 5px;
}

.box-data>div:nth-child(3) {
    font-size: 12px;
    width: 45px;
    text-align: center;
    border-radius: 3px;
    background-color: #eee;
    margin-left: 15px;
}

.box-data>div:nth-child(4) {
    font-size: 12px;
    color: #858687;
    margin-top: 8px;
    position: relative;
    margin-left: 15px;
    margin-bottom: 15px;
}

.box-data>div:nth-child(4)>button {
    position: absolute;
    border: none;
    right: 15px;
    padding: 2px 15px;
    color: #000;
    background-color: #F8E34C;
    border-radius: 5px;
    margin-top: -4px;
}

.box-details {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-top: 30px;
}

.box-details>div {
    margin-left: 15px;
    font-size: 12px;
    color: #858687;
}

.box-details>div:nth-child(1)>span {
    font-weight: bold;
    position: relative;
    top: 10px;
    border-bottom: 2px solid #F8E34C;
    padding-bottom: 3px;
    color: #000;
    font-size: 16px;
}

.box-details>div:nth-child(2) {
    margin-top: 10px;
}

.box-details>div:nth-child(2)>span:nth-child(2),
.box-details>div:nth-child(3)>span:nth-child(2) {
    margin-left: 10px;
    color: #000;
}

.box-comments {
    width: 100%;
    position: relative;
    top: 425px;
}

.box-comments>div:nth-child(1) {
    font-size: 16px;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 15px;
    position: relative;
}

.box-comments>div:nth-child(1)>span:nth-child(1) {
    font-weight: bold;
}

.box-comments>div:nth-child(1)>span:nth-child(2) {
    color: #858687;
    margin-left: 5px;
    font-size: 12px;
}

.box-comments>div:nth-child(1)>span:nth-child(3) {
    color: #858687;
    margin-left: 5px;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 6.5px;
}

.box-user>div {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    position: relative;
}

.box-user>div>img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.box-user>div>div:nth-child(2) {
    margin-left: 10px;
}

.box-user>div>div:nth-child(3) {
    color: #858687;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 5px;
}

.box-user>div:nth-child(2) {
    margin-top: -10px;
    margin-left: 65px;
}
</style>