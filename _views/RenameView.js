/**
 @class RenameView
 @constructor
 @return {Object} instantiated RenameView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var RenameView = Backbone.View.extend({

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

    return RenameView;

});

