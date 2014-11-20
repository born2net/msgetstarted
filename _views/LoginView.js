/**
 Login manager extends Backbone > View for management of user login and cookie creation
 @class LoginView
 @constructor
 @return {Object} instantiated LoginView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone, Bootbox) {

    var LoginView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            $(Elements.LOGIN_BUTTON).on('click', function () {
                if ($(Elements.USER_NAME).val().length > 0 && $(Elements.USER_PASS).val().length > 0) {
                    var user = $(Elements.USER_NAME).val();
                    var pass = $(Elements.USER_PASS).val();
                    Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('authenticate/' + user + '/' + pass, {trigger: true});
                }
                return true;
            });

            $(Elements.CREATE_ACCOUNT_BUTTON).on('click', function () {
                BB.comBroker.getService(BB.SERVICES.APP_ENTRY_FADER_VIEW).selectView(Elements.CREATE_ACCOUNT_VIEW);
                return false;
            });

            $(Elements.FORGOT_PASSWORD).on('click', function () {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('forgetPassword', {trigger: true});
                return false;
            });

            $(Elements.CHANGE_PASSWORD).on('click', function () {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('changePassword', {trigger: true});
                return false;
            });

            $(Elements.CHANGE_BUSINESS).on('click', function () {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('changeBusiness', {trigger: true});
                return false;
            });
        }
    });

    return LoginView;

});

