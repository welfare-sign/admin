<template>
    <card class="retailer-list">
        <header class="header">
            <el-input v-model="store_name" placeholder="请输入商户名进行搜索">
                <el-button slot="append" @click="handleSearch">搜索</el-button>
            </el-input>
            <edit-retailer @done="queryList" />
        </header>
        <!-- <el-form class="header" inline>
            <el-form-item></el-form-item>
            <el-form-item>
                
            </el-form-item>
        </el-form> -->
        <el-table :data="list">
            <el-table-column prop="store_name" label="商户名"></el-table-column>
            <el-table-column prop="contact_name" label="联系人"></el-table-column>
            <el-table-column prop="contact_phone" label="联系电话"></el-table-column>
            <el-table-column prop="create_at" label="上线日期"></el-table-column>
            <el-table-column prop="received" label="礼包已发放"></el-table-column>
            <el-table-column label="操作" width="250" fixed="right">
                <template slot-scope="scope">
                    <edit-retailer :edit-info="scope.row" btn-title="编辑" btn-size="mini" />
                    <el-button size="mini" type="warning" @click="handleDisable(scope.row.id)">禁用</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :current-page="page_no" :page-size="page_size" :total="total" @current-change="currnetChange"></el-pagination>
    </card>
</template>
<script>
/**
 * @description 商户列表页
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'
import EditRetailer from './EditRetailer'

// 接口
import { queryMerchants } from '@/api/merchants'

export default {
    name: 'RetailerList',
    components: {
        Card,
        EditRetailer
    },
    data() {
        return {
            list: [],
            store_name: '',
            contact_name: '',
            contact_phone: '',
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
             * @description 查询商户列表方法
             * @return (void)
             */
            const params = {
                store_name: this.store_name,
                contact_name: this.contact_name,
                contact_phone: this.contact_phone,
                page_no: this.page_no,
                page_size: this.page_size
            }
            queryMerchants(params).then(({ data, res }) => {
                this.list = data
                this.page_no = res.current
                this.total = res.total
            })
        },
        handleSearch() {
            /**
             * @description 搜索按钮点击事件的返回函数
             * @return (void)
             */
            this.page_no = 1
            this.queryList()
        },
        currnetChange(page_no) {
            /**
             * @description 当前页码改变时的回调函数
             * @return (void)
             * 
             * @page_no (number): 改变后的页码
             */
            this.page_no = page_no
            this.queryList()
        },
        handleDisable(id) {
            /**
             * @description 禁用商户方法
             * @return (void)
             * 
             * @id (string): 商户 id
             */
            // TODO
        },
        handleDelete(id) {
            /**
             * @description 删除商户方法
             * @return (void)
             * @id (string): 商户 id
             */
            // TODO
        }
    }
}
</script>
<style lang="scss" scoped>
.retailer-list {
    position: relative;
}
.header {
    display: flex;
    justify-content: flex-end;
    // text-align: right;
    /deep/ {
        .el-input {
            width: 300px;
            margin-right: 16px;
        }
    }
}
/deep/ {
    .el-pagination {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
}
</style>