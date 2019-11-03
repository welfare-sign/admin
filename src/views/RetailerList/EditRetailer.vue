<template>
    <div class="edit-retailer">
        <el-button :type="btnType" :size="btnSize" @click="handleClick">{{btnTitle}}</el-button>
        <el-dialog :title="title" :visible.sync="show" width="650px">
            <el-form ref="retailerForm" :model="retailerForm" :inline="false" label-position="left" label-width="120px">
                <section>
                    <h2>商户信息</h2>
                    <el-form-item label="商户名称">
                        <el-input v-model="retailerForm.contact_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="餐饮类型">
                        <el-select v-model="catering_type">
                            <el-option v-for="item in typeList" :key="item.code" :label="item.label" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户头像">
                        <el-upload
                            :action="uploadUrl+'&type=avatar'"
                            :multiple="false"
                            list-type="picture-card"
                            :on-success="handleAvatarSuccess"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleAvatarRemove"
                            :disabled="store_avatar"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商户海报">
                        <el-upload
                            :action="uploadUrl+'&type=poster'"
                            :multiple="false"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :disabled="poster"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </section>
                <section>
                    <h2>活动信息</h2>
                    <el-form-item label="参与活动">
                        <el-checkbox-group>
                            <el-checkbox></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="赠送份数">
                        <el-input></el-input>
                    </el-form-item>
                </section>
            </el-form>
            <footer slot="footer">
                <el-button type="primary">确认</el-button>
                <el-button>取消</el-button>
            </footer>
        </el-dialog>
    </div>
</template>
<script>
/**
 * @description 商户列表页-新增/编辑 弹框
 * @author 顾超<beyondc@foxmail.com>
 */
// 依赖
import Cookies from 'js-cookie'

// 常量
const baseUrl = process.env.VUE_APP_API || ''
const access_token = Cookies.get('Authorization')
export default {
    name: 'EditRetailer',
    props: {
        editInfo: {
            type: Object,
            default () {
                return {}
            }
        },
        btnTitle: {
            type: String,
            default: '新增'
        },
        btnType: {
            type: String,
            default: 'primary'
        },
        btnSize: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '新增商户'
        }
    },
    data() {
        return {
            show: false,
            uploadUrl: `${baseUrl}v1/files/upload?access_token=${access_token}`,
            typeList: [
                {
                    code: 'bbq',
                    label: '烧烤'
                }
            ],
            retailerForm: {
                address: this.editInfo.address || '',
                catering_type: this.editInfo.catering_type || '',
                checkin_days: this.editInfo.checkin_days || '',
                checkin_num: this.editInfo.checkin_num || '',
                contact_name: this.editInfo.contact_name || '',
                contact_phone: this.editInfo.contact_phone || '',
                lat: this.editInfo.lat || '',
                lon: this.editInfo.lon || '',
                poster: this.editInfo.poster || '',
                received: this.editInfo.received || '',
                store_avatar: this.editInfo.store_avatar || '',
                store_name: this.editInfo.store_name || '',
                total_receive: this.editInfo.total_receive || ''
            }
        }
    },
    computed: {
        store_avatar: {
            get () {
                return this.retailerForm.store_avatar
            },
            set(value) {
                this.retailerForm.store_avatar = value
            }
        },
        poster: {
            get () {
                return this.retailerForm.poster
            },
            set (value) {
                this.retailerForm.poster = value
            }
        }
    },
    methods: {
        handleClick() {
            /**
             * @description 组件显示的按钮的点击事件的返回函数
             * @return (void)
             */
            // TODO
            this.show = true
        },
        handleAvatarSuccess(response) {
            this.store_avatar = response.data
        },
        handleAvatarRemove() {
            this.store_avatar = ''
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-retailer {
    section {
        padding: 12px;
        border: 1px dotted #cacaca;
        border-radius: 4px;
        & + section {
            margin-top: 15px;
        }
    }
}
</style>