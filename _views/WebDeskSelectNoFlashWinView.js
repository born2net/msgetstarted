/**
 @class WebDeskSelectNoFlashWinView for Web or AIR Desktop loaders no flash and is a PC
 @constructor
 @return {Object} instantiated WebDeskSelectNoFlashWinView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var WebDeskSelectNoFlashWinView = Backbone.View.extend({

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
    });

    return WebDeskSelectNoFlashWinView;

});

