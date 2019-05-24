var app = angular.module('app', ['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
        .setStorageType('sessionStorage')
        .setDefaultToCookie(false)
});




app.controller('mainController', function ($scope, $log, $http, localStorageService) {
    $scope.userInfo = {}
    $scope.userLoad = function () {
        // $log.info(userInfo.getUserInfo())
        $log.info(localStorageService.get('userInfo'))
        $scope.userInfo = localStorageService.get('userInfo')
    }
})