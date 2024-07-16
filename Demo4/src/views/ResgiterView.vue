<template>
    <div>
        <div class="header">
            <span @click="gotohome" class="iconfont icon-icon-test32"></span>
            <span>帮助</span>
        </div>
        <div class="form-box">
            <van-form @submit="onSubmit">
                <div class="form-box-title">欢迎注册东软美团</div>
                <van-cell-group inset>

                    <!-- 用户名 -->
                    <van-field v-model="state.username" name="username" required placeholder="请输入用户名" label="用户名"
                        :rules="[{ required: true, message: '用户名不能为空' }]" />

                    <!-- 密码 -->
                    <van-field v-model="state.userpass" name="userpass" required type="password" label="密码"
                        placeholder="请输入密码" :rules="[{ required: true, message: '密码不能为空' }]" />

                    <!-- 确认密码 -->
                    <van-field v-model="state.userpass2" name="userpass2" required type="password" label="确认密码"
                        placeholder="请输入确认密码" :rules="[{ validator: validatorMessage }]" />

                    <!-- 手机号 -->
                    <van-field v-model="state.mobilenum" name="mobilenum" required label="手机号" placeholder="请输入手机号"
                        :rules="[{ pattern, message: '请输入正确内容' }]" />

                    <!-- 地址 -->
                    <van-field v-model="state.address" name="address" required placeholder="请输入地址" label="地址"
                        :rules="[{ required: true, message: '地址不能为空' }]" />

                    <!-- 备注 -->
                    <van-field v-model="state.comment" name="comment" placeholder="请输入备注" label="备注"
                        :rules="[{ required: true, message: '备注不能为空' }]" />

                </van-cell-group>
                <!-- 用户协议 -->
                <div class="form-box-check">
                    <input class="checkbox-type" type="checkbox" v-model="checked" />
                    <label>我已阅读并同意<span>《美团用户协议》</span>和<span>《隐私政策》</span></label>
                </div>
                <!-- 注册按钮 -->
                <button native-type="submit">注册</button>
            </van-form>
        </div>
        <div class="footer">
            <span @click="gotologin">密码登录</span>
            <span>遇到问题</span>
        </div>
        <div class="icons">
            <img v-for="value in iconsList" :src="showPic(value.iconSrc)">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getuserRegisterApi } from '../api/index.js';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { showDialog } from 'vant';

const router = useRouter();

const state = ref({
    username: '',
    mobilenum: '',
    userpass: '',
    userpass2: '',
    address: '',
    comment: ''
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

const Register = (res) => {
    if (res.success === '1') {
        showSuccessToast('注册成功！');
        router.push('/login');
    }
    if (res.success === '0') {
        showFailToast('注册失败！');
    }
}

const RegisterUser = async () => {
    const res = await getuserRegisterApi(state.value);
    if (checked.value) {
        Register(res.value);
    } else {
        showDialog({
            message: '请阅读并同意《美团用户协议》和《隐私政策》',
        }).then(() => {
            checked.value = true;
        });
        Register(res.value);
    }

}

const validatorMessage = (value) => {
    if (value === '') {
        return '确认密码不能为空!';
    }
    if (value !== state.value.userpass) {
        return '两次密码不一致!';
    }
    return;
}

const pattern = /^1[3-9]\d{9}$/;


const onSubmit = (e) => {
    RegisterUser(e);
}

const showPic = (name) => {
    return new URL(name, import.meta.url).href;
}

const gotologin = () => {
    router.push('/login')
}

const gotohome = () => {
    router.push('/')
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
    margin-top: 35px;
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
    margin-bottom: 15px;
    margin-top: 15px;
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
    margin-top: 50px;
}
</style>