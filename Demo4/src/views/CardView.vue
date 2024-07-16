<template>
    <div class="box">
        <div class="box-header">
            <div>购物车</div>
            <div>编辑</div>
        </div>
        <van-checkbox-group v-model="result" ref="checkboxGroup">
            <div class="box-data" v-for="(value, index) in list" :key="index">
                <div>
                    <van-checkbox checked-color="#F8E34C" :name="value.item_id"></van-checkbox>
                    <img class="box-img" :src="getImg(value.pic)">
                    <div>
                        <div>{{ value.foodname }}</div>
                        <div class="box-num">
                            <div @click="minus(value.item_id)">-</div>
                            <span>{{ value.num }}</span>
                            <div @click="add(value.item_id)">+</div>
                        </div>
                    </div>
                    <div>￥{{ value.price }}</div>
                </div>
                <div>
                    <span>打包费</span>
                    <span>￥2</span>
                </div>
                <div>
                    <span>预估配送费</span>
                    <span>￥0</span>
                </div>
                <div>
                    <span>美团红包</span>
                    <span>-￥2</span>
                </div>
                <div>
                    <div @click="onInser(value.item_id)">删除</div>
                </div>
            </div>
            <div class="footer">
                <button id="checkAll" type="primary" @click="checkAll">全选</button>
                <div>
                    <div>合计￥{{ totalPrice }}</div>
                    <div @click="gotoBuy2">一键结算</div>
                </div>
            </div>
        </van-checkbox-group>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { addCartApi, deleteCartItemApi, getMyCartByUserApi } from '../api/index.js';
import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';

const userInfo = useCounterStore();
const router = useRouter();

const list = ref([]);
const result = ref([]);
const checkboxGroup = ref(null);
const checkNum = ref(0);

const getMyCartByUser = async (e) => {
    const res = await getMyCartByUserApi(e);
    list.value.push(...res);
}

const deleteCartItem = async (e) => {
    console.log(e);
    const res = await deleteCartItemApi(e);
    if (res.success === '1') {
        showSuccessToast('删除成功！');
    } else {
        showFailToast('删除失败！');
    }
}

const add = e => {
    list.value[list.value.findIndex(obj => obj.item_id === e)].num++;
};

const minus = e => {
    if (list.value[list.value.findIndex(obj => obj.item_id === e)].num > 1) {
        list.value[list.value.findIndex(obj => obj.item_id === e)].num--;
    }
};

const checkAll = () => {
    if (checkNum.value === 0) {
        checkboxGroup.value.toggleAll(true);
        document.getElementById('checkAll').innerText = '取消全选';
        checkNum.value = 1;
    } else {
        checkboxGroup.value.toggleAll(false);
        document.getElementById('checkAll').innerText = '全选';
        checkNum.value = 0;
    }
}

const totalPrice = computed(() => {
    console.log(result.value);
    let sum = 0;
    if (result.value.length >= 1) {
        list.value.forEach((v, i) => {
            result.value.forEach(item => {
                if (v['item_id'] === item) {
                    sum += list.value[i].price * list.value[i].num;
                }
            });
        });
        return sum;
    } else {
        return sum = 0;
    }
});

const onInser = (e) => {
    deleteCartItem(e);
    list.value.splice(list.value.findIndex(item => item.item_id === e), 1);
}

const gotoBuy2 = () => {
    console.log(result.value);
    router.push({
        path: '/buy2',
        query: {
            sum: totalPrice.value,
            itemId: result.value.join(',')
        }
    });

}

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

onMounted(() => {
    getMyCartByUser(userInfo.userId);
})

</script>

<style scoped>
.box {
    width: 100%;
    height: calc(100vh);
    background-color: #FCFCFC;
}

.box-header {
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #fff;
    position: relative;
    margin-bottom: 15px;

}

.box-header>div:nth-child(1) {
    position: absolute;
    left: 40%;
    font-size: 20px;
    line-height: 50px;
    font-weight: bold;
    margin-left: 10px;
}

.box-header>div:nth-child(2) {
    font-size: 12px;
    position: absolute;
    right: 15px;
    top: 18px;
}

.box-data {
    width: 94%;
    position: relative;
    left: 3%;
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .1);
    padding: 15px;
}

.box-img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

.box-data>div:nth-child(1) {
    display: flex;
    position: relative;
}

.box-data>div:nth-child(1)>div:nth-child(3) {
    font-weight: bold;
    font-size: 20px;
    margin-top: 5px;
}

.box-data>div:nth-child(1)>div:nth-child(4) {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 11px;
}

.box-num {
    display: flex;
    width: 80px;
    height: 30px;
    font-weight: normal;
    font-size: 14px;
}

.box-data>div:nth-child(2),
.box-data>div:nth-child(3),
.box-data>div:nth-child(4),
.box-data>div:nth-child(5) {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    margin-top: 5px;
    font-size: 14px;
}

.box-data>div:nth-child(5) {
    position: relative;
    padding-bottom: 40px;
}

.box-data>div:nth-child(5)>div:nth-child(1) {
    border: 1px solid #F8E34C;
    width: 65px;
    height: 30px;
    text-align: center;
    line-height: 28px;
    color: #F8E34C;
    border-radius: 15px;
    position: absolute;
    right: 0;
    margin-top: 10px;
}

.footer {
    position: relative;
    padding-bottom: 70px;
    display: flex;
    justify-content: space-between;
    margin: 30px 15px 10px 15px;  
    background-color: #FCFCFC;
}

.footer>button {
    border: none;
    background-color: transparent;
    margin-top: 3px;
}

.footer>div:nth-child(2) {
    display: flex;
}

.footer>div:nth-child(2)>div:nth-child(1) {
    margin-top: 10px;
}

.footer>div:nth-child(2)>div:nth-child(2) {
    border: none;
    background-color: #F8E34C;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    border-radius: 15px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    width: 100px;
    margin-left: 10px;
}
</style>