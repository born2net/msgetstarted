/**
 @class ChangePassView
 @constructor
 @return {Object} instantiated ChangePassView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var ChangePassView = Backbone.View.extend({

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
    })

    return ChangePassView;

});

