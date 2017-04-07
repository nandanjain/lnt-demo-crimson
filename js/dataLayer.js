/**
 * Created by nanjain on 4/5/17.
 */
var CRIMSON = CRIMSON || {};

CRIMSON.URLS = {
    BASE_URL: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1",
    auth_token: "https://cloudsso.cisco.com/as/token.oauth2",
    channels_list: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/agg/grid?startDateTime={start}&eventsLimit=20",
    vod_list: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1" + "/contentInstances?source=vod",
    vod_playback: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1/devices/me/playsessions?instanceId=",
    search: "https://apx.cisco.com/spvss/infinitehome/ivptoolkit/clientrefapi/sandbox_0.4.1" + "/agg/content?limit=10&q="
};
CRIMSON.DATA = {
    VOD_LIST: null,
    CHANNEL_LIST: null,
    PROGRAM_LIST: null,
    WHATS_ON: null
};
CRIMSON.DataLayer = new function () {

    var TOKEN = null;
    var SEARCH_REQ = null;

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

    this.fetchChannels = function (callBack) {
        var currentTime = new Date().toISOString();
        if (!TOKEN) {
            getBearerToken(function () {
                doGET(CRIMSON.URLS.channels_list.replace('{start}', currentTime), function (data) {
                    processChannelData(data);
                    if (callBack && typeof callBack == 'function') {
                        callBack();
                    }
                });
            })
        } else {
            doGET(CRIMSON.URLS.channels_list.replace('{start}', currentTime), function (data) {
                processChannelData(data);
                if (callBack && typeof callBack == 'function') {
                    callBack();
                }
            });
        }
        function processChannelData(data) {
            var allChannels = [];
            var allPrograms = {};
            var whatsOn = [];
            for (var i = 0; i < data.channels.length; i++) {
                var channel = data.channels[i];
                allChannels.push({
                    type: "channel",
                    id: channel.id,
                    name: channel.name,
                    number: channel.logicalChannelNumber,
                    logo: channel.media[0].url,
                    object: channel
                });

                allPrograms[channel.id] = [];
                for (var j = 0; j < channel.schedule.length; j++) {
                    var currentProgram = channel.schedule[j];
                    allPrograms[channel.id].push({
                        type: "program",
                        id: currentProgram.id,
                        poster: currentProgram.content.media[0].url,
                        title: currentProgram.title,
                        channel_logo: channel.media[0].url,
                        channel_name: channel.name,
                        playbackURL: tuningParams[i],
                        startDateTime: currentProgram.startDateTime,
                        duration: currentProgram.content.duration,
                        object: currentProgram
                    });
                }

                var currentProgram = channel.schedule[0];
                whatsOn.push({
                    type: "whatson",
                    id: currentProgram.id,
                    poster: currentProgram.content.media[0].url,
                    title: channel.logicalChannelNumber + " " + channel.name.toLowerCase(),
//                    title: currentProgram.title,
                    channel_logo: channel.media[0].url,
                    channel_name: channel.name,
                    playbackURL: tuningParams[i],
                    startDateTime: currentProgram.startDateTime,
                    duration: currentProgram.content.duration,
                    object: currentProgram
                });
            }
            CRIMSON.DATA.WHATS_ON = whatsOn;
            CRIMSON.DATA.CHANNEL_LIST = allChannels;
            CRIMSON.DATA.PROGRAM_LIST = allPrograms;
        }
    };

    this.fetchVOD = function (callback) {
        if (!TOKEN) {
            getBearerToken(function () {
                doGET(CRIMSON.URLS.vod_list, function (resObj) {
                    processVODData(resObj);
                    callback(resObj);
                });
            });
        } else {
            doGET(CRIMSON.URLS.vod_list, function (resObj) {
                processVODData(resObj);
                callback(resObj);
            });
        }
        function processVODData(data) {
            var vodlist = [];
            for (var i = 0; i < data.content.length; i++) {
                var vodItem = data.content[i];
                var item = {
                    type: "vod",
                    id: vodItem.id,
                    title: vodItem.title
                };
                for (var j = 0; j < vodItem.content.media.length; j++) {
                    var logoObj = vodItem.content.media[j];
                    if (logoObj.height < logoObj.width) {
                        item.poster = logoObj.url;
                    }
                }
                vodlist.push(item);
            }
            CRIMSON.DATA.VOD_LIST = vodlist;
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
        if (SEARCH_REQ && SEARCH_REQ.readyState != 4) {
            SEARCH_REQ.abort();
            SEARCH_REQ = null;
        }
        if (!TOKEN) {
            getBearerToken(function () {
                SEARCH_REQ = doGET(CRIMSON.URLS.search + keyword, function (resObj) {
                    SEARCH_REQ = null;
                    resObj = processSearchResults(resObj);
                    callback(resObj);
                });
            });
        } else {
            SEARCH_REQ = doGET(CRIMSON.URLS.search + keyword, function (resObj) {
                SEARCH_REQ = null;
                resObj = processSearchResults(resObj);
                callback(resObj);
            });
        }
        function processSearchResults(data) {
            var results = [];
            for (var i = 0; i < data.content.length; i++) {
                var content = data.content[i];
                var currentProgram = content.content;
                var channel = content.channel;
                //TODO: Handle different types of results
                results.push({
                    type: "search",
                    id: currentProgram.id,
                    poster: currentProgram.media[0].url,
                    title: currentProgram.title,
                    startDateTime: currentProgram.startDateTime,
                    duration: currentProgram.duration,
                    channel_logo: channel.media[0].url,
                    channel_name: channel.name,
                    channel_number: channel.logicalChannelNumber,
                    playbackURL: tuningParams[i],
                    object: content
                });
            }
            return results;
        }
    };

    function doGET(url, callback) {
        return $.ajax({
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
        return $.ajax({
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