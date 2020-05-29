import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR, SERVER_ERROR_OTHER} from './server'
export const COIN_REQUEST = 'coin/COIN_REQUEST'
export const COIN_RESPONSE = 'coin/COIN_RESPONSE'
export const CHANGE_COIN_RESPONSE = 'coin/CHANGE_COIN_RESPONSE';
export const COIN_GAME_RESPONSE='coin/COIN_GAME_RESPONSE';

const initialState = {
	data: [],
	dataGame:[],
	waiting: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case COIN_REQUEST:
			return {
				...state,
				waiting: true
			}
		case COIN_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case COIN_GAME_RESPONSE:
			return {
				...state,
				dataGame: action.dataGame,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case CHANGE_COIN_RESPONSE:
			return {
				...state,
				status:action.data.status,
				totalRecords: action.data.totalRecords,
				waiting: false
			}
		case SERVER_ERROR_OTHER:
			return {
				...state,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (token, coin, serviceId) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: COIN_REQUEST
		})
		var url = Ultilities.base_url() + "scoin/exchange/info?action="+coin+"&serviceId="+serviceId;
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: COIN_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getDataGame = (limit, offset, orderBy, searchValue, tagList) => {
	return dispatch => {
	  dispatch({
		type: COIN_REQUEST
	  })
	  var url = Ultilities.base_url() + "/anonymous/splayGame?limit=" + limit + "&offset=" + offset;
	  if (orderBy !== "") {
		url += "&orderBy=" + orderBy;
	  }
	  if (searchValue !== "") {
		url += "&searchValue=" + searchValue;
	  }
	  if (tagList !== "") {
		url += "&tagList=" + tagList;
	  }
	  return axios.get(url).then(function (response) {
		dispatch({
		  type: COIN_GAME_RESPONSE,
		  dataGame: response.data.dataArr,
		  totalRecords: response.data.totalRecords
		})
	  }).catch(function (error) {
		dispatch({
				  type: SERVER_ERROR
			  })
	  })
	}
  }

export const changeCoin = (token, packageXO, packageXu, coin, serviceId) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	var body = {
		packageExchangeXO: packageXO,
		packageExchangeXU: packageXu,
		action: coin,
		serviceId:serviceId
	}
	return dispatch => {
		dispatch({
			type: COIN_REQUEST
		})
		var url = Ultilities.base_url() + "scoin/exchange/exchange";
		return axios.post(url, body, header).then(function (response) {
			dispatch({
				type: CHANGE_COIN_RESPONSE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR_OTHER
			})
		})
	}
}