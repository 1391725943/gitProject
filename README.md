# test2

### 创建项目
vue create 项目名字

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


### 脚手架结构
    node_modules
    public:
        favicon.ico:页签图标
        index.html:主页面
    src:
        assets:存放静态资源
            logo.png
        components:存放组件
            HelloWord.vue
        App.vue:汇总所有组件
        main.js:入口文件
    .gitignore: git版本管制忽略的配置
    babel.config: babel的配置文件
    package: 应用包配置文件
    README: 应用描述文件 类似记事本
    package-lock: 包版本控制文件

### vue.config.js配置文件
    使用vue inspect > output.js 创建js可以看见脚手架的配置文件
    使用vue.config.js可以对脚手架进行自定义配置 详情见https://cli.vuejs.org/zh/config/

### ref属性
    1.被用来给元素或者子组件注册引用信息（id的替代者）
    2.用在dom元素上就是dom对象 用在组件上是组件标签上的实例对象
    3.使用方式
        打标识：<h1 ref="xxx"></h1>
        获取:this.$refs.xxx

###  配置项：props 传值下在data下无需定义  
    功能 可以接受组件使用时传入的外部数据
    1.传递数据 <demo xxx="">  xxx作为值传入
    2.接受数据：
        (1) 只接收
            props:[xxx]
        (2)限制类型
            props:{xxx:string}
        (3)限制类型 设置必要性 设置默认值
            props:{
                xxx:string，//限制数据类型
                required：true,//设置必要性
                default:'老王',//设置默认值  当没有传值时  可以设置并显示
            }
    3.使用数据
        {{xxx}}
        备注：props是只读的 vue底层会监测你对props的修改  如果进行了修改 会发出警告 props可以传方法
        若业务要求修改 请复制props的内容到data中 然后修改data中的数据

###  mixin（混入）
    功能：可以把多个组件公用的配置提取成一个混入对象 组件中可以直接使用混入的方法
    使用方式：
            1.定义混合 例如：
            export cons xxx1 = {
                data:{},
                methods:{}
            }
            export cons xxx2 = {
                data:{},
                methods:{}
            }
            2.使用混入  例如：
            组件要import {xxx2,xxx2} form '路径'
            (1)全局混入：vue.mixin(xxx1,xxx2)
            (2)局部混入：mixins[xxx1,xxx2]




### 插件
    功能：用于增强vue
    本质：包含install的一个方法 install的第一个参数是vue 第二个以后的参数是插件使用者传递的数据
    定义插件：
        对象.install = function(Vue,option){
            1.添加过滤器
            Vue.filter(......)
            2.添加全局指令
            Vue.filter(......)
            3.定义混合
            vue.mixin(xxx1,xxx2)
            4.添加实例方法
            Vue.prototype.$myMethod = function(){....}
            Vue.prototype.$myProperty = function(){....}
        }
    使用插件：Vue.use(xxx)

### 总结casepage1案例
    1.组件编码流程：
    （1）.拆分静态组件：组件要按照功能点拆分 命名不要与html元素冲突
    （2）.实现动态组件：考虑好数据的存放位置 数据是一个组件再用 还是多个组件用
        1）.一个组件再用，放在自身组件
        2）.多个组件再用，放在他们共同的组件上（状态提升）
    （3）.实现交互：从绑定事件开始
    2.props适用于：
    （1）父组件 ==> 子组件通信
    （2）子组件 ==> 父组件通信 （要求父给子一个函数）
    3.使用v-model时要切记 v-model绑定的值不能时props传过来的值 因为props是不可修改的
    4.props传过来的若是对象类型的值 修改对象中的属性vue不会报错 但不推荐这样做

### 组件间通信
    使用场景 A是父组件 B是子组件 B给A传数据 那么要在A中给B绑定事件(事件的回调在A中)
    绑定自定义事件
        （1）在父组件中 <SchoolPage @lookschool="test"/>
        （2）在父组件中 <SchoolPage ref="demo"/>
            mounted(){
                this.$refs.demo.$on('lookschool',this.test)
            }
        （3）若组件只触发一次 可以使用once修饰符 或者$once
    触发自定义事件 this.$emit('lookschool',数据)

    解绑自定义事件 自定义事件名xxx1,xxx2
        1.this.off('xxx1') 解绑一个自定义事件
        2.this.off(['xxx1','xxx2']) 解绑多个自定义事件
        2.this.off() 解绑所有自定义事件
    组件上也可以绑定原生@click事件 要加修饰符 @click.native
    注意：通过this.$refs.demo.$on('lookschool',this.test)绑定自定义事件时 回调要么配置在methods中 要么用箭头函数 否则this指向有问题会导致报错

    谁接收数据 谁绑定事件(ref绑定 @绑定)  谁传递 谁触发事件$emit

### 全局事件总线
    1.一种组件间的通信 适用于任意组件间通信
    2.安装全局总线
        new Vue({
            render: h => h(App),
            beforeCreate(){
                Vue.prototype.$bus = this//全局事件总线
            }
        }).$mount('#app')
    3.使用全局总线
        1）.接受数据 A组件想接受数据 则在A组件中给$bus绑定自定义事件 事件的回调留在A组件
        回调函数两种方式 1种直接箭头函数 1种methods中配置方法 用this调用
        mounted(){
            this.$bus.$on('hello',(data)=>{
                console.log('我是school 接收到了student信息：',data);
                this.studentName = data
            })
        },
        2）.提供数据：this.$bus.$emit('hello',传递的数据)
    4.最好在beforeDestroy钩子中 用$off去解绑当前用到的的事件

### 消息订阅与发布
    1.一种组件间的通信 适用于任意组件间通信
    2.使用步骤
        1.安装pubsub: npm i pubsub-js
        2.引入import pubsub from 'pubsub-js'
        3.接收数据 A组件想接受数据 则在A组件中订阅消息 事件的回调留在A组件
            methods(){
                demo(){}
            }
            mounted(){
                this.pid = pubsub.subscribe('xxx',demo)
            }
        4.提供数据 pubsub.publish('xxx',数据)
        5.最好在beforeDestroy钩子中 用PubSub.unsubscribe(pid)去取消订阅


### vue封装的过渡动画
    写法：1）.准备好样式
        元素进入样式：
            1. v-enter 元素进入的起点
            2. v-enter-active 元素进入过程中
            3. v-enter-to 元素进入终点
        元素离开样式：
            1. v-leave 元素离开的起点
            2. v-leave-active 元素离开过程中
            3. v-leave-to 元素离开终点
        2）.使用transition包裹元素并配置name属性
        <transition>
            <div>你好</div>
        </transition>
    注意：如果有多个元素需要过渡 需要使用transition-group 且每个元素需要指定key值


### 安装axios:  npm i axios
        axios('接口地址?name=xxx').then().response()=>{}

### 插槽
1.作用：让父组件可以像子组件特定位置插入html 也是一种组件间通信 适用于父组件 ===> 子组件
2.分类：默认插槽 具名插槽 作用域插槽
3.使用方式：
    1）默认插槽
        父组件 ：
            <carplay>
                <div>html结构<div>
            </carplay>
        子组件：
            <template>
                <!-- 定义插槽 -->
                <slot>如果父组件标签中没有内容 显示slot的内容</slot>
            </template>
    2）具名插槽
        父组件 ：
            <carplay>
                <template v-slot:header>
                    <div>html结构<div>
                </template>
                <template slot="center">
                    <div>html结构<div>
                </template>
            </carplay>
        子组件：
            <template>
                <!-- 定义插槽 -->
                <slot name="header">如果父组件标签中没有内容 显示slot的内容</slot>
            </template>
    3)作用域插槽
        1.理解：数据在组件的自身 但根据数据生成的结构需要组件的使用者来决定 （car数据在carplay中 但使用数据所遍历出来的结构由app决定） 父组件想用子组件的时候 可以使用插槽
        2.编码：
            父组件：
                <carplay>
                    <!-- scopeData名字可以随便写 收到了子组件的data数据 -->
                    <template scpoe="scopeData">
                        <ul>
                            <li v-for="(item,index) in scopeData.games" :key="index">
                        </ul>
                    </template>
                </carplay>
                <carplay>
                    <!-- scopeData名字可以随便写 收到了子组件的data数据 -->
                    <template slot-scpoe="scopeData">
                        <ul>
                            <li v-for="(item,index) in scopeData.games" :key="index">
                        </ul>
                    </template>
                </carplay>
            子组件：
               <template>
                    <!-- 定义插槽 -->
                    <div>
                        <slot :caseItems="caseItems">如果父组件标签中没有内容 显示slot的内容</slot>
                    </div>
                </template>
                <script>
                    export default {
                        name:'carplay',
                        data() {
                            return {
                                caseItems:[
                                    {id:nanoid(),name:'吃饭',done:true},
                                    {id:nanoid(),name:'抽烟',done:true},
                                    {id:nanoid(),name:'喝酒',done:false},
                                    {id:nanoid(),name:'开车',done:true},
                                ]
                            }
                        },
                    }
                <script>
    
### 搭建vuex环境 创建文件 src/store/index.js
    1.创建文件
        // 引入核心库 
        import Vue from 'vue'
        // 引入vuex
        import Vuex from 'vuex'
        // 使用vuex
        Vue.use(Vuex)
        // 准备actions  用于响应组件中的动作
        const actions = {}
        // 准备mutations  用于操作数据 (state)
        const mutations = {}
        // 准备state  用于存储数据
        const state = {}

        // 创建并暴露store 对象里的key和保存的对应值一样 可以触发简写模式
        export default new Vuex.Store({
            actions:actions,
            mutations:mutations,
            state:state,
        })
        // export default new  Vuex({
        //     actions,
        //     mutations,
        //     state,
        // })
    2.main.js中使用store
        import Vue from 'vue'
        import App from './App.vue'
        // 引入vuex
        // import Vuex from 'vuex'
        // 导入store
        import store from './store/index.js'

        Vue.config.productionTip = false
        new Vue({
        render: h => h(App),
        store,
        beforeCreate(){
            Vue.prototype.$bus = this//全局事件总线
        },
        mounted(){
            console.log(this);
        }
        }).$mount('#app')

### 基本使用
1.初始化数据 配置actions mutations state
    const actions = {
        jia(content,value){
            content.commit('JIA',value)
        }
    }
    // 准备mutations  用于操作数据 (state)
    const mutations = {
        JIA(state,value){
            state.num+=value
        }
    }
    // 准备state  用于存储数据
    const state = {
        num:0
    }

    // 创建并暴露store 对象里的key和保存的对应值一样 可以触发简写模式
    export default new  Vuex({
        actions,
        mutations,
        state,
    })
2.组件中使用数据 this.$store.state.num
3.组件中修改vuex中的数据 this.$store.dispatch('action中的方法名',传的数据)
若组件中没有网络请求或其他业务逻辑时可以直接调用 this.$store.commit('mutations中的方法名',传的数据)

### getters的使用
1.概念 当state中的数据需要加工后使用 可以使用getters进行加工
2.store.js中追加getters配置
    const getters = {
        bigSum(){
            return status.num*10
        }
    }
    创建并暴露
    export default new Vue.Store({
        getters,
    })
3.组件中读取数据this.$store.getters.bigSum

### 4个map方法的使用
1.mapState用于映射state中的数据为计算属性
    computed:{
        <!-- 2种写法 返回的是一组方法-->
        ...mapState(['名字1','名字2'])
        ...mapState('名字1':'名字2')
    }
2.mapGetters用于映射Getters中的数据为计算属性
    computed:{
        <!-- 2种写法 返回的是一组方法-->
        ...mapGetters(['名字1','名字2'])
        ...mapGetters('名字1':'名字2')
    }
3.mapActions用于生成Actions中的方法 即包含$store.dispatch(xxx)的函数 函数调用时templete中直接传参数
    computed:{
        <!-- 2种写法 返回的是一组方法-->
        ...mapActions({'组件中名字1':'index.js Actions中名字1'})
        ...mapActions(['action中的名字1'])
    }
3.mapMutations用于生成Mutations中的方法 即包含$store.commit(xxx)的函数  函数调用时templete中直接传参数
    computed:{
        <!-- 2种写法 返回的是一组方法-->
        ...mapMutations({'组件中名字1':'index.js Mutations中名字1'})
        ...mapMutations(['Mutations中的名字1'])
    }

### vuex模块化+命名空间
1.目的:让代码更好维护
    修改store.js
        const countAbout={
        namespaced:true,
        actions:{},
        mutations:{},
        state:{
            list:[],
            sum:1
        },
        getters:{
            bigSum(){
                return state.sum*10
            }
        },
    }
    const psersonAbout={
        namespaced:true,
        actions:{addFirstWang(){}},
        mutations:{},
        state:{},
        getters:{firstName(){}},
    }

    export default new Vuex.store({
        countAbout,
        psersonAbout
    })
3.开启命名空间后 组件读取state数据
    <!-- 直接读取 -->
    this.$store.state.personAbout.list
    <!-- 借助mapState读取 -->
    ...mapState('personAbout',['list','sum'])
4.开启命名空间后 组件读取getters数据
    <!-- 直接读取 -->
    this.$store.getters['personAbout/firstName']
    <!-- 借助mapGetters读取 -->
    ...mapGetters('personAbout',['bigSum'])
5.开启命名空间后 组件读取dispatch数据
    <!-- 直接读取 -->
    this.$store.dispatch['personAbout/addFirstWang',person]
    <!-- 借助mapAction读取 -->
    ...mapAction('personAbout',{'组件中名字1':'index.js Actions中名字1'})
6.开启命名空间后 组件读取commit数据
    <!-- 直接读取 -->
    this.$store.commit['personAbout/addFirstWang',person]
    <!-- 借助mapAction读取 -->
    ...mapMutations('personAbout',{'组件中名字1':'index.js Actions中名字1'})


### 路由 
    理解：一个路由route就是一组映射关系 多个路由需要路由器router进行管理
    前端路由：key是路径 value是组件 
    后端路由：key是路径 value是回调函数

### 路由基本使用
1.安装 npm i vue-router
2.
    引入插件 import VueRouter from 'vue-router'
    应用插件 Vue.use(VueRouter)
    创建实例中要写 router
3.编写配置项 src => router => index.js
4.编写router配置项：
    import VueRouter from "vue-router";
    import School from 'School.vue'
    import Student from 'Student.vue'

    export default new VueRouter({
        routes:[
            {
                path:'/School',
                components:School
            },
            {
                path:'/Student',
                components:Student
            },
        ]
    })
5.实现切换 active-class可配置当前切换页面效果（高亮）
    <router-link to="/School" active-class="active">School</router-link>
6.指定展示位置 
    <router-view></router-view>

### 路由注意点
    1.路由组件通常放在page文件夹下  一般组件通常放在component文件夹下
    2.通过切换 “隐藏”的路由组件 默认是被销毁的 需要的时候再去挂载
    3.每个组件都有自己的$route信息 里面存储着自己的信息
    4.整个应用都是同一个router，通过组件的$router可以获取到

### 配置多级路由嵌套
1.配置路由规则 使用children选项  子路由无需添加斜杠
    routes:[
        {
            path:'/School',
            components:School
        },
        {
            path:'/Student',
            components:Student,
            children:[
                {
                    path:'xibie'
                    components:'xibie'
                },
                {
                    path:''
                    components:''
                }
            ]
        },
    ]
2.嵌套路由跳转  要写完整路径
    <router-link to="/School/xibie" active-class="active">School</router-link>

### 路由传递参数query第一种
1.传递参数
    <!-- 第一种写法 -->
    <router-link to="/School/xibie?id=666$name=888" active-class="active">School</router-link>
    <!-- 第二种写法 -->
    <router-link :to="{
        path:'/School/xibie',
        query:{
            id:666,
            name:888
        },
    }" active-class="active">
        School
    </router-link>
2.接收参数
    $route.query.id
    $route.query.name

### 路由传递参数params第二种
1.配置路由
    routes:[
        {
            path:'/School',
            components:School
        },
        {
            path:'/Student',
            components:Student,
            children:[
                {
                    path:'xibie',
                    components:'xibie/:id/:name'  //只用占位符接收params参数
                },
                {
                    path:'',
                    components:''
                }
            ]
        },
    ]
2.传递参数
    <!-- 第一种写法 必须在routes里配置用占位符占位-->
    <router-link to="/School/xibie/666/888" active-class="active">School</router-link>
    <!-- 第二种写法 params不能与path使用-->
    <router-link :to="{
        <!-- path:'/School/xibie', -->
		name:'xiebie',
        params:{
            id:666,
            name:888
        },
    }" active-class="active">
        School
    </router-link>
    <!-- 注意 在使用params传递参数时 若使用to的对象写法 不能使用path写路径 必须使用name -->
3.接收参数
    $route.params.id
    $route.params.name

### 命名路由  router-link可以直接to路径名字进行跳转
1.作用：可以简化路由跳转
2.使用：
    routes:[
        {
            name:'xuexiao',
            path:'/School',
            components:School
        },
        {
            name:'xuesheng',
            path:'/Student',
            components:Student
        },
    ]
3.简化跳转
    <!-- 简化前 -->
    <router-link to="/School?id=666$name=888" active-class="active">School</router-link>
    <!-- 简化后 -->
    <router-link :to="{
        name:'xuexiao',
        query:{
            id:666,
            name:888
        },
    }" active-class="active">
        School
    </router-link>、

### 路由的props配置
    1.作用：让路由组件更方便的接收数据
        routes:[
            {
                name:'xuexiao',
                path:'/School',
                components:School
            },
            {
                name:'xuesheng',
                path:'/Student',
                components:Student,
                <!-- 第一种写法 该对象中所有key-value的组合最终都会通过props传给学生组件 -->
                props:{a:999}
                <!-- 第二种写法 布尔值 为true时该对象的params参数会通过props传给学生组件 -->
                props:true
                <!-- 第三种写法 函数 该函数返回的对象中所有key-value的组合最终都会通过props传给学生组件 -->
                props($route){
                    return{
                        id:$route.query.id,
                        name:$route.query.name
                    }
                }
                <!-- 解构赋值 -->
                props({query}){
                    return{
                        id:query.id,
                        name:query.name
                    }
                }
            },
        ]
    2.接收  props:['id','name']

### router-link标签的replace属性
    1.作用：控制路由跳转时操作浏览器历史记录的模式
    2.浏览器的两种写入模式 分别为 push 和 replace，push是追加记录 replace是替换当前记录 路由跳转时默认为push
    3.如何开启replace模式
          <router-link replace to="/School?id=666$name=888" active-class="active">School</router-link>
          完整写法
          <router-link :replace="true" to="/School?id=666$name=888" active-class="active">School</router-link>


### 编程式路由导航
1.作用：不借助router-link实现跳转 让路由跳转更加灵活  params对象写法时 必须要写name属性跳转 不能path
2.具体编码  methods中配置方法
    this.$router.push({
        name:'xibie',
        params:{
            id:666,
            name:888
        },
    })
    this.$router.replace({
        name:'xibie',
        params:{
            id:666,
            name:888
        },
    })

this.$router.back  后退
this.$router.forward 前进
this.$router.go(number) 负数后退几步  正数前进几步

    


### 缓存路由组件
1.作用 让不展示的路由组件保持挂载 不被销毁
2.编码
    <keep-alive include="School">
        <router-view></router-view>
    </keep-alive>
    <!-- 缓存多个 -->
    <keep-alive :include="['School','Student']">
        <router-view></router-view>
    </keep-alive>
注意：include是确定缓存组件的名字

### 两个新的生命周期钩子 路由专用
    1.作用：路由组件所特有的两个钩子函数 用于捕获路由组件的激活状态
    2.具体名字
        1.activated路由组件被激活时触发
        2.deactivated路由组件失活时触发

### 路由守卫
1.作用：对路由进行权限控制
2.分类：全局守卫 独享守卫 组件内守卫
3.全局守卫
    <!-- 路由添加配置 -->
    routes:[
        {
            name:'xuexiao',
            path:'/School',
            components:School,
            meta:{
                isAuth:true,
                name:'666'
            }
        },
        {
            name:'xuesheng',
            path:'/Student',
            components:Student
        },
    ]
    <!-- 前置路由 -->
    router.beforeEach((to,from,next)=>{
        if(to.meta.isAuth){//判断路由是否需要放行
            if(to.meta.name="666"){
                next()//放行
            }else{
                console.log('没有权限');
            }
        }else{
            next()
        }
    })
    后置守卫
    router.afterEach((to,from)=>{
        if(to.meta.name){
            document.title = to.meta.name
        }else{
            document.title = 'vue案例'
        }
    })
4.独享路由  某一个路由独享
    routes:[
        {
            name:'xuexiao',
            path:'/School',
            components:School,
            meta:{
                isAuth:true,
                name:'666'
            },
            beforeEnter:(to,from,next)=>{
                if(to.meta.isAuth){//判断路由是否需要放行
                    if(to.meta.name="666"){
                        next()//放行
                    }else{
                        console.log('没有权限');
                    }
                }else{
                    next()
                }
            }
        },
    ]
5.组件内守卫  两个的to from应该是相反的
<!-- 进入守卫  通过路由规则 进入该组件时调用 -->
beforeRouteEnter (to, from, next) {
  // ...
}
<!-- 离开守卫  通过路由规则 离开该组件时调用 -->
beforeRouteLeave (to, from, next) {
  // ...
}

### 路由的两种工作模式
1.对一个url来说 什么是hash值？ 就是#及其后面的内容就是hash值
2.hash不会包含在http请求中 及：hash不会带给服务器
3.hash模式
    1.地址中永远带着#号 不美观
    2.若以后将地址通过第三方手机app分享 若app校验严格 则地址会被标记为不合法
    3.兼容性较好
4.history模式
    1.地址干净 美观
    2.兼容性和hash比相对较差
    3.应用部署上线时  需要后端人员支持 解决页面刷新404的问题
5.使用node创建本地服务器打开vue项目文件
    1.npm init
    2.输入项目名字 一直按enter
    3.npm i express
    4.右键 新建文件server.js  详情可见案例D:\vueProject\vueServe
        内容：
            const express = require('express')
            // const res = require('express/lib/response')

            const app = express()
            // 使用文件
            app.use(express.static(__dirname+'/static^c'))

            app.get('/person',(requset,response)=>{
                response.send({
                    name:'sss',
                    age:20
                })
            })

            app.listen(5005,(err)=>{
                if(!err) console.log('服务器启动成功');
            })
    5.启动服务器 node server
6.使用history解决浏览器刷新时页面不显示  示例：https://www.npmjs.com/package/connect-history-api-fallback
    npm i connect-history-api-fallback

### vue ui常用组件库
    移动端常用库
        1.vant https://youzan.github.io/vant
        2.cube ui https://didi.github.io/cube-ui
        3.mint ui https://mint-ui.github.io
    pc端常用库
        1.element ui https://element.eleme.cn
        2.iview ui https://www.iviewui.com

### mock数据模拟 阻止ajax请求
    1.安装 npm i mockjs
    2.使用步骤：
        1）在项目当中src文件夹下创建mock文件夹
        2）第二部准备json数据（mock文件夹下准备json文件)
    3.把mock数据需要的图片放置到public文件夹中（public文件夹打包的时候 会原封不动打包到dis文件夹中
    4.开始mock（创建mockSever.js），通过mock.js模块实现
    5.mockSever.js文件内容  json无需对外暴露 
        import Mock from 'mockjs'
        <!-- 引入json文件 -->
        import banner from './banner.json'
        import floor from './floor.json'
        <!-- 第一个数据请求地主 第二个参数请求数据 -->
        Mock.mock('/mock/banner',{code:200,data:banner})
        Mock.mock('/mock/floor',{code:200,data:floor})
    6.main.js中需要引入mockSever.js  因为不需要对外暴露 所以import '@路径'

### 使用swiper
    1安装 npm i swiper@5或者 cnpm install --save swiper@3
    2.main.js引入样式 import 'swiper/css/swiper.css'
    3.需要轮播图的地方引入包 import swiper form 'swiper'
    
    <!-- 1.引入包(css,js)
    2.页面中必须要有结构
    3.必须要new swiper -->
    