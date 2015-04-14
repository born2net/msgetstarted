Account Wizard 
====================================
modify the account creation process for digitalsignage.com enterprise / resellers

Get started pages
-----------------------------------------------------------------------------------------
Enterprise / Resellers can have full control on how new users open and manage accounts on their own web site. The "GetStarted" wizard allows any JavaScript developer to change Studio, Template and Player selections during account creation as well as completely modify the open account process.

 - Modify the ERI in 
 - Install Players
 - Landing page: http://dev.digitalsignage.com

Config
-------------------------
Be sure to change the ERI (Enterprise / Reseller ID) to your value in:

```
 BB.globs['ERI'] = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```
To retrieve your ERI so you can paste it onto BB.globs['ERI'], be sure yo login to your enterprise / reseller Account and select Tools > Branding and look for 
  
  ```
  airApplicationArguments = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  ```

License:
------------------------------------------------------------------------
- GPU VL


