import request from '@/utils/request'

// 病人列表
export function getList(params) {
  return request({
    url: '/person/list',
    method: 'get',
    params
  })
}
