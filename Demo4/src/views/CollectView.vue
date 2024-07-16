<template>
    <div class="box">
        <div class="box-header">
            <van-icon style="z-index: 999; margin: 10px" color="#000" @click="gotolastPage" name="arrow-left" />
            <span>我的收藏</span>
            <!-- <span>23201012932-刘佳怡</span> -->
        </div>
        <van-tabs v-model:active="arr[0].flag" sticky @click-tab.once="onClickTab">
            <van-tab v-for="value in arr" :key="value.flag" :title="value.title">
                <div v-if="value.flag === 0" class="box-body">
                    <div v-for="v in list.shops" :key="v.shop_id" class="box-data">
                        <img class="box-img" :src="getImg(v.pic)">
                        <div>
                            <div>{{ v.shopname }}</div>
                            <div>
                                <van-icon name="star" color="#EC6A2C" />
                                <span>4.9</span>
                                <span>月售1000+</span>
                            </div>
                            <div>
                                <span>起送￥13</span>
                                <span>配送约￥0.5</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else-if="value.flag === 1" class="box-body">
                    <div v-for="v in list.foods" :key="v.food_id" class="box-data">
                        <img class="box-img" :src="getImg(v.pic)">
                        <div>
                            <div>{{ v.foodname }}</div>
                            <div>
                                <van-icon name="star" color="#EC6A2C" />
                                <span>4.9</span>
                                <span>月售1000+</span>
                            </div>
                            <div>
                                <span>￥{{ v.price }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getAllUserCollectionApi } from "@/api";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const route = useRoute();
const router = useRouter();
const store = useCounterStore();

const arr = reactive([
    {
        flag: 0,
        title: '店铺',
    }, {
        flag: 1,
        title: '菜品',
    }
]);


const list = reactive({
    shops: [],
    foods: []
});

const num = list.shops.length;

const getAllUserCollection = async (data, flag = 0) => {
    const res = await getAllUserCollectionApi(data);
    if (flag === 0) {
        list.shops.push(...res);
        list.foods.splice(0);
    };
    if (flag === 1) {
        list.foods.push(...res);
        // list.shops.splice(0);
    };
};

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const onClickTab = e => {
    getAllUserCollection({
        userId: store.userId,
        flag: e.name
    }, e.name);
};

const gotolastPage = () => {
    window.history.go(-1)
}

onMounted(() => {
    getAllUserCollection({
        userId: store.userId,
        flag: 0
    });
});
</script>



<style scoped>
.box {
    width: 100%;
    height: calc(100vh);
    background-color: #FCFCFC;
    padding-bottom: 15px;
}

.box-header {
    width: 62%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.box-body {
    width: 100%;
    background-color: #fff;
    padding: 15px;
}

.box-body>div {
    display: flex;
    margin-bottom: 15px;
}

.box-img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-right: 15px;
}

.box-data {
    border-radius: 10px;
    color: #868686;
    font-size: 12px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .1);
    padding: 15px;
}

.box-data span {
    margin-right: 10px;
}

.box-data div {
    margin-top: 2px;
}

.box-data>div:nth-child(2)>div:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-top: 5px;
}

.box-data>div:nth-child(2)>div:nth-child(2)>span:nth-child(2) {
    font-weight: bold;
    color: #EC6A2C;
    margin-left: 2px;
}
</style>