<template>
    <div>
        <div class="header">

            <van-icon style="z-index: 999; margin: 10px" color="#ffffff" @click="gotolastPage" name="arrow-left" />

            <van-icon style="z-index: 999; margin: 10px; left: 78%;" color="#F8E34C" @click="onCollent"
                :name="[collected ? icon.name2 : icon.name1]" />

            <img src="https://p0.meituan.net/business/864434ec65804b0196cdaee28d2bb650126596.jpg@750w" alt="">
            <div class="box-bg"></div>

            <div class="header-box">
                <div>
                    <div>{{ shopList.shopname }}</div>
                    <img class="box-img" :src="getImg(shopList.pic)">
                </div>
                <div>
                    <van-icon name="star" color="#EC6A2C" />
                    <span>{{ shopList.level }}.0</span>
                    <span class="box-data-special">美团专送</span>
                    <span>配送约29分钟</span>
                    <span>月售 1000+</span>
                </div>
                <div>
                    <span>
                        <span>￥2</span>
                        <span>领</span>
                    </span>
                    <span>
                        <span>￥4</span>
                        <span>领</span>
                    </span>
                    <span>
                        <span>￥6</span>
                        <span>领</span>
                    </span>
                </div>
                <div>
                    <span>
                        <span>32减2</span>
                        <span>55减4</span>
                        <span>78减6</span>
                        <span>100减8</span>
                    </span>
                    <span>0.17折起</span>
                    <span>领2元券</span>
                    <span>领4元券</span>
                </div>
                <div>公告：{{ shopList.intro }}</div>
            </div>
        </div>
        <div class="tab">
            <div>
                <span>点菜</span>
                <span>评价</span>
                <span>商家</span>
            </div>
            <input type="text" placeholder="搜索">
        </div>
        <div class="foods">
            <foodList v-for="item in foodsList" @click="gotoDetail(item.food_id)" :key="item.id" :list="item">
            </foodList>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getShopByIdApi } from "../api/index.js"
import { getFoodByShopApi, userCollectShopApi, isCollectedApi } from "../api/index.js"
import foodList from "../components/FoodsList.vue"
import { useCounterStore } from '@/stores/counter.js';
import { showSuccessToast, showFailToast } from 'vant';

const userInfo = useCounterStore();
const route = useRoute();
const router = useRouter();

const shopList = ref([]);
const foodsList = ref([]);

const icon = ref({
    name1: 'star-o',
    name2: 'star'
})

const collected = ref(false);

const ShopById = async (e) => {
    const res = await getShopByIdApi(e);
    shopList.value = res;
}

const FoodByShop = async (e) => {
    const res = await getFoodByShopApi(e);
    foodsList.value.push(...res);
}

const userCollectShop = async (e) => {
    const res = await userCollectShopApi(e);
    collected.value = !collected.value;
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

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const gotoDetail = (e) => {
    router.push({
        path: '/detail',
        query: {
            foodId: e
        }
    })
}

const onCollent = () => {
    userCollectShop({
        userId: userInfo.userId,
        shopId: route.query.shopId
    });
}

const gotolastPage = () => {
    window.history.go(-1)
}

onMounted(() => {
    ShopById(route.query.shopId);
    FoodByShop(route.query.shopId);
    isCollected({
        userId: userInfo.userId,
        id: route.query.shopId,
        flag: 0
    });
})


</script>

<style scoped>
.header {
    width: 100%;
    height: 230px;
}

.box-bg {
    width: 100%;
    height: 150px;
    background: linear-gradient(rgba(34, 36, 38, 0.5), rgba(34, 36, 38, 0.5));
    z-index: 100;
    position: absolute;
    top: 0;
}

.header>img {
    width: 100%;
    height: 150px;
    filter: blur(2px);
    -webkit-filter: blur(2px);
    /* chrome, opera */
    -ms-filter: blur(2px);
    -moz-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
}

.header-box {
    position: absolute;
    width: 100%;
    top: 100px;
    background-color: #fcfcfc;
    z-index: 200;
    border-radius: 15px 15px 0 0;
}

.header-box>div {
    margin-left: 15px;
    font-size: 10.5px;
}

.header-box>div:nth-child(1) {
    position: relative;
    display: flex;
}

.header-box>div:nth-child(1)>div {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
}

.header-box>div:nth-child(1)>img {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    position: absolute;
    top: -30px;
    right: 20px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, .1);
}

.header-box>div:nth-child(2)>span:nth-child(2) {
    color: #EC6A2C;
    font-weight: bold;
    margin-left: 1px;
    margin-right: 5px;
}


.box-data-special {
    font-size: 10.5px;
    border: 1px solid #FF9240;
    color: #FF9240;
    padding: 1px 3px;
    border-radius: 5px;
    margin-right: 5px;
}

.header-box>div:nth-child(2)>span:nth-child(4),
.header-box>div:nth-child(2)>span:nth-child(5) {
    color: #9e9e9e;
    margin-right: 5px;
}

.header-box>div:nth-child(3) {
    margin-top: 5px;
}

.header-box>div:nth-child(3)>span {
    font-size: 12px;
    padding: 3px 13px;
    background-color: #ED6C54;
    color: #fff;
    margin-right: 5px;
    border-radius: 3px;
}

.header-box>div:nth-child(3)>span>span:nth-child(1) {
    padding-right: 3px;
    border-right: 1px solid #fff;
}

.header-box>div:nth-child(3)>span>span:nth-child(2) {
    padding-left: 3px;
}

.header-box>div:nth-child(4) {
    margin-top: 5px;
    color: #ED6C54;
}

.header-box>div:nth-child(4)>span {
    font-size: 10px;
    margin-right: 5px;
    border: 1px solid #ED6C54;
    padding: 2px 5px;
    border-radius: 3px;
}

.header-box>div:nth-child(4)>span:nth-child(1)>span {
    padding: 0 3px;
    border-right: 1px solid #ED6C54;
}

.header-box>div:nth-child(4)>span:nth-child(1)>span:nth-child(4) {
    border: none;
}

.header-box>div:nth-child(5) {
    margin-top: 5px;
    font-size: 12px;
    color: #9e9e9e;
}

.tab {
    background-color: #fcfcfc;
    display: flex;
    position: relative;
}

.tab>div {
    margin-top: 8px;
    margin-left: 15px;
}

.tab>div>span {
    margin-right: 20px;
    color: #9e9e9e;
}

.tab>div>span:nth-child(1) {
    color: #000;
    border-bottom: 2px solid #F8E34C;
    padding-bottom: 5px;
}

.tab>input {
    width: 50px;
    height: 28px;
    border: none;
    background-color: #eee;
    border-radius: 30px;
    text-align: center;
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: 5px;
}
</style>