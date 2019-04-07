<template>
    <div class="table_box">
  <el-table
    :data="tableData"
    style="width: 100%"
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
      prop="address"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="date"
      sortable
      label="时间">
    </el-table-column>
    <el-table-column
      label="操作" sortable prop="status">
      <template slot-scope="scope" >
        <el-button size="small" type="primary">{{scope.row.status==0?'待处理':'已处理'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </div>
</template>

<script>
import service from "@/utils/service"
import { Message, Loading } from 'element-ui'
  const cityOptions = ['已接通', '关机', '空号', '停机', '正在通话中', '用户正忙', '来电提醒', '呼叫转移失败', '网络忙', '无人接听'];
  const resultOptions = ['A-意向客户', 'B-一般意向', 'C-简单对话', 'D-明确拒绝', 'E-未接通', 'F-多次未接', 'G-呼叫失败', 'H-黑名单', '未呼叫'];
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          phone:'13621886041',
          name: '王小虎',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-02',
          phone:'13621886041',
          name: '王小虎',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-04',
          name: '王小虎',
          phone:'13621886041',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-01',
          name: '王小虎',
          phone:'13621886041',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-08',
          name: '王小虎',
          phone:'13621886041',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-06',
          name: '王小虎',
          phone:'13621886041',
          address: '未处理',
          status:0
        }, {
          date: '2016-05-07',
          name: '王小虎',
          phone:'13621886041',
          address: '已处理',
          status:1
        }],
        multipleSelection: [],
        currentPage4: 4,

        checkAll: false,
        checkAll2:false,
        checkedCities: [],
        checkedResults:[],
        isIndeterminate: false,
        isIndeterminate2:false,
        cities: cityOptions,
        results:resultOptions
      }
    },
    mounted(){
      this.getNoticeList()
    },

    methods: {
      getNoticeList(){
        let params={
          currentPage:1,
          pageSize:10
        };
      service.getJoinList(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"获取列表成功",
                type: 'success',
                duration: 5 * 1000
              })
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckAllChange2(val) {
        this.checkedResults = val ? resultOptions: [];
        this.isIndeterminate2 = false;
      },
      handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.results.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.results.length;
      },

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

