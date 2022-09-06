<script>
// https://www.jianshu.com/p/d9430c1e06e8   详解网址
// 添加样式
export default {
  name: "schoolPage",
  // render函数封装组件
  render(createElement){// 第一种  最简单
    // return createElement("div", "我是内容");
    return createElement('div',{
      style:{
        'color':'#00ff00',
        'font-size':'3rem'
      }
    },'你好');
  },
};
</script>

<style>
</style>