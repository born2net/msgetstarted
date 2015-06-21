/**
 @class DirectDownloadView
 @constructor
 @return {Object} instantiated DirectDownloadView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox'], function ($, Backbone, backbonestickit, bootbox) {

    var DirectDownloadView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
        }
    });

    return DirectDownloadView;

});

