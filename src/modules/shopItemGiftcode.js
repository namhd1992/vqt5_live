import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const SHOPITEMGIFTCODE_REQUEST = 'shopitemgiftcode/SHOPITEMGIFTCODE_REQUEST'
export const SHOPITEMGIFTCODE_RESPONSE = 'shopitemgiftcode/SHOPITEMGIFTCODE_RESPONSE'
export const SHOPITEMGIFTCODE_RESPONSE_BUY = 'shopitemgiftcode/SHOPITEMGIFTCODE_RESPONSE_BUY'
export const SHOPITEMGIFTCODE_RESPONSE_MORE = 'shopitemgiftcode/SHOPITEMGIFTCODE_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOPITEMGIFTCODE_REQUEST:
			return {
				...state,
				waiting: true
			}
		case SHOPITEMGIFTCODE_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case SHOPITEMGIFTCODE_RESPONSE_BUY:
			return {
				...state,
				dataBuy: action.data,
				waiting: false
			}
		case SHOPITEMGIFTCODE_RESPONSE_MORE:
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

export const getData = (limit, offset, type) => {
	return dispatch => {
		dispatch({
			type: SHOPITEMGIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?limit=" + limit + "&offset=" + offset + "&itemType=2";
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEMGIFTCODE_RESPONSE,
				data: response.data.data,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getMoreData = (limit, offset, type) => {
	return dispatch => {
		dispatch({
			type: SHOPITEMGIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?limit=" + limit + "&offset=" + offset + "&itemType=2";
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEMGIFTCODE_RESPONSE_MORE,
				data: response.data.data,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getDataId = (id) => {
	return dispatch => {
		dispatch({
			type: SHOPITEMGIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?itemId=" + id;
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEMGIFTCODE_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const buyItem = (token, scoinToken, id) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: SHOPITEMGIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/shopBuyItem";
		var data = {
			itemId: id,
			scoinToken: scoinToken
		}
		return axios.post(url, data, header).then(function (response) {
			dispatch({
				type: SHOPITEMGIFTCODE_RESPONSE_BUY,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}