/**
 @class CreateAccountView
 @constructor
 @return {Object} instantiated CreateAccountView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox', 'Elements'], function ($, Backbone, backbonestickit, bootbox, Elements) {

    var CreateAccountView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
            self._listenCreateAccount();
            self._listenForgotPassword();
            self._bindings();
        },

        _listenForgotPassword: function () {
            var self = this;
            $(Elements.CREATE_ACCOUNT_FORGOT_PASS_BUTTON).on('click', function (e) {
                e.preventDefault();
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('forgetPassword', {trigger: true});
                return false;
            });
        },

        _listenCreateAccount: function () {
            var self = this;
            console.log('create account v5');
            $(Elements.CREATE_ACCOUNT_INFO_BUTTON).on('click', function (e) {
                bootbox.alert('Please be patient, creating account...');
                e.preventDefault();

                if ((_.size(self.m_businessModel.get('firstName')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_NO_FULL_NAME_PROVIDED).text());
                    return false;
                }
                if (!BB.lib.validateEmail(self.m_businessModel.get('contactEmail'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_CANCEL_INVALID_EMAIL).text());
                    return false;
                }
                if ((_.size(self.m_businessModel.get('newAccPassword')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                    return false;
                }
                if ((_.size(self.m_businessModel.get('newAccPasswordConfirm')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                    return false;
                }
                // if ((_.size(self.m_businessModel.get('workPhone')) < 4)) {
                //     bootbox.alert($(Elements.MSG_BOOTBOX_PHONE_TOO_SHORT).text());
                //     return false;
                // }
                if (self.m_businessModel.get('newAccPassword') != self.m_businessModel.get('newAccPasswordConfirm')) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_NO_MATCH).text());
                    return false;
                }
                if (!BB.lib.validateAlphaNumeric(self.m_businessModel.get('newAccPassword'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_ALPHANUMERIC).text());
                    return false;
                }        

                BB.Pepper.createAccount(
                    BB.lib.cleanCharExtended(self.m_businessModel.get('businessName')),
                    self.m_businessModel.get('contactEmail'),
                    self.m_businessModel.get('newAccPassword'),
                    self.m_businessModel.get('templateBusinessId'),
                    self.m_businessModel.get('resellerId'),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('firstName')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('lastName')),
                    self.m_businessModel.get('contactEmail'),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('workPhone')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('cellPhone')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('address')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('city')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('state')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('contry')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('zipcode')),
                    BB.lib.cleanCharExtended(self.m_businessModel.get('newEmailUpdates')),
                    function (data) {
                        if (data.result == -1) {
                            bootbox.alert($(Elements.MSG_BOOTBOX_ACCOUNT_EXISTS).text());
                            $(Elements.CREATE_ACCOUNT_FORGOT_PASS_BUTTON).fadeIn('slow');
                        } else {
                            self.m_businessModel.set('businessId', data.result);
                            self._verifyEmail();
                        }     
                    });
                return false;
            });
        },

        _verifyEmail: function () {
            var self = this;
            Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('verifyEmail', {trigger: true});
            self.m_accStatusHandler = setInterval(function () {
                BB.Pepper.getAccountStatus(self.m_businessModel.get('businessId'), function (data) {
                    if (data.result > 0) {
                        window.clearInterval(self.m_accStatusHandler);
                        //BB.comBroker.getService(BB.SERVICES['LAYOUT_ROUTER']).navigate('authenticated', {trigger: true});
                        var user = self.m_businessModel.get('contactEmail');
                        var pass = self.m_businessModel.get('newAccPassword');
                        BB.comBroker.getService(BB.SERVICES.APP_AUTH).authenticate(user, pass);
                    }
                });
            }, 3000);
        },

        _bindings: function () {
            var self = this;

            self.addBinding(self.m_businessModel, Elements.NEW_ACC_BUSINESS_NAME, 'businessName');
            self.addBinding(self.m_businessModel, Elements.NEW_EMAIL_UPDATES, 'emailUpdates');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_EMAIL, 'contactEmail');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_FULLNAME_NAME, 'firstName');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PASSWORD, 'newAccPassword');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PASSWORDCONFIRM, 'newAccPasswordConfirm');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PHONE, 'workPhone');
            self.stickit();
        }

    });

    return CreateAccountView;

});
