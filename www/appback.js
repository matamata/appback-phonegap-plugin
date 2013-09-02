/*
*   Appback Phonegap (Cordova) Plugin v1.5.0
*   Copyright 2013 Xiatron LLC
*   Made available under MIT License
*
*   Use a solid backend through an easy API designed for indie developers.
*   Just go to http://appback.com to register for a free account.
.*/

(function() {
    var appbackAppId;
    var appbackSecret;
    var debug;
 
    /* Main appback object */
    function appback() {};
 
    /* Init method */
    appback.prototype.init = function(options) {
        //set degugging
        debug = (options.debug) ? options.debug : false;
 
        //small timeout to avoid conflicts
        setTimeout(function() {
            //make sure we have the dependancies loaded
            if (typeof jQuery=='undefined') {
                if (debug) console.log('Appback: Loading jQuery');
                loadScript('http://api.appback.com/scripts/phonegap/jquery.min.js',function(){window.plugins.appback.init(options)});
            } else if (typeof CryptoJS=='undefined') {
                if (debug) console.log('Appback: Loading CryptoJS');
                loadScript('http://api.appback.com/scripts/phonegap/hmac-sha256.js',function(){window.plugins.appback.init(options)});
            } else {
                appbackAppId = options.appid;
                appbackSecret = options.secret;
                
                if (options.authenticate == 'login' && options.userId) {
                    window.plugins.appback.login(options);
                } else if ( (options.authenticate == 'restore' || options.authenticate == 'both')  && options.userId ) {
                    window.plugins.appback.restore(options);
                } else {
                    if (options.success) options.success();
                }
            }
        },1000);
    };
 
    /* Social user login method*/
    appback.prototype.login = function(options) {
        if (debug) console.log('Appback: login invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/'+options.userId+'/login';
        var sig = getAppbackSig(url);
 
        //open the childbrowser
        openRemoteChildBrowser(
            url+'?silentflag=closeme&timestamp='+sig.timestamp+'&signature='+sig.signature,
            function(){
                if (options.userData) {
                    window.plugins.appback.getUserData(options);
                } else {
                    if (options.success) options.success();
                }
            }
        );
    }
 
    /* Social session restore method */
    appback.prototype.restore = function(options) {
        if (debug) console.log('Appback: restore invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/'+options.userId+'/login';
        var sig = getAppbackSig(url);
        var userDataParam = (options.userData) ? '&userdata=true' : '';
        if (debug) console.log('Appback: restore url: '+url+'?restore=true'+userDataParam+'&timestamp='+sig.timestamp+'&signature='+sig.signature);
        $.get(
            url+'?restore=true'+userDataParam+'&timestamp='+sig.timestamp+'&signature='+sig.signature,
            function(data) {
                if (debug) console.log('Appback: restore success response = '+JSON.stringify(data));
                if (options.success) options.success(data);
            }
        ).fail(function(data) {
            if (options.authenticate == 'both') {
                window.plugins.appback.login(options);
            } else {
                invokeAppbackFail('Restore', options, data);
            }
        });
    }
 
    /* Social session logout method */
    appback.prototype.logout = function(options) {
        if (debug) console.log('Appback: logout invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/self/logout';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Logout', options);
    }
 
    /* Social user data method */
    appback.prototype.getUserData = function(options) {
        if (debug) console.log('Appback: getUserData invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/'+options.userId;
        var sig = getAppbackSig(url);
        var requestUrl = url+'?userdata=true&timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get User Data', options);
    }
 
    /* Social users stats method */
    appback.prototype.getUsersStats = function(options) {
        if (debug) console.log('Appback: getUsersStats invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get User Stats', options);
    }
 
    /* Social users status update method */
    appback.prototype.postUserStatus = function(options) {
        if (debug) console.log('Appback: postUsersStatus invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/'+options.userId+'/status/';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?message='+options.message+'&timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxPostRequest(requestUrl, 'Post User Status', options);
    }
 
    /* Game get achievments method */
    appback.prototype.getAchievements = function(options) {
        if (debug) console.log('Appback: getAchievements invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/achievements/';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Achievements', options);
    }
 
    /* Game get single achievment method */
    appback.prototype.getAchievement = function(options) {
        if (debug) console.log('Appback: getAchievement invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/achievements/'+options.achId;
        var sig = getAppbackSig(url);
        var requestUrl = url+'?userdata=true&timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Achievement', options);
    }
 
    /* Game get levels method */
    appback.prototype.getLevels = function(options) {
        if (debug) console.log('Appback: getLevels invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/levels/';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Levels', options);
    }
 
    /* Game get single level method */
    appback.prototype.getLevel = function(options) {
        if (debug) console.log('Appback: getLevel invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/levels/'+options.levelId;
        var sig = getAppbackSig(url);
        var requestUrl = url+'?userdata=true&timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Level', options);
    }
 
    /* Game get leaderboard method */
    appback.prototype.getLeaderboard = function(options) {
        if (debug) console.log('Appback: getLeaderboard invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/players/';
        var sig = getAppbackSig(url);
        var requestUrl = url+'?timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Leaderboard', options);
    }
 
    /* Game get player data */
    appback.prototype.getPlayer = function(options) {
        if (debug) console.log('Appback: getPlayer invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/players/'+options.userId;
        var sig = getAppbackSig(url);
        var requestUrl = url+'?userdata=true&timestamp='+sig.timestamp+'&signature='+sig.signature;
        ajaxGetRequest(requestUrl, 'Get Player', options);
    }
 
    /* Game update player stats method */
    appback.prototype.updatePlayerStats = function(options) {
        if (debug) console.log('Appback: updatePlayerStats invoked');
        var url = 'https://api.appback.com/'+appbackAppId+'/game/players/self/update/';
        var sig = getAppbackSig(url);
        var achParam = (options.achId && options.amount) ? '&achievement='+options.achId+'&amount='+options.amount : '';
        var pointsParam = (options.points) ? '&points='+options.points : '';
        var requestUrl = url+'?timestamp='+sig.timestamp+achParam+pointsParam+'&signature='+sig.signature;
        ajaxPostRequest(requestUrl, 'Update Player Stats', options);
    }
 
    /* Internal functions */
    function ajaxGetRequest(url, method, options) {
        $.get(
            url,
            function(data) {
                if (debug) console.log(JSON.stringify(data));
                if (options.success) options.success(data);
            }
        ).fail(function(data) { invokeAppbackFail(method, options, data); });
    }
 
    function ajaxPostRequest(url, method, options) {
        $.post(
            url,
            function(data) {
                if (debug) console.log(JSON.stringify(data));
                if (options.success) options.success(data);
            }
        ).fail(function(data) { invokeAppbackFail(method, options, data); });
    }
 
    function invokeAppbackFail(method, options, data) {
        if (debug) console.log('Appback: '+method+' fail response = '+JSON.stringify(JSON.parse(data.responseText)));
        if (options.fail) options.fail(JSON.parse(data.responseText));
    }
 
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = (callback) ? callback : function(){};
        document.getElementsByTagName('head')[0].appendChild(script);
    }
 
    function getAppbackSig(url) {
        if (debug) console.log('Appback: getAppbackSig invoked');
         
        //generate an ios 8601 timestamp
        var date = new Date();
        var timestamp = date.toISOString();
        
        //Concatenate appid, url and timestamp
        var message = appbackAppId+url+timestamp;

        //hash and hex
        var hash = CryptoJS.HmacSHA256(message, appbackSecret);
        var hashHexed = CryptoJS.enc.Hex.stringify(hash);
        if (debug) console.log('Appback: Sig hashHexed = '+hashHexed);
        
        return {'signature':hashHexed,'timestamp':timestamp};
    }
 
    var cB = null;
    var cbInvoked = false;
    function openRemoteChildBrowser(url, callback) {
        if (debug) console.log('openRemoteChildBrowser invoked for '+url);
        
        //to ensure that CB is not invoked multiple times
        if (cbInvoked) return false;
        cbInvoked = true;
 
        cB = window.open(url, '_blank', 'location=no');
 
        cB.addEventListener('loadstart', function(event) {
            cB.executeScript({
                code:"\
                        var loading = function() {\
                            if (jQuery('#injLoading').length == 0) {\
                                jQuery('body').append('<div id=\"injLoading\" style=\"display: table; position: fixed; top: 0px; left: 0px; width: 100%; height:100%; color: #fff; background: rgba(0, 0, 0, 0.6); text-align: center; \"><div style=\"display: table-cell; vertical-align: middle; font-weight: bold; font-size: 22px; \">loading...</div></div>');\
                            }\
                        };\
                        if (typeof jQuery=='undefined') {\
                            var script = document.createElement('script');\
                            script.type = 'text/javascript';\
                            script.src = 'http://api.appback.com/scripts/phonegap/jquery.min.js';\
                            script.onload = loading;\
                            document.getElementsByTagName('head')[0].appendChild(script);\
                        } else {\
                            loading();\
                        }"
            });
        });
 
        cB.addEventListener('loadstop', function(event) {
            if (event.url.indexOf('closeme=true') > -1) {
                cB.close();
            }
        });
        
        cB.addEventListener('exit', function() {
            cbInvoked = false;
            if (callback) callback();
        });
    }
 
    /* Auto-install the plugin */
    if(!window.plugins) window.plugins = {};
    window.plugins.appback = new appback();
})();