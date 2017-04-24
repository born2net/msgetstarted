DigitalSignage.com custom Get Started
====================================
modify and brand the entire account creation process for DigitalSignage.com enterprise / resellers
<h6>version 3.01</h6>

Details
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

video tutorial
--------------------
- Be sure to watch this video tutorial which will walk you through on how to host the entire "Get Started" app on your own web server: http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=msgetstarted

installing via npm:
--------------------
1. download and install nodejs from: ```https://nodejs.org/en/```
2. run from the command line: git clone https://github.com/born2net/msgetstarted.git
3. change directory ```cd msgetstarted```
3. run the command: ```node ./start.js```
3. follow the wizard's questions


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

Development
-------------------------
This project is powered by the amazing gulp: https://github.com/gulpjs/gulp
this means you can use gulp to run pre-compiled commands such as:
- gulp local_server_dev
- gulp local_server_dist
- and you can add your own gulp commands to automate updates etc


Development With WebpackV2.2.0
----------------------------------------
The webpack Dev is in development you can run it using
- npm run build
- npm run dev 

Links
-------------------------
Visit landing page: http://dev.digitalsignage.com

License:
------------------------------------------------------------------------
- GPL V3
