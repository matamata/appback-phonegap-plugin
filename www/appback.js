/*
*   Appback Phonegap (Cordova) Plugin
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
                
                if (options.login) {
                    window.plugins.appback.login({
                        'userId':'self',
                        'callback':options.callback
                    });
                } else {
                    if (options.callback) options.callback();
                }
            }
        },1000);
    };
 
    /* Social user login method*/
    appback.prototype.login = function(options) {
        if (debug) console.log('Appback: login invoked');
 
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/self/login';
        var sig = getAppbackSig(url);
 
        //open the childbrowser
        openRemoteChildBrowser(
            url+'?silentflag=closeme&timestamp='+sig.timestamp+'&signature='+sig.signature,
            function(){
                window.plugins.appback.getUserData({
                    'userId':options.userId,
                    'callback':function(data) {
                        if (options.callback) options.callback(data);
                    }
                });
            }
        );
    }
 
    /* Social user data method */
    appback.prototype.getUserData = function(options) {
        if (debug) console.log('Appback: getUserData invoked');
 
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/'+options.userId;
        var sig = getAppbackSig(url);
 
        $.get(
            url+'?userdata=true&timestamp='+sig.timestamp+'&signature='+sig.signature,
            function(data) {
                if (options.callback) options.callback(data);
            }
        );
    }
 
    /* Social users stats method */
    appback.prototype.getUsersStats = function(callback) {
        if (debug) console.log('Appback: getUsersStats invoked');
 
        var url = 'https://api.appback.com/'+appbackAppId+'/social/users/';
        var sig = getAppbackSig(url);
 
        $.get(
            url+'?timestamp='+sig.timestamp+'&signature='+sig.signature,
            function(data) {
                callback(data);
            }
        );
    }
 
    /* Internal functions */
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
 
    var cbInvoked = false;
    function openRemoteChildBrowser(url, callback) {
        if (debug) console.log('openRemoteChildBrowser invoked for '+url);
        
        //to ensure that CB is not invoked multiple times
        if (cbInvoked) return false;
        cbInvoked = true;
 
        var cB = window.open(url, '_blank', 'location=no');
 
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