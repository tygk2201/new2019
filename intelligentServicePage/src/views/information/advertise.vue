<template>
  <div>
    <div class="ad">
      <el-carousel :interval="5000" arrow="always" height="400px">
        <el-carousel-item v-for="item in [1,2,3,4,5,6]" :key="item">
          <h3>广告语{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <div class="tab_box">
          <div class="grid-content" v-for="item in adList" :key="item.id">
            <span >{{item.title}}</span>
            <span >{{item.text}}</span>
          </div>
      </div>
    </div>
    <div class='main_bottom_box'>
        <el-popover
        ref="popover1"
        placement="top-start"
        title="联系电话"
        width="200"
        trigger="hover"
        content="13621886041">
        </el-popover>
        <el-button v-popover:popover1 round type="primary">电话咨询</el-button>
        <el-button round @click="dialogFormVisible = true" type="primary">申请代理</el-button>

    </div>
    <div class="dm-module">
      <div class="module-title">xxx机器人可以做什么</div>
      <div class="module-items">
        <div class="cando-item">
          <img class="img_icon" src="/img/png/phone.png" alt>
          <div class="cando-item-title">自动拨打</div>
          <div class="cando-item-desc">客户资料一键批量导入，随心设定自动拨打参数</div>
        </div>
        <div class="cando-item">
          <img class="img_icon" src="/img/png/chart.png" alt>
          <div class="cando-item-title">智能沟通</div>
          <div class="cando-item-desc">真人语音交互，专业业务解答；主动引导过程，客户提问对答如流</div>
        </div>
        <div class="cando-item">
          <img class="img_icon" src="/img/png/record.png" alt>
          <div class="cando-item-title">自动记录</div>
          <div class="cando-item-desc">通话录音、识别文本自动存取，客户业务关注点自动标出</div>
        </div>
        <div class="cando-item">
          <img class="img_icon" src="/img/png/data.png" alt>
          <div class="cando-item-title">自动分类</div>
          <div class="cando-item-desc">机器学习，神经网络算法自动识别客户意向并准确分级，可直接根据客户意愿强弱区分跟进优先级，以便快速达成交易</div>
        </div>
        <div class="cando-item">
          <img class="img_icon" src="/img/png/swan.png" alt>
          <div class="cando-item-title">自动分析</div>
          <div class="cando-item-desc">准确识别客户性别、年龄、兴趣点、情绪，通话完毕自动生成分析报表</div>
        </div>
        <div class="col-md-4 cando-item">
          <img class="img_icon" src="/img/png/people.png" alt>
          <div class="cando-item-title">辅助</div>
          <div class="cando-item-desc">推广精英跟进意向客户时，实时匹配客户问题的优质答案笔记，提升推广精英通话有效率和成交率</div>
        </div>
      </div>

      <a href="#ex2" rel="modal:open" class="module-btn free-experience" id="experience-btn1"  @click="dialogFormVisible = true">
        申请代理
        <i class="iconfont icon-arrow-line-right" id="icon-right1"></i>
      </a>
    </div>
    <el-row class="button_position">
      <el-button @click="dialogFormVisible = true" type="primary">申请代理</el-button>
      <!-- <el-button type="primary" icon="el-icon-service" @click="dialogFormVisible = true"></el-button> -->
    </el-row>
    <el-dialog title="加盟申请" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" clearable></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, //false时关闭弹窗，true打开
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
      adList:[{'title':'行业解决方案','text':'支持个性化定制更贴近真实场景','id':1},
{'title':'真人体验','text':'真人语音、多轮会话、支持打断支持转接人工','id':2},
{'title':'核心技术','text':'掌握AI语音处理知识图谱等核心技术','id':3},
{'title':'研发团队','text':'两位阿里云MVP中美两地研发中心','id':4},
{'title':'值得信赖','text':'阿里云金牌合作伙伴苏州市高新技术企业','id':5}]
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form.phone);
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style>
.ad {
  width: 100%;
  height: auto;
  /* background: #0d0a27; */
}
.button_position {
  position: fixed;
  right: 1%;
  bottom: 30%;
}
.tab_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  width: 200px;
  height: 180px;
  margin: 10px;
  display: flex;
  padding: 10px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #99a9bf;
}
.grid-content span:nth-child(1) {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    margin: 5px 0;
}
.grid-content span:nth-child(2) {
    font-family: PingFangSC-Light;
    font-size: 14px;
}
/* cankaowangye */
.dm-module {
  height: auto;
  width: 100%;
  background-color: #f7f7f7;
  margin: 0 auto;
  padding: 80px;
}
body {
  font-family: "Helvetica Neue", "Hiragino Sans GB", "WenQuanYi Micro Hei",
    "Microsoft Yahei", sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #383838;
  background-color: #fff;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.dm-module .module-title {
  width: 100%;
  text-align: center;
  font-size: 36px;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 80px;
}
.module-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}

.dm-module .module-btn.free-experience {
  width: 190px;
}
.dm-module .module-btn {
  background-color: #50c3fc;
  border-radius: 3px;
  height: 65px;
  width: 180px;
  margin: 0 auto;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.cando-item {
  width: 400px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cando-item-title {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.9);
  text-align: center;
  margin: 20px 0;
}
.cando-item-desc {
  max-width: 170px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.43);
  text-align: center;
}

.img_icon {
  width: 73px;
  height: 73px;
}
.main_bottom_box{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top:40px;
  padding-bottom: 40px; 
}
</style>
