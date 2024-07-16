<template>
    <div class="body">
        <div class="box-img">
            <img class="box-user-img" src="../assets/image/1.png">
            <div>{{ info.username }}</div>
        </div>
        <div class="box">
            <div :id="'list'+ value.id" @click="goto(value.to)" class="list" v-for="value in list">
                <div>
                    <img :src="showPic(value.icon)">
                    <span>{{ value.text }}</span>
                </div>
                <div>
                    <span class="iconfont icon-icon-test41"></span>
                </div>
            </div>
            <div class="list" @click="clear">
                <div>
                    <img src="../assets/image/tuichu.png">
                    <span>退出登录</span>
                </div>
                <div>
                    <span class="iconfont icon-icon-test41"></span>
                </div>
            </div>
            <div class="phone">客服电话：10109777</div>
            <div class="time">服务时间：9:00-23:00</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { getUserByIdApi } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const userInfo = useCounterStore();

const userId = userInfo.userId;

const info = ref([])

const list = ref([
    { id: 1, icon: "../assets/image/hongbao.png", text: "美团红包", to: "/" },
    { id: 2, icon: "../assets/image/quan.png", text: "商家代金券", to: "/" },
    { id: 3, icon: "../assets/image/dizhi.png", text: "收货地址", to: "/" },
    { id: 4, icon: "../assets/image/shoucang.png", text: "我的收藏", to: "/collect" },
    { id: 5, icon: "../assets/image/jisu.png", text: "极速支付", to: "/" },
    { id: 6, icon: "../assets/image/wenti.png", text: "常见问题", to: "/" },
    { id: 7, icon: "../assets/image/xieyi.png", text: "我的评论", to: "/comment" },
    { id: 8, icon: "../assets/image/yinsi.png", text: "隐私管理", to: "/" },
]);

// 图片路径
const showPic = (name) => {
    return new URL(name, import.meta.url).href;
};

const getUserById = async (e) => {
    const res = await getUserByIdApi(e);
    info.value = res;
}

const clear = () => {
    userInfo.clearId()
    router.push('/login')
}

const goto = (e) => {
    router.push(e)
}

onMounted(() => {
    getUserById(userId)
})
</script>

<style scoped>
.body {
    width: 100%;
    height: calc(100vh);
    background-color: #FCFCFC;
}

.box {
    margin-top: 5px;
    height: 500px;
    background-color: #FCFCFC;
}

.box-img {
    width: 100%;
    height: 160px;
    background: url("https://s3.meituan.net/static-prod01/com.sankuai.wmcapp.openh5.static/images/up-025281.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.box-user-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, .5);
    position: absolute;
    left: 38%;
    top: 32px;
}

.box-img>div {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 125px;
    font-weight: bold;
}

.list img {
    width: 20px;
    height: 20px;
    position: relative;
    top: 5px;
    margin-right: 5px;
}

.list {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
}

.phone {
    margin-top: 30px;
    background-color: #fff;
    height: 35px;
    width: 100%;
    line-height: 35px;
    text-align: center;
    color: #FFBA31;
}

.time {
    margin-top: 5px;
    font-size: 13px;
    width: 100%;
    text-align: center;
    color: #99999C;
}
</style>