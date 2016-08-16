var app = angular.module("myApp", ['ngResource']);

app.controller("myCtrl", ['$scope', '$resource','$http', function ($scope, $resource,$http) {
        var Cameras = $resource('/camera');
        Cameras.query(function (results) {
            console.log("result" + results);
            $scope.cameras = results;
            
        });    
        $scope.cameras = [];

        $scope.recording = function (cam) {
            //var record = $resource('/Start_recording');
            //record.sp = cam.maxtimeOut;
            //record.vl = cam.maxvideoLength;
            //record.rtspurl = cam.rtsp_url;
            //console.log(cam+"..."+record.sp);
            //record.$save();


            var obj = {
                sp: cam.maxtimeOut,
                vl: cam.maxvideoLength,
                rtspurl:cam.rtsp_url,
               
            }
            $http({
                method: "post",
                url: 'http://localhost:1337/Start_recording',
                
                data: JSON.stringify(obj),
            })

        }

  }]);
