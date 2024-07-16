<template>
    <div>
        <div class="header">
            <span @click="gotohome" class="iconfont icon-icon-test32"></span>
            <span>帮助</span>
        </div>
        <div class="form-box">
            <van-form @submit="onSubmit">
                <div class="form-box-title">欢迎登录东软美团</div>
                <van-cell-group inset>

                    <!-- 用户名 -->
                    <van-field v-model="state.username" name="username" required placeholder="请输入用户名" label="用户名"
                        :rules="[{ required: true, message: '用户名不能为空' }]" />

                    <!-- 密码 -->
                    <van-field v-model="state.userpass" name="userpass" required type="password" label="密码"
                        placeholder="请输入密码" :rules="[{ required: true, message: '密码不能为空' }]" />

                </van-cell-group>
                <div class="form-box-check">
                    <input class="checkbox-type" type="checkbox" v-model="checked" />
                    <label>我已阅读并同意<span>《美团用户协议》</span>和<span>《隐私政策》</span></label>
                </div>
                <button native-type="submit">登录</button>
            </van-form>
        </div>
        <div class="footer">
            <span @click="gotoresgiter">暂无账号？立即注册</span>
            <span>遇到问题</span>
        </div>
        <div class="icons">
            <img v-for="value in iconsList" :src="showPic(value.iconSrc)">
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { getuserLoginApi } from '../api/index.js';
import { useCounterStore } from '@/stores/counter';
import { showSuccessToast, showFailToast } from 'vant';
import { showDialog } from 'vant';

const router = useRouter();
const userInfo = useCounterStore();

const state = ref({
    username: '',
    userpass: ''
})

const checked = ref(false);

const iconsList = ref([
    {
        iconSrc: '../assets/image/liantong.svg'
    },
    {
        iconSrc: '../assets/image/weixin.svg'
    },
    {
        iconSrc: '../assets/image/qq.svg'
    },
    {
        iconSrc: '../assets/image/apple.svg'
    }
])

const Login = (userid) => {
    if (userid === '0') {
        showFailToast('登录失败！');
    } else {
        showSuccessToast('登录成功！');
        userInfo.userId = userid;
        router.push('/');
    }
}

const LoginUser = async (e) => {
    const res = await getuserLoginApi(e);
    if (checked.value) {
        Login(res.userid);
    } else {
        showDialog({
            message: '请阅读并同意《美团用户协议》和《隐私政策》',
        }).then(() => {
            checked.value = true;
        });
        Login(res.userid);
    }
}

const showPic = (name) => {
    return new URL(name, import.meta.url).href;
}

const gotoresgiter = () => {
    router.push('/resgiter')
}

const gotohome = () => {
    router.push('/')
}

const onSubmit = (e) => {
    LoginUser(e);
}

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    width: 88%;
    position: relative;
    left: 6%;
    line-height: 26px;
    margin-top: 30px;
    font-size: 12px;
}

.header>span:nth-child(1) {
    font-size: 26px;
}

.form-box {
    width: 88%;
    position: relative;
    left: 6%;
    margin-top: 50px;
}

.form-box .form-box-title {
    font-size: 30px;
    margin-bottom: 20px;
}

.checkbox-type {
    width: 15px;
    height: 15px;
    line-height: 15px;
    appearance: none;
    position: relative;
    margin-right: 5px;
}

.checkbox-type:before {
    content: '';
    width: 15px;
    height: 15px;
    border: 1px solid #aab2bd;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}

.checkbox-type:checked:before {
    content: '';
    width: 15px;
    height: 15px;
    border: 1px solid #F8E34C;
    background: #F8E34C;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}

.checkbox-type:checked:after {
    content: '';
    width: 7px;
    height: 4px;
    border: 1.5px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 5px;
    left: 3.5px;
    transform: rotate(-45deg);
}

label>span {
    color: #4a88df;
}

label {
    font-size: 13px;
}

button {
    height: 35px;
    line-height: 35px;
    width: 80%;
    position: relative;
    left: 10%;
    border: none;
    background-color: #F8E34C;
    border-radius: 30px;
    letter-spacing: 10px;
    font-weight: bold;
    margin-bottom: 35px;
    margin-top: 35px;
}

.form-box-check {
    text-align: center;
    margin-top: 15px;
}

.footer {
    display: flex;
    justify-content: space-between;
    width: 88%;
    position: relative;
    left: 6%;
    line-height: 26px;
    font-size: 12px;
}

.icons {
    display: flex;
    justify-content: space-between;
    width: 54%;
    position: relative;
    left: 23%;
    margin-top: 130px;
}
</style>