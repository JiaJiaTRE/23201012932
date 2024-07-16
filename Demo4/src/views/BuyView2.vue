<template>
    <div class="box">
        <van-icon name="cross" style="z-index: 999; margin: 10px" color="#fff" @click="gotolastPage" />
        <div class="box-title">
            确认订单
        </div>

        <div class="box-body">
            <div class="box-data">
                <div>
                    <div>
                        <div>外卖配送</div>
                    </div>
                    <div>到店自取</div>
                </div>
                <div>
                    大连东软信息学院（软件园校区）
                    <span class="iconfont icon-icon-test41"></span>
                </div>
                <div>
                    <span>{{ userInfo.userId }}先生</span>
                    <span>185****5684</span>
                </div>
                <div>
                    <div>
                        <span>立即配送</span>
                        <span>预计{{ time }}送达</span>
                        <span id="yellow-icon" class="iconfont icon-icon-test51" style="color: #000;"></span>
                    </div>
                    <div>
                        <span>预约配送</span>
                        <span>选择时间</span>
                    </div>
                </div>
                <div>
                    <svg t="1720149264127" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2140" xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="13" height="13">
                        <path
                            d="M576 203.5v617.1L286.5 663.7c-9.4-5.1-19.8-7.7-30.5-7.7H80c-8.8 0-16-7.2-16-16V384c0-8.8 7.2-16 16-16h176c10.6 0 21.1-2.7 30.5-7.7L576 203.5M239.8 304H64c-35.3 0-64 28.7-64 64v288c0 35.3 28.7 64 64 64h175.8c10.6 0 21.1 2.7 30.5 7.7l322.5 174.7c21.3 11.5 47.2-3.9 47.2-28.1V149.7c0-24.2-25.9-39.7-47.2-28.1L270.3 296.3c-9.4 5-19.9 7.7-30.5 7.7zM864 512c0 92.2-48.8 173-121.9 218.1-2.7 1.6-6.1-0.3-6.1-3.4v-69.8c0-1.1 0.5-2.2 1.3-2.9 2.2-2 4.3-4.1 6.5-6.2C780 611.5 800 563.3 800 512c0-51.3-20-99.5-56.2-135.8-2.1-2.1-4.3-4.2-6.5-6.2-0.8-0.8-1.3-1.8-1.3-2.9v-69.8c0-3.1 3.4-5.1 6.1-3.4C815.2 339 864 419.8 864 512z"
                            p-id="2141" fill="#A2765D">
                        </path>
                    </svg>
                    <div>点餐请适量，环保又健康</div>
                </div>
            </div>

            <div class="food" v-for="value in data.foods" :key="value.item_id">
                <div>
                    <img class="box-img" :src="getImg(value.pic)">
                    <div class="foods-title">
                        <div>
                            <span>{{ value.foodname }}</span>
                            <span>￥{{ value.price }}</span>
                        </div>
                        <div>
                            <span class="foods-num">x{{ value.num }}</span>
                        </div>
                    </div>
                </div>

                <div class="foods-data">
                    <div>
                        <span>打包费</span>
                        <span>￥{{ packing }}</span>
                    </div>
                    <div>
                        <span>用户配送费</span>
                        <span>免配送费</span>
                    </div>
                    <div>
                        <span>商家代金券</span>
                        <span>-￥{{ certificate }}</span>
                    </div>
                </div>
                
            </div>

            <div class="foods-sum">
                <div>总价</div>
                <div><span>￥</span>{{ route.query.sum }}</div>
            </div>
            <div class="footer">
                <button @click="onsubmit()">提交订单</button>
            </div>
    
        </div>

       
    </div>
    
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { getItemsFromCartApi, insertOrder2Api } from "../api/index.js"
import { showSuccessToast, showFailToast } from 'vant';

const route = useRoute()
const router = useRouter()

const userInfo = useCounterStore()

const data = reactive({
    num: 1,
    foods: []
})

const packing = ref(5)

const certificate = ref(5)

const addMinute1 = new Date(new Date().setMinutes(new Date().getMinutes() + 30));
const addMinute2 = new Date(new Date().setMinutes(new Date().getMinutes() + 50));

const time = addMinute1.getHours() + ':' + addMinute1.getMinutes() + '-' + addMinute2.getHours() + ':' + addMinute2.getMinutes();

const getItemsFromCart = async (e) => {
    const res = await getItemsFromCartApi(e);
    data.foods.push(...res)
}

const insertOrder = async (e) => {
    const res = await insertOrder2Api(e);
    if (res.success === '0') {
        showFailToast('购买失败！')
    }
    else {
        showSuccessToast('购买成功！')
    }
}

const onsubmit = () => {
    insertOrder({
        userId: userInfo.userId,
        items: route.query.itemId,
        sum: route.query.sum,
        suggesttime: time.value
    })
}

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const gotolastPage = () => {
    window.history.go(-1)
}

onMounted(() => {
    getItemsFromCart(route.query.itemId);
})

</script>

<style scoped>
.box {
    width: 100%;
    height: 100px;
    background-color: #2C2E30;
}

.box-title {
    text-align: center;
    color: #fff;
}

.box-body {
    width: 100%;
    background-color: #fcfcfc;
    border-radius: 30px 30px 0 0;
}

.box-data {
    width: 100%;
    height: 250px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 30px 30px 10px 10px;
}

.box-data>div:nth-child(1) {
    width: 100%;
    display: flex;
}

.box-data>div:nth-child(1)>div {
    height: 50px;
    width: 50%;
    line-height: 50px;
    text-align: center;
    background-color: #fcfcfc;
    border-radius: 30px 0 0 0;
}

.box-data>div:nth-child(1)>div>div {
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    border-radius: 30px 30px 0 0;
    background-color: #fff;
}

.box-data>div:nth-child(1)>div:nth-child(2) {
    border-radius: 0 30px 0 30px;
    background-color: #fcfcfc;
}

.box-data>div:nth-child(2) {
    margin-left: 15px;
    margin-top: 15px;
    font-weight: bold;
    font-size: 20px;
    position: relative;
}

.box-data>div:nth-child(2)>span {
    position: absolute;
    right: 15px;
    top: 5px;
}

.box-data>div:nth-child(3) {
    margin-left: 15px;
    color: #858687;
    font-size: 14px;
}

.box-data>div:nth-child(3)>span {
    margin-right: 10px;
}

.box-data>div:nth-child(4) {
    margin-left: 15px;
    font-size: 14px;
    margin-right: 15px;
}

.box-data>div:nth-child(4)>div {
    display: flex;
    margin-top: 10px;
    position: relative;
}

.box-data>div:nth-child(4)>div:nth-child(1) {
    border: 1px solid #F8E34C;
    padding: 5px 10px;
    border-radius: 10px;
    height: 35px;
    line-height: 26px;
    background-color: rgba(248, 227, 76, .1);
    color: #EE7F31;
    font-size: 12px;
}

.box-data>div:nth-child(4)>div:nth-child(1)>span:nth-child(1) {
    margin-right: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
}

#yellow-icon {
    width: 13px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    background-color: #F8E34C;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 10px 0 10px;
}

.box-data>div:nth-child(4)>div:nth-child(2) {
    border: 1px solid #EDEDED;
    padding: 5px 10px;
    border-radius: 10px;
    height: 35px;
    line-height: 26px;
    font-size: 12px;
}

.box-data>div:nth-child(4)>div:nth-child(2)>span:nth-child(1) {
    margin-right: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
}

.box-data>div:nth-child(5) {
    height: 35px;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    color: #A2765D;
    background-color: #F3F3F3;
    font-size: 12px;
    border-radius: 0 0 10px 10px;
    position: relative;
    bottom: 0;
    line-height: 35px;
}

.box-data>div:nth-child(5)>svg {
    margin-left: 15px;
    margin-top: 11px;
    margin-right: 5px;
}

.food {
    width: 100%;
    background-color: #fff;
    margin-top: 15px;
    border-radius: 10px;
}

.food>div {
    margin-left: 15px;
}

.food>div:nth-child(1) {
    display: flex;
}

.box-img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-top: 15px;
}

.foods-title {
    margin-left: 15px;
    margin-top: 22px;
}

.foods-title>div:nth-child(1)>span {
    font-weight: bold;
}


.foods-title>div:nth-child(1)>span:nth-child(2) {
    position: absolute;
    right: 15px;
}

.foods-title>div:nth-child(2) {
    display: flex;
}

.foods-num {
    font-weight: bold;
    color: #EE7F31;
}

.foods-data {
    font-size: 14px;
    margin-right: 15px;
}

.foods-data>div {
    display: flex;
    justify-content: space-between;
}

.foods-sum {
    margin-top: 10px;
    margin-right: 15px;
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
}

.foods-sum>div:nth-child(1) {
    margin-top: 12px;
}

.foods-sum>div:nth-child(2) {
    font-size: 25px;
}

.foods-sum span {
    font-size: 14px;
}

.footer {
    position: absolute;
    height: 60px;
    right: 15px
}

.footer>button {
    border: none;
    background-color: #F8E34C;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    border-radius: 15px;
    text-align: center;
    height: 40px;
    width: 100px;
    margin-top: 10px;
}
</style>