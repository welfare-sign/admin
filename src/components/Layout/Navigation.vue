<template>
    <el-menu
        :default-active="active"
        active-text-color="#FF5F00"
        class="navigation"
        @select="handleSelect"
    >
        <el-menu-item v-for="menu in menus" :index="menu.name" :key="menu.name">
            <template slot="title">
                <i :class="menu.meta.icon"></i>
                <span>{{menu.meta.title}}</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>
<script>
/**
 * @description 导航菜单
 * @author 顾超<beyondc@foxmail.com>
 */
// 数据
import { menus } from '@/router'
export default {
    name: 'Navigation',
    data() {
        return {
            active: 'home',
            menus
        }
    },
    methods: {
        handleSelect(index) {
            this.$router.push({ name: index })
        }
    }
}
</script>
<style lang="scss" scoped>
.navigation {
    background-color: transparent;
    border-right: none;
}
// /deep/ {
//     .el-menu {
//         background-color: transparent;
//     }
// }
</style>