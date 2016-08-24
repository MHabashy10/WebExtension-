

angular.module('tpce.services', [])


    .factory('$TPuser', ['$http', function ($http) {

        //var url = "https://tpcrm.teleplus.net/home/";
        var url = "http://localhost:61409/home/";
        return {
            login: function (username, password) {
                var req = {
                    method: 'POST',
                    url: url + "CELogin",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data:{UserData: JSON.stringify( { 'Username': username, 'Password': password })}
                }

               return $http(req)
                   
            }
        }
    }])

    .factory('$storage' , function () {
        return {
            set: function (object) {
                chrome.storage.sync.set(object, function () {
                    // Notify that we saved.
                    alert('Settings saved');
                });
            },
            get: function (key, cb) {
                chrome.storage.sync.get(key, function (object) {
                    cb(object);
                });
            },
            remove: function (key, cb) {
                chrome.storage.sync.remove(key, function (object) {
                    cb(object);
                });
            }
        }
    })