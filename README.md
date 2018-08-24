# selectCountry

选择国家的插件
1、依赖于layui.js 
2、返回的数据格式，如下（结合thinkPHP5.0 格式的直接返回数组）：
  return [
      'data'  => $currentData,
      'count' =>  $all[0]['num'],
      'code'  =>  0,
      'msg'   =>  "",
  ];
3、使用时，在当前页面引入CSS和js,直接用对应的Dom调用即可，如下：



   HTML： <div class="layui-form-item">
              <label class="layui-form-label form-left-tag"><span class="must-input">*&nbsp;</span>买方国家代码：</label>
              <div class="layui-input-block  sap-line countrySelect">
              </div>
          </div>



  js：$('.countrySelect', $creditBody).countrySelect();
  
  完成！
  
  
  
  
  
  
