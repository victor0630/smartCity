/**
 * 接口采用resutful规范，
 * 故每个接口都有post，get，put，delete，patch等方法
 * 
 */
const api = {
    login: "/login",
    tenantLogin: '/tenant-login',
    refreshToken: "/refresh-token",
    authCodeLogin: '/guestWsdl/yxy/open/accesstoken',
    
  }
  
  export default {
    api
  }