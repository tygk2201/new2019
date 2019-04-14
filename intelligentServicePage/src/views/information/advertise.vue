<template>
  <div>
    <div class="ad">
      <el-carousel :interval="5000" arrow="always" height="520px">
        <el-carousel-item>
          <div class="big_title_text">呼王机器人作为智能专业销售客服</div>
          <p class="big_title_two">开启电销与客服的革命时代</p>
        </el-carousel-item>
        <el-carousel-item>
          <div class="big_title_text">全球领先的人工智能认知交互企业</div>
          <p class="big_title_two">致力于智能产业前沿科技创新，持续为企业智能赋能价值</p>
        </el-carousel-item>
        <el-carousel-item>
          <!-- <h3>AI电销机器人帮你迅速成单</h3> -->
           <div class="big_title_text">呼王电销机器人帮你迅速成单</div>
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
        title="客服电话"
        width="200"
        trigger="hover"
        content="13621886041"
      ></el-popover>
      <el-button v-popover:popover1 round type="primary">电话咨询</el-button>
      <el-button round @click="dialogFormVisible = true" type="primary">申请代理</el-button>
    </div>
    
    <div class="box_chart">
      <div class="title_bottom">公司优势</div>
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
					<div class="text">使用呼王电话机器人，服务效率会得到怎样的提升</div>
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
      <div class="module-title">呼王电话机器人能帮你做什么</div>
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
    <div class="footer">
      <div class="phone_box">
      <div class="photo_footer">
        <span>客服电话：</span>
        <span>64756438754856</span>
      </div>
      <div class="photo_footer">
        <span>招商电话：</span>
        <span>64756438754856</span>
      </div>
      </div>
      <span>Copyright&nbsp;&copy;&nbsp;苏州中太智能科技有限公司</span>
    </div>
  </div>
</template>

<script>
import service from "@/utils/service"
import { Message, Loading } from 'element-ui'
let phone = require('../../assets/img/png/phone.png');
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
        src:'/img/arrow-up.svg',
        adText:"时间利用率"
      },{
        id:2,
        number:80,
        icon:"%",
        text:"节约",
        src:'/img/arrow-down.svg',
        adText:"人力成本"
      },{
        id:3,
        number:350,
        icon:"%",
        text:"提升",
        src:'/img/arrow-up.svg',
        adText:"销售业绩"
      },{
        id:4,
        src:'/img/arrow-down.svg',
        number:55,
         icon:"%",
        text:"下降",
        adText:"管理成本"
      },{
        id:5,
        src:'/img/arrow-up.svg',
        number:45,
         icon:"%",
        text:"提升",
        adText:"客户满意度"
      }],
      candoItem:[{id:0,candoIteTitle:'自动拨打',candoItemDes:'客户资料一键批量导入，随心设定自动拨打参数',candoImg:phone},
      {id:1,candoIteTitle:'智能沟通',candoItemDes:'真人语音交互，专业业务解答；主动引导过程，客户提问对答如流',candoImg:'img/chart.png'},
      {id:2,candoIteTitle:'自动记录',candoItemDes:'通话录音、识别文本自动存取，客户业务关注点自动标出',candoImg:'/img/record.png'},
      {id:3,candoIteTitle:'自动分类',candoItemDes:'机器学习，神经网络算法自动识别客户意向并准确分级，可直接根据客户意愿强弱区分跟进优先级，以便快速达成交易',candoImg:'/img/data.png'},
      {id:4,candoIteTitle:'自动分析',candoItemDes:'准确识别客户性别、年龄、兴趣点、情绪，通话完毕自动生成分析报表',candoImg:'/img/swan.png'},
      {id:5,candoIteTitle:'辅助',candoItemDes:'推广精英跟进意向客户时，实时匹配客户问题的优质答案笔记，提升推广精英通话有效率和成交率',candoImg:'/img/people.png'}]
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
                message: "申请提交成功",
                type: 'success',
                duration: 5 * 1000
              })
            }else{
              Message({
                message: "申请提交失败，请重试！",
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
.phone_box{
  width: 100%;
  height: 50px;
  margin-top: 15px;
  margin-bottom:10px;
  display: flex;
  justify-content: center;
  align-items: center
}
.photo_footer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
}
.ad {
  width: 100%;
  height: auto;
  /* background: #0d0a27; */
}
.button_position {
  position: fixed;
  right: 0.5%;
  bottom: 40%;
  z-index: 999;
}
.tab_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-carousel__item{
  padding: 15px;
  background: rgb(48, 65, 86);
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center

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
  background-color: #d3dce6;
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
  padding-top: 80px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
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
  margin-bottom: 20px;
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
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#circle {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 1px dashed rgb(7, 54, 68);
  box-sizing: border-box;
  .move {
    position: absolute;
    width: 125px;
    height: 60px;
    margin-left: -62px;
    margin-top: -28px;
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    // background: linear-gradient(to right, #fff, #ddd);
    background: rgb(145, 199, 174)
  }
  .path_placeholder {
    width: 110px;
    height: 110px;
    border: 1px solid rgb(7, 54, 68);
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: 64px;
    left: 64px;
  }
  .avatar {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    position: absolute;
    top: 80px;
    left: 80px;
    background: url("/img/work.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
.title_bottom {
  width: 100%;
  font-size: 32px;
  text-align: center;
  margin: 15px 15px;
}

.IndexTher{
  width: 100%;
  padding: 40px 0px;
  min-height: 450px;
}
.IndexTwo .title, .IndexTher .title, .IndexFour .title {
    text-align: center;
    font-size: 24px;
    color: #666666;
    margin-bottom: 60px;
    padding: 15px;
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
    margin: 0 5px;
    color: rgba(0,0,0,.43);
}
em, i {
    font-style: normal;
        box-sizing: inherit;
}
.ListMain{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap
}
.number img{
  width: 20px;
  height: 20px;
}
.move img{
  border-radius: 50%;
  width:40px;
  height:40px;
}
.big_title_text{
    font-size: 50px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
  }
  .big_title_two{
    font-size: 24px;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  .footer{
    width: 100%;
    // height: 30px;
    margin-bottom: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #666;
    flex-flow: column;
  }
</style>
