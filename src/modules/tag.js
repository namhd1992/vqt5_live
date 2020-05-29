import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const TAG_REQUEST = 'tag/TAG_REQUEST'
export const TAG_RESPONSE = 'tag/TAG_RESPONSE'
export const TAG_RESPONSE_MORE = 'tag/TAG_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case TAG_REQUEST:
			return {
				...state,
				waiting: true
			}
		case TAG_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case TAG_RESPONSE_MORE:
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

export const getData = (limit, offset, searchValue) => {
	return dispatch => {
		dispatch({
			type: TAG_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayTag?limit=" + limit + "&offset=" + offset;
		if (searchValue !== "" && searchValue !== undefined) {
			url += "&searchValue=" + searchValue;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: TAG_RESPONSE,
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

export const getMoreData = (limit, offset, searchValue) => {
	return dispatch => {
		dispatch({
			type: TAG_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayTag?limit=" + limit + "&offset=" + offset;
		if (searchValue !== "" && searchValue !== undefined) {
			url += "&searchValue=" + searchValue;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: TAG_RESPONSE_MORE,
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