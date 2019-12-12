<template>
    <div class="edit-retailer">
        <el-button :type="btnType" :size="btnSize" @click="handleClick">{{btnTitle}}</el-button>
        <el-dialog
            :append-to-body="true"
            :close-on-click-modal="false"
            :title="title"
            :visible.sync="show"
            @closed="handleClosed"
            width="650px"
        >
            <el-form
                ref="retailerForm"
                :rules="rules"
                :model="retailerForm"
                :inline="false"
                label-position="left"
                label-width="120px"
            >
                <section>
                    <h2>商户信息</h2>
                    <el-form-item label="商户名称" prop="store_name">
                        <el-input v-model="retailerForm.store_name" placeholder="请输入商户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="contact_name">
                        <el-input v-model="retailerForm.contact_name" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" prop="contact_phone">
                        <el-input v-model="retailerForm.contact_phone" placeholder="请输入联系人电话"></el-input>
                    </el-form-item>
                    <el-form-item label="商户定位地址" prop="location_address">
                        <el-autocomplete
                            v-model="location_address"
                            :fetch-suggestions="querySearch"
                            value-key="address"
                            placeholder="请输入定位地址"
                            @select="handleSelect"
                        ></el-autocomplete>
                        <!-- <el-input v-model="address"></el-input> -->
                    </el-form-item>
                    <el-form-item label="商户详细地址" prop="address">
                        <!-- <el-autocomplete
                            v-model="address"
                            :fetch-suggestions="querySearch"
                            value-key="address"
                            placeholder="请输入地址"
                            @select="handleSelect"
                        ></el-autocomplete> -->
                        <el-input v-model="retailerForm.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="餐饮类型" prop="catering_type">
                        <el-select v-model="retailerForm.catering_type">
                            <el-option
                                v-for="item in typeList"
                                :key="item.code"
                                :label="item.label"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户头像" prop="store_avatar">
                        <el-upload
                            :class="{'upload-disabled': store_avatar}"
                            :action="uploadUrl+'&type=avatar'"
                            :multiple="false"
                            list-type="picture-card"
                            :file-list="avatarFile"
                            :on-success="handleAvatarSuccess"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleAvatarRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商户海报" prop="poster">
                        <el-upload
                            :class="{'upload-disabled': poster}"
                            :action="uploadUrl+'&type=poster'"
                            :multiple="false"
                            list-type="picture-card"
                            :file-list="posterFile"
                            :on-success="handlePosterSuccess"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handlePosterRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </section>
                <section>
                    <h2>活动信息</h2>
                    <el-form-item label="参与活动">
                        <!-- <el-checkbox-group v-model="salesList[0].code">
                            <el-checkbox v-for="item in salesList" :key="item.code" :label="item.code">{{item.label}}</el-checkbox>
                        </el-checkbox-group>-->
                        <el-checkbox label="beer" checked readonly>30瓶啤酒</el-checkbox>
                    </el-form-item>
                    <el-form-item label="赠送份数" prop="total_receive">
                        <div>
                            <label>30瓶啤酒：</label>
                            <!-- <el-input-number v-model="retailerForm.total_receive"></el-input-number> -->
                            <el-input v-model="total_receive" type="number" placeholder="输入赠送份数"></el-input>
                        </div>
                    </el-form-item>
                </section>
            </el-form>
            <footer slot="footer">
                <el-button type="primary" @click="handleSubmit">确认</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </footer>
            <el-dialog :visible.sync="previewImg" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
/**
 * @description 商户列表页-新增/编辑 弹框
 * @author 顾超<beyondc@foxmail.com>
 */
// 依赖
// import Cookies from 'js-cookie'

// 接口
import { addMerchant, edit_merchant } from '@/api/merchants'

// 常量
const baseUrl = process.env.VUE_APP_API || ''
// const access_token = Cookies.get('Authorization')
const access_token = sessionStorage.getItem('Authorization')
const downloadUrl = `${baseUrl}v1/files/download`
export default {
    name: 'EditRetailer',
    props: {
        editInfo: {
            type: Object,
            default() {
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
        const _this = this
        const checkPhone = (rule, value, callback) => {
            // const regx = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            const regx =  /^1[3456789]\d{9}$/
            if (!regx.test(value)) {
                callback(new Error('请输入正确的手机号'))
            } else {
                callback()
            }
        }
        const checkAddress = (rule, value, callback) => {
            if (!value || (!_this.retailerForm.lat && !_this.retailerForm.lon)) {
                callback(new Error('请输入正确店家地址'))
            } else {
                callback()
            }
        }
        return {
            show: false,
            uploadUrl: `${baseUrl}v1/files/upload?access_token=${access_token}`,
            typeList: [
                {
                    code: 'bbq',
                    label: '烧烤'
                },
                {
                    code: 'hot_pot',
                    label: '火锅'
                },
                {
                    code: 'other',
                    label: '其它'
                }
            ],
            rules: {
                location_address: [
                    {
                        validator: checkAddress,
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入详细地址'
                    }
                ],
                contact_phone: [
                    {
                        required: true,
                        message: '请提供联系人手机号',
                        trigger: 'blur'
                    },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                store_avatar: [
                    {
                        required: true,
                        message: '请提供商家的形象logo',
                        trigger: 'change'
                    }
                ],
                store_name: [
                    {
                        required: true,
                        message: '请输入商家的店名',
                        trigger: 'blur'
                    }
                ],
                total_receive: [
                    {
                        required: true,
                        message: '请提供可领取的礼品数',
                        trigger: 'blur'
                    }
                ]
            },
            posterFile: this.editInfo.poster
                ? [
                      {
                          url: `${downloadUrl}?filename=${this.editInfo.poster}&type=poster`
                      }
                  ]
                : [],
            avatarFile: this.editInfo.store_avatar
                ? [
                      {
                          url: `${downloadUrl}?filename=${this.editInfo.store_avatar}&type=avatar`
                      }
                  ]
                : [],
            fromModel: {
                location_address: '',
                address: '',
                catering_type: '',
                checkin_days: '',
                checkin_num: '',
                contact_name: '',
                contact_phone: '',
                lat: '',
                lon: '',
                poster: '',
                received: '',
                store_avatar: '',
                store_name: '',
                total_receive: ''
            },   
            retailerForm: {},
            placeSearch: null,
            previewImg: false,
            dialogImageUrl: ''
        }
    },
    created() {
        this.initAMap()
    },
    computed: {
        store_avatar: {
            get() {
                return this.retailerForm.store_avatar
            },
            set(value) {
                this.retailerForm.store_avatar = value
            }
        },
        poster: {
            get() {
                return this.retailerForm.poster
            },
            set(value) {
                this.retailerForm.poster = value
            }
        },
        location_address: {
            get() {
                return this.retailerForm.location_address
            },
            set(value) {
                if (typeof value === 'string') {
                    this.retailerForm.location_address = value
                } else {
                    // this.retailerForm.address = value.address
                    this.retailerForm.lat = value.location.lat
                    this.retailerForm.lon = value.location.lng
                }
            }
        },
        total_receive: {
            get() {
                return +this.retailerForm.total_receive
            },
            set(value) {
                this.retailerForm.total_receive = +value
            }
        }
    },
    methods: {
        initAMap() {
            /**
             * @description 初始化高德地图方法
             * @return (void)
             */
            AMap.plugin('AMap.PlaceSearch', () => {
                this.placeSearch = new AMap.PlaceSearch({
                    type:
                        '餐饮服务|购物服务|生活服务|住宿服务|公司企业|道路附属设施|地名地址信息|公共设施'
                })
            })
        },
        querySearch(queryString, cb) {
            /**
             * @description autocomplate 组件返回输入建议的方法
             * @return (void)
             *
             * @queryString (string): 搜索字符串
             * @cb (function): 搜索回调函数
             */
            this.placeSearch.search(queryString, (status, result) => {
                cb(result.poiList.pois)
            })
        },
        handleSelect(item) {
            /**
             * @descripton 选中推荐条目的回调函数
             *  - 为地址和经纬度赋值
             * @return (void)
             */
            this.location_address = item
        },
        handleClick() {
            /**
             * @description 组件显示的按钮的点击事件的返回函数
             * @return (void)
             */
            if(this.editInfo.id) {
                this.retailerForm = {
                    id: this.editInfo.id,
                    location_address: this.editInfo.location_address || '',
                    address: this.editInfo.address || '',
                    catering_type: this.editInfo.catering_type || '',
                    checkin_days: this.editInfo.checkin_days || 5,
                    checkin_num: this.editInfo.checkin_num || 30,
                    contact_name: this.editInfo.contact_name || '',
                    contact_phone: this.editInfo.contact_phone || '',
                    lat: this.editInfo.lat || '',
                    lon: this.editInfo.lon || '',
                    poster: this.editInfo.poster || '',
                    received: this.editInfo.received || '',
                    store_avatar: this.editInfo.store_avatar || '',
                    store_name: this.editInfo.store_name || '',
                    total_receive: this.editInfo.total_receive || 0
                }
            } else {
                this.retailerForm = this.fromModel
            }
            this.show = true
        },
        handleAvatarSuccess(response, file) {
            /**
             * @description 头像上传成功回调函数
             * @retrun (void)
             */
            this.avatarFile = [file]
            this.store_avatar = response.data
        },
        handleAvatarRemove() {
            /**
             * @description 头像移除的回调函数
             * @return (void)
             */
            this.store_avatar = ''
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.previewImg = true
        },
        handlePosterSuccess(response, file) {
            /**
             * @description 海报上传成功回调函数
             * @retrun (void)
             */
            this.posterFile = [file]
            this.poster = response.data
        },
        handlePosterRemove() {
            /**
             * @description 海报移除回调函数
             * @return (void)
             */
            this.poster = ''
        },
        handleSubmit() {
            /**
             * @description 确认提交按钮点击事件的返回函数
             * @return (void)
             */
            const _this = this
            this.$refs.retailerForm.validate(valid => {
                if (valid) {
                    if (_this.retailerForm.id) {
                        edit_merchant(this.retailerForm).then(({ data }) => {
                            _this.show = false
                            _this.$emit('done')
                        })
                    } else {
                        addMerchant(this.retailerForm).then(({ data }) => {
                            _this.show = false
                            _this.$emit('done')
                        })
                    }
                } else {
                    this.$message({
                        message: '请检查你的输入',
                        type: 'error'
                    })
                }
            })
        },
        handleCancel() {
            /**
             * @description 取消按钮点击事件的返回函数
             * @return (void)
             */
            this.show = false
        },
        handleClosed() {
            this.$refs.retailerForm.resetFields()
            this.retailerForm = this.fromModel
            this.avatarFile = []
            this.posterFile = []
            // this.$emit('done')
        }
    }
}
</script>
<style lang="scss" scoped>
.edit-retailer {
    display: inline-block;
    margin-right: 10px;
    section {
        padding: 12px;
        border: 1px dotted #cacaca;
        border-radius: 4px;
        & + section {
            margin-top: 15px;
        }
    }
}
.upload-disabled {
    /deep/ {
        .el-upload {
            display: none;
        }
    }
}
/deep/ {
    .el-autocomplete {
        width: 100%;
    }
}
</style>