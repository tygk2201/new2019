<template>
  <div>
    <div class="ad">
      <el-carousel :interval="5000" arrow="always" height="400px">
        <el-carousel-item>
          <div class="big_title_text">xxx机器人作为智能专业销售客服</div>
          <p class="big_title_two">开启电销与客服的革命时代</p>
        </el-carousel-item>
        <el-carousel-item>
          <div class="big_title_text">全球领先的人工智能认知交互企业</div>
          <p class="big_title_two">致力于智能产业前沿科技创新，持续为企业智能赋能价值</p>
        </el-carousel-item>
        <el-carousel-item >
          <!-- <h3>AI电销机器人帮你迅速成单</h3> -->
           <div class="big_title_text">xxx电销机器人帮你迅速成单</div>
          <p class="big_title_two">成本砍掉20% 业绩提升200%</p>
        </el-carousel-item>
      </el-carousel>

      <div class="tab_box">
        <div class="grid-content" v-for="item in adList" :key="item.id">
          <span>{{item.title}}</span>
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
    <div class="main_bottom_box">
      <el-popover
        ref="popover1"
        placement="top-start"
        title="联系电话"
        width="200"
        trigger="hover"
        content="13621886041"
      ></el-popover>
      <el-button v-popover:popover1 round type="primary">电话咨询</el-button>
      <el-button round @click="dialogFormVisible = true" type="primary">申请代理</el-button>
    </div>
    <div class="title_bottom">公司优势</div>
    <div class="box_chart">
      <div class="chart_item">
        <div class="chart_item_title">
          <span class="col_Header_tit">合作伙伴</span>
        </div>

        <div class="user_portrait_content">
          <div id="circle">
            <div class="avatar"/>
            <div class="path_placeholder"/>
            <div id="aroundTop" class="move">
              <img src="@img/img/png/al.png" alt width="50" height="50">
              <div>阿里巴巴</div>
            </div>
            <div id="aroundRight" class="move">
              <img src="@img/img/png/xunfei.jpg" alt width="50" height="50" >
              <div>科达讯飞</div>
            </div>
            <div id="aroundBottom" class="move">
              <img src="@img/img/png/baidu.png" alt width="50" height="50">
              <div>百度云</div>
            </div>
            <div id="aroundLeft" class="move">
              <img src="@img/img/png/dui.jpg" alt width="50" height="50">
              <div>思必驰</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart_item">
        <div class="chart_item_title">
          <span class="col_Header_tit">优势统计</span>
        </div>
        <div id="car" class="chart_box_item"></div>
      </div>
    </div>
    <div class="IndexTher">
			<div class="TextCenter">
				<div class="title">
					<div class="text">使用言通电话机器人，服务效率会得到怎样的提升</div>
					<div class="xian"></div>
				</div>
				<div class="ListMain" >
					<div class="list" v-for="item in dataShowList" :key="item.id">
						<dl>
							<div class="number">
								<span class="animateNum" data-animatetype="num" data-animatetarget="15">{{item.number}}</span>
                <i>{{item.icon}}</i>
                <img :src="item.src">
							</div>
							<dt>{{item.adText}}</dt>
							<dd class="info">{{item.text}}<em>{{item.number}}{{item.icon}}</em>以上</dd>
						</dl>
					</div>
				
				</div>
			</div>
		</div>
    <div class="dm-module">
      <div class="module-title">xxx电话机器人能帮你做什么</div>
      <div class="module-items">
        <div class="cando-item" v-for="item in candoItem" :key="item.id">
          <img class="img_icon" :src="item.candoImg" alt>
          <div class="cando-item-title">{{item.candoIteTitle}}</div>
          <div class="cando-item-desc">{{item.candoItemDes}}</div>
        </div>
      </div>

      <a
        href="#ex2"
        rel="modal:open"
        class="module-btn free-experience"
        id="experience-btn1"
        @click="dialogFormVisible = true"
      >
        申请代理
        <i class="iconfont icon-arrow-line-right" id="icon-right1"></i>
      </a>
    </div>
    <el-row class="button_position">
      <el-button @click="dialogFormVisible = true" type="primary">申请代理</el-button>
      <!-- <el-button type="primary" icon="el-icon-service" @click="dialogFormVisible = true"></el-button> -->
    </el-row>
    <el-dialog title="加盟申请" :visible.sync="dialogFormVisible" width="380px">
      <el-form :model="form" :rules="rules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="留言" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off" clearable></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>-->
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
import service from "@/utils/service"
import { Message, Loading } from 'element-ui'
// let png = require('../../assets/img/png/');
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
        if (value != '') {
          let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/
          if (!phoneReg.test(value)) {  
             callback(new Error('手机格式错误！')); 
            }else{
              callback();
            }  
        }else{
          return callback(new Error('请输入电话'));
        }
      };
    return {
      dialogFormVisible: false, //false时关闭弹窗，true打开
      form: {
        name: "",
        email:"",
        phone:"",
        des: ""
      },
      rules:{
        name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone:[{ required: true, message: '请输入电话', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' }],
        email:[{ type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }]
      },
      formLabelWidth: "80px",
      adList: [
        { title: "行业解决方案", text: "支持个性化定制更贴近真实场景", id: 1 },
        {
          title: "真人体验",
          text: "真人语音、多轮会话、支持打断支持转接人工",
          id: 2
        },
        { title: "核心技术", text: "掌握AI语音处理知识图谱等核心技术", id: 3 },
        { title: "研发团队", text: "两位阿里云MVP中美两地研发中心", id: 4 },
        {
          title: "值得信赖",
          text: "阿里云金牌合作伙伴苏州市高新技术企业",
          id: 5
        }
      ],
      dataShowList:[{
        id:1,
        number:15,
        icon:"倍",
        text:"提升",
        src:'@img/img/png/up.png',
        adText:"时间利用率"
      },{
        id:2,
        number:80,
        icon:"%",
        text:"节约",
        src:'@img/img/png/down.png',
        adText:"人力成本"
      },{
        id:3,
        number:350,
        icon:"%",
        text:"提升",
        src:'@img/img/png/up.png',
        adText:"销售业绩"
      },{
        id:4,
        src:'@img/img/png/down.png',
        number:55,
         icon:"%",
        text:"下降",
        adText:"管理成本"
      },{
        id:5,
        src:'@img/img/png/up.png',
        number:45,
         icon:"%",
        text:"提升",
        adText:"客户满意度"
      }],
      candoItem:[{id:0,candoIteTitle:'自动拨打',candoItemDes:'客户资料一键批量导入，随心设定自动拨打参数',candoImg:'../../assets/img/png/phone.png'},
      {id:1,candoIteTitle:'智能沟通',candoItemDes:'真人语音交互，专业业务解答；主动引导过程，客户提问对答如流',candoImg:'../../assets/img/png/chart.png'},
      {id:2,candoIteTitle:'自动记录',candoItemDes:'通话录音、识别文本自动存取，客户业务关注点自动标出',candoImg:'../../assets/img/png/record.png'},
      {id:3,candoIteTitle:'自动分类',candoItemDes:'机器学习，神经网络算法自动识别客户意向并准确分级，可直接根据客户意愿强弱区分跟进优先级，以便快速达成交易',candoImg:'../../assets/img/png/data.png'},
      {id:4,candoIteTitle:'自动分析',candoItemDes:'准确识别客户性别、年龄、兴趣点、情绪，通话完毕自动生成分析报表',candoImg:'../../assets/img/png/swan.png'},
      {id:5,candoIteTitle:'辅助',candoItemDes:'推广精英跟进意向客户时，实时匹配客户问题的优质答案笔记，提升推广精英通话有效率和成交率',candoImg:'../../assets/img/png/people.png'}]
    };
  },
  mounted() {
    this.around("aroundTop", 90);
    this.around("aroundRight", 0);
    this.around("aroundBottom", 270);
    this.around("aroundLeft", 180);
    this.draw();
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = false;
      let params=this.form;
      service.addContent(params).then(res=>{
        if(!!res){
            const data = res.data
            if(!!data.status){
              Message({
                message: data.description?data.description:"申请成功！",
                type: 'success',
                duration: 5 * 1000
              })
            }else{
              Message({
                message: data.description?data.description:"申请失败！",
                type: 'error',
                duration: 5 * 1000
              })

            }
            
          }
      })

    },
    around(id, angle) {
      var oCircle = document.getElementById("circle");
      var aroundTop = document.getElementById(id);

      var r = oCircle.offsetWidth / 2;
      this.timer = setInterval(function() {
        angle++;
        var hd = (Math.PI / 180) * angle;

        var x = r * Math.cos(hd);
        var y = r * Math.sin(hd);

        aroundTop.style.left = r + x + "px";
        aroundTop.style.top = r - y + "px";
      }, 30);
    },
    draw() {
      let chartId = document.getElementById("car");
      let chartDom = this.$echarts.init(chartId);
      let option = {
        title: {
          // text: "机器人财务优势统计",
          subtext: "节省成本",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: [
            "客服",
            "财务",
            "销售",
            "售后",
            "电话",
            "投资"
          ]
        },
        calculable: true,
        series: [
          {
            name: "节省",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data: [
              { value: 35, name: "客服" },
              { value: 5, name: "财务" },
              { value: 15, name: "销售" },
              { value: 25, name: "售后" },
              { value: 40, name: "电话" },
              { value: 35, name: "投资" },
              // { value: 30, name: "rose7" },
              // { value: 40, name: "rose8" }
            ]
          }
        ]
      };

      chartDom.setOption(option);
    }
  }
};
</script>
<style scoped lang="less">
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
  line-height: 250px;
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
.main_bottom_box {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
/* //转圈圈 */
.box_chart {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f7f7f7;
  margin-bottom: 30px;
  padding-top: 15px;
  flex-wrap: wrap
}
.chart_box_item {
  // width: 400px;
  width: 100%;
  height: 400px;
}
.chart_item {
  width: 730px;
      margin-top: 20px;
  // height: 400px;
  // display: flex;
  //   flex-flow: column;
  //   justify-content: center;
  //   align-items: center;
}
.chart_item_title {
  text-align: center;
  // height: 35px;
  font-size: 24px;
    color: #666666;
}
.ehart_init {
  width: 100%;
  height: 100%;
}
.user_portrait_content {
  width: 100%;
      height: 320px;
  margin-top: 25px;
  height: calc(55vh - 35px);
  display: flex;
  justify-content: center;
  align-items: center;
}
#circle {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px dashed gray;
  box-sizing: border-box;
  .move {
    position: absolute;
    width: 160px;
    height: 60px;
    margin-left: -80px;
    margin-top: -30px;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;
    background: linear-gradient(to right, #fff, #ddd);
  }
  .path_placeholder {
    width: 140px;
    height: 140px;
    border: 1px solid red;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: 80px;
    left: 80px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 100px;
    left: 100px;
    background: url("../../assets/img/icons/logo.jpg") no-repeat center center;
    background-size: 100% 100%;
  }
}
.title_bottom {
  width: 100%;
  font-size: 32px;
  text-align: center;
}

.IndexTher{
  width: 100%;
  padding: 70px 0px;
  min-height: 450px;
}
.IndexTwo .title, .IndexTher .title, .IndexFour .title {
    text-align: center;
    font-size: 24px;
    color: #666666;
    margin-bottom: 60px;
    // margin-top: 20px;
}
.IndexTwo .title .xian, .IndexTher .title .xian, .IndexFour .title .xian {
    width: 115px;
    height: 3px;
    background: #3da7f5;
    margin: 0 auto;
    margin-top: 20px;
}
.IndexTher .ListMain .list {
    text-align: center;
    float: left;
    width: 240px;
    height: auto;
    overflow: hidden;
}
.IndexTher .ListMain .list .number {
    color: #333;
    margin-bottom: 40px;
}
.IndexTher .ListMain .list .number span {
    display: inline-block;
    font-size: 72px;
}
.IndexTher .ListMain .list dt {
    text-align: center;
    font-size: 24px;
    color: #666;
    margin-bottom: 15px;
    margin-top: 15px;
}
.IndexTher .ListMain .list dd.info {
    font-size: 14px;
    color: #666;
    margin-left: 0px
}
.IndexTher .ListMain .list dd.info em {
    font-size: 24px;
    color: #f44343;
}
em, i {
    font-style: normal;
        box-sizing: inherit;
}
.ListMain{
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap
}
.number img{
  width: 20px;
  height: 20px;
}
.move img{
  border-radius: 50%
}
.big_title_text{
  height: 200px;
 padding-top: 120px;
    font-size: 44px;
    font-weight: 700;
    color: #0a0a0a;
    // margin: 0 0 0 80px;
    z-index: 99;
    position: relative;
    text-align: center;
  }
  .big_title_two{
    // margin: 60px 0 0 80px;
    line-height:35px;
    font-size: 24px;
    color: #222;
    font-weight: 400;
        text-align: center;
  }
</style>
