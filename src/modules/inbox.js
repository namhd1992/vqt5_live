import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const INBOX_REQUEST = 'inbox/INBOX_REQUEST'
export const INBOX_RESPONSE = 'inbox/INBOX_RESPONSE'
export const INBOX_RESPONSE_MORE = 'inbox/INBOX_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case INBOX_REQUEST:
			return {
				...state,
				waiting: true
			}
		case INBOX_RESPONSE:
			return {
				...state,
				data: action.data,
        totalRecords: action.totalRecords,
				waiting: false
			}
		case INBOX_RESPONSE_MORE:
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

export const getData = (limit, offset, token, service) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: INBOX_REQUEST
		})
		var url = Ultilities.base_url() + "inbox?limit=" + limit + "&offset=" + offset + "&serviceId="+service;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: INBOX_RESPONSE,
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

export const getMoreData = (limit, offset, token, service) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: INBOX_REQUEST
		})
		var url = Ultilities.base_url() + "inbox?limit=" + limit + "&offset=" + offset+ "&serviceId="+service;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: INBOX_RESPONSE_MORE,
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