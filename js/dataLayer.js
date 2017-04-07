/**
 * Created by nanjain on 4/5/17.
 */
var CRIMSON = CRIMSON || {};

CRIMSON.URLS = {
    BASE_URL: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1",
    auth_token: "https://cloudsso.cisco.com/as/token.oauth2",
    channels_list: "",
    vod_list: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1" + "/contentInstances?source=vod",
    vod_playback: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/devices/me/playsessions?instanceId=",
    search: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1" + "/agg/content?limit=10&q="
};
CRIMSON.DATA = {
    VOD_LIST: null,
    CHANNEL_LIST: null
};
CRIMSON.DataLayer = new function () {

    var TOKEN = null;
    setInterval(getBearerToken, 3500 * 1000);

    function getBearerToken(callBack) {
        var data = {
            "grant_type": "client_credentials",
            "client_id": "214bc82995b34d9aadd2acc20f5244ac",
            "client_secret": "b2c860ff6bb6453a9432DA10216B5E64"
        };
        doPOST(CRIMSON.URLS.auth_token, data, function (resObj) {
            TOKEN = resObj.access_token;
            document.getElementById("clock").innerText = "Bearer Token : " + TOKEN;
            if (callBack && typeof callBack == 'function') {
                callBack();
            }
        });
    }

    this.fetchChannels = function (callback) {

    };

    this.fetchVOD = function (callback) {
        if (!TOKEN) {
            getBearerToken(function () {
                doGET(CRIMSON.URLS.vod_list, function (resObj) {
                    callback(resObj);
                });
            });
        } else {
            doGET(CRIMSON.URLS.vod_list, function (resObj) {
                callback(resObj);
            });
        }
    };

    this.fetchVODItemPlaybackURL = function (vodId, callback) {
        if (!TOKEN) {
            getBearerToken(function () {
                doPOST(CRIMSON.URLS.vod_playback + vodId, null, function (resObj) {
                    callback(resObj);
                });
            });
        } else {
            doPOST(CRIMSON.URLS.vod_playback + vodId, null, function (resObj) {
                callback(resObj);
            });
        }
    };

    this.fetchSearch = function (keyword, callback) {
        if (!TOKEN) {
            getBearerToken(function () {
                doGET(CRIMSON.URLS.search + keyword, function (resObj) {
                    callback(resObj);
                });
            });
        } else {
            doGET(CRIMSON.URLS.search + keyword, function (resObj) {
                callback(resObj);
            });
        }
    };

    function doGET(url, callback) {
        $.ajax({
            type: 'GET',
            crossOrigin: true,
            url: url,
            cache: true,
            headers: {
                'Authorization': "Bearer " + TOKEN
            },
            success: function (data) {
                callback(data);
            },
            error: function (data, errorThrown, status) {
                alert(data + " : " + errorThrown + " : " + status);
            }
        });

//        var xhr = new XMLHttpRequest();
//        xhr.withCredentials = true;
//
//        xhr.addEventListener("readystatechange", function () {
//            if (this.readyState === 4 && this.status == 200) {
//                console.log(this.responseText);
//                if (typeof callback == 'function') {
//                    callback(eval('(' + this.responseText + ')'))
//                }
//            }
//        });
//
//        xhr.open("GET", url, true);
//        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
////        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.setRequestHeader("cache-control", "no-cache");
//        xhr.setRequestHeader("Authorization", TOKEN);
//
//        xhr.send();
    }

    function doPOST(url, params, callback) {
        var headers = {
            "content-type": "application/x-www-form-urlencoded"
        };
        // Add Authorization token if TOKEN is available
        if (TOKEN) {
            headers['Authorization'] = "Bearer " + TOKEN;
        }
        $.ajax({
            type: 'POST',
            crossOrigin: true,
            url: url,
            cache: true,
            headers: headers,
            data: params,
            success: function (data) {
                callback(data);
            },
            error: function (data, errorThrown, status) {
                alert(data + " : " + errorThrown + " : " + status);
            }
        });
//        } else {
//            $.ajax({
//                type: 'POST',
//                crossOrigin: true,
//                url: url,
//                dataType: "json",
//                cache: false,
//                data: params,
//                success: function (data) {
//                    callback(data);
//                },
//                error: function (data, errorThrown, status) {
//                    alert(data + " : " + errorThrown + " : " + status);
//                }
//            });
//        }
//        var xhr = new XMLHttpRequest();
//        xhr.withCredentials = true;
//
//        xhr.addEventListener("readystatechange", function () {
//            if (this.readyState === 4 && this.status == 200) {
//                console.log(this.responseText);
//                if (typeof callback == 'function') {
//                    callback(eval('(' + this.responseText + ')'))
//                }
//            }
//        });
//        xhr.open("POST", url, true);
//        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//        xhr.setRequestHeader("cache-control", "no-cache");
//        xhr.setRequestHeader("Accept", "application/json");
//        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.setRequestHeader("Origin", "http://evil.com/");
//        xhr.send(params);
    }
};