<template>
    <card class="user-list">
        <el-form class="header" inline>
            <el-form-item>
                <el-input v-model="name" placeholder="请输入用户名进行搜索">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="created_at" label="注册日期"></el-table-column>
            <el-table-column prop="last_checkin_time" label="最后签到"></el-table-column>
            <el-table-column prop label="剩余礼包"></el-table-column>
            <el-table-column prop label="操作" width="160" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="handleDisable(scope.row.id)">禁用</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :current-page="page_no"
            :page-size="page_size"
            :total="total"
            @current-change="currnetChange"
        ></el-pagination>
    </card>
</template>
<script>
/**
 * @description 用户列表
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'

// 接口
import { queryCustomers, del_customer, disabled_customer } from '@/api/customers'

export default {
    name: 'UserList',
    components: {
        Card
    },
    data() {
        return {
            list: [],
            name: '',
            mobile: '',
            page_no: 1,
            page_size: 10,
            total: 0
        }
    },
    created() {
        this.queryList()
    },
    methods: {
        queryList() {
            /**
             * @description 查询用户列表方法
             * @return (void)
             */
            const params = {
                name: this.name,
                mobile: this.mobile,
                page_no: this.page_no,
                page_size: this.page_size
            }
            queryCustomers(params).then(({ data, res }) => {
                this.list = data
                this.page_no = res.current
                this.total = res.total
            })
        },
        currnetChange(page_no) {
            /**
             * @description 当前页面改变时返回函数
             * @return (void)
             *
             * @page_no (number): 当前页码
             */
            this.page_no = page_no
            this.queryList()
        },
        handleDisable(customer_id) {
            /**
             * @description 禁用用户方法
             * @return (void)
             *
             * @customer_id (string): 用户 id
             */
            disabled_customer({customer_id}).then(() => {
                this.$message({
                    type: 'success',
                    message: '用户删除成功'
                })
                this.queryList()
            })
        },
        handleDelete(customer_id) {
            /**
             * @description 删除用户方法
             * @return (void)
             * @customer_id (string): 用户 id
             */
            del_customer({customer_id}).then(() => {
                 this.$message({
                    type: 'success',
                    message: '用户禁用成功'
                })
                this.queryList()
            })
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