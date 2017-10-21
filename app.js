(function(angular){
  'use strict';
  var app = angular.module('moviecat',[
      'ngRoute',
      'movie.movie_detail',
      'movie.movie_list',
      'moviecat.directives.auto_focus'
  ]);
  //  之前定义死的count、apiaddress等值，以后可能会发生变化，所以合理应该定为变量
  //  constant('name',value)就是用来定义一些常量,使用直接注入到控制器中，这个比较特殊的是
  //  在公共模块定义的，但是在子模块中也可以拿到，其他像控制器、命令就不行
    app.constant('Appconfig',{
        pageSize:10,
        listAppAddress :'http://api.douban.com/v2/movie/',
        detailAppAddress : 'http://api.douban.com/v2/movie/subject/'
    });
  //默认情况
  app.config(['$routeProvider',function($routeProvider){
    $routeProvider.otherwise({redirectTo:'/in_theaters/1'})
  }]);
//    搜索框控制器
    app.controller('searchController',[
        '$scope',
        '$route',
        'Appconfig',
        function($scope,$route,Appconfig) {
        $scope.input = '';
        $scope.search = function(){
            $route.updateParams({'category':'search',q:$scope.input})
        }
    }]);
})(angular)

//作用相当于autoFocus模块
//     .controller('navController',[
//         '$scope',
//         '$location',
//         function($scope,$location){
//             //    $watch(),只能监视$scope对象，所以将$location本地化
//             $scope.$location = $location;
//             $scope.$watch('$location.path()',function(now){
//                 if(now.startsWith('/in_theaters')){
//                     $scope.type = 'in_theaters';
//                 }else if(now.startsWith('/coming_soon')){
//                     $scope.type = 'coming_soon';
//                 }else if(now.startsWith('/top250')){
//                     $scope.type = 'top250';
//                 }
//                 console.log( $scope.type);
//             });
//         }])