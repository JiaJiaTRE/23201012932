<template>
    <div class="body">
        <div class="body-header">
            <div>
                <span>订单</span>
                <span>买过的店</span>
            </div>
            <div>
                <span class="iconfont icon-icon-test9"></span>
                <span class="iconfont icon-icon-test2"></span>
            </div>
        </div>
        <div class="body-state">
            <div>全部订单</div>
            <div>待评价</div>
            <div>退款/售后</div>
        </div>
        <OrderList v-for="value in list" :list="value"></OrderList>
        <div class="footer"></div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { getAllOrdersByUserApi, insertCommentApi } from '@/api';
import { showSuccessToast, showFailToast } from 'vant';
import OrderList from '@/components/OrderList.vue';


const userInfo = useCounterStore();

const list = ref([])

const getAllOrdersByUser = async (e) => {
    const res = await getAllOrdersByUserApi(e);
    list.value.push(...res);
}

onMounted(() => {
    getAllOrdersByUser(userInfo.userId)
})

</script>

<style scoped>
.body {
    width: 100%;
    background-color: #FCFCFC;

}

.body-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
}

.body-header>div:nth-child(1)>span {
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
    margin-right: 5px;
    margin-left: 5px;
}

.body-header>div:nth-child(1)>span:nth-child(2) {
    color: #6D6D6D;
    border-left: 1px solid #000;
    padding-left: 8px;
}

.body-header>div:nth-child(2)>span {
    margin-left: 10px;
}

.body-state {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 10px 20px;
    width: 100%;
}

.body-state>div {
    font-size: 13px;
    padding: 5px 0;
    width: 30%;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-radius: 30px;
    letter-spacing: 1px;
}

.body-state>div:nth-child(1) {
    color: #FF9240;
    background-color: #FDF8E2;
    border: 1px solid #FF9240;
}

.footer {
    padding-bottom: 50px;
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