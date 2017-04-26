/**
 Manage user authentication and cookie creation and pass results back to app router
 @class AppAuth
 @constructor
 @return {Object} instantiated AppAuth
 **/

define(['jquery', 'backbone', 'Cookie', 'RC4', 'bootbox', 'Elements'], function ($, Backbone, Cookie, RC4, bootbox, Elements) {

    BB.SERVICES.APP_AUTH = 'AppAuth';
    BB.EVENTS.APP_LOGOUT = 'AppLogout';

    var AppAuth = BB.Controller.extend({

        /**
         Constructor
         @method initialize
         @return {} Unique clientId.
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(self, BB.SERVICES.APP_AUTH);
            self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
            self.authenticated = false;
            self.AUTH_USER_PASS = 0;
            self.AUTH_COOKIE = 1;
            self.AUTH_PARAMS = 2;
        },

        /**
         Initiate user authentication
         @method authenticate
         @param {String} i_user
         @param {String} i_pass
         **/
        authenticate: function (i_user, i_pass) {
            var self = this;
            var appRouter = BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER);
            appRouter.navigate('authenticating', {trigger: true});
            self._loadCredentials(i_user, i_pass);
        },

        /**
         Check if user / pass were passed in via params
         @method _loadPassedCredentials
         @return {Object} user and pass if passed in or undefined if none
         **/
        _loadPassedCredentials: function () {
            var credentials = BB.lib.getURLParameter('param');
            if (credentials == 'null')
                return undefined;
            credentials = $.base64.decode(credentials);
            var re = /user=(.*),pass=(.*)/;
            var match = re.exec(credentials);
            return {
                user: match[1],
                pass: match[2]
            }
        },

        /**
         Load user credentials from param or cookie or form data
         @method _loadCredentials
         @param {String} i_user
         @param {String} i_pass
         **/
        _loadCredentials: function (i_user, i_pass) {
            var self = this;

            var passedCredentials = self._loadPassedCredentials();
            var cookieCredentials = $.cookie('boilerplateappcookie') == undefined ? undefined : $.cookie('boilerplateappcookie').split(' ')[0];

            if (i_user.length > 1 && i_pass.length > 1) {
                self._authServer(i_user, i_pass, self.AUTH_USER_PASS);

            } else if (passedCredentials) {
                self._authServer(passedCredentials.user, passedCredentials.pass, self.AUTH_PARAMS);

            } else if (cookieCredentials) {
                var credentials = self._breakCookie(cookieCredentials);
                self._authServer(credentials.user, credentials.pass, self.AUTH_COOKIE);

            } else {
                BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']).navigate('unauthenticated', {trigger: true});
            }
        },

        /**
         Process actual authentication against mediaSERVER
         @method _authServer
         @param {String} i_user
         @param {String} i_pass
         @param {Number} i_authMode
         **/
        _authServer: function (i_user, i_pass, i_authMode) {
            var self = this;
            BB.Pepper.getBusinessUserInfo(i_user, i_pass, function (data) {
                if (data.result == -1) {
                    self._authFailed(i_authMode);
                } else {

                    if (data.enterprise == 0) {
                        // Check if Pro or Lite account
                        BB.STUDIO_TYPE = data.lite == 1 ? BB.CONSTS.STUDIO_LITE : BB.CONSTS.STUDIO_PRO;
                    } else {
                        // Enterprise account
                        BB.STUDIO_TYPE = BB.CONSTS.STUDIO_DASH;
                    }

                    self.m_businessModel.set({
                        contactEmail: i_user,
                        newAccPassword: i_pass
                    });
                    self._authPassed(i_user, i_pass, i_authMode);
                }
            });

        },

        /**
         User authentication completed successfully
         @method _authPassed
         @param {String} i_user user name
         @param {String} i_pass user password
         @param {String} i_authMode indicates if authentication was done via cookie or user input
         **/
        _authPassed: function (i_user, i_pass, i_authMode) {
            var self = this;
            self.authenticated = true;
            // create cookie
            if (i_authMode == self.AUTH_USER_PASS && $(Elements.REMEMBER_ME).prop('checked'))
                self._bakeCookie(i_user, i_pass);
            BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']).navigate('authenticated', {trigger: true});
        },

        /**
         User authentication completed unsuccessfully
         @method _authFailed
         @param {String} i_status status message from remote mediaSERVER (could include warnings)
         @param {String} i_authMode indicates if authentication was done via cookie or user input
         **/
        _authFailed: function (i_authMode) {
            var self = this;

            // if cookie exists, delete it because obviously it didn't do the job
            if (i_authMode == self.AUTH_COOKIE) {
                $.removeCookie('boilerplateappcookie', {path: '/'});
                $.removeCookie('boilerplateappcookie', {path: '/_studiolite'});
                $.removeCookie('boilerplateappcookie', {path: '/_studiolite-dev'});
                $.removeCookie('boilerplateappcookie', {path: '/_studiolite-dist'});
            }

            bootbox.dialog({
                message: $(Elements.MSG_BOOTBOX_LOGIN_FAILED).text(),
                buttons: {
                    info: {
                        label: $(Elements.MSG_BOOTBOX_OK).text(),
                        className: "btn-primary",
                        callback: function () {
                        }
                    }
                }
            });
            BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']).navigate('authenticationFailed', {trigger: true});
        },

        /**
         Create RC4 local encrypted cookie
         @method _bakeCookie
         @param {String} i_user
         @param {String} i_pass
         **/
        _bakeCookie: function (i_user, i_pass) {
            var rc4 = new RC4(BB.globs['RC4KEY']);
            var crumb = i_user + ':SignageStudioLite:' + i_pass + ':' + ' USER'
            crumb = rc4.doEncrypt(crumb);
            $.cookie('boilerplateappcookie', crumb, {expires: 300});
        },

        /**
         Break encrypted cookie RC4 to user credentials
         @method _breakCookie
         @param {String} i_user
         @param {String} i_pass
         @return {Object} credentials
         **/
        _breakCookie: function (i_cookie) {
            var rc4 = new RC4(BB.globs['RC4KEY']);
            var crumb = rc4.doDecrypt(i_cookie).split(':');
            return {
                user: crumb[0],
                pass: crumb[2]
            }
        },

        /**
         Logout of application and delete saved local cookie
         @method logout
         **/
        logout: function () {
            $.removeCookie('boilerplateappcookie', {path: '/'});
            $.cookie('boilerplateappcookie', '', {expires: -300});
            BB.comBroker.fire(BB.EVENTS.APP_LOGOUT);
            setTimeout(function () {
                window.location.replace(BB.CONSTS.REDIRECT);
            }, 1500)


        }
    });

    return AppAuth;
});
