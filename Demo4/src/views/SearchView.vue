<template>
    <div class="box">
        <div class="header">
            <div>
                <van-icon style="z-index: 999; margin: 7px 0 0 10px" color="#000" @click="gotolastPage"
                    name="arrow-left" />
                <div>
                    <input type="text" placeholder="牛肉饭" v-model="search">
                    <button @click="onSearch(search)">搜索</button>
                </div>
            </div>
        </div>
        <div v-if="state" class="data">
            <div class="data-title">
                <span>历史搜索</span>
                <img src="../assets/image/delete.svg" @click="userInfo.clearSearchHistory">
            </div>
            <div class="list-data">
                <span v-for="(value, index) in userInfo.searchHistory" @click="onSearch(value)" :key="index">{{ value
                    }}</span>
            </div>
            <div class="data-title">
                <span>搜索发现</span>
                <img src="../assets/image/yanjing.svg" alt="">
            </div>
            <div class="list-data">
                <span v-for="value in list2" :key="value.id">{{ value.text }}</span>
            </div>
            <div class="top">
                <div>
                    <div class="top-data">
                        <img src="../assets/image/remen.svg">
                        <span>大家都在搜</span>
                    </div>
                    <div class="top-list">
                        <div v-for="value in list3" :key="value.id">
                            <span>{{ value.id }}</span>
                            <span>{{ value.text }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="top-data" class="top-data">
                        <img src="../assets/image/meishi.svg">
                        <span>美食热搜</span>
                    </div>
                    <div class="top-list">
                        <div v-for="value in list4" :key="value.id">
                            <span>{{ value.id }}</span>
                            <span>{{ value.text }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="foods">
            <foodList v-for="item in searchList" @click="gotoDetail(item.food_id)" :key="item.id" :list="item">
            </foodList>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFoodBySearchApi } from "../api/index.js"
import { useCounterStore } from '@/stores/counter.js';
import foodList from "../components/FoodsList.vue"

const route = useRoute();
const router = useRouter();
const userInfo = useCounterStore();

const list2 = ref([
    {
        id: 1,
        text: "学姐香肉饭"
    },
    {
        id: 2,
        text: "东北一家人"
    },
    {
        id: 3,
        text: "姐妹麻辣汤"
    }
])

const list3 = ref([
    {
        id: 1,
        text: "大块牛肉面"
    },
    {
        id: 2,
        text: "库迪新品6.8元"
    },
    {
        id: 3,
        text: "甜啦啦柠檬水仅2元"
    },
    {
        id: 4,
        text: "冰爽柠檬水"
    },
    {
        id: 5,
        text: "华莱士寻味中国上新"
    },
    {
        id: 6,
        text: "抢神券！"
    },
    {
        id: 7,
        text: "居臣氏"
    },
    {
        id: 8,
        text: "周五喝奶茶"
    },
    {
        id: 9,
        text: "鲜爽冰淇淋"
    },
    {
        id: 10,
        text: "糖炒栗子"
    }
])

const list4 = ref([
    {
        id: 1,
        text: "奶茶"
    },
    {
        id: 2,
        text: "爽口凉面"
    },
    {
        id: 3,
        text: "烧烤"
    },
    {
        id: 4,
        text: "小蛋糕"
    },
    {
        id: 5,
        text: "轻食减脂餐"
    },
    {
        id: 6,
        text: "麻辣拌"
    },
    {
        id: 7,
        text: "清甜西瓜"
    },
    {
        id: 8,
        text: "火锅"
    },
    {
        id: 9,
        text: "烤肉"
    },
    {
        id: 10,
        text: "蛋糕"
    }
])

const search = ref('')

const searchList = ref([])

const state = ref(true)

const getFoodBySearch = async (e) => {
    const res = await getFoodBySearchApi(e);
    searchList.value.push(...res)
}

const onSearch = (e) => {

    if (e === '') {
        getFoodBySearch(e)
        state.value = false
    }
    if (e !== '') {
        searchList.value.splice(0)
        getFoodBySearch(e)
        state.value = false
    }
    if (userInfo.searchHistory.indexOf(e) === -1) {
        userInfo.searchHistory.unshift(e);
    } else {
        userInfo.searchHistory.splice(userInfo.searchHistory.findIndex(() => {
            e
        }), 1);
        userInfo.searchHistory.unshift(e);
    }

}

const gotoDetail = (e) => {
    router.push({
        path: '/detail',
        query: {
            foodId: e
        }
    })
}

const gotolastPage = () => {
    window.history.go(-1)
}

</script>

<style scoped>
.header {
    width: 100%;
    background-color: #FCFCFC;
    color: #121212;
}

.header>div {
    width: 100%;
    display: flex;
    padding-top: 30px;
    margin-left: 10px;
    padding-bottom: 5px;
}

.header>div>div {
    display: flex;
    width: 88%;
    position: relative;
}

.header>div>div>input {
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

.header>div>div>button {
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

.header>div>span {
    height: 30px;
    font-size: 26px;
    position: relative;
    top: -4px;
    margin-right: 10px;
}

.data {
    width: 100%;
    padding: 15px;
}

.data-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.data-title>span {
    font-weight: bold;
}

.list-data {
    display: flex;
    flex-wrap: wrap;
}

.list-data>span {
    padding: 3px 15px;
    font-size: 11px;
    color: #858687;
    background-color: #FCFCFC;
    margin-right: 10px;
    border-radius: 20px;
    margin-bottom: 20px;
}

.top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 30px;
}

.top-data {
    color: #EA3D3C;
}

.top-data>span {
    font-size: 16px;
    font-weight: bold;
}

#top-data {
    color: #EE8031;
}

.top>div {
    width: 48%;
    background-color: #FCF0F2;
    padding: 10px 3px 3px 3px;
    border-radius: 10px;
}

.top>div:nth-child(2) {
    background-color: #FCF1E3;
}

.top-list>div>span:nth-child(1) {
    margin-right: 8px;
}

.top-list {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
}

.top-list>div {
    margin: 3px 0;
}

.top-list>div:nth-child(1)>span:nth-child(1),
.top-list>div:nth-child(2)>span:nth-child(1),
.top-list>div:nth-child(3)>span:nth-child(1) {
    color: #ED6B2C;
}

.top-data>img {
    position: relative;
    top: 4px;
    margin-left: 5px;
    margin-right: 5px;
}

.foods {
    width: 100%;
}
</style>