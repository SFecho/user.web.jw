//注册angular.js app
var app = angular.module('app', ['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
            .setStorageType('sessionStorage')
            .setDefaultToCookie(false)
});

app.controller('loginController', ($scope, $log, $http, localStorageService)=>{
    $scope.user = {}
    $scope.rootDirInfo = {}
    $scope.doLogin = () => {
        $http({
                method: 'POST',
                url:'/app/dologin',
                data: JSON.stringify($scope.user),
                headers: {'Content-type': 'application/json;charset=UTF-8'}
            })
            .then(
                function successCallBack(response){
                    if(response.data != ''){
                        $scope.user = response.data
                        localStorageService.set('userInfo', $scope.user)

                        //得到根目录
                        var a = document.getElementById("openBlank");
                        window.location.href = "main.html"
                        a.click()
                    }else{
                        alert('账号或密码错误，请重新输入。')
                    }
                },
                function error(response) {
                    $log.info(response);
                }
            )
    }

    $scope.sendEmail = () => {
        $('.widget-box.visible').removeClass('visible');//hide others
        $('#login-box').addClass('visible');
    }
})
//The first AFFILIATED HOSPITAL OF DALIAN MEDICAL UNIVERSITY
app.controller('signUpController', ($scope,$log, $http, localStorageService)=>{
    $scope.newUser = {}
    $scope.doSignUp = () =>{
        $log.info($scope.newUser)

        if($scope.newUser.password == $scope.newUser.secondPassword){
            /*
            *  aaa.axiox(
            *  {
            *  url: localhost:8080/user/addUser
            *  }
            *  )
            *
            * */
            $http({
                method: 'POST',
                url:'/app/user/addUser',
                data: JSON.stringify($scope.newUser),
                headers: {'Content-type': 'application/json;charset=UTF-8'}
            })
                .then(
                    function successCallBack(response){
                        if(response.data.status =='success'){
                            localStorageService.set('userInfo', $scope.newUser)
                            $('.widget-box.visible').removeClass('visible');//hide others
                            $('#login-box').addClass('visible');//
                        }else{
                            alert('已有此用户，请重新输入员工编号')
                        }
                    },
                    function errorCallBack(response){
                        $log.info(response)
                    }
                )
        }
        else
            alert('请校对输入密码是否一致')
    }
})
