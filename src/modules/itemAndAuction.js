import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const ITEMANDAUCTION_REQUEST = 'itemandauction/ITEMANDAUCTION_REQUEST'
export const ITEMANDAUCTION_RESPONSE = 'itemandauction/ITEMANDAUCTION_RESPONSE'
export const ITEMANDAUCTION_RESPONSE_MORE = 'itemandauction/ITEMANDAUCTION_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ITEMANDAUCTION_REQUEST:
			return {
				...state,
				waiting: true
			}
		case ITEMANDAUCTION_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case ITEMANDAUCTION_RESPONSE_MORE:
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
			type: ITEMANDAUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopAndAuction?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: ITEMANDAUCTION_RESPONSE,
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
			type: ITEMANDAUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/shopAndAuction?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: ITEMANDAUCTION_RESPONSE_MORE,
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
