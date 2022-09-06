<script>
// https://www.jianshu.com/p/d9430c1e06e8   详解网址
// 添加点击事件
export default {
  name: "schoolPage",
  // render函数封装组件
  props: {
    tag:{
      type:String,
      required:true
    },
    msg: {
      type: String,
      // default: "我是props中的默认的render",
    },
  },
  render(createElement){// 第一种  最简单
    // return createElement("div", "我是内容");
    return createElement(this.tag,{
      class:'render-color',
      on:{  //添加点击事件
        click:(e)=>{
          console.log('我被点击了'+this.msg,this,e);
        }
      },
      domProps:{//innerHTML会覆盖传进来的this.msg
        className:'render-in-color',
        innerHTML: ` 
        <div><h1>${this.msg}</h1></div>
        <div><h1>test2</h1></div>
        `//解析模板
      }
    },this.msg);
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