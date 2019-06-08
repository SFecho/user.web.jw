var app = angular.module('app', ['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
        .setStorageType('sessionStorage')
        .setDefaultToCookie(false)
});




app.controller('mainController', function ($scope, $log, $http, localStorageService) {
    $scope.userInfo = localStorageService.get('userInfo');
    $scope.rootDirInfo = localStorageService.get('rootDirInfo');
    $scope.target  = "mainFrame"

    $scope.profilePage = function () {
        var win = document.getElementById("cwin");
    }

    $scope.upLoadPage = function () {
        var win = document.getElementById("cwin");
    }

    $scope.getList = function($event, item){
        var up = $($event.target).parent().parent();

        $http({
            method: 'POST',
            url:'/app/io/getcontent',
            data: JSON.stringify(item),
            headers: {'Content-type': 'application/json;charset=UTF-8'}
        }).then(
            function success(response) {
                if(response.data.length == 0) {
                    up.scope().trees = null;
                    var win = document.getElementById("cwin");
                    win.src = "../user/downloadPage.html";
                    // if (localStorageService.get('curPage') != null)
                    //     localStorageService.remove('curPage')
                    // localStorageService.set('curPage', item)
                    if(sessionStorage.getItem('curPage') != null)
                        sessionStorage.removeItem('curPage')
                    sessionStorage.setItem('curPage', JSON.stringify(item))
                }
                else
                    up.scope().trees = response.data;
            },
            function failure(response) {
            }
        )
    }

    $scope.openList = function ($event, item) {
        var tree = $($event.target).parent().scope().tree
        //使用 ajax进行同步传输
        $.ajax({
            async: false,
            cache:false,
            url:'/app/io/getcontent',
            contentType: "application/json",
            type:'POST',
            data: JSON.stringify(item),
            success: function (data) {
                if(data.length > 0)
                    item.subList = data;
                else
                    item.subList = null;

                if(item.subList == null) {
                    var win = document.getElementById("cwin");
                    win.src = "../user/downloadPage.html";
                    if (sessionStorage.getItem('curPage') != null)
                        sessionStorage.removeItem('curPage')
                    sessionStorage.setItem('curPage', JSON.stringify(item))
                }
            },
            error: function (e) {
            }
            })
    }

    $scope.openPage = function ($event ,item) {


    }

    $scope.getRootList = function () {
        $.ajax({
            async: false,
            cache: false,
            url: '/app/io/getrootdir',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify({}),
            success: function (data) {
                $scope.rootDirInfo = data
            },
            error: function (e) {
                alert('数据库查询失败，请检查数据库服务器！');
            }
        })
    }

})