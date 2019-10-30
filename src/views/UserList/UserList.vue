<template>
    <card class="user-list">
        <el-form class="header" inline>
            <el-form-item>
                <el-input placeholder="请输入用户名进行搜索">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop label="昵称"></el-table-column>
            <el-table-column prop label="手机号"></el-table-column>
            <el-table-column prop label="注册日期"></el-table-column>
            <el-table-column prop label="最后签到"></el-table-column>
            <el-table-column prop label="剩余礼包"></el-table-column>
            <el-table-column prop label="操作"></el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </card>
</template>
<script>
/**
 * @description 用户列表
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'
export default {
    name: 'UserList',
    components: {
        Card
    },
    data() {
        return {
            list: [{}]
        }
    }
}
</script>
<style lang="scss" scoped>
.user-list {
    position: relative;
}
.header {
    text-align: right;
}
/deep/ {
    .el-pagination {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
}
</style>