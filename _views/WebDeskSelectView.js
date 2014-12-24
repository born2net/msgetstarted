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
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });

            self._listenWebStudioLaunch();
        },

        _listenWebStudioLaunch: function () {
            var self = this;
            $(Elements.OPEN_STUDIO_PRO_WEB).on('click', function () {
                self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
                var credentials = 'user=' + self.m_businessModel.get('contactEmail') + ',pass=' + self.m_businessModel.get('newAccPassword');
                credentials = $.base64.encode(credentials);
                var url = BB.Pepper.getStudioProURL();
                url = url + '?mode=login&param=' + credentials;
                $(location).attr('href', url);
            })
        }
    });

    return WebDeskSelectView;

});

