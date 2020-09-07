/**
 * 接口采用resutful规范，
 * 故每个接口都有post，get，put，delete，patch等方法
 * 
 */
const baseUrl = '/campus'
const campus = {
  menu: `${baseUrl}/module/user-menu`,
  user: `${baseUrl}/user`,
  userId: `${baseUrl}/user/`,
  userList: `${baseUrl}/user/list`,
  tenant: `${baseUrl}/tenant`,
  getTenant:`${baseUrl}/tenant/get-tenant`,
  password:`${baseUrl}/user/password`,
  deleteMore:`${baseUrl}/user/batch/`,
  addWhiteList:`${baseUrl}/user/batch/add`,
  userInfo : `${baseUrl}/user/user-info`
}

export default {
  campus
}