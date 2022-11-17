### 命令行窗口  cmd命令进入
    window + r 
    --常用命令：
        dir 打出当前目录下的所有文件
        cd 目录名（desktop）  进入文件夹桌面
        md 目录名（hello） 创建文件夹hello
        rd 目录名（hello）删除文件夹hello  进入文件夹后直接输入名字就可以打开

    --目录
        dir一开始显示的 . 和 ..
            . 表示当前目录
            .. 表示上级目录

    --环境变量
        如果想直接访问该文件 修改环境变量path 把当前访问的文件地址添加至path环境变量中

        当我们命令行窗口打开一个文件 或调用一个程序时
            系统会首先在当前目录下寻找文件程序  如果找到则直接打开
            如果没有找到会依次到环境变量的path路径中寻找  直到找到为止
            如果没找到则报错

        可以将经常访问的程序和文件的路径添加到path中 
            这样我们就可以在任意位置来访问这些文件和程序

### 进程和线程
    进程
        --进程负责为程序的运行提供必备的环境
        --进程相当于工厂中的车间
    线程
        --线程计算机中的最小单位 线程负责执行进程中的程序
        --线程相当于工厂中的工人
    单线程

    多线程

### node简介
    --node是对es标准的一个实现  也是一个js引擎
    --通过node可以让js代码在服务端执行
    --node仅仅对es标准进行实现 所以node不包括dom和bom
    --node可以使用所有的内建对象
        string number boolean math date regexp function object array
        而bom和dom不可使用 
            可以使用console也可以使用定时器
    --node可以在后台编写服务器
        进程
            --进程负责为程序的运行提供必备的环境
            --进程相当于工厂中的车间
        线程
            --线程计算机中的最小单位 线程负责执行进程中的程序
            --线程相当于工厂中的工人
    --传统的服务器都是多线程
        --每进来一个请求 就创建一个线程去处理请求

    --node服务器是单线程
        --node处理请求时是单线程 但在后台请求数据库有一个I/O线程池

### node基本使用
    进入node 命令行打开 直接输入node 退出node按ctrl+c 多按
    进入js文件夹中打开文件 node 文件名    
    
### npm的使用 详解网址（http://t.zoukankan.com/lgxlsm-p-8653036.html）
    npm install -g cnpm --registry=https://registry.npm.taobao.org  （注册淘宝镜像）

    npm init初始化
    npm install 包名 -g(install安装 可简写i uninstall卸载 update更新 -g为全局) 
    npm install gulp --save 或 npm install gulp -S  (-s --save安装包信息将加入到dependencies（生产阶段的依赖)
    npm install gulp --save-dev 或 npm install gulp -D  (-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它)
    npm install gulp --save-optional 或 npm install gulp -O (-O, --save-optional 安装包信息将加入到optionalDependencies（可选阶段的依赖）)
    npm install gulp --save-exact 或 npm install gulp -E    (-E, --save-exact 精确安装指定模块版本)
    npm i [包名]@[版本号]   #安装旧版本或指定版本
    npm outdated (检查模块是否已经过时)
    npm list (查看安装的模块列表)
    npm info 包名 (查看包的详细信息)
    npm root (查看包的安装路径)
    npm config (管理npm的配置路径)
    npm start (启动模块)    npm start [-- <args>]
    npm stop (停止模块) npm stop [-- <args>]
    npm restart (重新启动模块)  npm restart [-- <args>]
    npm test (测试模块) npm test [-- <args>]  npm tst [-- <args>]
    npm cache clean -f (清理缓存)

### nrm的使用 淘宝镜像

### yarn的使用
    npm install yarn -g（安装）
    yarn config set registry http://registry.npm.taobao.org/ （安装淘宝镜像）
    对比npm：
        速度快：yarn缓存了每个下载过的包 所以在此使用时无需重复下载 同事利用并行下载以最大化资源利用率 因此安装速度更快
        超级安全：在执行代码之前 yarn会通过算法检验每个包的完整性

    yarn init（开始新项目） 
    yarn add 包名（添加依赖包）
    yarn add 包名@版本号（添加依赖包）
    yarn upgrade 包名@版本号 (升级依赖包)
    yarn add 包名 --dev（添加依赖包）
    yarn remove 包名（移除依赖包）
    yarn start 开始项目

 














