<template>
    <div class='common-table'>
        <el-table class='tableClass' :data="tableData" border height='380' stripe v-loading='config.loading' @selection-change='selectRows' >
            <el-table-column prop="date" label='序号' width='70' >
                <template slot-scope="scope">
                    <span style="margin-left: 10px;padding:0">{{scope.$index +1}}</span>
                </template>
            </el-table-column>
            <el-table-column type="selection"  width="55"> </el-table-column>
            <el-table-column v-for='item in tableLabel' :key='item.prop' :label='item.label' width='180' show-overflow-tooltip>
                <template slot-scope="scope" >
                    <el-tooltip :content="scope.row.ustate?'已启用':'已禁用'" placement='right'>
                        <el-switch  v-model='scope.row.ustate' v-if="item.prop=='state'" :active-value='true' :inactive-value='false' @change='changeState(scope.row)'>
                        </el-switch>
                    </el-tooltip>
                    <span style="margin-left: 10px;font-size:12px;">
                        {{ scope.row[item.prop] }}
                        <i v-if="item.prop=='phone'" class="el-icon-phone-outline" ></i>
                        <i v-if="item.prop=='phone'" class="el-icon-s-promotion"></i>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width='150' fixed='right' >
                <template slot-scope="scope"> 
                    <el-button size="mini" @click="handleEdit(scope.row)">{{config.type}}</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @prev-click='prev' @next-click='next' @current-change='change' :current-page.sync="config.page" :page-sizes="[20, 50, 200, 500]" :page-size.sync="config.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="config.total">
        </el-pagination>
    </div>
</template>
<script>
export default { 
    props:{
        tableData:Array,
        tableLabel:Array,   
        config:Object
    },
    data(){
        return {
            pageSize:null,
            
        }
    },
    methods:{
        handleEdit(val){this.$emit('edit',val)},
        handleDelete(val){this.$emit('del',val)},
        sizeChange(pageSize){
            //this.$emit('changeSizePage',pageSize)
            this.$store.commit('changePageSize',pageSize)
            this.$emit('changeSizePage')
        },
        prev(page){
            this.$store.commit('changePage',page)
            this.$emit('changePage')
        },
        next(page){
            this.$store.commit('changePage',page)
            this.$emit('changePage')
        },
        change(page){
            this.$store.commit('changePage',page)
            this.$emit('changePage')
        },
        changeState(val){this.$emit('changState',val)},
        //表格行选中
        selectRows(val){
            this.$emit('selectRow',val)
        }
    }
}
</script>
<style lang='scss'>
    .el-table{
        td{
            padding:5px 0;
            i{
                margin-left:10px;
                font-size:150%;
                color:blue
            }
        }
        
    }

</style>