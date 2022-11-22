<template>
  <xiaochao-indexed-list
    :quanbushuju="userList"
    @click="bindClick"
  ></xiaochao-indexed-list>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import vPinyin from "./txl/vue-py";
import controlApi from "@/api/control";
export default defineComponent({
  setup() {
    const bindClick = (e) => {
    //   uni.showToast({
    //     title: e.linshi.username,
    //   });
    };
    const userList = ref();
    async function getxphUserList() {
      let res = await controlApi.getxphUserList({
        pageNum: 1,
        pageSize: 10000,
      });
      let resData = res.obj.records;
      
	  let dataObj = init(resData);
	  userList.value = sortData(dataObj)
	
    }
	// 初始化数据
    const init = (resData) => {
	  let listData = {};
      if (resData.length !== 0) {
        var salesmanMap = new Map();
        resData.forEach((item, index) => {
          let salesmanName = item.realName;
          let firstPinyin = "";
          if (salesmanName !== "") {
            //获取汉字拼音首字母
            let namePinyin = vPinyin.chineseToPinYin(
              salesmanName.substring(0, 1)
            );
            firstPinyin = namePinyin.substring(0, 1).toUpperCase();
          }
          let salesmanData = [];
          //  构造key为业务员名字首字母 value为业务员工列表的map对象
          if (salesmanMap.has(firstPinyin)) {
            salesmanData = salesmanMap.get(firstPinyin);
            salesmanData.push(item);
            salesmanMap.set(firstPinyin, salesmanData);
          } else {
            salesmanData.push(item);
            salesmanMap.set(firstPinyin, salesmanData);
          }
        });
        //  构造name：业务员名字首字母  value:业务员工列表数据 json对象数组
        for (let [key, value] of salesmanMap.entries()) {
          var jsonData = {};
          jsonData[key] = value;
          listData = { ...jsonData, ...listData };
        }
      }
      return listData;
    };
    // 字母排序
    const sortData = (listData) => {
      let obj = {};
      for (let i = 65; i <= 90; i++) {
        if (listData[String.fromCharCode(i)]) {
          obj[String.fromCharCode(i)] = listData[String.fromCharCode(i)];
        }
      }
      return obj
    };

    onMounted(() => {
      getxphUserList();
    });
    return {
      bindClick,
      userList
    };
  },
});
</script>

<style>
</style>
