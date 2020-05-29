import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const GIFTCODE_REQUEST = 'giftcode/GIFTCODE_REQUEST'
export const GIFTCODE_RESPONSE = 'giftcode/GIFTCODE_RESPONSE'
export const TAKE_GIFTCODE_RESPONSE = 'giftcode/TAKE_GIFTCODE_RESPONSE'
export const GIFTCODE_RESPONSE_MORE = 'giftcode/GIFTCODE_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GIFTCODE_REQUEST:
			return {
				...state,
				waiting: true
			}
		case GIFTCODE_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false,
				totalRecords: action.totalRecords
			}
		case TAKE_GIFTCODE_RESPONSE:
			return {
				...state,
				dataTake: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (id, token) => {
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/pluginGiftcode?scoinGameId=" + id;
		return axios.get(url).then(function (response) {
			dispatch({
				type: GIFTCODE_RESPONSE,
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

export const takeGiftcode = (eventId, scoinToken) => {
	var header = {
		headers: {
			"content-type": "application/json",
		}
	}
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/givePluginGiftcode?scoinToken=" + scoinToken +"&giftcodeEventId="+eventId;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: TAKE_GIFTCODE_RESPONSE,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

