DigitalSignage.com custom Get Started
====================================
modify and brand the entire account creation process for http://www.DigitalSignage.com enterprise / reseller accounts
<h6>version 3.01</h6>

details
-----------------------------------------------------------------------------------------
Enterprise / Resellers can have full control on how new users open and manage accounts on their own web site. The "GetStarted" wizard allows any JavaScript developer to change Studio, Template and Player selections during account creation as well as completely modify the open account process.
The wizard consists of:

 - Studio Selection (Lite / Pro)   
 - Player Installer (HTML5, executables, direct download, AIR and Flash)
 - Create account process (branded to your enterprise account)
 - Change user password
 - Change business name
 - Forgot password
 - User authentication
 - Bootstrap Progressive layout
 - Developed with Backbone.js  

video tutorial:
--------------------
- Be sure to watch this video tutorial which will walk you through on how to host the entire "Get Started" app on your own web server: http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=msgetstarted

installation:
--------------------
1. download and install nodejs & git from: https://nodejs.org and https://git-scm.com/downloads
2. run from the command line: ```git clone https://github.com/born2net/msgetstarted.git```
3. change directory ```cd msgetstarted```
4. run the command: ```node ./start.js```
5. follow the wizard's questions
6. once you are ready for production run: ```npm run prod```
7. upload the final ```_dist``` directory to your own web server


config
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
note that all of the above data will automatically populate for you once you run the wizard and provide your credentials.

  

links
-------------------------
Visit landing page: http://dev.digitalsignage.com

license:
------------------------------------------------------------------------
- modified GPL V3
