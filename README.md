# Appback Phonegap (Cordova) Plugin

This Appback plugin for Phonegap (a.k.a. Cordova) allows for easy use the Appback.com API in mobile applications.

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
        'callback':function(data) {
            /* do something with the returned data */
        }
    });

(More documentation and plugin methods coming soon.)

## About Appback

Appback.com provides a mobile backend as a service with an easy to use API that was designed for indie developers.  We allow for you to focus on your app, not servers, by providing social integration & login, game mechanics, and NoSQL custom data.  On the horizon we have more exciting features planned, including geo-location, messaging, and analytics.  Our aim is to be the backend of choice for developers by being easy, affordable, and robust!  Head to appback.com for a free starter account!