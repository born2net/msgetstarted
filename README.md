Account Wizard 
====================================
modify the account creation process for digitalsignage.com enterprise / resellers

Get started pages
-----------------------------------------------------------------------------------------
Enterprise / Resellers can have full control on how new users open and manage accounts on their own web site. The "GetStarted" wizard allows any JavaScript developer to change Studio, Template and Player selections during account creation as well as completely modify the open account process.
The wizard consists of:

 - Studio Selection (Lite / Pro)   
 - Player Installer (air/flash/html/direct download)
 - Create account
 - Change user password
 - Change business name
 - Forgot password
 - User authentication
 - Bootstrap Progressive layout
 - Developed with Backbone.js  

video tutorial
--------------------
 Be sure to watch this video tutorial which will walk you through on how to host the entire "Get Started" app on your own web server: http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=msgetstarted

installing via npm:
--------------------
```
1. download and install node.js via: https://nodejs.org/en/
2. run from the command line: npm install msGetStarted
3. follow wizard questions
```

if you wish to run the setup a second time you can use:
```
. cd node_modules/msGetStarted
. run local server: node ./express.js
```

Config
-------------------------
The entire enterprise configuration is generated and saved inside of:
```
App.js
```

You can use any editor to change branding info manually:
```
 BB.globs['COMPANY'] = 'YOUR_COMPANY_NAME';
 BB.CONSTS.REDIRECT = 'YOUR_DOMAIN';
 BB.CONSTS.RESELLER = 'YOUR_RESELLER_ID_HERE';
 BB.globs['ERI'] = 'YOUR_ERI';
 BB.globs['CLOUD'] = true; // false if hosting in private server or hybrid server
 BB.globs['CHAT'] = 'URL_FOR_CHAT_SUPPORT';
```
note that all of the above info will automatically popilate for you once you run the installtion and provide your crdentails


Links
-------------------------
Visit landing page: http://dev.digitalsignage.com

License:
------------------------------------------------------------------------
- GPL V3


