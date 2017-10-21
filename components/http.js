/**
 * Created by Administrator on 2017/9/26.
 */
(function (angular) {
     //由于默认angular提供的异步请求对象不支持自定义回调函数名
     //angular随机分配的回调函数名称不被豆瓣支持
     var http = angular.module('moviecat.services.http',[]);
     http.service('HttpService',['$window','$document',function($window,$document){
         // console.log($document);
         this.jsonp = function(url,data,callback){
         //   1、 处理url地址中的参数
         //   2、创建script标签，将url地址放到script标签的src中
         //   3、挂载回调函数
         //   4将script标签放到页面中去
         //    回调函数名中后面的随机字符串
             var urlFix = Math.random().toString().replace('.','');
             //回调函数名称
             var cbFnName = 'my_jsonp_cb'+urlFix;
             $window[cbFnName] = callback;
         //    判断传入的地址最后一个字符是不是？
             var querystring = url.indexOf('?')==-1 ? '?':'&';
             //处理传入的data数据，转换为?key1=value1&key2=value12 参数
             for(var key in data){
                 querystring += key + "=" + data[key] + '&';
             }
             querystring += 'callback='+cbFnName;
         //   创建script标签，这里有个问题，只创建标签，不删除，导致document得不到释放，页面创建的标签越来越多
             var scriptEle = $document[0].createElement('script');
             scriptEle.src = url + querystring;
             $document[0].body.appendChild(scriptEle)
         }
     }])
})(angular)