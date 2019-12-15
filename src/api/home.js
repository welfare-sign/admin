export function checkin_record_list() {
    return window.axios({
        url: 'v1/users/checkin_record_list',
        method: 'get'
    })
}

export function modify(data) {
    return window.axios({
        url: 'v1/users/checkin_record_list/modify',
        method: 'post',
        data
    })
}

export function get_checkin_num(params) {
    return window.axios({
        url: 'v1/stat/checkin',
        method: 'get',
        params
    })
}

export function get_regist_num(params) {
    return window.axios({
        url: 'v1/stat/register',
        method: 'get',
        params
    })
}