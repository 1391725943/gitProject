<script>
// https://www.jianshu.com/p/d9430c1e06e8   详解网址
// 添加样式 内嵌创建html标签
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
    },[
      createElement('span',{
        style:{
          'font-weight':'bold'
        }
      },'我是内部内容1'),
      createElement('span',{
        style:{
          'font-weight':'bold'
        }
      },'我是内部内容2')
    ]);
  },
};
</script>

<style>
</style>