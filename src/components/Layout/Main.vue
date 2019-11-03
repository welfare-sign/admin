<template>
    <el-container class="layout">
        <el-aside width="200px">
            <div class="logo">
                <h1>福力签</h1>
            </div>
            <navigation />
        </el-aside>
        <el-container>
            <el-header>
                <slot name="header" />
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
/**
 * @description 主体布局组件
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Navigation from './Navigation'
export default {
    name: 'Main',
    components: {
        Navigation
    }
}
</script>
<style lang="scss" scoped>
.layout {
    height: 100vh;
    overflow: hidden;
    background: #dfdddd;
}
/deep/ {
    .el-aside {
        background: #fff;
    }
    .el-header {
        background: #fff;
        border-bottom: 1px solid #afafaf;
    }
    .el-main {
        //   height: 100%;
        overflow: hidden;
        //   padding: 30px;
    }
}
.logo {
    height: 60px;
    font-size: 26px;
    color: #ff5f00;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}
</style>