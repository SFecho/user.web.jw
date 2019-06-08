var app = angular.module('app',['LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('studentApp')
        .setStorageType('sessionStorage')
        .setDefaultToCookie(false)
});

app.controller('upLoadController', function ($scope, $log, $http, localStorageService) {
    $scope.fileInfo = {}

    $scope.doUpLoad = function () {
       // filePath
        var file = angular.element("#id-input-file-3")[0].files[0];

        var formData = new FormData()
        formData.append('file', file)
        formData.append('fileInfo', angular.toJson($scope.fileInfo))


        if(uploadForm() == true){
            $http({
                method: 'POST',
                url: '/app/io/upload',
                data: formData,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
                .then(
                    function successCallBack(response) {
                        if(response.data.status == 'success') {
                            location.reload()
                            alert('上传成功！')
                        }else{
                            alert('上传失败！')
                        }


                    },
                    function error(response) {
                        alert('上传失败！')
                    }
                )
        }


   }
})