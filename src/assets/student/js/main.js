var app = angular.module('app', ['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
        .setStorageType('sessionStorage')
        .setDefaultToCookie(false)
});




app.controller('mainController', function ($scope, $log, $http, localStorageService) {
    $scope.userInfo = {}
    $scope.currentPage = '个人中心';
    $scope.titles = [];
    $scope.target  = "mainFrame"


    $scope.userLoad = function () {
        // $log.info(userInfo.getUserInfo())
        $scope.userInfo = localStorageService.get('userInfo')
    }
    $scope.profilePage = function () {
        $scope.currentPage = '个人中心'
        $log.info($scope.currentPage)
        var win = document.getElementById("cwin");
        $log.info(win)
    }

    $scope.upLoadPage = function () {
        $scope.currentPage = '上传图片'
        $log.info($scope.currentPage)
        var win = document.getElementById("cwin");
        $log.info(win)
    }
})