import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const ARTICLE_REQUEST = 'article/ARTICLE_REQUEST'
export const ARTICLE_RESPONSE = 'article/ARTICLE_RESPONSE'
export const ARTICLE_DETAIL_RESPONSE = 'article/ARTICLE_DETAIL_RESPONSE'
export const ARTICLE_RESPONSE_MORE = 'article/ARTICLE_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ARTICLE_REQUEST:
			return {
				...state,
				waiting: true
			}
		case ARTICLE_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case ARTICLE_DETAIL_RESPONSE:
			return {
				...state,
				dataDetail: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case ARTICLE_RESPONSE_MORE:
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

export const getData = (limit, offset, id, searchValue, gameId, articleType) => {
	return dispatch => {
		dispatch({
			type: ARTICLE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayArticle?limit=" + limit + "&offset=" + offset;
		if (id !== undefined) {
			url += "&id=" + id;
		}
		if (searchValue !== undefined) {
			url += "&searchValue=" + searchValue;
		}
		if (gameId !== undefined) {
			url += "&splayGameId=" + gameId;
		}
		if (articleType !== undefined) {
			url += "&articleType=" + articleType;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: ARTICLE_RESPONSE,
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

export const getDataDetail = ( id) => {
	return dispatch => {
		dispatch({
			type: ARTICLE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayArticle";
		if (id !== undefined) {
			url += "?id=" + id;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: ARTICLE_DETAIL_RESPONSE,
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

export const getMoreData = (limit, offset, searchValue, gameId, articleType) => {
	return dispatch => {
		dispatch({
			type: ARTICLE_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/splayArticle?limit=" + limit + "&offset=" + offset;
		if (searchValue !== undefined) {
			url += "&searchValue=" + searchValue;
		}
		if (gameId !== undefined) {
			url += "&splayGameId=" + gameId;
		}
		if (articleType !== undefined) {
			url += "&articleType=" + articleType;
		}
		return axios.get(url).then(function (response) {
			dispatch({
				type: ARTICLE_RESPONSE_MORE,
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
