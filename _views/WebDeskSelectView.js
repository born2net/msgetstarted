/**
 @class WebDeskSelectView for Web or AIR Desktop loaders
 @constructor
 @return {Object} instantiated WebDeskSelectView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var WebDeskSelectView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
        }
    })

    return WebDeskSelectView;

});

