<template>
    <card class="retailer-list">
        <el-form class="header" inline>
            <el-form-item>
                <el-input placeholder="请输入商户名进行搜索">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop label="商户名"></el-table-column>
            <el-table-column prop label="联系人"></el-table-column>
            <el-table-column prop label="联系电话"></el-table-column>
            <el-table-column prop label="上线日期"></el-table-column>
            <el-table-column prop label="礼包已发放"></el-table-column>
            <el-table-column prop label="操作"></el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </card>
</template>
<script>
/**
 * @description 商户列表页
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'
export default {
    name: 'RetailerList',
    components: {
        Card
    }
}
</script>
<style lang="scss" scoped>
.retailer-list {
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