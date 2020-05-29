import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const GIFTCODE_REQUEST = 'giftcode/GIFTCODE_REQUEST'
export const GIFTCODE_RESPONSE = 'giftcode/GIFTCODE_RESPONSE'
export const TAKE_GIFTCODE_RESPONSE = 'giftcode/TAKE_GIFTCODE_RESPONSE'
export const GIFTCODE_RESPONSE_MORE = 'giftcode/GIFTCODE_RESPONSE_MORE'
export const SHARE_RESPONSE = 'giftcode/GIFTCODE_SHARE_RESPONSE'

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
		case SHARE_RESPONSE:
			return {
				...state,
				dataShare: action.data,
				waiting: false,
			}
		case GIFTCODE_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
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

export const getDataByGame = (gameId) => {
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayGiftcodeEvent?gameId=" + gameId;
		return axios.get(url).then(function (response) {
			dispatch({
				type: GIFTCODE_RESPONSE,
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

export const getData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayGiftcodeEvent?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: GIFTCODE_RESPONSE,
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

export const getMoreData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayGiftcodeEvent?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: GIFTCODE_RESPONSE_MORE,
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

export const getDataId = (id, token) => {
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayGiftcodeEvent?giftcodeId=" + id;
		var header = {};
		if (token != null) {
			header = {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "bearer " + token,
				}
			}
			url = Ultilities.base_url() + "/splayGiftcodeEvent?giftcodeId=" + id;
		}
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: GIFTCODE_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const takeGiftcode = (id, token, scoinToken, deviceId) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/getGiftcode?eventGiftcode=" + id + "&scoinToken=" + scoinToken + "&deviceID=" + deviceId;
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

export const share = (id, token) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: GIFTCODE_REQUEST
		})
		var url = Ultilities.base_url() + "/shareGiftcode";
		var params = { "id": id };
		return axios.post(url, params, header).then(function (response) {
			dispatch({
				type: SHARE_RESPONSE,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

