/**
 @class StudioSelectView
 @constructor
 @return {Object} instantiated StudioSelectView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var StudioSelectView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });
            self.listenStudioSelection();
        },

        listenStudioSelection: function () {
            $(Elements.STUDIO_LITE_SELECTION).on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioLite', {trigger: true});
            });
            $(Elements.STUDIO_PRO_SELECTED).on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioPro', {trigger: true});
            });
        }
    });

    return StudioSelectView;

});

