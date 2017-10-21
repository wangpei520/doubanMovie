/**
 * Created by Administrator on 2017/9/26.
 */
// 给当前点击的按钮加上active类，（表现为有蓝色背景色）
(function(angular){
    var autoFous = angular.module('moviecat.directives.auto_focus',[]);
    //指令使用时用下划线的方式，定义的时候要用驼峰命名法
    autoFous.directive('autoFocus',['$location',function($location){
        //因为在公共模块中设置了默认的路由地址为in_theater，而子模块是在公共模块之后执行，
        // 所以刚开始打开页面的时候path的值为空，所以要实时监视下path才行
        // var path = $location.path();
        // console.log(path);    /coming_soon/2
        return{
            //规定自定义指令以什么方式使用，A指的是以属性的方式使用
            restrict: 'A',
            link:function($scope,iElm,iAttrs,controller){
            //    iElm:指令最终用在哪个元素上
            //    iAttrs：元素的所有属性
                $scope.$location = $location;
                $scope.$watch('$location.path()',function(now){
                    var aLink = iElm.children().attr('href');
                    // console.log(aLink);#/top250/1
                    var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
                    // console.log(type);  /top250
                    if(now.startsWith(type)){
                        //访问的是当前连接
                        iElm.parent().children().removeClass('active');
                        iElm.addClass('active');
                    }
                });
            }
        }
    }])
})(angular);