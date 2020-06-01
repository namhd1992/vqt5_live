import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
	getCountBonus,
	getKeys,
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'

import bg_btime from './images/bg-btime.png'
import bg_m_320 from './images/bg-m-320.png'
import bg_m_480 from './images/bg-m-480.png'
import bg_m_1024 from './images/bg-m-1024.png'
import bg_m from './images/bg-m.png'
import bg from './images/bg.png'
import btn_mo_1lan from './images/btn-mo-1lan.png';
// import bg_float_left from './images/bg-float-left.gif';
import btn_mo_tiep1ruong from './images/btn-mo-tiep1ruong.png';
import btn_mo_tieptudong from './images/btn-mo-tieptudong.png';
import btn_mo_tudong from './images/btn-mo-tudong.png';
import btn_napgame from './images/btn-napgame.png';
import btn_them_chiakhoa from './images/btn-them-chiakhoa.png';
import btn_xem_khobau from './images/btn-xem-khobau.png';
import emoij_sad from './images/emoij-sad.png';
import emoij_vv from './images/emoij-vv.png';
import label_bvd from './images/label-bvd.png';
import menu_float_left from './images/menu-float-left.png';
import menu_float_right from './images/menu-float-right.png';
import thumb_item_giaithuong from './images/thumb-item-giaithuong.png';
import btn_dangnhap from './images/btn-dangnhap.png'
import key_yellow_icon from './images/key-yellow-icon.png';
import ruong_icons from './images/ruong-icons.png';
import khobau from './images/khobau.gif';
import logo_scoin from './images/logo-scoin.png';
import ReactResizeDetector from 'react-resize-detector'
// import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			isAll:true,
			stop:true,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			type_item: 'highlights',
			
			activeVinhDanh:1,
			listVinhDanh:[],
			countVinhDanh:0,

			activeKey:1,
			listKey:[],
			countKey:0,

			activeRuong:1,
			listRuong:[],
			countRuong:0,

			activeBonus:1,
			listCodeBonus:[],
			countCodeBonus:0,

			dataTuDo:[],
			dataCodeBonus:[],	
			listHistory:[],
			
			listCountBonus:[],
			width:0,
			height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			user:{},
			xacthuc:false,
			status_sukien:'',
			start:false,
			live:false,
			finish: false,
			turnsBuyInfo:[],
			soinValue:0,
			hideNav:false,
			goldTimeStatus:false,
			textAuto: true,
		};
	}
	componentWillMount(){
		window.removeEventListener('scroll', this.handleScroll);
		this.resize()
	}

	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 1).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					if(data.status==='01'){
						var time=Date.now();
						var goldTimeEnd=data.data.luckySpin.goldTimeEnd;
						var goldTimeStatus=data.data.luckySpin.goldTimeEnd;
						var isGoal=goldTimeEnd - time > 0 ? true :false;
						var goal=false;
						if(goldTimeStatus && isGoal){
							goal=true;
						}
						this.setState({userTurnSpin:data.data.userTurnSpin, user:user, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), turnsBuyInfo:data.data.userTurnSpin.turnsBuyInfo, isLogin:true, goldTimeStatus:goal},()=>{
							this.getStatus(data.data.luckySpin);
						})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu người dùng. Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
				
			});
		} else {
			this.props.getRotationDetailData(1).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					if(data.status==='01'){
						var time=Date.now();
						var goldTimeEnd=data.data.luckySpin.goldTimeEnd;
						var goldTimeStatus=data.data.luckySpin.goldTimeEnd;
						var isGoal=goldTimeEnd - time > 0 ? true :false;
						var goal=false;
						if(goldTimeStatus && isGoal){
							goal=true;
						}
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:false, goldTimeStatus:goal}, ()=>{
							this.getStatus(data.data.luckySpin);
						})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu.  Vui lòng tải lại trang.'})
					}
				}else{
					// $('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
		}
		this.getDataVinhDanh('highlights',1);
		window.addEventListener('scroll', this.handleScroll);
		$("#demo").carousel({interval: 3000});
	}

	componentWillUnmount() {
		// clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	resize() {
		let isMobile = (window.innerWidth <= 760);
		if (isMobile) {
			this.setState({limit:5});
		}else{
			this.setState({limit:10});
		}
	}

	onResize=()=>{
		this.resize()
	}

	getStatus=(luckySpin)=>{
		const {goldTimeStatus}=this.state;
		var start=luckySpin.startDate;
		var time=Date.now();
		var end=luckySpin.endDate;
		var goldTimeStart=luckySpin.goldTimeStart;
		var goldTimeEnd=luckySpin.goldTimeEnd;
		const hh=48*360*1000;
		var goal_upcoming=(goldTimeStart - time > 0 && goldTimeStart - time < hh) ? true : false;
		var isGoal=goldTimeEnd - time > 0 ? true :false;
		
		if(goldTimeStatus && isGoal){
			this.timeRemain(goldTimeEnd)
			this.setState({ status_sukien: "Giờ Vàng còn lại", live:true});
		}else{
			if(goldTimeStatus){
				this.setState({goldTimeStatus:false});
			}
			if(goal_upcoming){
				this.timeRemain(goldTimeStart)
				this.setState({ status_sukien: 'Sắp tới giờ vàng.', message_status:"Sắp tới giờ vàng.", start:true});
			}else{
				if (time < start) {
					this.timeRemain(start)
					this.setState({ status_sukien: 'Sự kiện chưa diễn ra.', message_status:"Sự kiện chưa diễn ra.", start:true});
				}
				if (time > start && time < end) {
					this.timeRemain(end)
					this.setState({ status_sukien: "Sự kiện đang diễn ra", live:true});
				}
				if (time > end) {
					this.setState({ status_sukien: "Sự kiện đã kết thúc.", message_status:"Sự kiện đã kết thúc.", finish:true});
				}
			}
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}else{
			$('#myModal12').modal('show');
		}
	}
	logoutAction = () => {
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto, auto, type_item}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if (user !== null) {
			if(turnsFree>0){
				this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
					var data=_this.props.dataPick;
					var list=this.state.data_auto;
					
					if(data!==undefined){
						if(data.status ==="01"){
							if(auto){
								var elem = document.getElementById('auto');
								list.push(data.data.description);
								this.getDetailData()
								_this.setState({data_auto: list});
								elem.scrollTop = elem.scrollHeight;
								if(data.data.type!=="ACTION"){
									this.setState({noti_tudo:true})
									this.getDataVinhDanh(type_item, 1);	
								}
							}else{
								$('#Khobau').modal('show');
								setTimeout(() => {
									if(data.data.type!=="ACTION"){
										$('#chucmung').modal('show');
										this.setState({noti_tudo:true})
										this.getDataVinhDanh(type_item, 1);
									}else{
										$('#ruongrong').modal('show');
									}
									this.getDetailData();
									$('#Khobau').modal('hide');
									_this.setState({itemBonus: data.data});
								}, 1700);
								
							}	
							
						}else if(data.status ==="04"){
							$('#myModal13').modal('show');
						}else if(data.status ==="07"){
								this.setState({message_status:"Sự kiện chưa diễn ra hoặc đã kết thúc."},()=>{
								$('#myModal8').modal('show');
							})
						}else if(data.status ==="10"){
							this.setState({message_status:"Bạn cần xác nhận số ĐT để chơi.", xacthuc:true},()=>{
								$('#myModal8').modal('show');
							})
						}else{
							$('#myModal11').modal('show');
							this.setState({message_error:'Sự kiện đang có lỗi. Vui lòng tải lại trang.'})
						}
					}else{
						$('#myModal12').modal('show');
						this.setState({server_err:true})
					}
				})
				
			}else{
				$('#hetchiakhoa').modal('show');
			}
		} else {
			$('#myModal5').modal('show');
		}
	}

	btnStart=()=>{
		const {server_err, start, finish}=this.state;
		console.log(start)
		$('#chucmung').modal('hide');
		$('#ruongrong').modal('hide');
		if(server_err){
			$('#myModal12').modal('show');
		}else{
			if(start){
				this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
					$('#myModal8').modal('show');
				})
			}else if(finish){
				this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
					$('#myModal8').modal('show');
				})
			}else{
				this.setState({data_auto:[], closeAuto:true},()=>{
					this.start();
				})
			}
		}
	}


	autoOpen=()=>{
		const {turnsFree, luckySpin, server_err, start, finish}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		$('#chucmung').modal('hide');
		$('#ruongrong').modal('hide');
		if(server_err){
			$('#myModal12').modal('show');
		}else{
			if (user !== null) {
				if(start){
					this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
						$('#myModal8').modal('show');
					})
				}else if(finish){
					this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
						$('#myModal8').modal('show');
					})
				}else{
					if(turnsFree>0){
						$('#Khobau').modal('show');
						setTimeout(() => {
							$('#motudong').modal('show');
							this.setState({auto:true},()=>{
								this.start()
							});
							$('#Khobau').modal('hide');
						}, 1700);
						
					}else{
						$('#hetchiakhoa').modal('show');
					}
				}
			} else {
				$('#myModal5').modal('show');
			}
		}	
	}


	getDetailData=()=>{
		const {auto, luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, luckySpin.id).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				var turnsFree=data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy;
				if(data.status==='01'){
					if(turnsFree>0){
						if(auto){
							var timeout =setTimeout(() => {
								this.start();
							}, 2000);
							this.setState({timeout: timeout});	
						}
					}else{
						$('#hetchiakhoa').modal('show');
						this.setState({textAuto:false})
					}
					this.setState({turnsFree:turnsFree})
				}else if(data.status ==="04"){
					$('#myModal13').modal('show');
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}


	timeRemain=(times)=>{
		var _this=this;
		const {luckySpin}=this.state;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
			}else{
				_this.getStatus(luckySpin)
			}
		}, 1000);
	}


	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.getDataTuDo(user);
			$('#chucmung').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}




	showModalCodeBonus=(pageNumber)=>{
		var user = JSON.parse(localStorage.getItem("user"));
		console.log(user)
		if(user !== null){
			this.getBonus(user, pageNumber)
			$('#chucmung').modal('hide');
		}else {
			$('#myModal5').modal('show');
		}
	}

	getBonus=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		this.props.getTuDo(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					$('#lichsu').modal('show');
					this.setState({listCodeBonus:data.data, countCodeBonus:data.totalRecords, noti_tudo:false})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}



	getRuong=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getHistoryTuDo(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listRuong:data.data, countRuong: data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getKey=(user, pageNumber)=>{
		const {luckySpin, limit}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getKeys(user.access_token, luckySpin.id, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataListKey;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listKey:data.data, countKey: data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getDataVinhDanh=(type_item, pageNumber)=>{
		this.setState({type_item:type_item},()=>{
			this.getVinhDanh(pageNumber);
		})
	}

	getVinhDanh=(pageNumber)=>{
		const {limit, luckySpin, type_item}=this.state;
		this.props.getVinhDanh(1, 10, (pageNumber-1), type_item).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				
				if(data.status==='01'){	
					var n=10-data.data.length;
					var listEmpty=[];
					for (let i = 0; i < n; i++) {
						let obj={date: '...', description: null, itemName: '...', userName: '...', phone: '...'}
						listEmpty.push(obj);
					}
					var listData=data.data.concat(listEmpty)
					this.setState({listVinhDanh:listData, countVinhDanh: Math.ceil(data.totalRecords/10)*10})
				}else if(data.status==='03'){
					var listEmpty=[];
					for (let i = 0; i < 10; i++) {
						let obj={date: '...', description: null, itemName: '...', userName: '...', phone: '...'}
						listEmpty.push(obj);
					}
					this.setState({listVinhDanh:listEmpty, countVinhDanh: 10})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}



	openGiaiThuong=()=>{
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getCountBonus().then(()=>{
			
			var data=this.props.dataCountBonus;
			if(data!==undefined){
				if(data.status==='01'){
					$('#GiaiThuong').modal('show');
					this.setState({listCountBonus:data.data})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
		
	}

	openThemLuot=()=>{
		const {start, finish}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			if(start){
				this.setState({message_status:"Sự kiện chưa diễn ra."},()=>{
					$('#myModal8').modal('show');
				})
				
			}else if(finish){
				this.setState({message_status:"Sự kiện đã kết thúc."},()=>{
					$('#myModal8').modal('show');
				})
			}else{
				$('#themchiakhoa').modal('show');
			}
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		const {timeout}=this.state;
		this.setState({ auto:false});
		clearTimeout(timeout)
		$('#motudong').modal('hide');
	}



	hideModalDetailBonus=()=>{
		$('#chucmung').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	closeModal7=()=>{
		$('#ruongrong').modal('hide');
		this.btnStart()
	}

	closeModal4=()=>{
		$('#chucmung').modal('hide');
		this.btnStart();
	}


	handlePageChangeRuong=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeRuong: pageNumber},()=>{
			this.getRuong(user, pageNumber)
		})
	}

	handlePageChangeKey=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeKey: pageNumber},()=>{
			this.getKey(user, pageNumber)
		})
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeBonus: pageNumber},()=>{
			this.getBonus(user, pageNumber)
		})
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		const {type_item}=this.state;
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getDataVinhDanh(type_item, pageNumber)
		})
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}


	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}
	getUsername=(name)=>{
		var len=name.length;
		if(len>10){
		  return name.substring(0,10)+'...'
		}else{
		  return name;
		}
	}
	titleName=(name)=>{
		return 'Xin chào '+name;
	}

	getNameScoin=(name)=>{
		if(name.indexOf('Scoin')!==-1){
			return name.substring(0, name.indexOf('Scoin'))
		}else{
			return name
		}
	}


	render() {
		const {textAuto,type_item, goldTimeStatus, soinValue,listCountBonus, listKey, activeKey, turnsBuyInfo,status_sukien, xacthuc, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, message_status, data_auto,message_error,
			activeRuong, activeHistory, activeBonus, activeVinhDanh, limit, countCodeBonus, countRuong, countKey, countVinhDanh, listHistory, listCodeBonus, listRuong, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, hour_live, minute_live, second_live, user}=this.state;
		const { classes } = this.props;
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (
		<div style={{backgroundColor:'#000005'}}>
			<div class={goldTimeStatus ? "container-fluid bg-page position-relative" : "container-fluid b-bg-page position-relative"} >
				<div class="k-fixed-bottom">
					<div class="k-box-time">
						<h2 class="text-center text-white font-weight-bold font-italic" style={{marginBottom:15}}>{status_sukien}</h2>
						<table class="table table-borderless k-tbl-boxtime m-0 p-0" align="center">
						<tr>
							<td class="k-cell-timer-p1 text-white k-display-5 text-center font-weight-bold p-1 align-middle font-mijasultra">{day}</td>
							<td class="k-cell-timer-p1 text-white k-display-5 text-center font-weight-bold p-1 align-middle font-mijasultra">{hour}</td>
							<td class="k-cell-timer-p1 text-white k-display-5 text-center font-weight-bold p-1 align-middle font-mijasultra">{minute}</td>
							<td class="k-cell-timer-p1 text-white k-display-5 text-center font-weight-bold p-1 align-middle font-mijasultra">{second}</td>
						</tr>
						<tr>
							<td align="center" class="pt-0 k-h6 text-white font-italic pb-1">Ngày</td>
							<td align="center" class="pt-0 k-h6 text-white font-italic pb-1">Giờ</td>
							<td align="center" class="pt-0 k-h6 text-white font-italic pb-1">Phút</td>
							<td align="center" class="pt-0 k-h6 text-white font-italic pb-1">Giây</td>
						</tr>
						</table>
					</div>
					{(isLogin)?(<div class="k-box-key">
						<div class="d-flex justify-content-around">
							<div class="mo-1"><a title="Mở 1 lần" data-toggle="modal" onClick={this.btnStart}><img class="img-hover" src={btn_mo_1lan} width="100" alt="Mở 1 lần"  /></a></div>
						<div class="mo-td"><a title="Mở tự động" data-toggle="modal" onClick={this.autoOpen}><img class="img-hover" src={btn_mo_tudong} width="100" alt="Mở tự động" /></a></div>
						</div>
						<div>
							<p class="font14" style={{textAlign:'center', color:'#fff', marginBottom:5, marginTop:5}}>Chìa khóa còn lại: {turnsFree ? turnsFree.toLocaleString() :0} <img src={key_yellow_icon}  width="20"/></p>
						</div> 
						<div class="d-flex justify-content-center">
							<div class="them-chia-khoa"><a title="Thêm chìa khóa" data-toggle="modal" data-target="#themchiakhoa" onClick={this.openThemLuot}><img class="img-hover" src={btn_them_chiakhoa} width="100" alt="Thêm chìa khóa" /></a></div>
						</div>
						<p class="font12 text-white text-center pt-1">Đang đăng nhập &lt;{this.getUsername(userTurnSpin.currName)}&gt; <a class="text-info" href="#" title="Thoát" onClick={this.logoutAction}>Thoát</a></p>
						
					</div>):( <div class="k-box-key">            
						<div class="d-flex justify-content-center pt-1">
							<div class="them-chia-khoa"><a href="#" title="Đăng nhập" onClick={this.loginAction}><img  src={btn_dangnhap} width="150" alt="Đăng Nhập" /></a></div>
						</div>            
					</div>)}
					
				</div>
				<div class="container">
					<div class="float-left">
						<ul class="nav flex-column text-float-left">
							<li class="mt-5"><a href="https://scoin.vn/nap-game" title="Nạp Game" target="_blank">&nbsp;</a></li>
							<li class="mt-3"><a href="#" title="Thể lệ" data-toggle="modal" data-target="#thele">&nbsp;</a></li>
							<li class="mt-3"><a href="#" title="Vinh danh" data-toggle="modal" data-target="#bangvinhdanh" onClick={()=>this.getDataVinhDanh(type_item,1)}>&nbsp;</a></li>
						</ul>
					</div>
					<div class="float-right">
						<ul class="nav flex-column text-float-right">
							<li class="mt-3"><a href="#" title="Giải thưởng" data-toggle="modal" data-target="#bgiaithuong" onClick={this.openGiaiThuong}>&nbsp;</a></li>
							<li class="mt-3"><a href="#" title="Lịch sử" data-toggle="modal" onClick={()=>this.showModalCodeBonus(1)}>&nbsp;</a>{notification_tudo}</li>
						</ul>
					</div>
				</div>
				<div class="footer">
					<p class="font12 text-center pb-0 mb-0"><a class="text-info" href="https://cs.vtcmobile.vn/" title="Hỗ trợ" target="_blank"><span>Hỗ trợ</span></a> | <a class="text-info" href="https://www.facebook.com/scoinvtcmobile" title="Fanpage" target="_blank"><span>Fanpage</span></a> | <a class="text-info" href="tel:19001104"><span>Điện thoại: <strong>1900 1104</strong></span></a></p>
					<p class="font12 text-center text-white-50 pt-0">
						Hệ thống phát hành game VTC Mobile
						<br />
						Copyright &copy;2020 VTC Mobile. All rights reserved
					</p>
				</div>
			</div>

			
			{/* The Modal Phần thưởng */}
			<div class="modal fade" id="bgiaithuong">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold pl-4 text-uppercase">Giải thưởng</span></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body pt-2">
						<div class="row">
							{listCountBonus.map((obj, key) => (
								<div class="col-lg-3 col-md-4 col-6 p-1">
									{(goldTimeStatus)?(<div>
										{(obj.itemName==='5 Triệu Scoin')?(<div class="media border pt-1 pr-0 pb-1 pl-1 bg-item-giaithuong bg-danger progress-bar-striped progress-bar-animated shadow-sm">
											<img src={thumb_item_giaithuong} alt="5 triệu Scoin" class="mr-1" width="45" />
											<div class="media-body">
												<h4 class="font12 font-weight-bold text-uppercase text-white mb-0">10 Triệu <img src={logo_scoin} width="45" class="img-fluid" /></h4>
												<p class="font12 mb-0 text-white">Duy nhất Giờ vàng</p>
											</div>
										</div>):(<div class="media border pt-1 pr-0 pb-1 pl-1 bg-item-giaithuong">
											<img src={thumb_item_giaithuong} alt="5 triệu Scoin" class="mr-1" width="45" />
											<div class="media-body">
												<h4 class="font12 font-weight-bold text-uppercase text-danger mb-0">{this.getNameScoin(obj.itemName)} <img src={logo_scoin} width="45" class="img-fluid" /></h4>
												<p class="font12 mb-0">Còn {obj.itemQuantityExist ? obj.itemQuantityExist.toLocaleString() :0} giải</p>
											</div>
										</div>)}
										
									</div>):(
										<div>
											{(obj.itemName==='5 Triệu Scoin')?(<div class="media border pt-1 pr-0 pb-1 pl-1 bg-item-giaithuong">
											<img src={thumb_item_giaithuong} alt="5 triệu Scoin" class="mr-1" width="45" />
											<div class="media-body">
												<h4 class="font12 font-weight-bold text-uppercase text-danger mb-0">5 Triệu <img src={logo_scoin} width="45" class="img-fluid" /></h4>
												<p class="font12 mb-0 text-danger">Mỗi ngày 1 giải</p>
											</div>
										</div>):(<div class="media border pt-1 pr-0 pb-1 pl-1 bg-item-giaithuong">
											<img src={thumb_item_giaithuong} alt="5 triệu Scoin" class="mr-1" width="45" />
											<div class="media-body">
												<h4 class="font12 font-weight-bold text-uppercase text-danger mb-0">{this.getNameScoin(obj.itemName)} <img src={logo_scoin} width="45" class="img-fluid" /></h4>
												<p class="font12 mb-0">Còn {obj.itemQuantityExist ? obj.itemQuantityExist.toLocaleString() :0} giải</p>
											</div>
										</div>)}
										</div>
									)}
								</div>
							))}
						</div>
						<div class="font14 pt-4">
							<h5 class="text-uppercase font14 font-weight-bold text-center">Cơ cấu giải thưởng</h5>
							<div class="text-center">
								<ul class="list-unstyled">
									<li><p class="mb-0"><span style={{fontSize:25}}>&#8226;</span>&nbsp;&nbsp;  Giải đặc biệt - rương báu 5 triệu Scoin: mỗi ngày tối đa 01 giải.</p></li>
									<li><p class="mb-0"><span style={{fontSize:25}}>&#8226;</span>&nbsp;&nbsp;  Các giải khác: không giới hạn số lượng giải mỗi ngày</p></li>
									<li><p class="mb-0"><span style={{fontSize:25}}>&#8226;</span>&nbsp;&nbsp;  Tất cả giải thưởng Scoin sẽ được cộng trực tiếp vào tài khoản của game thủ.</p></li>
								</ul>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Bang vinh danh --> */}
			<div class="modal fade" id="bangvinhdanh">
				<div class="modal-dialog modal-dialog-scrollable">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<h4 class="modal-title w-100 text-center pl-4"><img src={label_bvd} width="200" /></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<ul class="nav nav-pills nav-justified pop-custom">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="pill" href="#giaidacbiet" onClick={()=>this.getDataVinhDanh('highlights',1)}>Giải đặc biệt</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#cacgiaikhac" onClick={()=>this.getDataVinhDanh('',1)}>Các giải khác</a>
						</li>
						</ul>
						<div class="tab-content">
							<div class="px-0 tab-pane container active" id="giaidacbiet">
								<table class="table table-borderless table-striped small text-center">
									<thead>
										<tr style={{borderBottom: "solid 2px #10e0e0"}}>
											<th class="align-top">Tên tài khoản</th>
											<th class="align-top">Số ĐT</th>
											<th class="align-top">Thời gian trúng</th>
										</tr>
									</thead>
									<tbody>
										{listVinhDanh.map((obj, key) => (
											<tr key={key}>
												<td className="border-right-0">{obj.userName}</td>
												<td className="border-right-0">{obj.phone}</td>
												<td className="border-left-0">{obj.date}</td>
											</tr>
										))}
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom mt-4">
									<Pagination
										activePage={activeVinhDanh}
										itemsCountPerPage={10}
										totalItemsCount={countVinhDanh}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeVinhDanh(v)}
									/>
								</ul> 
							</div>

							<div class="px-0 tab-pane container" id="cacgiaikhac">
								<table class="table table-borderless table-striped small text-center">
									<thead>
										<tr style={{borderBottom: "solid 2px #10e0e0"}}>
											<th class="align-top">Tên tài khoản</th>
											<th class="align-top">Tên giải</th>
											<th class="align-top">Thời gian trúng</th>
										</tr>
									</thead>
									<tbody>
										{listVinhDanh.map((obj, key) => (
											<tr key={key}>
												<td className="border-right-0">{obj.userName}</td>
												{(obj.itemName!=='...')?(<td className="border-left-0 border-right-0">{obj.itemName} <img src={ruong_icons} width={25} height={25} /></td>):(
													<td className="border-left-0 border-right-0">{obj.itemName}</td>
												)}
												
												<td className="border-left-0">{obj.date}</td>
											</tr>
										))}
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom mt-4">
									<Pagination
										activePage={activeVinhDanh}
										itemsCountPerPage={10}
										totalItemsCount={countVinhDanh}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeVinhDanh(v)}
									/>
								</ul>   	
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal The le --> */}
			<div class="modal fade" id="thele">
				<div class="modal-dialog modal-dialog-scrollable">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold pl-4 text-uppercase">Thể lệ</span></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<dl class="font14">
							<dt class="pb-1">I. Đối tượng tham gia</dt>
							<dd class="pl-1" style={{marginLeft:10}}>&bull; Tất cả game thủ có tài khoản Scoin. Nếu chưa có <a href="https://scoin.vn/nap-game" title="Đăng ký" target="_blank">&raquo; Đăng ký tại đây &laquo;</a></dd>
							<dd class="pl-1"  style={{marginLeft:10}}>&bull; Thời gian SK diễn ra từ 10:00 ngày 03.06 - hết ngày 02.07.2020. Sau khi kết thúc, số chìa khóa sẽ được xóa khỏi hệ thống.</dd>
							<dt class="pt-2 pb-1">II. Cách nhận chìa khóa mở rương báu</dt>
							<dd class="pl-1"  style={{marginLeft:10}}>&bull; Nạp ví Scoin/ thẻ Scoin vào các game do VTC Mobile phát hành.</dd>
							<dd class="pl-1"  style={{marginLeft:10}}>&bull; Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm.</dd>
							<dd class="pl-1"  style={{marginLeft:10}}>&bull; Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 Điểm.</dd>
							<dd class="pl-1"  style={{marginLeft:10}}>&bull; Mỗi 100,000 Điểm bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</dd>
						</dl>

						<div class="alert alert-secondary font14 text-center">
							<p class="font-weight-bold font14 mb-1">Điểm đang có: <span class="text-danger">{turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</span></p>
							<p class="font-weight-bold font14">Cần nạp thêm tối thiểu <span class="text-danger">{turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): '50.000'} Scoin</span> từ Thẻ Scoin hoặc <span class="text-danger">{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): '100.000'} Scoin từ ví</span> để nhận 01 Chìa khóa miễn phí!</p>
							<p class="font-weight-bold font14"><a href="https://scoin.vn/nap-game" title="Nạp game" target="_blank">Thêm Chìa khóa <img src={key_yellow_icon} width="20" class="img-fluid" /></a></p>
						</div>
						<p class="text-center"><a href="#" title="Nạp game" data-dismiss="modal" data-toggle="modal" data-target="#bgiaithuong" onClick={this.openGiaiThuong}><img src={btn_xem_khobau} width="128" alt="Xem kho báu" /></a></p>
					</div>
					</div>
				</div>
			</div>
			{/* The Modal them luot => ok */}
			<div class="modal fade" id="themchiakhoa">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body pt-0">
						<div class="alert alert-light py-0 text-dark">
						<h5 class="font-weight-bold">Bạn muốn nhận thêm Chìa khóa để mở rương báu Scoin?</h5>
						<ul class="font14 pb-0">
							<li>Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm.</li>
							<li>Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 điểm.</li>
							<li>Mỗi 100.000 Điểm tích lũy bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</li>
						</ul>
						</div>
						<div class="alert alert-secondary font14 text-center">
							<p class="font-weight-bold font14 mb-1">Điểm đang có: <span class="text-danger">{turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</span></p>
							<p class="font-weight-bold font14">Cần nạp thêm tối thiểu <span class="text-danger">{turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): 0} Scoin từ Thẻ Scoin</span> hoặc <span class="text-danger">{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): 0} Scoin từ ví</span> để nhận 01 Chìa khóa miễn phí!</p>
						</div>
						<p class="text-center"><a href="https://scoin.vn/nap-game" title="Nạp game" target="_blank"><img class="img-hover" src={btn_napgame} width="128" alt="Nạp game" /></a></p>
					</div>
					</div>
				</div>
			</div>

			{/* The Modal Lich su => ok */}
			<div class="modal fade" id="lichsu">
				<div class="modal-dialog modal-dialog-scrollable">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold pl-4 text-uppercase">Lịch sử</span></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<ul class="nav nav-pills nav-justified pop-custom">
						<li class="nav-item">
							<a class="nav-link active" style={{padding:'10px 3px 10px 3px'}} data-toggle="pill" href="#giaithuong" onClick={()=>this.getBonus(user, activeBonus)}>G.thưởng</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" style={{padding:'10px 3px 10px 3px'}} data-toggle="pill" href="#moruong" onClick={()=>this.getRuong(user,activeRuong)}>Mở rương</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" style={{padding:'10px 3px 10px 3px'}} data-toggle="pill" href="#nhanchiakhoa" onClick={()=>this.getKey(user,activeKey)}>Nhận chìa</a>
						</li>
						</ul>
						<div class="tab-content">
							<div class="px-0 tab-pane container active" id="giaithuong">
								<table class="table table-borderless table-striped small text-center">
									<thead>
									<tr style={{borderBottom: "solid 2px #10e0e0"}}>
										<th class="align-top">Tên</th>
										<th class="align-top">Nội dung</th>
										<th class="align-top">Thời gian trúng</th>
									</tr>
									</thead>
									<tbody>
										{listCodeBonus.map((obj, key) => (
											<tr key={key}>
												<td className="border-right-0">{key + (activeBonus-1)*limit +1}</td>
												<td className="border-left-0 border-right-0">{obj.itemName}</td>
												<td className="border-left-0">{obj.date}</td>
											</tr>
										))}
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeBonus}
										itemsCountPerPage={10}
										totalItemsCount={countCodeBonus}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeCodeBonus(v)}
									/>
								</ul>
							</div>
							<div class="px-0 tab-pane container" id="moruong">
								<table class="table table-borderless table-striped small text-center">
									<thead>
									<tr style={{borderBottom: "solid 2px #10e0e0"}}>
										<th class="align-top">STT</th>
										<th class="align-top">Kết quả</th>
										<th class="align-top">Thời gian</th>
									</tr>
									</thead>
									<tbody>
										{listRuong.map((obj, key) => (
											<tr key={key}>
												<td className="border-right-0">{obj.stt}</td>
												<td className="border-left-0 border-right-0">{obj.item_name}</td>
												<td className="border-left-0">{obj.date}</td>
											</tr>
										))}
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeRuong}
										itemsCountPerPage={10}
										totalItemsCount={countRuong}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeRuong(v)}
									/>
								</ul>
							</div>
							<div class="px-0 tab-pane container" id="nhanchiakhoa">
								<table class="table table-borderless table-striped small text-center">
									<thead>
									<tr style={{borderBottom: "solid 2px #10e0e0"}}>
										<th class="align-top">STT</th>
										<th class="align-top">Số lượng</th>
										<th class="align-top">Thời gian</th>
									</tr>
									</thead>
									<tbody>
										{listKey.map((obj, key) => (
											<tr key={key}>
												<td className="border-right-0">{obj.sourceTurn}</td>
												<td className="border-left-0 border-right-0">{obj.receivedTurn} <img src={key_yellow_icon} width="20" class="img-fluid" /></td>
												<td className="border-left-0">{obj.date}</td>
											</tr>
										))}
									
									</tbody>
								</table>
								<ul class="pagination justify-content-center pag-custom">
									<Pagination
										activePage={activeKey}
										itemsCountPerPage={10}
										totalItemsCount={countKey}
										pageRangeDisplayed={numberPage}
										lastPageText={'Trang cuối'}
										firstPageText={'Trang đầu'}
										itemClass={"page-item"}
										linkClass={"page-link"}
										onChange={(v) => this.handlePageChangeKey(v)}
									/>
								</ul>
							</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			{/* The Modal Thông báo chúc mừng => ok */}
			<div class="modal fade" id="chucmung">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold pl-4 text-uppercase">Chúc mừng</span></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body pt-0">
						<p class="text-center mb-1 font14">Bạn vừa tìm được <span class="text-danger">{itemBonus.name}</span> khi mở rương!</p>
						<p class="text-center font14">(Phần thưởng đã cộng trực tiếp vào ví Scoin.vn)</p>
						<p class="text-center"><img src={thumb_item_giaithuong} alt="5 triệu Scoin" class="mr-1" width="65" /></p>
						<p class="text-center font14"><a class="text-dark" href="#" title="Lịch sử">&raquo; Xem lịch sử &laquo;</a></p>
						<div class="d-flex justify-content-center">
							<div class="mo-1 pr-1"><a href="#" title="Mở tiếp 1 rương" data-toggle="modal" onClick={this.btnStart}><img class="img-hover" src={btn_mo_tiep1ruong} width="100" alt="Mở tiếp 1 rương" /></a></div>
							<div class="mo-td pl-1"><a href="#" title="Mở tiếp tự động" data-toggle="modal" onClick={this.autoOpen}><img class="img-hover" src={btn_mo_tieptudong} width="100" alt="Mở tự động" /></a></div>
						</div>
					</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div class="modal fade" id="myModal5">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
						<div class="modal-body pt-0">
							<div className="mt-2 text-center">          
								<h5 className="text-thele lead text-center py-3">Xin vui lòng đăng nhập!</h5>
								<button type="button" className="btn btn-danger mx-auto text-center my-3" onClick={this.loginAction}>Đăng nhập</button>
							</div>  
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo hết lượt => ok--> */}
			<div class="modal fade" id="hetchiakhoa" style={{zIndex:10001}}>
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body pt-0">
						<div class="alert alert-light py-0 text-dark">
						<h5 class="font-weight-bold">Hết chìa khóa</h5>
						<p class="font14 font-weight-bold">Bạn muốn nhận thêm Chìa khóa để mở rương báu Scoin?</p>
						<ul class="font14 pb-0">
							<li>Mỗi 1 Scoin bạn nạp vào game từ Thẻ Scoin sẽ nhận được 2 Điểm.</li>
							<li>Mỗi 1 Scoin bạn nạp vào game từ ví Scoin sẽ nhận được 1 điểm.</li>
							<li>Mỗi 100.000 Điểm tích lũy bạn nhận được 01 Chìa khóa được hệ thống tự động quy đổi.</li>
						</ul>
						</div>
						<div class="alert alert-secondary font14 text-center">
							<p class="font-weight-bold font14 mb-1">Điểm đang có: <span class="text-danger">{turnsBuyInfo.accumulationPoint ? turnsBuyInfo.accumulationPoint.toLocaleString() : 0} Điểm</span></p>
							<p class="font-weight-bold font14">Cần nạp thêm tối thiểu <span class="text-danger">{turnsBuyInfo.cardBalanceRounding ? turnsBuyInfo.cardBalanceRounding.toLocaleString(): 0} Scoin từ Thẻ Scoin </span> hoặc <span class="text-danger">{turnsBuyInfo.scoinBalanceRounding ? turnsBuyInfo.scoinBalanceRounding.toLocaleString(): 0} Scoin từ ví</span> để nhận 01 Chìa khóa miễn phí!</p>
						</div>
						<p class="text-center"><a href="https://scoin.vn/nap-game" title="Nạp game" target="_blank"><img class="img-hover" src={btn_napgame} width="128" alt="Nạp game" /></a></p>
					</div>
					</div>
				</div>
			</div>


			{/* <!-- The Modal Rương rỗng => ok --> */}
			<div class="modal fade" id="ruongrong">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold pl-4 text-uppercase">Rương rỗng</span></h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body pt-0">
						<p class="text-center font14">Chúc may mắn lần sau.</p>
						<p class="text-center"><img src={emoij_sad} width="64" alt="Rương rỗng" /></p>
						<p class="text-center font14"><a class="text-dark" href="#" title="Lịch sử">&raquo; Xem lịch sử &laquo;</a></p>
						<div class="d-flex justify-content-center">
							<div class="mo-1 pr-1"><a href="#" title="Mở tiếp 1 rương" data-toggle="modal" onClick={this.btnStart}><img class="img-hover" src={btn_mo_tiep1ruong} width="100" alt="Mở tiếp 1 rương" /></a></div>
							<div class="mo-td pl-1"><a href="#" title="Mở tiếp tự động" data-toggle="modal" onClick={this.autoOpen}><img class="img-hover" src={btn_mo_tieptudong} width="100" alt="Mở tự động" /></a></div>
						</div>
					</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Kết quả quay tự động  => ok--> */}

			<div class="modal fade" id="motudong" data-keyboard="false" data-backdrop="static">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0">
						<h4 class="modal-title w-100 text-center"><span class="text-danger font-weight-bold text-uppercase">Kết quả</span><br /><span class="font14 small">Kết quả mở rương báu tự động</span></h4>
						<button type="button" class="close" data-dismiss="modal" onClick={this.closePopupAuto}>&times;</button>
					</div>
					<div class="modal-body pt-0">
						<div id="auto" class="table-responsive alert alert-secondary font14" style={{height:300}}>
						<ol>
							{data_auto.map((obj, key) => (
									<li key={key}>{obj}</li>
							))}
						</ol>
						</div>
						<p class="text-center font14"><a class="text-dark" href="#" title="Chi tiết" data-toggle="modal" data-target="#lichsu">&raquo; Vào lịch sử để xem chi tiết &laquo;</a></p>
						
						{(textAuto)?(<h5 class="w-100 text-center"><span class="text-danger" style={{fontFamily:'roboto'}}>Đang mở tự động </span> <span class="spinner-border spinner-border-sm text-danger"></span></h5>):(
							<p className="text-thele text-center font-iCielPantonBlack" style={{color:'red'}}>Đã dùng hết Chìa khóa</p>
						)}        
					</div>
					</div>
				</div>
			</div>

			{/* Thông báo */}
			<div className="modal fade" id="myModal8">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
						<div className="table-responsive mt-2 mb-4">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
						</div>       
					</div>
				</div>
			</div>

			{/* <!-- The Modal báo lỗi--> */}

			<div class="modal fade" id="myModal11">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_error}</h5>
						</div>       
					</div>
				</div>
			</div>

			{/* <!-- The Modal Kho bau--> */}
			<div className="modal fade" id="Khobau" >
				<div className="modal-dialog">
					<div className="modal-content  bg-transparent border-0 center-screen">


					<div className="modal-body text-center">
						<img src={khobau} class="img-khobau" />
					</div>

					</div>
				</div>
			</div>


			{/* <!-- Hệ thống bảo trì--> */}
			<div class="modal fade" id="myModal12">
				<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header border-bottom-0 pb-0">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
						<div className="mt-2 text-center">              
							<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
							<h5 className="text-thele lead text-center" style={{fontFamily:'roboto'}}>Hệ thống đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
							<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
							<button type="button" className="btn btn-danger mx-auto text-center my-3" onClick={this.closeServerErr}>Xác nhận</button>
						</div>       
					</div>
				</div>
			</div>



			<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataListKey: state.lucky.dataListKey,
	dataCountBonus:state.lucky.dataCountBonus,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	getCountBonus,
	pickCard,
	buyTurn,
	getHistoryTuDo,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
	getKeys,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)