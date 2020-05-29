import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const GAME_REQUEST = 'game/GAME_REQUEST'
export const GAME_RESPONSE = 'game/GAME_RESPONSE'
export const GAME_DETAIL_RESPONSE = 'game/GAME_DETAIL_RESPONSE'
export const GAME_RESPONSE_RATING = 'game/GAME_RESPONSE_RATING'
export const GAME_RESPONSE_MORE = 'game/GAME_RESPONSE_MORE'

const initialState = {
  data: [],
  waiting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_REQUEST:
      return {
        ...state,
        waiting: true
      }
    case GAME_RESPONSE:
      return {
        ...state,
        data: action.data,
        totalRecords: action.totalRecords,
        waiting: false
			}
		case GAME_DETAIL_RESPONSE:
      return {
        ...state,
        dataDetail: action.dataDetail,
        waiting: false
      }
    case GAME_RESPONSE_RATING:
      return {
        ...state,
        dataRating: action.data,
        waiting: false
      }
    case GAME_RESPONSE_MORE:
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

export const getData = (limit, offset, orderBy, searchValue, tagList) => {
  return dispatch => {
    dispatch({
      type: GAME_REQUEST
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
        type: GAME_RESPONSE,
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

export const getDataId = (id) => {
  return dispatch => {
    dispatch({
      type: GAME_REQUEST
    })
    var url = Ultilities.base_url() + "/game/detail?service_id=" + id;
    return axios.get(url).then(function (response) {
      dispatch({
        type: GAME_DETAIL_RESPONSE,
        dataDetail: response.data.data
      })
    }).catch(function (error) {
      dispatch({
				type: SERVER_ERROR
			})
    })
  }
}

export const rating = (id, point, token) => {
  var header = {
    headers: {
      "content-type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: GAME_REQUEST
    })
    var data = {gameId: id, point: point};
    var url = Ultilities.base_url() + "/reivewGame";
    return axios.post(url, data, header).then(function (response) {
      dispatch({
        type: GAME_RESPONSE_RATING,
        data: response.data
      })
    }).catch(function (error) {
      dispatch({
				type: SERVER_ERROR
			})
    })
  }
}

export const getMoreData = (limit, offset, orderBy, searchValue, tagList) => {
  return dispatch => {
    dispatch({
      type: GAME_REQUEST
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
        type: GAME_RESPONSE_MORE,
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