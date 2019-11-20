/**
 * @description 后台用户相关接口
 * @author 顾超<beyondc@foxmail.com>
 * @swagger http://47.100.29.191:18080/swagger/index.html
 */

export function queryCustomers(params) {
	/**
	 * @description 获取客户列表接口
	 * @return (promise)
	 *
	 * @params (object):
	 *  @name (string): 用户名
	 *  @mobile (string): 联系电话
	 *  @page_no (number): 页码
	 *  @page_size (number): 页数
	 */
	return window.axios({
		url: 'v1/customers',
		method: 'get',
		params
	})
}

export function getCustomerDetail(params) {
	/**
	 * @description 获取客户详情
	 * @return (promise)
	 *
	 * @params (object):
	 *  @customer_id (string): 客户ID,客户访问时可不传
	 */

	return window.axios({
		url: 'v1/customers/detail',
		method: 'get',
		params
	})
}

export function del_customer(data) {
	/**
	 * @description 删除用户
	 * @return (promise)
	 * 
	 * @data (object):
	 * 	@customer_id (string): 用户id
	 */
	return window.axios({
		url: 'v1/customers',
		method: 'delete',
		data
	})
}

export function disabled_customer(data) {
	/**
	 * @description 禁用用户
	 * @return (promse)
	 * 
	 * @data (object):
	 * 	@customer_id (string): 用户id
	 */
	return window.axios({
		url: 'v1/customers/disable',
		method: 'post',
		data
	})
}