import {GOODS, GOODS_COLUMNS, ANALYSIS} from './api'
import {METHOD, request} from '@/utils/request'

export async function goodsList(params) {
  return request(GOODS, METHOD.GET, params)
}

export async function goodsColumns() {
  return request(GOODS_COLUMNS, METHOD.GET)
}

export async function analysis() {
  return request(ANALYSIS, METHOD.GET)
}

export default {goodsList, goodsColumns, analysis}