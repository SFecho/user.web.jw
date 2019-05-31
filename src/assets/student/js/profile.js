var app = angular.module('app', ['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
        .setStorageType('sessionStorage')
        .setDefaultToCookie(false)
});




app.controller('profileController', function ($scope, $log, $http, localStorageService) {
    $scope.userInfo = {}
    $scope.userLoad = function () {

    $scope.userInfo = localStorageService.get('userInfo')

    if($scope.userInfo.sex == 'W')
        $scope.userInfo.realSex = '女'
    else
        $scope.userInfo.realSex = '男'
    }
})