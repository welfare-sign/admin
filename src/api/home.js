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