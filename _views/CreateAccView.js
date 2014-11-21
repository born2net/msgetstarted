/**
 @class CreateAccView
 @constructor
 @return {Object} instantiated CreateAccView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var CreateAccView = Backbone.View.extend({

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

    return CreateAccView;

});

