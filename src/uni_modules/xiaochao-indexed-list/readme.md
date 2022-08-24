#说明必看
 
- 在需要引入页面复制下面替换引入页 template

- `<template><xiaochao-indexed-list :quanbushuju="shuju" @click="bindClick"></xiaochao-indexed-list></template>`

- :quanbushuju="shuju" 这里数据是你要替换成你的，没弄好暂时可以不替换，可以删除这个参数 :quanbushuju="shuju"

- 在引入页methods 创建 bindClick(e)方法

- 填充自己数据后可以删除js文件，js文件在插件根目录

- 数据结构 {"A": ["安居小区", "奥德紫荆城"],"B": ["班超公寓", "包勇村"]}，也可以打开shujuliebiao.js查看