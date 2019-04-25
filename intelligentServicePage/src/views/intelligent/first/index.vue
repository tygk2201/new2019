<template>
  <div>
    <div class="select_box">
      <div class="choose_box">
        <p class="table_title_box">通话等级</p>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="choose_box">
        <p class="table_title_box">意向等级</p>
        <el-checkbox
          :indeterminate="isIndeterminate2"
          v-model="checkAll2"
          @change="handleCheckAllChange2"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedResults" @change="handleCheckedCitiesChange2">
          <el-checkbox v-for="result in results" :label="result" :key="result">{{result}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="table_box bottom_box">
      <el-row>
        <el-button type="primary" size="small" @click="dialogAddUser = true">添加客户</el-button>
        <el-button type="primary" size="small">导入</el-button>
        <el-button type="primary" size="small">导出</el-button>
        <el-button type="primary" size="small" @click="dialogCall=true">加入呼叫</el-button>
        <el-button type="primary" size="small">转到CRM</el-button>
        <el-button size="small">删除</el-button>
      </el-row>
    </div>
    <div class="table_box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="ID" width="35"></el-table-column>
        <el-table-column prop="userName" label="客户姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="100"></el-table-column>
        <el-table-column prop="status" label="通话状态" width="90"></el-table-column>
        <el-table-column prop="grade" label="意向等级" width="100"></el-table-column>
        <el-table-column prop="long" label="通话时长" width="100"></el-table-column>
        <el-table-column prop="times" label="呼叫次数" width="100"></el-table-column>
        <el-table-column prop="des" label="备注" width="100"></el-table-column>
        <el-table-column prop="order" label="批次" width="50"></el-table-column>
        <el-table-column label="创建时间" width="120">
          <template slot-scope="scope">{{ scope.row.startTime }}</template>
        </el-table-column>
        <el-table-column label="最后更近时间" width="120">
          <template slot-scope="scope">{{ scope.row.endTime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="small" @click="dialogCall=true">加入呼叫</el-button>
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
        :total="40"
      ></el-pagination>
    </div>
    <el-dialog title="添加客户" :visible.sync="dialogAddUser" width="450px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="company">
          <el-input v-model="form.company" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-input v-model="form.sex" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户类型" :label-width="formLabelWidth">
          <el-select v-model="form.clientType" placeholder="未分类">
            <el-option label="潜在客户" value="shanghai"></el-option>
            <el-option label="意向客户" value="beijing"></el-option>
            <el-option label="试用客户" value="shanghai"></el-option>
            <el-option label="成交客户" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导入批次" :label-width="formLabelWidth" prop="order">
          <el-input v-model="form.order" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="加入呼叫" :visible.sync="dialogCall" width="450px">
      <el-form :model="callForm" :rules="ruleCall">
        <el-form-item label="模板流程" :label-width="formLabelWidth">
          <el-select v-model="callForm.callType" placeholder="请选择模板">
            <el-option label="男版" value="shanghai"></el-option>
            <el-option label="女版" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="callForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCall=false">取 消</el-button>
        <el-button type="primary" @click="callSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = [
  "已接通",
  "关机",
  "空号",
  "停机",
  "正在通话中",
  "用户正忙",
  "来电提醒",
  "呼叫转移失败",
  "网络忙",
  "无人接听"
];
const resultOptions = [
  "意向客户",
  "一般意向",
  "简单对话",
  "明确拒绝",
  "未接通",
  "多次未接",
  "呼叫失败",
  "黑名单",
  "未呼叫"
];
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (value != "") {
        let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(value)) {
          callback(new Error("手机格式错误！"));
        } else {
          callback();
        }
      } else {
        return callback(new Error("请输入电话"));
      }
    };
    return {
      dialogAddUser: false,
      form: {
        userName: "",
        company: "",
        sex: "",
        phoneNumber: "",
        clientType: "",
        turn: "",
        des: "",
        status: ""
      },
      formLabelWidth: "100px",
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phphoneNumberone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      },
      ruleCall:{callType:[{required:true,message:"请选择模板",trigger:"blur"}]},
      dialogCall:false,
      callForm:{
        callType:"",
        name:""
      },

      tableData: [
        {
          id: 1,
          sex: "男",
          grade: "意向客户",
          userName: "王小虎",
          startTime: "2016-05-03",
          des: "",
          phoneNumber: "13621886041",
          status: "未接通"
        },
        {
          id: 2,
          sex: "女",
          grade: "意向客户",
          userName: "王小虎",
          startTime: "2016-05-04",
          des: "",
          phoneNumber: "13621886041",
          status: "已呼叫"
        }
      ],
      multipleSelection: [],
      currentPage4: 4,

      checkAll: false,
      checkAll2: false,
      checkedCities: [],
      checkedResults: [],
      isIndeterminate: false,
      isIndeterminate2: false,
      cities: cityOptions,
      results: resultOptions
    };
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
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckAllChange2(val) {
      this.checkedResults = val ? resultOptions : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.results.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.results.length;
    },
    //添加用户
    onSubmit() {
      this.dialogAddUser = false;
      let params = this.form;
    },
    //加入呼叫
    callSubmit(){
      this.dialogCall=false;
    }
  }
};
</script>

<style>
.bottom_box {
  display: flex;
  justify-content: flex-end;
}
.choose_box {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
}
.table_box {
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px solid #dbdbdb;
  margin: 10px;
}
.table_title_box {
  margin-right: 15px;
}
.select_box {
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
</style>



