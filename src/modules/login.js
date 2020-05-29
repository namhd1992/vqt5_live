import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'login/LOGIN_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				waiting: true
			}
		case LOGIN_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const login = (sign) => {
	var api_key = Ultilities.splay_api_key();
	// var SERVICE_URL = "http://sandbox.scoin.vn/authapi/";
	var SERVICE_URL = "https://graph.vtcmobile.vn/authapi/";
	return dispatch => {
		dispatch({
			type: LOGIN_REQUEST
		})
		var url = SERVICE_URL + "server/check_device.aspx?api_key=" + api_key + "&sign=" + sign;
		return axios.get(url).then(function (response) {
			dispatch({
				type: LOGIN_RESPONSE,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}