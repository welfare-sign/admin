/**
 * @description 后台商户相关接口
 * @author 顾超<beyondc@foxmail.com>
 * @swagger http://47.100.29.191:18080/swagger/index.html
 */

export function queryMerchants (params) {
    /**
     * @description 查询商户列表接口
     * @return (promise)
     * 
     * @params (object):
     *  @store_name (string): 商户名
     *  @contact_name (string): 联系人
     *  @contact_phone (string): 联系电话
     *  @page_no (number): 页码
     *  @page_size (number): 页数
     */
    return window.axios({
        url: 'v1/merchants',
        method: 'get',
        params
    })
}

export function addMerchant (data) {
    /**
     * @description 新增商户接口
     * @return (promise)
     * 
     * @data (object):
     *  @merchant (object):
     *      @address *(string) 地址
     *      @catering_type (string) 餐饮类型
     *      @checkin_days (number) 签到天数多少天可领取礼品
     *      @checkin_num (number) 达到指定签到天数后，可领取的礼品数量
     *      @contact_name (string) 联系人
     *      @contact_phone *(string) 联系人电话
     *      @lat *(number) 纬度
     *      @lon *(number)经度
     *      @poster	(string) 商户海报
     *      @received (number) 已领礼品数量
     *      @store_avatar *(string) 店铺头像
     *      @store_name *(string) 店名
     *      @total_receive *(number) 该店礼品一共可领取总数
     */
    data = {
        merchant: data
    }
    return window.axios({
        url: 'v1/merchants',
        method: 'post',
        data
    })
}

export function getMerchantDetail (params) {
    /**
     * @description 获取商户详情信息
     * @return (promise)
     * 
     * @params (data):
     *  @merchant_id (string): 商户ID,商户访问时可不传
     */
    return window.axios({
        url: 'v1/merchants/detail',
        method: 'get',
        params
    })
}

export function edit_merchant(data) {
    /**
     * @description 编辑商户
     * @return (promise)
     * 
     * @data (object):
     *  @id (string): 商户id
     *  @address *(string) 地址
     *  @catering_type (string) 餐饮类型
     *  @checkin_days (number) 签到天数多少天可领取礼品
     *  @checkin_num (number) 达到指定签到天数后，可领取的礼品数量
     *  @contact_name (string) 联系人
     *  @contact_phone *(string) 联系人电话
     *  @lat *(number) 纬度
     *  @lon *(number)经度
     *  @poster	(string) 商户海报
     *  @received (number) 已领礼品数量
     *  @store_avatar *(string) 店铺头像
     *  @store_name *(string) 店名
     *  @total_receive *(number) 该店礼品一共可领取总数
     */
    data = {
        merchant_id: data.id,
        merchant: data
    }
    return window.axios({
        url: 'v1/merchants',
        method: 'put',
        data
    })
}

export function del_merchant(data) {
    /**
     * @description 删除商户
     * @return (promise)
     * 
     * @data (object):
     *  @merchant_id (string): 商户id
     */
    return window.axios({
        url: 'v1/merchants',
        method: 'delete',
        data
    })
}

export function disabled_merchant(data) {
    /**
     * @description 禁用商户
     * @return (promise)
     * 
     * @data (object):
     *  @merchant_id (string): 商户id
     */
    return window.axios({
        url: 'v1/merchants/disable',
        method: 'post',
        data
    })
}