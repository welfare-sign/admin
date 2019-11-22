<template>
    <card>首页</card>
</template>
<script>
/**
 * @description 首页
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'

// 依赖
// import Cookies from 'js-cookie'
export default {
    name: 'Home',
    components: {
        Card
    },
    created() {
        // const Authorization = Cookies.get('Authorization')
        const Authorization = sessionStorage.getItem('Authorization')
        if (!Authorization) {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>