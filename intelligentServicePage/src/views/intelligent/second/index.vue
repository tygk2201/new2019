<template>
  <div class="about">
    <div class="table_box display_row">
      <div class="block">
        <span class="demonstration">创建时间 </span>
        <el-date-picker v-model="startTimeSearch" type="datetime" placeholder="开始时间"></el-date-picker> -
        <el-date-picker v-model="endTimeSearch" type="datetime" placeholder="结束时间"></el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">姓名 </span>
        <el-input v-model="searchName" placeholder="请输入内容" class="max-width"></el-input>
      </div>
      <div class="block">
        <span class="demonstration">状态 </span>
        <el-select v-model="statusValue" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="ID" width="40"></el-table-column>
        <el-table-column prop="userName" label="客户姓名" width="120"></el-table-column>
        <el-table-column prop="jobName" label="任务名称" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="120"></el-table-column>
        <el-table-column prop="phoneModel" label="模板" width="120"></el-table-column>
        <el-table-column label="创建时间" width="120">
          <template slot-scope="scope">{{ scope.row.startTime }}</template>
        </el-table-column>
        <el-table-column label="提取时间" width="120">
          <template slot-scope="scope">{{ scope.row.endTime }}</template>
        </el-table-column>
        <el-table-column prop="grade" label="列别" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="small" @click="dialogCall=true">删除</el-button>
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
        :total="40"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 4,
      multipleSelection: [],
      startTimeSearch: "",
      endTimeSearch: "",
      tableData: [
        {
          id: 1,
          userName: "王小虎",
          jobName: "gggg",
          phoneNumber: "13621886041",
          phoneModel: "13621886041",
          startTime: "2016-05-03",
          endTime: "2016-08-15",
          status: "未接通",
          grade: "意向客户"
        }
      ],
      searchName: "",
      status: [
        {
          value: "0",
          label: "队列中"
        },
        {
          value: "1",
          label: "已提取"
        },
        {
          value: "2",
          label: "正在呼叫中"
        },
        {
          value: "3",
          label: "呼叫结束"
        }
      ],
      statusValue: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less">
.table_box {
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px solid #dbdbdb;
  margin: 10px;
}
.display_row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.max-width {
  width: 150px;
}
.block {
  margin-right: 50px;
}
</style>