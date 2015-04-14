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
 

Config
-------------------------
Be sure to change the ERI (Enterprise / Reseller ID) to your value in App.js via value of:

```
 BB.globs['ERI'] = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```
To retrieve your ERI so you can paste it onto BB.globs['ERI'], be sure yo login to your enterprise / reseller Account and select Tools > Branding and look for 
  
  ```
  airApplicationArguments = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  ```

Links
-------------------------
Visit landing page: http://dev.digitalsignage.com

License:
------------------------------------------------------------------------
- GPL V3


