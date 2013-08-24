# Appback Phonegap (Cordova) Plugin

This Appback plugin for Phonegap (a.k.a. Cordova) allows for easy use the Appback.com Backend as a Service API in mobile applications.

## Supported Platforms

To use this plugin you must be running at least Phonegap/Cordova 2.9.  This plugin should be compatible with all mobile OS platforms supported by Phonegap.

## Installation and Use

To install the plugin simply add appback.js to somewhere in /www and load it from the index.html file.

    <script type="text/javascript" src="appback.js"></script>
    
This plugin can also be installed using Plugman.

    plugman --platform ios --project /path/to/project --plugin  https://github.com/appback/appback-phonegap-plugin.git
    
This plugin requires that the inAppBrowser is added to the phonegap config.xml file.

    <feature name="InAppBrowser">
        <param name="ios-package" value="CDVInAppBrowser" />
    </feature>

Initialize the plugin.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //get this in a secure way! required
        'callback':function() {
            //do something
            console.log('Appback Plugin Initalized');
        }
    });

Initialize the plugin AND invoke an interactive social login AND return user data.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //required
        'authenticate':'login',
        'userId':'self', //[id|self]
        'userData':true, //[true|false]return user info after login (optional)
        'callback':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });
    
Initialize the plugin AND invoke a session restore.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //required
        'authenticate':'restore',
        'userId':UserId //userId is required
    });
    
Initialize the plugin AND invoke a session restore THEN login if restore is unsuccessful.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //required
        'authenticate':'both',
        'userId':UserId //userId is required
    });
    
Login a user using Appback registered social networks (plugin must already be initalized).

    window.plugins.appback.login({
        'userId':'self', //[id|self] required
        'userData':true, //[true|false]to return user info (optional)
        'callback':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });
    
Restore an authenicated session if available (plugin must already be initalized).

    window.plugins.appback.restore({
        'userId':UserId, //userId is required
        'userData':true, //[true|false]to return user info (optional)
        'callback':function(data) {
            //returns response data as JSON
            console.log(JSON.stringify(data));
        }
    });
    
Get logged in user information (id, provider, email, etc.) (plugin must already be initalized).

    window.plugins.appback.getUserData({
        'userId':'USERID', //appback userid or self for logged in user
        'callback':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });

Get all app users statistics (total users, posts, etc.) (plugin must already be initalized).

    window.plugins.appback.getUsersStats(function(userStats){
        //returns app users stats as JSON
        console.log(JSON.stringify(usersStats));
    });
    

(More documentation and plugin methods coming soon.)

## About Appback

Appback.com provides a mobile backend as a service with an easy to use API that was designed for indie developers.  We allow for you to focus on your app, not servers, by providing social integration & login, game mechanics, and NoSQL custom data.  On the horizon we have more exciting features planned, including geo-location, messaging, and analytics.  Our aim is to be the backend of choice for developers by being easy, affordable, and robust!  Head to appback.com for a free starter account!