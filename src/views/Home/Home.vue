<template>
    <card>
        <div class="table">
            <el-table :data="list">
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="dayText" label="签到天数"></el-table-column>
                <el-table-column prop="statusText" label="签到状态"></el-table-column>
                <el-table-column prop label="操作" width="160" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleActive(scope.row)"
                            v-if="scope.row.status === 'U'"
                        >设为已签到</el-button>
                        <el-button
                            size="mini"
                            v-if="scope.row.status === 'A'"
                            type="warning"
                            @click="handleDisable(scope.row)"
                        >设为未签到</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </card>
</template>
<script>
/**
 * @description 首页
 * @author 顾超<beyondc@foxmail.com>
 */
// 组件
import Card from '@/components/Card'

// 接口
import { checkin_record_list, modify } from '@/api/home'

export default {
    name: 'Home',
    components: {
        Card
    },
    data() {
        return {
            localList: []
        }
    },
    created() {
        // const Authorization = Cookies.get('Authorization')
        const Authorization = sessionStorage.getItem('Authorization')
        if (!Authorization) {
            this.$router.push({ name: 'login' })
        }
        this.initHome()
    },
    computed: {
        list: {
            get() {
                return this.localList
            },
            set(val) {
                const list = val.map(item => {
                    const checkin_record_id = item.checkin_record.id
                    const customer_id = item.customer.id
                    const status = item.checkin_record.status
                    const statusText = this.formatterStatus(status)
                    const dayText = this.formatterDay(item.checkin_record.day)
                    const nickname = item.customer.nickname
                    return {
                        checkin_record_id,
                        customer_id,
                        statusText,
                        dayText,
                        status,
                        nickname
                    }
                })
                this.localList = list
            }
        }
    },
    methods: {
        initHome() {
            checkin_record_list().then(({ data }) => {
                this.list = data
            })
        },
        formatterStatus(value) {
            let str
            switch (value) {
                case 'A':
                    str = '已签到'
                    break
                case 'U':
                    str = '未签到'
                    break
            }
            return str
        },
        formatterDay(value) {
            return `第${value}天`
        },
        handleActive(row) {
            const { checkin_record_id } = row
            const data = {
                checkin_record_id,
                status: 'A'
            }
            modify(data).then(({ res }) => {
                this.initHome()
            })
        },
        handleDisable(row) {
            const { checkin_record_id } = row
            const data = {
                checkin_record_id,
                status: 'U'
            }
            modify(data).then(({ res }) => {
                this.initHome()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.table {
    height: 100%;
    overflow: scroll;
}
</style>