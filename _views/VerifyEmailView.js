/**
 @class VerifyEmailView
 @constructor
 @return {Object} instantiated VerifyEmailView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var VerifyEmailView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });
        }

    });

    return VerifyEmailView;

});

