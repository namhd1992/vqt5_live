import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import game from './game'
import auction from './auction'
import giftcode from './giftcode'
import lucky from './lucky'
import home from './home'
import help from './help'
import vip from './vip'
import inbox from './inbox'
import mission from './mission'
import checkin from './checkin'
import profile from './profile'
import tag from './tag'
import history from './history'
import global from './global'
import shop from './shop'
import article from './article'
import shopItem from './shopItem'
import shopItemGiftcode from './shopItemGiftcode'
import itemAndAuction from './itemAndAuction'
import youtubeApi from './youtubeApi'
import login from './login'
import server from './server'
import coin from './coin'
import event from './event'

export default combineReducers({
	routing: routerReducer,
	game,
	auction,
	giftcode,
	lucky,
	home,
	help,
	vip,
	inbox,
	mission,
	profile,
	checkin,
	tag,
	global,
	article,
	shop,
	history,
	shopItem,
	shopItemGiftcode,
	itemAndAuction,
	youtubeApi,
	login,
	server,
	coin,
	event,
})