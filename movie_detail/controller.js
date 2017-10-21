/**
 * Created by Administrator on 2017/9/25.
 */
//in_theater  coming_soon  top250 抽象出来的公共模块
(function (angular) {
    'use strict';
    //创建详情的模块
    var module = angular.module('movie.movie_detail', [
        'ngRoute',
        'moviecat.services.http'
    ]);
    //配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        //在路由中加一个分页参数page
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/movie_detail.html',
            controller: 'movie_detailController'
        });
    }]);
    module.controller('movie_detailController', [
        '$scope',
        '$route',
        '$routeParams',
        // 注入 http 服务
        'HttpService',
        'Appconfig',
        function ($scope,$route,$routeParams,HttpService,Appconfig) {
           // 暴露一个movie对象
           $scope.movie = {};
            var id = $routeParams.id;
            var apiAdress =Appconfig.detailAppAddress+id;
        //    跨域请求
            HttpService.jsonp(apiAdress,{},function(data){
                $scope.movie = data;
                $scope.$apply()
            })
        }])
})(angular)
