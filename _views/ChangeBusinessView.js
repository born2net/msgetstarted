/**
 @class ChangeBusinessView
 @constructor
 @return {Object} instantiated ChangeBusinessView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox', 'Elements'], function ($, Backbone, backbonestickit, bootbox, Elements) {

    var ChangeBusinessView = Backbone.View.extend({

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
            $(Elements.NEW_BUSINESS_BUTTON).on('click', function (e) {
                e.preventDefault();
                //if (!BB.lib.validateEmail(self.model.get('newBusinessEmail'))) {
                //    bootbox.alert($(Elements.MSG_BOOTBOX_CANCEL_INVALID_EMAIL).text());
                //    return false;
                //}
                //if ((_.size(self.model.get('newBusinessPassword')) < 4)) {
                //    bootbox.alert($(Elements.MSG_BOOTBOX_PASSWORD_TOO_SHORT).text());
                //    return false;
                //}
                if ((_.size(self.model.get('newBusinessName')) < 3)) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_BUSINESS_NAME_TOO_SHORT).text());
                    return false;
                }
                BB.Pepper.changeBusinessName(self.model.get('newBusinessEmail'), self.model.get('newBusinessPassword'), self.model.get('newBusinessName'), function (data) {
                    if (data.result == 0) {
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
            self.addBinding(self.model, Elements.NEW_BUSINESS_EMAIL, 'newBusinessEmail');
            self.addBinding(self.model, Elements.NEW_BUSINESS_PASSWORD, 'newBusinessPassword');
            self.addBinding(self.model, Elements.NEW_BUSINESS_NAME, 'newBusinessName');
            self.stickit();
        }
    });

    return ChangeBusinessView;

});
