# test1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
使用vue inspect >output.js查看脚手架的默认配置
vue.config.js可以对脚手架进行个性化定制 详情见：https://cli.vuejs.org/zh/config/#vue-config-js

ref 可以加在组件标签上 获取组建的标签 获取当前属性下的所有dom元素 <h1 v-text="title" ref="title1"></h1>
获取方法：vm下的$refs.title1

props 接收组件外部传进得数据 
1.接受方法（数组）  只接收  props:['name','age']
2.接受方法（对象）  限制类型props:{name:String,age:Number},
3.接受方法（对象）  限制类型(直接写数据类型) 限制必要性required 设置默认值defatult
props:{
    name:{
        type:String,
        required:true,//必须得传
    },
    age:{
            type:Number,
        default:99//可以不传 默认99
    }
},
