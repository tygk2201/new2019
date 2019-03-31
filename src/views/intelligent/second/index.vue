<template>
<div>
  <div class="choose_box">
    <p class="table_title_box">通话等级</p>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
  </div>
  <div class="choose_box">
    <p class="table_title_box">意向等级</p>
    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
    <el-checkbox-group v-model="checkedResults" @change="handleCheckedCitiesChange2">
      <el-checkbox v-for="result in results" :label="result" :key="result">{{result}}</el-checkbox>
    </el-checkbox-group>
  </div>
<div class="table_box bottom_box">
  <el-row>
  <el-button type="primary" size='small'>添加客户</el-button>
  <el-button type="primary" size='small'>导入</el-button>
  <el-button type="primary" size='small'>导出</el-button>
  <el-button type="primary" size='small'>加入呼叫</el-button>
  <el-button type="primary" size='small'>转到CRM</el-button>
  <el-button size='small'>删除</el-button>
</el-row>
</div>
<div class="table_box">
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作">
      <template >
        <el-button size="small" type="primary">查看</el-button>
        <el-button size="small">编辑</el-button>
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
  </div>
</template>

<script>
  const cityOptions = ['已接通', '关机', '空号', '停机', '正在通话中', '用户正忙', '来电提醒', '呼叫转移失败', '网络忙', '无人接听'];
  const resultOptions = ['A-意向客户', 'B-一般意向', 'C-简单对话', 'D-明确拒绝', 'E-未接通', 'F-多次未接', 'G-呼叫失败', 'H-黑名单', '未呼叫'];
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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

    methods: {
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
.bottom_box{
  display: flex;
  justify-content:flex-end
}
.choose_box{
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
}
.table_box{
  width: 100%;
  height: auto;
  padding: 10px;
}
.table_title_box{
  margin-right: 15px
}
</style>

