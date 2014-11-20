/**
 @class ForgetPassView
 @constructor
 @return {Object} instantiated ForgetPassView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var ForgetPassView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });
        }
    });

    return ForgetPassView;

});

