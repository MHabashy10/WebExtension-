

angular.module('tpce.services', [])


    .factory('$UTuser', ['$http', function ($http) {

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
        var storageArea= chrome.storage.sync? chrome.storage.sync : chrome.storage.local;
        return {
            set: function (object) {
               storageArea.set(object, function () {
                    // Notify that we saved.
                    alert('Settings saved');
                });
            },
            get: function (key, cb) {
                storageArea.get(key, function (object) {
                    cb(object);
                });
            },
            remove: function (key, cb) {
                storageArea.remove(key, function (object) {
                    cb(object);
                });
            }
        }
    })