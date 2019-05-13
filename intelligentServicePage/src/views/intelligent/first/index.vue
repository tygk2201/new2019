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
        <el-checkbox-group v-model="state" @change="handleCheckedCitiesChange">
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
        <el-checkbox-group v-model="rank" @change="handleCheckedCitiesChange2">
          <el-checkbox v-for="result in results" :label="result" :key="result">{{result}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="table_box bottom_box">
      <el-row>
        <el-button type="primary" size="small" @click="dialogAddUser = true">添加客户</el-button>
        <el-button type="primary" size="small" @click="dialogUpload=true">导入</el-button>
        <!-- <el-button type="primary" size="small">导出</el-button> -->
        <el-button type="primary" size="small" @click="addCall(tableData)">加入呼叫</el-button>
        <!-- <el-button type="primary" size="small">转到CRM</el-button> -->
        <el-button type="primary" size="small" @click="deleteCall(tableData)">删除</el-button>
      </el-row>
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
        <el-table-column type="index" label="ID" width="35"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template slot-scope="scope">{{ scope.row.sex=="0"?"男":"女" }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="stateString" label="通话状态" width="90"></el-table-column>
        <el-table-column prop="rankString" label="意向等级" width="100"></el-table-column>
        <el-table-column prop="callTime" label="通话时长" width="100"></el-table-column>
        <el-table-column prop="callNum" label="呼叫次数" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
        <el-table-column prop="batch" label="批次" width="50"></el-table-column>
        <el-table-column label="创建时间" width="137">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
        <el-table-column label="最后更近时间" width="137">
          <template slot-scope="scope">{{ scope.row.updateDate }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="small" @click="dialogCall=true">加入呼叫</el-button>
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
    <el-dialog title="添加客户" :visible.sync="dialogAddUser" width="500px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="客户名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="company">
          <el-input v-model="form.company" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="男生">
          <!-- <el-input v-model="form.sex" autocomplete="off" clearable></el-input> -->
           <el-option label="男" value=0></el-option>
            <el-option label="女" value=1></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户类型" :label-width="formLabelWidth">
          <el-select v-model="form.rankString" placeholder="未分类">
            <el-option label="潜在客户" value="潜在客户"></el-option>
            <el-option label="意向客户" value="意向客户"></el-option>
            <el-option label="试用客户" value="试用客户"></el-option>
            <el-option label="成交客户" value="成交客户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导入批次" :label-width="formLabelWidth" prop="batch">
          <el-input v-model="form.batch" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" clearable></el-input>
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
            <el-option label="男版" value="0"></el-option>
            <el-option label="女版" value="1"></el-option>
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
    <el-dialog title="批量导入客户" :visible.sync="dialogUpload" width="450px">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="getFileList"
      >
        <el-button size="small" type="primary">选择文件</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件</div> -->
      </el-upload>
      <el-form :model="callForm" label-position="left" class="margin_form">
        <el-form-item label="导入批次" :label-width="formLabelWidth" prop="times">
          <el-input v-model="upload.times" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否加入呼叫">
          <el-checkbox
            label
            name="type"
            accept="excel"
            v-model="upload.isCall"
            @change="changeUpload(upload.isCall)"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="模板流程" :label-width="formLabelWidth" v-if="showUpload">
          <el-select v-model="upload.callType" placeholder="请选择模板">
            <el-option label="男版" value="0"></el-option>
            <el-option label="女版" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="name" v-if="showUpload">
          <el-input v-model="upload.name" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload=false">取 消</el-button>
        <el-button type="primary" @click="uploadSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/utils/service";
import { Message, Loading } from "element-ui";
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
        name: "",
        company: "",
        sex: "",
        phone: "",
        batch: "",
        rankString: "",
        remark: ""
      },
      formLabelWidth: "100px",
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      },
      ruleCall: {
        callType: [{ required: true, message: "请选择模板", trigger: "blur" }]
      },
      dialogCall: false,
      callForm: {
        callType: "",
        name: ""
      },
      fileList: [],
      dialogUpload: false,
      upload: {
        times: "",
        isCall: false,
        callType: "",
        name: ""
      },
      showUpload: false,

      tableData: [],
      multipleSelection: [],
      currentPage: 1,

      checkAll: false,
      checkAll2: false,
      rank: [],
      state: [],
      isIndeterminate: false,
      isIndeterminate2: false,
      cities: cityOptions,
      results: resultOptions
    };
  },
  mounted() {
    this.getListConsumer();
  },

  methods: {
    //获取客户信息
    getListConsumer() {
      let params = {
        rank: this.rank,
        state: this.state,
        page: this.currentPage,
        size: 10
      };
      service.getListConsumer(params).then(res => {
        if (!!res) {
          const data = res.data;
          if (!!data.status) {
            const list = data.data;
            // for(let i=0;i<list.length;i++){
            //   switch (list[i].rankString){
            //     case "0":
            //     rankStringtext="潜在客户";
            //     break;
            //   }
            // }
            const total = data.data.total;
            this.tableData = list;

            this.totalContat = total;
          } else {
            Message({
              message: data.description ? data.description : "获取列表失败！",
              type: "error",
              duration: 5 * 1000
            });
          }
        }
      });
    },
    //添加用户
    onSubmit() {
      this.dialogAddUser = false;
      let params = this.form;
      if(params.sex==""){
        params.sex=0
      }
      service.addConsumer(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"添加成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.getListConsumer();
            }else{
              Message({
                message: data.description?data.description:"添加失败",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
           });
      
    },
    //删除客户
    deleteCall(){
      let list=this.multipleSelection,consumerList=[]
      if(list.length==0){
        Message({
                message: "请筛选数据",
                type: 'error',
                duration: 5 * 1000
              })
        return;
      }
      for(let i=0;i<list.length;i++){
        consumerList.push(list[i].id)
      }
      let params={
        "consumerList":consumerList
      }
       service.deleteConsumer(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"删除成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.getListConsumer();
            }else{
              Message({
                message: data.description?data.description:"删除失败",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
           });

    },
    //加入呼叫提交
    callSubmit() {
      this.dialogCall = false;
    },
    //加入呼叫
    addCall() {
      if (this.multipleSelection.length == 0) {
        Message({
          message: "请选择数据",
          type: "error",
          duration: 5 * 1000
        });
        return;
      }
      this.dialogCall = true;
    },
    //文件上传
    // handleChange(file, fileList) {
    //   this.fileList = fileList.slice(-3);
    // },
    handleExceed(files, fileList) {
      Message({
        message: `当前限制选择 1 个文件`,
        type: "error",
        duration: 5 * 1000
      });
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
    },
    getFileList(response, file, fileList){
      this.fileList=file
    },
    //导入确定按钮
    uploadSubmit() {
      this.dialogUpload = false;
      let file = new FormData();
      file.append("file", this.fileList);
      let params={
          "batch":this.upload.times,
          "file":file,
          "isCall":this.upload.isCall
        }
      console.log(params)
      service.uploadConsumer(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"导入成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.getListConsumer();
            }else{
              Message({
                message: data.description?data.description:"导入失败",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
           });
    },
    changeUpload(type) {
      if (!type) {
        this.showUpload = false;
      } else {
        this.showUpload = true;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCheckAllChange(val) {
      this.state = val ? cityOptions : [];
      this.isIndeterminate = false;
      this.getListConsumer()
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
        this.state = value ? value : [];
        this.getListConsumer()
    },
    handleCheckAllChange2(val) {
      this.rank = val ? resultOptions : [];
      this.isIndeterminate2 = false;
      this.getListConsumer()
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.results.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.results.length;
        this.rank = value ? value : [];
        this.getListConsumer()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
.margin_form {
  margin-top: 30px;
}
.el-table .cell{
  overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
</style>



