import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const HISTORY_REQUEST = 'history/HISTORY_REQUEST'
export const HISTORY_RESPONSE = 'history/HISTORY_RESPONSE'
export const HISTORY_RESPONSE_MORE = 'history/HISTORY_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case HISTORY_REQUEST:
			return {
				...state,
				waiting: true
			}
		case HISTORY_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case HISTORY_RESPONSE_MORE:
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

export const getData = (token, limit, offset) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: HISTORY_REQUEST
		})
		var url = Ultilities.base_url() + "/shopHistory?shopId=-1&limit=" + limit + "&offset=" + offset;
		return axios.get(url,header).then(function (response) {
			dispatch({
				type: HISTORY_RESPONSE,
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

export const getMoreData = (token, limit, offset) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: HISTORY_REQUEST
		})
		var url = Ultilities.base_url() + "/shopHistory?shopId=-1&limit=" + limit + "&offset=" + offset;
		return axios.get(url,header).then(function (response) {
			dispatch({
				type: HISTORY_RESPONSE_MORE,
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