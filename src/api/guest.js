/**
 * 接口采用resutful规范，
 * 故每个接口都有post，get，put，delete，patch等方法
 *
 */
const baseUrl = '/guest'
const guest = {
  alarm : `${baseUrl}/guest/smart-city/alarm/list`,
  deviceList : `${baseUrl}/guest/smart-city/tenant-device/list`,
  list:`${baseUrl}/guest/blacklist/list`,
  vcharts: `${baseUrl}/guest/megviiStatistics/count`,
  tenantList: `${baseUrl}/guest/smart-city/tenant/list`,
  faceList : `${baseUrl}/guest/smart-city/face/list`,
  info:`${baseUrl}/guest/blacklist/info/`,
  videoPlayUrl : `${baseUrl}/guest/video/getRturl`,
  face:`${baseUrl}/guest/smart-city/face/list`,
  video:`${baseUrl}/guest/equipinfo/getEquipFileQuery`,
  securityDutyChange : `${baseUrl}/guest/equipinfo/securityDutyChange`,
  addBlackList:`${baseUrl}/guest/blacklist/add`,
  batchSecurityDutyChange : `${baseUrl}/guest/equipinfo/batch/securityDutyChange`,
  employeesRepIds:`${baseUrl}/guest/facelibinfo/selectedFaceLibInfo`,
  addEquipinfo:`${baseUrl}/guest/equipinfo/add`,
  delete:`${baseUrl}/guest/blacklist/delete/`,
}

export default {
  guest
}
