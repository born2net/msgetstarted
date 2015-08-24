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

 Be sure to watch this video tutorial which will walk you through on how to host the entire "Get Started" app on your own web server: http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=msgetstarted


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
  
In addition, in order to properly associate sub accounts created under your Enterprise account, be sure to edit Pepper.js in function:
  
```
  /**
       Create a new mediaCLOUD account
       @method createAccount
       @param {Function} i_callBack
       **/
      createAccount: function (i_businessName, i_userName, i_password, i_templateBusinessId, i_resellerId, i_firstName, i_lastName, i_contactEmail, i_workPhone, i_cellPhone, i_address, i_city, i_state, i_contry, i_zipcode, i_callback) {
          var url = window.g_protocol + window.g_masterDomain + '/WebService/createNewAccount.ashx?command=CreateCustomerAccount'
          url += '&businessName=' + i_businessName;
          url += '&userName=' + i_userName;
          url += '&password=' + i_password;
          url += '&templateBusinessId=' + i_templateBusinessId;
          url += '&resellerId=' + i_resellerId; // resellers can modify this value to associate with their own account
          url += '&firstName=' + i_firstName;
          url += '&lastName=' + i_lastName;
          url += '&contactEmail=' + i_contactEmail;
          url += '&workPhone=' + i_workPhone;
          url += '&cellPhone=' + i_cellPhone;
          url += '&address=' + i_address;
          url += '&city=' + i_city;
          url += '&state=' + i_state;
          url += '&contry=' + i_contry;
          url += '&zipcode=' + i_zipcode;
          url += '&callback=?';
          log(url);
          $.getJSON(url, i_callback);
      },
```
      
and edit  ```url += '&resellerId=' + i_resellerId;``` to your reseller id value

Links
-------------------------
Visit landing page: http://dev.digitalsignage.com

License:
------------------------------------------------------------------------
- GPL V3


