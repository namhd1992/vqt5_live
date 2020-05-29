import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const MISSION_REQUEST = 'mission/MISSION_REQUEST'
export const MISSION_RESPONSE = 'mission/MISSION_RESPONSE'
export const MISSION_FINISH = 'mission/MISSION_FINISH'
export const MISSION_RESPONSE_MORE = 'mission/MISSION_RESPONSE_MORE'
export const MISSION_RESPONSE_BY_ID_GAME='mission/MISSION_RESPONSE_BY_ID_GAME'
export const MISSION_RESPONSE_INFO='mission/MISSION_RESPONSE_INFO'

const initialState = {
  data: [],
  dataMission:[],
  waiting: false,
  status:'',
  message_server:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MISSION_REQUEST:
      return {
        ...state,
        waiting: true
      }
    case MISSION_RESPONSE:
      return {
        ...state,
        data: action.data,
        totalRecords: action.totalRecords,
        waiting: false
      }
    case MISSION_FINISH:
      return {
        ...state,
        dataFinish: action.data,
        status:action.status,
        message_server:action.message_server
      }
    case MISSION_RESPONSE_MORE:
      return {
        ...state,
        data: state.data.concat(action.data),
        totalRecords: action.totalRecords,
        waiting: false
      }
      case MISSION_RESPONSE_BY_ID_GAME:
      return {
        ...state,
        dataMission: action.dataMission,
				totalRecords: action.totalRecords
      }
    default:
      return state
  }
}

export const getData = (limit, offset) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission/active?limit=" + limit + "&offset=" + offset;
    return axios.get(url, header).then(function (response) {
      dispatch({
        type: MISSION_RESPONSE,
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

export const finishData = (id) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission/finish?mission_id=" + id;
    return axios.get(url, header).then(function (response) {
      dispatch({
        type: MISSION_FINISH,
        data: response,
        status:response.data.status,
        message_server:response.data.message
      })
    }).catch(function (error) {
      dispatch({
				type: SERVER_ERROR
			})
    })
  }
}

export const getMoreData = (limit, offset) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission/active?limit=" + limit + "&offset=" + offset;
    return axios.get(url, header).then(function (response) {
      dispatch({
        type: MISSION_RESPONSE_MORE,
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


export const getMissionByGame = (gameId, token) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
	return dispatch => {
		dispatch({
			type: MISSION_REQUEST
		})
    var url = Ultilities.base_url() + "splayGame/mission?splayGameId=" + gameId;
		return axios.get(url,header).then(function (response) {
			dispatch({
				type: MISSION_RESPONSE_BY_ID_GAME,
				dataMission: response.data.data,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}

export const getInfoMission = (missionId) => {
	return dispatch => {
		dispatch({
			type: MISSION_REQUEST
		})
    var url = Ultilities.base_url() + "getInfoMission?id=" + missionId;
		return axios.get(url).then(function (response) {
			dispatch({
				type: MISSION_RESPONSE_INFO,
				dataInfoMission: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}