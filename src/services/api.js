//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GETUSERINFO:`${BASE_URL}/account`,
  ANALYSIS:`${BASE_URL}/browseData/analysis`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,


  UPLOAD: `${BASE_URL}/upload`,
  WECHATPRODUCT: `${BASE_URL}/wechatProduct`,

  WECHARQRANALYSIS: `${BASE_URL}/wechatQrAnalysis`,

  // 整体流量分析
  FULLFLOWANALYSIS: `${BASE_URL}/browseData/fullFlowAnalysis`,
  // 头部在线人数及uv
  BROWSEDATA: `${BASE_URL}/browseData`,
  // 实时数据分析
  DATAANAKYSIS: `${BASE_URL}/browseData/analysis`,
}
