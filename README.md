# Appback Phonegap (Cordova) Plugin

This Appback plugin for Phonegap (a.k.a. Cordova) allows for easy use the Appback.com Backend as a Service API in mobile applications.

## Supported Platforms

To use this plugin you must be running at least Phonegap/Cordova 2.9.  This plugin should be compatible with all mobile OS platforms supported by Phonegap.

## Installation and Use

To install the plugin simply add appback.js to somewhere in /www and load it from the index.html file.

    <script type="text/javascript" src="appback.js"></script>
    
This plugin can also be installed using Plugman.

    plugman --platform ios --project /path/to/project --plugin  https://github.com/appback/appback-phonegap-plugin.git
    
If you are using Phonegap Build, add the plugin to your config.xml file.

    <gap:plugin name="com.appback.plugins.appback" />

This plugin requires that the inAppBrowser is added to the phonegap config.xml file.

    <feature name="InAppBrowser">
        <param name="ios-package" value="CDVInAppBrowser" />
    </feature>

Initialize the plugin.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //get this in a secure way! required
        'success': successCallback
    });

Initialize the plugin AND invoke an interactive social login AND return user data.

    window.plugins.appback.init({
        'appid':id, //required
        'secret':secret, //required
        'authenticate':'login',
        'userId':'self', //[id|self]
        'userData':true, //[true|false]return user info after login (optional)
        'success':function(userData) {
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
        'success':function(userData) {
            //returns user info as JSON
            console.log(JSON.stringify(userData));
        }
    });
    
Restore an authenicated session if available (plugin must already be initalized).

    window.plugins.appback.restore({
        'userId':UserId, //userId is required
        'userData':true, //[true|false]to return user info (optional)
        'success':function(data) {
            //returns response data as JSON
            console.log(JSON.stringify(data));
        },
        'fail': failureCallback
    });
    
Logout a user.

    window.plugins.appback.logout({
        'success': successCallback,
        'fail': failureCallback
    });
    
Get user information (id, provider, email, etc.) (plugin must already be initalized and user logged in).

    window.plugins.appback.getUserData({
        'userId':'USERID', //appback userid or self for logged in user
        'success': successCallback,
        'fail': failureCallback
    });

Get all app users statistics (total users, posts, etc.) (plugin must already be initalized).

    window.plugins.appback.getUsersStats({
        'success':function(data) {
            //returns response data as JSON
            console.log(JSON.stringify(data));
        },
        'fail': failureCallback
    });
    
Post user status to authenicated social provider (plugin must already be initalized and user logged in).

    window.plugins.appback.postUserStatus({
        'userId':'self',
        'message':'Message text',
        'success': successCallback,
        'fail': failureCallback
    });
    
Get game achievements (plugin must already be initalized and user logged in).

    window.plugins.appback.getAchievements({
        'success': successCallback,
        'fail': failureCallback
    });
    
Get single game achievement (plugin must already be initalized and user logged in).

    window.plugins.appback.getAchievement({
        'achId': achievementId,
        'success': successCallback,
        'fail': failureCallback
    });
    
Get game levels (plugin must already be initalized and user logged in).

    window.plugins.appback.getLevels({
        'success': successCallback,
        'fail': failureCallback
    });
    
Get single game level (plugin must already be initalized and user logged in).

    window.plugins.appback.getLevel({
        'levelId': levelId,
        'success': successCallback,
        'fail': failureCallback
    });
    
Get game leaderboard (plugin must already be initalized and user logged in).

    window.plugins.appback.getLeaderboard({
        'success': successCallback,
        'fail': failureCallback
    });
    
Get player info (plugin must already be initalized and user logged in).

    window.plugins.appback.getPlayer({
        'userId': userId,
        'success': successCallback,
        'fail': failureCallback
    });
    
Update Player Stats (plugin must already be initalized and user logged in).
                        
    window.plugins.appback.updatePlayerStats({
        'points':'1', //points to add
        'achId':'2', //achievement ID
        'amount':'10', //amount of actions
        'success':successCallback,
        'fail': failureCallback
    });
    
Get Data (plugin must already be initalized and user logged in).

    window.plugins.appback.getData({
        'resourceUri': resource, // i.e. db/doc_id
        'success': successCallback,
        'fail': failureCallback
    });
    
Post Data (plugin must already be initalized and user logged in).

    window.plugins.appback.postData({
        'resourceUri': resource,
        'data': data,
        'success': successCallback,
        'fail': failureCallback
    });
    
Put Data (plugin must already be initalized and user logged in).

    window.plugins.appback.putData({
        'resourceUri': resource,
        'data': data,
        'success': successCallback,
        'fail': failureCallback
    });
    
Delete Data (plugin must already be initalized and user logged in).

    window.plugins.appback.deleteData({
        'resourceUri': resource, // i.e. /db/doc_id?rev=15-e90f3dabeba33c916c72e58b93e6ff97
        'success': successCallback,
        'fail': failureCallback
    });


## About Appback

Appback.com provides a mobile backend as a service with an easy to use API that was designed for indie developers.  We allow for you to focus on your app, not servers, by providing social integration & login, game mechanics, and NoSQL custom data.  On the horizon we have more exciting features planned, including geo-location, messaging, and analytics.  Our aim is to be the backend of choice for developers by being easy, affordable, and robust!  Head to appback.com for a free starter account!