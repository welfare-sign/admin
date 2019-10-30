<template>
    <div class="login">
        <el-form class="login-form" ref="login" :model="datas" :rules="rules" label-width="80px">
            <h1>福利签登录</h1>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="datas.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="datas.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * @description 登录页
 * @author 顾超<beyondc@foxmail.com>
 */
import { login } from '@/api/login'
export default {
    name: 'Login',
    data() {
        return {
            datas: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入登录用户名',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitLogin() {
            /**
             * @description 登录按钮点击事件的返回函数
             * @return (void)
             */
            this.validateForm().then(() => {
                login(this.datas).then(res => {
                    //    TODO
                })
            })
        },
        validateForm() {
            /**
             * @desciption 表单校验方法
             * @return (promise | void)
             */
            this.$refs.login.validate(valid => {
                if (valid) {
                    return Promise.resolve()
                } else {
                    this.$message({
                        type: 'error',
                        message: '表检查你的输入'
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: linear-gradient(90deg, #ff9800 0%, #ff5f00 100%);
}
h1 {
    text-align: center;
    margin-bottom: 30px;
}
.login-form {
    margin: 80px;
    width: 400px;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
    background: #fff;
}
</style>