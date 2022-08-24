<template>
  <view>
    <!-- 右边滑动字母 -->
    <div v-if="isshow">
      <view
        class="a-b"
        hover-class="a-b-hover"
        v-bind:style="[{ height: zimugaodu + 'px' }]"
        hover-start-time="1"
        hover-stay-time="100"
        @touchstart.stop.prevent="touchstarta"
        @touchmove.stop.prevent="touchmovea"
        @touchend.stop.prevent="touchenda"
      >
        <view v-for="z in zimu" :key="zimu[z]">
          <text>{{ z }}</text>
        </view>
      </view>
      <!-- 弹出的字母 -->
      <view v-if="isxianshi" class="uni-indexed-list__alert-wrapper">
        <text class="uni-indexed-list__alert">{{ tanchuzimu }}</text>
      </view>
      <!-- #ifdef VUE3 -->
      <xiaochaoIndexedListData
        v-model:zuobiao="zuobiaoccc"
        :zishuju="shuju"
        @itemClick="onClick"
      ></xiaochaoIndexedListData>
      <!-- #endif -->
      <!-- #ifdef VUE2 -->
      <xiaochaoIndexedListData
        :zuobiao.sync="zuobiao"
        :zishuju="shuju"
        @itemClick="onClick"
      ></xiaochaoIndexedListData>
      <!-- #endif -->
    </div>
  </view>
</template>

<script>
//以下 import这个引入数据临时使用，
//填充自己数据后可以删除js文件，js文件在插件根目录
//数据最好放在引入页面传给当前页面   :zishuju="shuju"   shuju就是你引入页面需要传值
//并且组件引入页面插件放在template下，最后不要再插件外部包裹<view></view>
//数据结构 {"A": ["安居小区", "奥德紫荆城"],"B": ["班超公寓", "包勇村"]}，也可以打开shujuliebiao.js查看
//可用在引入页下面methods 添加一个
let obj = {
	name: 'null'
}
import xiaochaoIndexedListData from "./xiaochao-indexed-list-data.vue";
export default {
  name: "xiaochao-indexed-list",
  components: {
    xiaochaoIndexedListData,
  },
  emits: ["click"], //vue3 触发引入页面事件
  props: {
    // 检测类型 + 其他验证
    quanbushuju: {
      //上个页面传来的总数据
      type: Object,
      default: () => obj,
    },
  },
  data() {
    return {
      zimu: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      shuju: {}, //上个页面传过来的数据
      zimugaodu: 0,
      fenduan: 0,
      zuobiao: {},
      zuobiaoccc: 0,
      tanchuzimu: "",
      isxianshi: false,
      isshow: false,
    };
  },
  created() {
    this.$nextTick(() => {});
	uni.showLoading({
        title: "加载中",
    });
	let time = setInterval(()=>{
		if(!this.quanbushuju.name){
			clearInterval(time)
			 const res = uni.getSystemInfoSync();
			// #ifdef APP-PLUS && VUE3
			this.zimugaodu =
				res.windowHeight - 44 - uni.getSystemInfoSync().statusBarHeight; //设置右侧所有字母所占总高度
			// #endif
			// #ifndef APP-PLUS && VUE3
			this.zimugaodu = res.windowHeight; //设置右侧所有字母所占总高度
			// #endif
			this.fenduan = this.zimugaodu / 26; //26个字母每一个占多少空间，留着以后计算用
			
			this.shuju = this.quanbushuju;
			this.isshow = true;
		}
	},300)
  },
  mounted() {
    let _this = this; //修改this.shuju使用
    setTimeout(function () {
      _this.shuju = null; //节省数据存储
    }, 1000);
  },

  methods: {
	
    onClick(e) {
      //上个页面传过来的值
      let linshi = e.mingcheng;
      this.$emit("click", {
        linshi,
      });
    },
    touchstarta(e) {
      if (this.zuobiaoccc) {
        this.zuobiao = this.zuobiaoccc;
      }
      this.isxianshi = true;
      let nagezimu =
        this.zimu[Math.floor(e.changedTouches[0].clientY / this.fenduan)];
      if (nagezimu && this.nage !== nagezimu) {
        this.tanchuzimu = nagezimu;
        if (undefined !== this.zuobiao[nagezimu]) {
          uni.pageScrollTo({
            scrollTop: this.zuobiao[nagezimu], //获取已经初始化好的坐标
            duration: 5, //ios太长闪动
          });
        }
      }
    },
    touchmovea(e) {
      let nagezimu =
        this.zimu[Math.floor(e.changedTouches[0].clientY / this.fenduan)];
      if (nagezimu && this.nage !== nagezimu) {
        this.tanchuzimu = nagezimu;
        if (undefined !== this.zuobiao[nagezimu]) {
          uni.pageScrollTo({
            scrollTop: this.zuobiao[nagezimu], //获取已经初始化好的坐标
            duration: 5, //ios太长闪动
          });
        }
      }
    },
    touchenda(e) {
      let _this = this;
      setTimeout(function () {
        //延迟下，否则快速点击不会出现中间黑色弹窗字母提示
        _this.isxianshi = false;
        _this.tanchuzimu = "";
      }, 100);
    },
  },
};
</script>

<style>
/* #ifdef APP-PLUS */
page {
  touch-action: none;
}

/* #endif */
/* #ifdef MP-WEIXIN */
page {
  touch-action: pan-y;
}

/* #endif */
.a-b {
  /* height: 524px;height这个参数要动态修改 高度动态修改 */
  width: 42rpx;
  z-index: 2;
  position: fixed;
  /* #ifdef APP-PLUS && VUE3 */
  top: 0;
  /* #endif */
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #d3d3d3;
  font-size: 26rpx;
  color: #aaaaaa;
}

.a-b-hover {
  color: #000;
}

.uni-indexed-list__alert-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.uni-indexed-list__alert {
  width: 166.67rpx;
  height: 166.67rpx;
  border-radius: 166.67rpx;
  text-align: center;
  line-height: 166.67rpx;
  font-size: 72.92rpx;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
