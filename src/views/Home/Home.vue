<template>
    <card>
        <!-- <div class="table">
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
        </div>-->
        <div class="chart">
            <h1>福力签</h1>
            <el-date-picker
                v-model="date"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="initHome"
            ></el-date-picker>
            <ve-histogram :data="chartData" />
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
// import { checkin_record_list, modify } from '@/api/home'
import { get_checkin_num, get_regist_num } from '@/api/home'

// 插件
import VeHistogram from 'v-charts/lib/histogram.common'
import moment from 'moment'

// 工具
import {dateScope} from '@/utils/dateFunc'

export default {
    name: 'Home',
    components: {
        Card,
        VeHistogram
    },
    data() {
        return {
            // localList: []
            begin_date: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            end_date: moment().format('YYYY-MM-DD'),
            dateArr: [],
            chartTemp: {
                columns: ['日期', '签到数', '注册数'],
                rows: []
            }
        }
    },
    mounted() {
        // this.end_date = moment().format('YYYY-MM-DD')
        // this.begin_date = moment().subtract(7, 'days')
        // const Authorization = Cookies.get('Authorization')
        // const Authorization = sessionStorage.getItem('Authorization')
        // if (!Authorization) {
        //     this.$router.push({ name: 'login' })
        // }
        this.dateArr = dateScope(this.begin_date, this.end_date)
        this.initHome()
    },
    computed: {
        date: {
            get() {
                return [this.begin_date, this.end_date]
            },
            set(val){
                this.begin_date = val[0]
                this.end_date = val[1]
                this.dateArr = dateScope(...val)
            },

        },
        chartData: {
            get() {
                return this.chartTemp
            },
            set(val) {
                const checkin_num = val.checkin_num
                const regist_num = val.regist_num
                let arr = []
                this.dateArr.forEach(item => {
                    let obj = {
                        '日期': moment(item).format('MM/DD'),
                        '签到数': 0,
                        '注册数': 0
                    }
                    let i = checkin_num.length && checkin_num.find(i => i.date === item)
                    if (i) {
                        obj['签到数'] = i.num
                    }
                    let j = regist_num.length && regist_num.find(j => j.date === item)
                    if (j) {
                        obj['注册数'] = j.num
                    }
                    arr = [...arr, obj]
                })
                this.chartTemp.rows = arr
            }
        }
        // list: {
        //     get() {
        //         return this.localList
        //     },
        //     set(val) {
        //         const list = val.map(item => {
        //             const checkin_record_id = item.checkin_record.id
        //             const customer_id = item.customer.id
        //             const status = item.checkin_record.status
        //             const statusText = this.formatterStatus(status)
        //             const dayText = this.formatterDay(item.checkin_record.day)
        //             const nickname = item.customer.nickname
        //             return {
        //                 checkin_record_id,
        //                 customer_id,
        //                 statusText,
        //                 dayText,
        //                 status,
        //                 nickname
        //             }
        //         })
        //         this.localList = list
        //     }
        // }
    },
    methods: {
        initHome() {
            // checkin_record_list().then(({ data }) => {
            //     this.list = data
            // })
            this.queryCheckinNum()
        },
        queryCheckinNum() {
            const params = {
                begin_date: this.begin_date,
                end_date: this.end_date
            }
            get_checkin_num(params).then(({ data, res }) => {
                this.queryRegistNum(data)
            })
        },
        queryRegistNum(checkinNum) {
            const params = {
                begin_date: this.begin_date,
                end_date: this.end_date
            }
            get_regist_num(params).then(({ data, res }) => {
                this.chartData = {
                    checkin_num: checkinNum,
                    regist_num: data
                }
            })
        }
        // formatterStatus(value) {
        //     let str
        //     switch (value) {
        //         case 'A':
        //             str = '已签到'
        //             break
        //         case 'U':
        //             str = '未签到'
        //             break
        //     }
        //     return str
        // },
        // formatterDay(value) {
        //     return `第${value}天`
        // },
        // handleActive(row) {
        //     const { checkin_record_id } = row
        //     const data = {
        //         checkin_record_id,
        //         status: 'A'
        //     }
        //     modify(data).then(({ res }) => {
        //         this.initHome()
        //     })
        // },
        // handleDisable(row) {
        //     const { checkin_record_id } = row
        //     const data = {
        //         checkin_record_id,
        //         status: 'U'
        //     }
        //     modify(data).then(({ res }) => {
        //         this.initHome()
        //     })
        // }
    }
}
</script>
<style lang="scss" scoped>
// .table {
//     height: 100%;
//     overflow: scroll;
// }
.chart {
    h1 {
        line-height: 1.5;
    }
}
</style>