<template>
    <div class="box">
        <div class="box-header">
            <van-icon style="z-index: 999; margin: 10px" color="#000" @click="gotolastPage" name="arrow-left" />
            <span>我的评价</span>
            <!-- <span>23201012932-刘佳怡</span> -->
            <span>{{ list.length }}条评论</span>
        </div>
        <div class="box-data" v-for="value in list">

            <div>
                <img class="box-data-img" :src="getImg(value.pic)">
                <div class="box-title">
                    <span>{{ value.foodname }}</span>
                    <span class="iconfont icon-icon-test41"></span>
                </div>
            </div>

            <div>
                <span>发布于{{ value.comment_time }}</span>
            </div>

            <div>
                <van-rate v-model="level" />
                <div>{{ value.content }}</div>
            </div>
            <div class="box-footer">
                <span>浏览 3</span>

                <span class="iconfont icon-guanzhu-zhihui"></span>
                <span>有用</span>

                <span class="iconfont icon-xiaoxi-zhihui"></span>
                <span>1</span>
            </div>

            <div class="box-button">
                <button @click="onDelete(value.item_id)">删除</button>
                <button @click="onUpdateComment(value.item_id)">修改</button>
            </div>

        </div>

        <van-action-sheet v-model:show="show" title="评价">
            <div class="content">
                <div class="content-title">您对商品满意吗？</div>
                <van-cell-group inset>
                    <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50"
                        placeholder="质量赞，效果好，推荐给有需要的人" show-word-limit />
                </van-cell-group>
                <button @click="comments()">提交</button>
            </div>
        </van-action-sheet>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { getAllCommentsByUserApi, updateCommentApi, deleteCommentrApi } from '@/api';
import { showSuccessToast, showFailToast } from 'vant';
import OrderList from '@/components/OrderList.vue';

const userInfo = useCounterStore();
const list = ref([])

const message = ref('')
const level = ref(5)
const show = ref(false)

const itemId = ref('')

const getAllCommentsByUser = async (e) => {
    const res = await getAllCommentsByUserApi(e);
    list.value.push(...res);
}

const onUpdateComment = (e) => {
    show.value = true
    itemId.value = e
}

const comments = () => {
    updateComment({
        itemId: itemId.value,
        content: '/'+message.value+'/'
    })
    show.value = false
}

const updateComment = async (e) => {
    const res = await updateCommentApi(e);
    if (res.success === '0') {
        showFailToast('修改失败！');
    } 
    if (res.success === '1') {
        showSuccessToast('修改成功！');
    }
}

const deleteComment = async (e) => {
    const res = await deleteCommentrApi(e);
    list.value.splice(list.value.findIndex(obj => obj.item_id === e), 1)
    if (res.success === '0') {
        showFailToast('删除失败！');
    } else {
        showSuccessToast('删除成功！');
    }
}

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

const onDelete = (e) => {
    deleteComment(e)
}

const gotolastPage = () => {
    window.history.go(-1)
}

onMounted(() => {
    getAllCommentsByUser(userInfo.userId)
})

</script>

<style scoped> 
.box {
    width: 100%;
    height: calc(100vh);
    background-color: #FCFCFC;
    padding-bottom: 15px;
}

.box-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FCFCFC;
    padding: 10px;
}

.box-data {
    width: 94%;
    position: relative;
    left: 3%;
    background-color: #fff;
    padding: 15px 15px 10px 15px;
    border-radius: 15px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .1);
    margin-bottom: 15px;
}

.box-data>div:nth-child(1) {
    display: flex;
    align-items: center;
}

.box-data-img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
}

.box-data>div:nth-child(2)>span {
    color: #858687;
    font-size: 12px;
}

.box-data>div:nth-child(3) {
    display: flex;
}

.box-data>div:nth-child(3)>div:nth-child(2) {
    margin-left: 10px;
}

.box-footer {
    width: 100%;
    display: flex;
    font-size: 13px;
    margin-top: 10px;
    color: #858687;
    position: relative;
    height: 25px;
    line-height: 25px;
}

.box-footer>span:nth-child(2) {
    position: absolute;
    right: 60px;
}

.box-footer>span:nth-child(3) {
    position: absolute;
    right: 30px;
}

.box-footer>span:nth-child(4) {
    position: absolute;
    right: 8px;
}

.box-footer>span:nth-child(5) {
    position: absolute;
    right: 0;
}

.content {
    padding: 0px 20px 50px 20px;
    position: relative;
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

.box-button {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
}

.box-button>button {
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    border: none;
    background-color: #F8E34C;
    border-radius: 8px;
    letter-spacing: 1px;
    padding: 3px 12px;
    margin-left: 10px;
    font-weight: bold;
}
</style>