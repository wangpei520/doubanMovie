/**
 * Created by Administrator on 2017/9/25.
 */
//in_theater  coming_soon  top250 抽象出来的公共模块
(function (angular) {
    'use strict';
    //创建正在热映的模块
    var module = angular.module('movie.movie_list', [
        'ngRoute',
        'moviecat.services.http'
    ]);
    //配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        //在路由中加一个分页参数page
        $routeProvider.when('/:category/:page', {
            templateUrl: 'movieList/movie_list.html',
            controller: 'movie_listController'
        });
    }]);
    module.controller('movie_listController', [
        '$scope',
        '$route',
        '$routeParams',
        // 注入 http 服务
        'HttpService',
        'Appconfig',
        function ($scope,$route,$routeParams,HttpService,Appconfig) {
            //每页的条数
            var count = Appconfig.pageSize;
            //当前页数
            var page = parseInt($routeParams.page);
            var start =(page-1)*count;
            //总条数
            $scope.total = 0;
            //总页数
            $scope.totalPages = 0;
            $scope.currentPage = page;
            $scope.loading = true;
            $scope.subjects = [];
            $scope.title = 'loading...';
            $scope.message='';
            HttpService.jsonp(
                Appconfig.listAppAddress+$routeParams.category,
                //$routeParams的数据来源：1.路由配出来的 2./top250/1?后面的参数
                {start:start,count:count,q:$routeParams.q},
                function(data){
                    $scope.title = data.title;
                    $scope.total = data.total;
                    $scope.subjects = data.subjects;
            //   apply的作用就是让指定的表达式重新同步
                    $scope.loading = false;
                    $scope.totalPages = Math.ceil($scope.total/count);
                    //apply只要调用一次就可以让所有的值都同步一下，无需传值
                    $scope.$apply();
            });
        //    暴露一个更改上一页下一页的行为
        //    传过来的page是第几页就跳到第几页
            $scope.go =function(page){
            // 更新当前路由上page参数的值
                if(page>=1&&page<=$scope.totalPages){
                    $route.updateParams({page:page});
                }
            }
        }])
})(angular)
// function($scope){
//  $scope.subjects = data;
// }
// var doubanApiAdress = 'http://api.douban.com/v2/movie/in_theaters';
// $scope.subjects = data;
// $http.get('data/data.json').then(function (res) {
// $http.jsonp(doubanApiAdress+'?callback = JSON_CALLBACK').then(function (res) {
//     // console.log(res);
//     //此处代码是在异步请求完成过后再执行，要等一会
//     if (res.status == 200) {
//         $scope.subjects = res.data.subjects;
//     } else {
//         $scope.massage = '获取数据失败，错误信息：' + res.statusText;
//     }
// }), function (error) {
//     $scope.massage = '获取数据失败，错误信息：' + error.statusText;
// }