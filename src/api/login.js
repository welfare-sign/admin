/**
 * @description 后台登录相关接口
 * @author 顾超<beyondc@foxmail.com>
 * @swagger http://47.100.29.191:18080/swagger/index.html
 */
export function login(data) {
	/**
	 * @description 密码登录接口
	 * @return (promise)
	 * @data (object):
	 *  @name (string): 用户名
	 *  @password (string): 密码
	 */
	return window.axios({
		url: 'v1/users/login',
		method: 'post',
		data
	})
}
