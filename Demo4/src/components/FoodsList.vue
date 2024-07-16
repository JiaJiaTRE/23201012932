<template>
    <div class="box">
        <img class="box-img" :src="getImg(list.pic)">
        <div class="box-data">
            <div class="box-title">
                <div>{{ list.foodname }}</div>
            </div>
            <div class="box-data-intro">
                <span>1人份</span>
                <span>{{ list.intro }}</span>
            </div>
            <div class="box-data-num">月售10</div>
            <div class="box-data-price">
                <span>￥{{ list.price }}</span>
                <button>加入购物车</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
    list: {
        type: Object
    }
})

const delivery = ref(true)

const getImg = e => `http://172.17.18.240:8080/nfood${e}`

onMounted(() => {
})
</script>

<style scoped>
.box {
    display: flex;
    width: 96%;
    height: 120px;
    position: relative;
    left: 2%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .1);
    margin: 10px 0;
}

.box-img {
    width: 28%;
    height: 100px;
    border-radius: 5px;
    margin: 10px;
}

.box-data {
    width: 70%;
    height: 100px;
}

.box-data>div {
    display: flex;
    font-size: 11px;
    position: relative;
}

.box-title>div {
    font-size: 17px;
    font-weight: bold;
    margin-top: 12px;
}

.box-data-intro>span:nth-child(1) {
    border-radius: 3px;
    background-color: #eee;
    padding: 0 5px;
    margin-right: 5px;
    margin-top: 5px;
}

.box-data-intro>span:nth-child(2) {
    margin-top: 5px;
}

.box-data-num {
    color: #858687;
    margin-top: 5px;
}

.box-data-price {
    position: relative;
}

.box-data-price>span {
    color: #FF4A26;
    font-size: 16px;
    font-weight: bold;
}

.box-data-price>button {
    background-color: #FFBD27;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    position: absolute;
    right: 15px;
    padding: 2px 5px;
}
</style>