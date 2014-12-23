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
            self.$el.find('.back').on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self._listenCreateAccount();
            self._bindings();
        },

        _listenCreateAccount: function(){
            var self = this;
            $(Elements.CREATE_ACCOUNT_INFO_BUTTON).on('click',function(e){

                e.preventDefault();

                if (!BB.lib.validateEmail(self.model.get('newAccEmail'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_CANCEL_INVALID_EMAIL).text());
                    return false;
                }

                if ((_.size(self.model.get('newAccPassword')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                    return false;
                }
                if ((_.size(self.model.get('newAccPasswordConfirm')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                    return false;
                }
                if (self.model.get('newAccPassword') != self.model.get('newAccPasswordConfirm')) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_NO_MATCH).text());
                    return false;
                }

                if (!BB.lib.validateAlphaNumeric(self.model.get('newAccPassword'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_ALPHANUMERIC).text());
                    return false;
                }

                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('verifyEmail', {trigger: true});
                var studioSelectView = BB.comBroker.getService(BB.SERVICES.STUDIO_SELECT_VIEW).getStudioTypeSelected();

                switch (studioSelectView){
                    case 'StudioLite': {
                        setTimeout(function(){
                            bootbox.alert('redirecting to studiolite');
                        },3000);
                        break;
                    }

                    case 'StudioPro': {
                        setTimeout(function(){
                            if (BB.APPS_SUPPORT==BB.CONSTS.OS_FLASH){
                                // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                            } else {
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                            }
                        },3000);
                        break;
                    }
                }

                return false;
            });
        },

        _bindings: function () {
            var self = this;
            self.addBinding(self.model, Elements.NEW_ACC_BUSINESS_NAME, 'newAccBusinessName');
            self.addBinding(self.model, Elements.NEW_ACC_EMAIL, 'newAccEmail');
            self.addBinding(self.model, Elements.NEW_ACC_PASSWORD, 'newAccPassword');
            self.addBinding(self.model, Elements.NEW_ACC_PASSWORDCONFIRM, 'newAccPasswordConfirm');
            self.addBinding(self.model, Elements.NEW_ACC_PHONE, 'newAccPhone');
            self.stickit();
        }

    });

    return CreateAccountView;

});

