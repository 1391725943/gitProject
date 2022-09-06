<script>
// https://www.jianshu.com/p/d9430c1e06e8   详解网址
// scoped样式下内部引用class样式 使用domProps直接创建html标签
export default {
  name: "schoolPage",
  // render函数封装组件
  render(createElement){// 第一种  最简单
    // return createElement("div", "我是内容");
    return createElement('div',{
      class:'render-color',
      domProps:{
        className:'render-in-color',
        innerHTML: `
        <div><h1>test2</h1></div>
        <div><h1>test2</h1></div>
        `//解析模板
      }
    },);
  },
};
</script>

<style scoped>
.render-color{
  color: rgb(7, 10, 241);
  
}
.render-in-color{
  color: rgb(180, 12, 12);
}

</style>