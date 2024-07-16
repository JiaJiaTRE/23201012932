<template>
    <div>
        <van-tabbar v-model="active" z-index="999" active-color="#F8E34C" inactive-color="#121212">
            <van-tabbar-item to="/">
                <span>首页</span>
                <template #icon>
                    <span class="iconfont icon-shouye-zhihui"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/card">
                <span>购物车</span>
                <template #icon>
                    <span class="iconfont icon-icon-test7"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/order">
                <span>订单</span>
                <template #icon>
                    <span class="iconfont icon-icon-test5"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/user">
                <span>个人中心</span>
                <template #icon>
                    <span class="iconfont icon-gerenzhongxin-zhihui"></span>
                </template>
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

</script>

<style scoped>
</style>