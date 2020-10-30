<template>

    <div>
        <el-button size="mini" type="success" @click="add()">添加角色</el-button>
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
            <Form :formLabel="formLabel" :seachForm="formData" :rules='rules' ref='formEdit'></Form>
            <div slot="footer" class="dialog-footer">
                <el-button >取 消</el-button>
                <el-button type="primary" @click='addRole()'>确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for='item in tableLabel' :key='item.prop' :label=item.label width='200'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop]}}</span>
                </template >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button size="mini" type="success" @click="handleDelete(scope.row)">权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Form from '../components/CommonForm.vue'
import {mapMutations} from  'vuex'
export default {
    components:{
        Form
    },
    data() {
      return {
        dialogFormVisible:false,
        input:'',
        tableLabel:[{
            prop:'rname',
            label:'角色'
        },{
            prop:'rdesc',
            label:'描述'
        }
        ],
        tableData: [  
          ],
        formData:{
            rname:'',
            rdesc:''
        },
        formLabel:[
        {
            model: "rname",
            label: "角色",
            type: "input"
        },
        {
            model: "rdesc",
            label: "描述",
            type: "input"
        }  
        ],
        rules:{
            rname: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        },
        search: ''
      }
    },
    methods: {
        handleEdit(val) {
            this.dialogFormVisible=true
            console.log(val)
            this.formData=val
        },
        handleDelete(val) {
            //先判断员工中是否有该角色没有则删除，有则给提示框，该角色下有员工

            this.$confirm('此操作将永久删除该举色，是否删除','提示',{
                comfirmButtunText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.formData=val
                console.log(val)
                this.delRole()
            }).catch(()=>{
                this.$message({
                    showClose:true,
                    type:'info',
                    message:'已取消删除'
                })
            })
        },
        add(){
            this.dialogFormVisible=true
        },
        //添加角色
        addRole(){
            // console.log(this.formData)
            this.$refs['formEdit'].$refs['subFormEdit'].validate(valid=>{
                if(valid){
                    console.log(1)
                    this.postRole()
                }
            })
        },
        //单独封装异步提交数据
        async postRole(){
            let url='http://127.0.0.1:3000/addRole'
            const form =this.qs.stringify(this.formData)
            const res=await this.axios.post(url,form)
            console.log(res)
            if(res.status==200){
                this.$message({
                    showClose:true,
                    type:"success",
                    message:res.data.msg
                })
                this.dialogFormVisible=false
                this.getRoles()
                //初始化
                this.formData={}
            }else{
                this.$message({
                    showClose:true,
                    type:'warning',
                    message:res.data.msg
                })
            }
        },
        //删除角色，先异步封装，再再handleDelete中调用
        async delRole(){
            let url='http://127.0.0.1:3000/delRole'
            const form=this.qs.stringify(this.formData)
            const res= await this.axios.post(url,form)
            if(res.data.code==1){
                this.$message({
                    showClose:true,
                    type:'warning',
                    message:res.data.msg
                })
                
            }else if(res.data.code==2){
                this.$message({
                    showClose:true,
                    type:'success',
                    message:res.data.msg
                })
                this.getRoles()
            }else{
                this.$message({
                    showClose:true,
                    type:'warning',
                    message:res.data.msg
                })
            }
        },
        //获取角色列表
        async getRoles(){
            let url= 'http://127.0.0.1:3000/getRoleList'
            const res=await this.axios.get(url)
            if(res.data.code>0){
                this.tableData=res.data.data
                this.$store.state.roleList=res.data.data
                //console.log(this.$store.state.roleList)
            }
        },
        //取消删除
        close(){
            this.dialogFormVisible=false
            this
        },
        //删除之前看是否有该角色的员工

    },
    created(){
        this.getRoles()
    }
}
</script>
<style lang='scss'>
 .addrole{
     .el-input__inner{
    height:30px
    }
}
</style>