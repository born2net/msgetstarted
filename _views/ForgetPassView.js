/**
 @class ForgetPassView
 @constructor
 @return {Object} instantiated ForgetPassView
 **/
define(['jquery', 'backbone', 'bootbox', 'Elements'], function ($, Backbone, bootbox, Elements) {

    var ForgetPassView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });
            self._listenPasswordreset();
        },

        _listenPasswordreset: function () {
            var self = this;
            $(Elements.FORGET_PASS_BUTTON).on('click', function (e) {
                e.preventDefault();
                var i_email = $(Elements.RESET_PASS_INPUT).val();
                if (!BB.lib.validateEmail(i_email)) {
                    bootbox.dialog({
                        message: $(Elements.MSG_BOOTBOX_ENTER_EMAIL).text(),
                        buttons: {
                            danger: {
                                label: $(Elements.MSG_BOOTBOX_OK).text(),
                                className: "btn-danger"
                            }
                        }
                    });
                    return false;
                }
                BB.Pepper.resetPassword(i_email, function (data) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_CHECK_EMAIL).text());
                    BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
                });
            });
            return false;
        }
    });

    return ForgetPassView;

});
