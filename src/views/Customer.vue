<template>
    <div>
        <Form :formLabel='formLabel' :seachForm='seachForm'>
            <el-button size='small' type='primary' >搜索</el-button>
        </Form>
        <div class='button'>
            <el-button size='small' type='primary'>+新建</el-button>
            <el-button size='small' type='danger'>删除</el-button>
        </div>
        <Table :tableLabel='tableLabel' :config='config' :tableData='tableData' @edit='edit'></Table>
        <el-drawer :withHeader='false' :visible.sync="drawer" size='60%'>
            <div class='desc'>
                <div class='d-flex'>
                    <div class='image' >
                        <i class='el-icon-s-custom' style='font-size:300%' ></i>
                    </div>
                    <div class='info'>
                        <div>姓名</div>
                        <div>
                            <span>15221501410</span>
                            <i class="el-icon-phone-outline"></i>
                            <i class="el-icon-s-promotion"></i>
                        </div>
                    </div>
                </div>
                <div class='close'>
                    <i class='el-icon-close' @click='close'></i>
                </div>
                
            </div>
            <div class='input'>
                <!-- <input type="text" placeholder="发表跟进动态，不少于10个字"> -->
                <textarea  placeholder="添加动态"></textarea>
                <el-button size='small' type='primary'>提交</el-button>
            </div>
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="编辑信息" name="first">
                        <Form :formLabel='formLabel' :seachForm='formData'></Form>
                        <div class="demo-drawer__footer">
                            <el-button type="primary" size='small'>提交</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="最近动态" name="second">最近动态</el-tab-pane>
                    <el-tab-pane label="电话记录" name="third">电话记录</el-tab-pane>
                    <el-tab-pane label="短信记录" name="fourth">短信记录</el-tab-pane>
                </el-tabs>
            </template>
        </el-drawer>
    </div>
</template>
<script>
import Table from   '../components/CommonTable'
import Form from '../components/CommonForm'
    export default {
        components:{
            Table,
            Form
        },
        data(){
            return {
                tableLabel:[
                    {
                        prop:'id',
                        label:'客户ID'
                    },
                    {
                        prop:'name',
                        label:'客户姓名'
                    },
                    {
                        prop:'phone',
                        label:'电话号码'
                    },
                    {
                        prop:'belognTo',
                        label:'所属人'
                    },
                    {
                        prop:'cTime',
                        label:'创建时间'
                    },
                    {
                        prop:'uTime',
                        label:'更新时间'
                    }
                ],
                tableData:[],
                formLabel:[
                    {
                        model: "id",
                        label: "客户ID",
                        type: "input"
                    },
                    {
                        model: "name",
                        label: "客户姓名",
                        type: "input"
                    },
                    {
                        model: "phone",
                        label: "电话号码",
                        type: "input"
                    },
                    {
                        model: "belognTo",
                        label: "所属人",
                        type: "input"
                    },
                    {
                        model: "cTime",
                        label: "创建时间",
                        type: "input"
                    },
                    {
                        model: "uTime",
                        label: "更新时间",
                        type: "input"
                    }
                ],
                formData:
                    {
                        id:'',
                        name:'',
                        phone:'',
                        belognTo:'',
                        cTime:'',
                        uTime:''
                    }
                ,
                seachForm:{
                    id:'',
                    name:'',
                    phone:'',
                    belognTo:'',
                    cTime:'',
                    uTime:''
                },
                // formLabelWidth: '80px',
                config:{
                    page:1,
                    pageSize:20,
                    total:20,
                    loading:false,
                    type:'跟进'
                },
                drawer:false,
                activeName:'first'
            }           
        },
        created(){
            this.getCustomer()
        },
         methods:{
             edit(val){
                 this.drawer=true
                //  console.log(val)
                this.formData=Object.assign({},val)
             },
             handleClick(){},
             close(){
                 this.drawer=false
             },
             async getCustomer(){
                 this.config.loading = true;
                 let url='http://127.0.0.1:3000/customerList'
                 const res= await this.axios.get(url)
                 console.log(res.data.data)
                 this.tableData=res.data.data.data
                 this.config.total=res.data.data.total
                 console.log(this.tabelData)
                 this.config.loading=false
             }
         }
    }

</script>
<style lang="scss">
form{
    background-color:#fff;
}
    .el-drawer:focus,.el-drawer__header>:first-child{
        outline:none
    }
    .button{
        widows: 100%;
        height:40px;
        padding:2px;
    }
    .desc{
        display:flex;
        justify-content:space-between;
        position:relative;
        padding:20px 10px 10px;
        .d-flex{
            display:flex
        };
        i{
            color:blue
        }
    }
    .input{
            margin-left:10px;
            overflow:hidden;
            textarea{
                border:1px solid #e1e1e1;
                outline-color:lightblue;
                vertical-align: middle;
                resize:none;
                width:600px;
                font-size:1rem
            }
        }
    .el-tabs{
        padding:10px;
    }
</style>  