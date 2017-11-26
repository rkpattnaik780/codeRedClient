'use strict';

angular.module('clientApp')
    .controller('SendmailCtrl', function ($http, $scope, $location, userservice) {
        console.log(userservice.checkSession());
        if (!userservice.checkSession()) {
            $location.path("useroptions");
        }

        var tempArray = [];

        $scope.mailList = [{ "name": "STBC", "email": "stbc@odisha.gov.in", "long": 85.822, "lat": 20.359 }];

        $http.get("https://data.gov.in/node/3287321/datastore/export/json").then(function (res) {
            var mydata = res.data ;
            navigator.geolocation.getCurrentPosition(function (position) { console.log(position);
                var _location = position.coords;

               for (var i = 0; i <mydata.length; i++) {
                    if (mydata[i][2] === "Odisha") {
                        mydata[i][27] = distance(_location.latitude, _location.longitude, mydata[i][25], mydata[i][26]);
                       
                            tempArray.push({
                                "name": mydata[i][1],
                                "email": mydata[i][11],
                                "distance": mydata[i][27]
                            });
                       
                    }
                } tempArray.sort(function (a, b) {
                    return a["distance"] - b["distance"];
                });
                tempArray = tempArray.slice(0, 10); console.log(tempArray);
                $scope.$apply(function(){
                    $scope.mailList = $scope.mailList.concat(tempArray);
                }); 
            }); 
        }); 

        $scope.sendMail = function (email, sub, content) { console.log("here")
            $http.put("/sendemail", { "to": email, "subject": sub, "text": content }).then(function (res) {
                console.log(res);
            }, function (error) {
                console.log(error);
            }) 
        } 


    });

function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344;
    return dist.toFixed(1);
}