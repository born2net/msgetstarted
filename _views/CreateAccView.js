/**
 @class CreateAccountView
 @constructor
 @return {Object} instantiated CreateAccountView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox'], function ($, Backbone, backbonestickit, bootbox) {

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

        _listenForgotPassword: function(){
            var self = this;
            Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('forgetPassword', {trigger: true});
        },

        _listenCreateAccount: function () {
            var self = this;
            $(Elements.CREATE_ACCOUNT_INFO_BUTTON).on('click', function (e) {

                e.preventDefault();

                log(self.m_businessModel);

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
                if (self.m_businessModel.get('newAccPassword') != self.m_businessModel.get('newAccPasswordConfirm')) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_NO_MATCH).text());
                    return false;
                }
                if (!BB.lib.validateAlphaNumeric(self.m_businessModel.get('newAccPassword'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_ALPHANUMERIC).text());
                    return false;
                }

                BB.Pepper.createAccount(self.m_businessModel.get('businessName'), self.m_businessModel.get('contactEmail'), self.m_businessModel.get('newAccPassword'), self.m_businessModel.get('templateBusinessId'), self.m_businessModel.get('resellerId'), self.m_businessModel.get('firstName'), self.m_businessModel.get('lastName'), self.m_businessModel.get('contactEmail'), self.m_businessModel.get('workPhone'), self.m_businessModel.get('cellPhone'), self.m_businessModel.get('address'), self.m_businessModel.get('city'), self.m_businessModel.get('state'), self.m_businessModel.get('contry'), self.m_businessModel.get('zipcode'), function (data) {
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
                    if (data.result>0)
                        self._loadStudio();
                });
            }, 3000);
        },

        _loadStudio: function () {
            var self = this;
            window.clearInterval(self.m_accStatusHandler);
            var studioSelectView = BB.comBroker.getService(BB.SERVICES.STUDIO_SELECT_VIEW).getStudioTypeSelected();
            switch (studioSelectView) {
                case 'StudioLite':
                {
                    bootbox.alert('redirecting to studiolite');
                    break;
                }
                case 'StudioPro':
                {
                    if (BB.APPS_SUPPORT == BB.CONSTS.OS_FLASH) {
                        // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                    } else {
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                    }
                    break;
                }
            }
        },

        _bindings: function () {
            var self = this;

            self.addBinding(self.m_businessModel, Elements.NEW_ACC_BUSINESS_NAME, 'businessName');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_EMAIL, 'contactEmail');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PASSWORD, 'newAccPassword');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PASSWORDCONFIRM, 'newAccPasswordConfirm');
            self.addBinding(self.m_businessModel, Elements.NEW_ACC_PHONE, 'workPhone');
            self.stickit();
        }

    });

    return CreateAccountView;

});

