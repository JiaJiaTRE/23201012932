<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#F8E34C">
            <van-swipe-item v-for="value in list" :key="value.id">
                <img :src="getImg(value.src)">
                <!-- <div class="swiper-name">{{ value.name }}</div> -->
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
    list: {
        type: Array
    }
})

const getImg = e => `http://172.17.18.240:8080/nfood${e}`
</script>

<style scoped>
.my-swipe .van-swipe-item {
    height: 200px;
    width: 100%;
}

img {
    width: 100%;
    height: 200px;
    border-radius: 15px 15px 0 0;
}

</style>