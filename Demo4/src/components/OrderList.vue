<template>
    <div class="box">
        <div>
            <img class="box-img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.1z35WIMWuTG4lU1ymdEgswHaHa?w=156&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7">
            <div class="box-title">
                <span>{{ list.shopname }}</span>
                <span class="iconfont icon-icon-test41"></span>
                <span>已完成</span>
                <div class="box-quan">
                    <span>
                        <span>32减2</span>
                        <span>55减4</span>
                        <span>78减6</span>
                        <span>100减8</span>
                    </span>
                    <span>0.17折起</span>
                </div>
            </div>
        </div>
        <div class="box-data">
            <img class="box-data-img" :src="getImg(list.pic)">
            <div>{{ list.foodname }}</div>
            <div>
                <div>￥{{ list.sum }}</div>
                <div>共{{ list.num }}件</div>
            </div>
        </div>
        <div class="box-button">
            <button id="button" v-if="!state">已评价</button>
            <button v-if="state" @click="onComment()">评价</button>
            <button>小问卷</button>
            <button>再来一单</button>
        </div>

        <van-action-sheet v-model:show="show" title="评价">
            <div class="content">
                <div class="content-title">您对商品满意吗？</div>
                <div>
                    <img id="content-img" class="box-data-img" :src="getImg(list.pic)">
                    <div class="content-foodname">
                        <div>{{ list.foodname }}</div>
                        <van-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#eee" />
                    </div>
                </div>
                <van-cell-group inset>
                    <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50"
                        placeholder="质量赞，效果好，推荐给有需要的人" show-word-limit />
                </van-cell-group>
                <button @click="comments">提交</button>
            </div>
        </van-action-sheet>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { insertCommentApi, getAllOrdersByUserApi } from '@/api';
import { showSuccessToast, showFailToast } from 'vant';

const router = useRouter();
const route = useRoute();

const userInfo = useCounterStore();

const state = ref(false)

const value = ref(5)

const message = ref('')

const props = defineProps({
    list: {
        type: Object
    }
})

const commentsList = ref([])

const show = ref(false)

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const onComment = () => {
    show.value = true
}

const getAllOrdersByUser = async (e) => {
    const res = await getAllOrdersByUserApi(e);
    commentsList.value.push(...res);
}

const comments = () => {
    show.value = false
    insertComment({
        itemId: props.list.item_id,
        content: message.value
    })
}

const insertComment = async (e) => {
    const res = await insertCommentApi(e);
    if (res.success === '0') {
        showFailToast('评论失败！');
    } else {
        showSuccessToast('评论成功！');
    }
}

onMounted(() => {
    getAllOrdersByUser(userInfo.userId)

    state.value = props.list.content === '' || props.list.content === null


})


</script>

<style scoped>
.box {
    width: 94%;
    position: relative;
    left: 3%;
    background-color: #fff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .1);
    margin-bottom: 15px;
    border-radius: 10px;
    padding-bottom: 20px;
}

.box>div:nth-child(1) {
    display: flex;
    padding: 15px;
}

.box-img {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 15px;
}

.box-quan {
    color: #ED6C54;
}

.box-quan>span {
    font-size: 10px;
    margin-right: 5px;
    border: 1px solid #ED6C54;
    padding: 2px 5px;
    border-radius: 3px;
}

.box-quan>span:nth-child(1)>span {
    padding: 0 3px;
    border-right: 1px solid #ED6C54;
}

.box-quan>span:nth-child(1)>span:nth-child(4) {
    border: none;
}

.box-title>span:nth-child(1) {
    font-size: 15px;
    font-weight: bold;
}

.box-title>span:nth-child(3) {
    position: absolute;
    font-size: 12px;
    right: 15px;
    top: 20px;
    color: #AAA;
}

.box-data-img {
    width: 100px;
    height: 80px;
    border-radius: 8px;
    margin-right: 15px;
}

.box-data {
    display: flex;
    padding: 0 15px 15px 15px;
    line-height: 80px;
    color: #555;
    position: relative;
}

.box-data>div:nth-child(3) {
    font-size: 12px;
    line-height: 20px;
    position: absolute;
    right: 15px;
    top: 20px;
    color: #000;
}

.box-button {
    position: relative;
    display: flex;
    padding: 0 20px 0 20px;
    right: 0;
    margin-top: 10px;
    flex-direction: row-reverse;
}

.box-button>button {
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-radius: 8px;
    letter-spacing: 1px;
    padding: 3px 12px;
    border: 1px solid #ccc;
    margin-left: 10px;
    font-weight: bold;
}

.box-button>button:nth-child(1) {
    border: none;
    background-color: #F8E34C;
}

#button {
    background-color: #fbf1a0;
}

.content {
    padding: 0px 20px 50px 20px;
    position: relative;
}

.content-title {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #EEE;
}

.content>div:nth-child(2) {
    display: flex;
}

.content-foodname {
    margin-top: 10px;
}

.content>button {
    border: none;
    background-color: #F8E34C;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    letter-spacing: 1px;
    padding: 3px 12px;
    margin-left: 10px;
    font-weight: bold;
    position: absolute;
    right: 30px;
}
</style>