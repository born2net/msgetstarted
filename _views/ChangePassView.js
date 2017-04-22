/**
 @class ChangePassView
 @constructor
 @return {Object} instantiated ChangePassView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox', 'Elements'], function ($, Backbone, backbonestickit, bootbox, Elements) {

    var ChangePassView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });

            self._listenChangePassword();
            self._bindings();
        },

        _listenChangePassword: function () {
            var self = this;
            $(Elements.CHANGE_PASS_BUTTON).on('click', function (e) {
                e.preventDefault();
                //if (!BB.lib.validateEmail(self.model.get('changePassUser'))) {
                //    bootbox.alert($(Elements.MSG_BOOTBOX_CANCEL_INVALID_EMAIL).text());
                //    return false;
                //}
                //if ((_.size(self.model.get('changePassPassword')) < 4)) {
                //    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                //    return false;
                //}
                //if ((_.size(self.model.get('changePassNewPassword')) < 4)) {
                //    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                //    return false;
                //}
                if ((_.size(self.model.get('changePassVerifyPassword')) < 4)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                    return false;
                }
                if (self.model.get('changePassVerifyPassword') != self.model.get('changePassNewPassword')) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_NO_MATCH).text());
                    return false;
                }

                if (!BB.lib.validateAlphaNumeric(self.model.get('changePassNewPassword'))) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_ALPHANUMERIC).text());
                    return false;
                }

                BB.Pepper.changePassword(self.model.get('changePassUser'), self.model.get('changePassPassword'), self.model.get('changePassNewPassword'), function (data) {
                    if (data.result == -1) {
                        bootbox.alert($(Elements.MSG_BOOTBOX_COULD_NOT_AUTHENTICATE).text());
                        return;
                    }
                    bootbox.alert($(Elements.MSG_BOOTBOX_COMPLETED).text());
                    BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
                });
            });
        },

        _bindings: function () {
            var self = this;
            self.addBinding(self.model, Elements.CHANGE_PASS_USER, 'changePassUser');
            self.addBinding(self.model, Elements.CHANGE_PASS_PASSWORD, 'changePassPassword');
            self.addBinding(self.model, Elements.CHANGE_PASS_NEW_PASSWORD, 'changePassNewPassword');
            self.addBinding(self.model, Elements.CHANGE_PASS_VERYIFY_PASSWORD, 'changePassVerifyPassword');
            self.stickit();
        }
    });

    return ChangePassView;

});
