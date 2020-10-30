import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tabList: JSON.parse(localStorage.getItem('tabs')) || [
    { path: '/', name: 'home', label: '首页', icon  : 's-home' }
  ],
  currentTab: null,
  isCollapse: false,
  menu: [],
  userImage: '../assets/images/head.jpg',
  deptList:[],
  roleList:[],
  selectDept:'',
  pageSize:20,
  page:1
}
//手写深拷贝
// function deepClone(obj){
//   if (typeof obj !==Object ||obj==null){
//     return obj
//   }
//   let res;
//   res instanceof Object ? res={} :res=[]
//   for (let key in obj){
//     if(obj.hasOwnProperty(key)){
//       res[key]=obj.key
//       deepClone(key)
//     }      
//   }
// }
// const cloneState=deepClone(state)

const mutations = {
  addTab(state, val) {
    if (val.name != 'home' && val.path) {
      //state.currentTab=val
      let result = state.tabList.findIndex(item => item.name === val.name)
       result === -1 ? state.tabList.push(val) : ''
    }
    
    //console.log(state.tabList) 
    localStorage.setItem('tabs',JSON.stringify(state.tabList))
  },
  closeTab(state, val) {
    let result = state.tabList.findIndex(item => item.name === val.name)
    state.tabList.splice(result, 1)
    //console.log(state.tabList)
  },
  isCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  getImage(state, val) {
    state.userImage = val
  },
  //获取部门列表
  setDept(state,val){
    state.deptList=val
  },
  //保存选中的部门
  saveDept(state,val){
    state.selectDept=val
  },
  changePage(state,val){
    state.page=val
  },
  changePageSize(state,val){
    state.pageSize=val
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
