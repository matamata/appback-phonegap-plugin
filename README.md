# Appback Phonegap (Cordova) Plugin

This Appback plugin for Phonegap (a.k.a. Cordova) allows for easy use the Appback.com Backend as a Service API in mobile applications.

## Supported Platforms

To use this plugin you must be running at least Phonegap/Cordova 2.9.  Newer versions have not been tested but may also work.  This plugin should be compatible with all mobile OS platforms supported by Phonegap.

## Installation and Use

To install the plugin simply add appback.js to somewhere in /www and load it from the index.html file.

    <script type="text/javascript" src="appback.js"></script>
    
This plugin can also be installed using Plugman.

    plugman --platform ios --project /path/to/project --plugin  https://github.com/appback/appback-phonegap-plugin.git
    
This plugin requires that the inAppBrowser is added to the phonegap config.xml file.

    <feature name="InAppBrowser">
        <param name="ios-package" value="CDVInAppBrowser" />
    </feature>

Initialize the plugin and try to login a social user.

    window.plugins.appback.init({
        'appid':id,
        'secret':secret, //get this in a secure way!
        'login':true, //invoke the login method too
        'debug':true, //log to troubleshoot
        'callback':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });
    
Login a user using Appback registered social networks.

    window.plugins.appback.login({
        'userData':true //also return user info
        'callback':function(data) {
            //returns user status and info as JSON
            console.log(JSON.stringify(data.status)); //(un)authenicated
            console.log(JSON.stringify(data.user_data)); //returned is userData is true
        }
    });
    
Get logged in user information (id, provider, email, etc.).

    window.plugins.appback.getUserData({
        'userId':'USERID' //appback userid or self for logged in user
        'callback':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });

Get all app users statistics (total users, posts, etc.).

    window.plugins.appback.getUsersStats(function(userStats){
        //returns app users stats as JSON
        console.log(JSON.stringify(usersStats));
    });
    

(More documentation and plugin methods coming soon.)

## About Appback

Appback.com provides a mobile backend as a service with an easy to use API that was designed for indie developers.  We allow for you to focus on your app, not servers, by providing social integration & login, game mechanics, and NoSQL custom data.  On the horizon we have more exciting features planned, including geo-location, messaging, and analytics.  Our aim is to be the backend of choice for developers by being easy, affordable, and robust!  Head to appback.com for a free starter account!