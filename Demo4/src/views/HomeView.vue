<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getSwiperApi } from "../api/index.js"
import { getAllShopsApi, getFoodBySearchApi } from "../api/index.js"
import SwiperView from "../components/SwiperView.vue"
import ShopsList from "../components/ShopsList.vue"
import { useRouter } from 'vue-router'

const router = useRouter();

//轮播图数据列表
const swiperImgList = ref([])
const shopsList = ref([])

//实现获取轮播图数据方法
const getSwiper = async () => {
  const res = await getSwiperApi();
  swiperImgList.value.push(...res)
}

const getAllShops = async () => {
  const res = await getAllShopsApi();
  shopsList.value.push(...res)
}

const gotoFoods = (e) => {
  console.log(e);
  router.push({
    path: '/foods',
    query: {
      shopId: e
    }
  })
}

const onSearch = (e) => {
  router.push({
    path: '/search'
  })
}

onMounted(() => {
  getSwiper();
  getAllShops();
});
</script>

<template>
  <div>
    <div class="header">
      <div>
        <span class="iconfont icon-icon-test16"></span>
        <div>大连东软信息学院（软件园校区）</div>
      </div>

      <div>
        <div>
          <input type="text" placeholder="牛肉饭" @click="onSearch">
          <button>搜索</button>
        </div>
        <span class="iconfont icon-kuaijiezhifu"></span>
      </div>

      <div class="swiper">
        <swiper-view :list="swiperImgList"></swiper-view>
      </div>

      <div class="shops">
        <ShopsList v-for="item in shopsList" @click="gotoFoods(item.shop_id)" :key="item.id" :list="item"></ShopsList>
      </div>

    </div>

  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 280px;
  background-color: #F8E34C;
  color: #121212;
}

.header>div:nth-child(1) {
  display: flex;
  padding-top: 30px;
  margin-left: 10px;
  margin-bottom: 5px;
}

.swiper {
  position: relative;
  width: 100%;
}

.header>div:nth-child(2) {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.header>div:nth-child(2)>div {
  display: flex;
  width: 88%;
  position: relative;
}

.header>div:nth-child(2)>div>input {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  border-radius: 30px;
  border: none;
  padding-left: 10px;
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 10px;
}

.header>div:nth-child(2)>div>button {
  width: 50px;
  height: 26px;
  line-height: 28px;
  position: absolute;
  border: none;
  font-size: 12px;
  background-color: #F8E34C;
  top: 2px;
  right: 2px;
  padding: 0;
  border-radius: 30px;
}

.header>div:nth-child(2)>span {
  height: 30px;
  font-size: 26px;
  position: relative;
  top: -4px;
  margin-right: 10px;
}

.shops {
  padding-bottom: 60px;
  margin-top: 20px;
}
</style>