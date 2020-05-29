import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const EVENT_REQUEST = 'event/EVENT_REQUEST'
export const EVENT_ACTION = 'event/EVENT_ACTION'
export const EVENT_GETLINK = 'event/EVENT_GETLINK';
export const EVENT_ADDPOINT='event/EVENT_ADDPOINT';
export const EVENT_ALLGAME='event/EVENT_ALLGAME';


const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case EVENT_REQUEST:
			return {
				...state,
				waiting: true
			}
		case EVENT_ACTION:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		case EVENT_GETLINK:
			return {
				...state,
				dataLink: action.data,
				waiting: false
			}
		case EVENT_ADDPOINT:
			return {
				...state,
				dataPoint: action.data,
				waiting: false
			}
		case EVENT_ALLGAME:
			return {
				...state,
				dataEventGame: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const changePoint = (scoinToken, eventGameId, giftValue) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + scoinToken,
		}
	}
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var data = {
			"eventGameId": eventGameId,
			"giftValue": giftValue
		}
		var url = Ultilities.base_url() + "/exchange-gift";
		return axios.post(url, data, header).then(function (response) {
			dispatch({
				type: EVENT_ACTION,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getLink = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var url = Ultilities.base_url() + "join-event";
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: EVENT_GETLINK,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const addPoint = (token, parentScoinId, facebookId) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		},
		parentScoinId: parentScoinId,
		facebookId:facebookId,
	}
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var url = Ultilities.base_url() + "use-link/?parentScoinId="+parentScoinId+"&facebookId="+facebookId;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: EVENT_ADDPOINT,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const eventGame = () => {
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var url = Ultilities.base_url() + "anonymous/event-game";
		return axios.get(url).then(function (response) {
			dispatch({
				type: EVENT_ALLGAME,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}