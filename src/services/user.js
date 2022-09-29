import {
    LOGIN,
    ROUTES,
    UPLOAD,
    WECHATPRODUCT,
    WECHARQRANALYSIS,
    FULLFLOWANALYSIS,
    BROWSEDATA,
    DATAANAKYSIS
  } from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    username: name,
    password: password
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}


/**
 * 图片上传
 * @param file file
 */
 export async function upload(file) {
  return request(UPLOAD, METHOD.POST, {
    params:{file},
    headers: {'Content-Type': 'application/form-data'},
  })
}

/**
 * 添加微信产品
 * @param  data 
 * @returns 
 */
export async function wechatProduct(data){
  const {name,wechatUrl,wechatNo,url} = data
  return request(WECHATPRODUCT, METHOD.POST, {
    name,
    wechatNo,
    wechatUrl,
    url,
    token: sessionStorage.getItem('token')
  },{
  })
}

/**
 * 修改微信产品
 * @param  data 
 * @returns 
 */
 export async function modifyWechatProduct(data){
  const {name,wechatUrl,wechatNo,url,id} = data
  return request(`${WECHATPRODUCT}/${id}`, METHOD.PUT, {
    name,
    wechatNo,
    wechatUrl,
    url,
    id:id,
    token: sessionStorage.getItem('token')
  },{
  })
}


/**
 * 获取微信产品分页
 * @param {*} data 
 * @returns 
 */
export async function getwechatProduct(data){
  const {pageSize,pageNumber,name,wechatNo} = data
  return request(WECHATPRODUCT, METHOD.GET, {
    pageSize,
    pageNumber,
    name,
    wechatNo,
    token: sessionStorage.getItem('token')
  },{
  })
}


/**
 * 获取微信产品分页
 * @param {*} data 
 * @returns 
 */
 export async function getSingleWechatProduct(data){
  const {id} = data
  return request(WECHATPRODUCT, METHOD.GET, {
    id,
    token: sessionStorage.getItem('token')
  },{
  })
}

/**
 * 删除微信产品
 * @param {*} data 
 * @returns 
 */
 export async function delSingleWechatProduct(data){
  const {id} = data
  return request(`${WECHATPRODUCT}/${id}`, METHOD.DEL, {
    token: sessionStorage.getItem('token')
  },{
  })
}


/**
 * 二维码复制分析
 * @param {*} data 
 * @returns 
 */
 export async function wechatQrAnalysis(){
  return request(WECHARQRANALYSIS, METHOD.GET, {
    token: sessionStorage.getItem('token')
  },{
  })
}


/**
 * 整体流量分析
 * @param {*} data 
 * @returns 
 */
 export async function fullFlowAnalysis(data){
  const { pageSize, pageNumber, startTime, endTime} = data
  return request(FULLFLOWANALYSIS, METHOD.GET, {
    pageSize, pageNumber, startTime, endTime,
    token: sessionStorage.getItem('token')
  },{
  })
}



/**
 * 头部在线人数及uv
 * @param {*} data 
 * @returns 
 */
 export async function browseData(){
  return request(BROWSEDATA, METHOD.GET, {
    token: sessionStorage.getItem('token')
  },{
  })
}



/**
 * 实时数据分析
 * @param {*} data 
 * @returns 
 */
 export async function dataAnalysis(){
  return request(DATAANAKYSIS, METHOD.GET, {
    token: sessionStorage.getItem('token')
  },{
  })
}




export default {
  login,
  logout,
  getRoutesConfig,
  wechatProduct,
  getwechatProduct,
  getSingleWechatProduct,
  delSingleWechatProduct,
  wechatQrAnalysis,
}
