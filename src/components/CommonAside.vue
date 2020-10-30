<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  background-color="#545c64"
      text-color="#fff"  unique-opened
      active-text-color="#ffd04b"  :collapse="isCollapse" 
     >
       <template v-for='(item,key) in asideMenu'>
        <!-- 有子菜单 -->
        <el-submenu :index="String(key)" v-if='item.children&&item.children.length' :key='key' >
            <template slot="title">
                <i :class='`el-icon-${item.icon}`'></i>
                <span>{{item.label}}</span>
            </template>
            <el-menu-item-group >
                
                    <el-menu-item :index="subItem.path" v-for='subItem in item.children' :key='subItem.path' @click='add(subItem)'>
                        <i :class='`el-icon-${subItem.icon}`'></i>
                        {{subItem.label}}
                    </el-menu-item>
               
                
            </el-menu-item-group>
        </el-submenu>
        <!-- 没有子菜单 -->
        <el-menu-item :index="item.path" v-if='!item.children' @click='add(item)' :key='key'>
            <i :class='`el-icon-${item.icon}`'></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </template>
    </el-menu>

</template>
<script>
import {mapState} from 'vuex'
    export default{
        computed:{
            // haschildren(){
            //     return this.asideMenu.filter(item=> item.children)
            // },
            // nochildren(){
            //     return this.asideMenu.filter(item=> !item.children)
            // },
            isCollapse(){
                return this.$store.state.isCollapse
            }
        },
        
        data(){
            return{
                asideMenu:[
                    {path:'/',name:'home',label:'首页',icon:'s-home'},
                    {path:'/admin',name:'admin',label:'账号管理',icon:'user-solid',children:[
                        {path:'/user',name:'user',label:'用户信息', icon:'user'},
                        {path:'/role',name:'role',label:'角色管理', icon:'s-operation'},
                        {path:'/right',name:'right',label:'权限管理', icon:'turn-off'},
                    ]},
                    
                    {path:'/cunstom',name:'cunstom',label:'客户管理',icon:'s-custom',children:[
                        {path:'/customer',name:'customer',label:'客户列表',icon:'s-custom'}
                    ]},
                    {path:'/weixin',name:'weixin',label:'工作微信',icon:'chat-round',children:[
                        {path:'/wxRecord',name:'wxRecord',label:'微信记录',icon:'chat-round'}
                    ]},
                    {path:'/callRecords',name:'callRecords',label:'电话记录',icon:'mobile-phone'},
                    {path:'/msgRecords',name:'msgRecords',label:'短信记录', icon:'message'}
                ]
            }
        },
        methods:{
            add(item){
                this.$router.push(item.path)
                this.$store.commit('addTab',item)
                //console.log(1)
            }

        }
    }
</script>
<style lang="scss" scoped>
    .el-menu{
        height:100%;
        border:none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
   }
   .el-menu-item-group{
       .el-menu-item-group__title{
            padding-left:0;
        }
   }
   .active{
       color:rgb(255, 208, 75);
   }
</style>