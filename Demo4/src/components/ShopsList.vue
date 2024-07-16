<template>
    <div class="box" >
        <img class="box-img" :src="getImg(list.pic)">
        <div class="box-data">
            <div class="box-title">
                <div>{{ list.shopname }}</div>
                <span class="iconfont icon-gengduo"></span>
            </div>
            <div class="box-data-level">
                <span>{{ list.level }}.0分</span>
                <span>月售 1000+</span>
                <span>人均 ￥17</span>
                <span class="box-data-special" v-if="delivery">美团专送</span>
                <span class="box-data-quick" v-if="!delivery">美团快送</span>
            </div>
            <div class="box-data-info">
                <span>起送￥13</span>
                <span>满18配送约￥0.5</span>
                <span>29分钟</span>
                <span>1.2km</span>
            </div>
            <div class="box-data-describe">
                <span>{{ list.intro }}</span>
                <span>好吃</span>
            </div>
            <div class="box-data-phone">商家联系电话：{{ list.phonenum }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
// import axios from "axios";
// const id = props.list.value.id;

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

.box-title>span {
    position: absolute;
    right: 5px;
    line-height: 45px;
}

.box-data-level {
    color: #9e9e9e;
    position: relative;
}

.box-data-level>span:nth-child(1) {
    color: #EC6A2C;
    font-weight: bold;
    margin-right: 5px;
}

.box-data-level>span:nth-child(2),
.box-data-level>span:nth-child(3) {
    margin-right: 5px;
}

.box-data-special {
    position: absolute;
    right: 5px;
    font-size: 9px;
    color: #5E3722;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 5px;
    background: linear-gradient(to right, #F9E1B3, #DFB980);
}

.box-data-quick {
    position: absolute;
    right: 5px;
    font-size: 9px;
    border: 1px solid #FF9240;
    color: #FF9240;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 5px;
}

.box-data-info {
    position: relative;
}

.box-data-info>span {
    color: #9e9e9e;
    font-size: 10px;
}

.box-data-info>span:nth-child(1) {
    margin-right: 5px;
}

.box-data-info>span:nth-child(3) {
    position: absolute;
    right: 35px;
}

.box-data-info>span:nth-child(4) {
    position: absolute;
    right: 5px;
}

.box-data-describe>span {
    color: #FF9240;
    font-size: 10px;
    margin-right: 5px;
    background-color: #FDF8E2;
    padding: 2px 4px;
    border-radius: 5px;
}

.box-data-phone {
    color: #868686;
}
</style>