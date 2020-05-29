import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const CHECKIN_REQUEST = 'checkin/CHECKIN_REQUEST'
export const CHECKIN_RESPONSE = 'checkin/CHECKIN_RESPONSE'
export const CHECKIN_ACTION = 'checkin/CHECKIN_ACTION'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case CHECKIN_REQUEST:
			return {
				...state,
				waiting: true
			}
		case CHECKIN_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		case CHECKIN_ACTION:
			return {
				...state,
				actiondata: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: CHECKIN_REQUEST
		})
		var url = Ultilities.base_url() + "checkinItem";
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: CHECKIN_RESPONSE,
				data: [response.data.dataArr, response.data.dataObj]
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const checkin = () => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			// "Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: CHECKIN_REQUEST
		})
		var url = Ultilities.base_url() + "checkin";
		return axios.post(url, {}, header).then(function (response) {
			dispatch({
				type: CHECKIN_ACTION,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}