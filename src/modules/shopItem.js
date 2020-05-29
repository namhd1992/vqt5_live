import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const SHOPITEM_REQUEST = 'shopitem/SHOPITEM_REQUEST'
export const SHOPITEM_RESPONSE = 'shopitem/SHOPITEM_RESPONSE'
export const SHOPITEM_RESPONSE_BUY = 'shopitem/SHOPITEM_RESPONSE_BUY'
export const SHOPITEM_RESPONSE_MORE = 'shopitem/SHOPITEM_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SHOPITEM_REQUEST:
			return {
				...state,
				waiting: true
			}
		case SHOPITEM_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case SHOPITEM_RESPONSE_BUY:
			return {
				...state,
				dataBuy: action.data,
				waiting: false
			}
		case SHOPITEM_RESPONSE_MORE:
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
			type: SHOPITEM_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?limit=" + limit + "&offset=" + offset + "&itemType=1";
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEM_RESPONSE,
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
			type: SHOPITEM_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?limit=" + limit + "&offset=" + offset + "&itemType=1";
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEM_RESPONSE_MORE,
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
			type: SHOPITEM_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopingItem?itemId=" + id;
		return axios.get(url).then(function (response) {
			dispatch({
				type: SHOPITEM_RESPONSE,
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
			type: SHOPITEM_REQUEST
		})
		var url = Ultilities.base_url() + "/shopBuyItem";
		var data = {
			itemId: id,
			scoinToken: scoinToken
		}
		return axios.post(url, data, header).then(function (response) {
			dispatch({
				type: SHOPITEM_RESPONSE_BUY,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}