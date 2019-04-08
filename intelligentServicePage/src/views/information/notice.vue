<template>

    <div class="table_box">
      <div class="table_box bottom_box">
  <el-row>
  <el-button type="primary" size='small' @click="deletNotice">删除</el-button>
  <el-button type="primary" size='small' @click="changeStates">确认查看</el-button>
</el-row>
</div>
  <el-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      label="电话"
      width="120"
      prop="phone">
    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱"
      width="160">
    </el-table-column>
    <el-table-column
      prop="createDate"
      sortable
      label="时间">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      prop="state===0?'未查看':'已查看'"
      label="状态">
    </el-table-column> -->
    
    <el-table-column
      label="操作" sortable prop="state">
      <template slot-scope="scope" >
        <!-- <el-button size="small" type="primary">{{scope.row.state==0?'处理确认':'已处理'}}</el-button> -->
        <el-button type="primary" v-if="scope.row.state===0" @click="changeState(scope.row.id)">处理确认</el-button>
        <el-button type="info" v-if="scope.row.state===1" disabled>已查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalContat">
    </el-pagination>
  </div>
</template>

<script>
import service from "@/utils/service"
import { Message} from 'element-ui'
  export default {
    data() {
      return {
        tableData:[],
        totalContat:0,
        multipleSelection: [],
        currentPage: 1,
      }
    },
    mounted(){
      this.getNoticeList()
    },

    methods: {
      getNoticeList(){
        let params={
          currentPage:this.currentPage,
          pageSize:10
        };
      service.getJoinList(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              const list=data.data.acsContactInfos
              const total=data.data.total
              this.tableData=list
              this.totalContat=total
              console.log(this.tableData,this.totalContat)
            }else{
              Message({
                message: data.description?data.description:"获取列表失败！",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
      })
      },
      changeStatepost(params){
        service.updateContactState(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"修改状态成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.getNoticeList();
            }else{
              Message({
                message: data.description?data.description:"修改状态失败！",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
      })

      },
      changeState(ID){
        let params=[];
          params.push({
            id:ID})
          this.changeStatepost(params)
      },
      changeStates(){
        let selectList=this.multipleSelection;
        let params=[];
        if(selectList.length<1){
          return;
        }
        for(let i=0;i<selectList.length;i++){
          params.push({
            id:selectList[i].id
          })
        }
        this.changeStatepost(params)

      },
      deletNotice(){
        let selectList=this.multipleSelection;
        let params=[];
        if(selectList.length<1){
          return;
        }
        for(let i=0;i<selectList.length;i++){
          params.push({
            id:selectList[i].id
          })
        }
        service.deleteContact(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"删除成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.getNoticeList();
            }else{
              Message({
                message: data.description?data.description:"删除失败！",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
      })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getNoticeList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getNoticeList()
      },
      handleSelectionChange(val){
         this.multipleSelection = val;
         console.log(this.multipleSelection)
      }

    }
  }
</script>
<style>
.table_box{
  width: 100%;
  height: auto;
  padding: 10px;
}
</style>

