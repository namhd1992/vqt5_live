import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const SHOP_REQUEST = 'shop/SHOP_REQUEST'
export const SHOP_RESPONSE = 'shop/SHOP_RESPONSE'
export const SHOP_RESPONSE_MORE = 'shop/SHOP_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOP_REQUEST:
			return {
				...state,
				waiting: true
			}
		case SHOP_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case SHOP_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
				totalRecords: action.totalRecords,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: SHOP_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shoping?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOP_RESPONSE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getMoreData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: SHOP_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shoping?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOP_RESPONSE_MORE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}
