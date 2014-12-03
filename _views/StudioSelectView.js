/**
 @class StudioSelectView - selecting between StudioLite and StudioPro
 @constructor
 @return {Object} instantiated StudioSelectView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone, bootbox) {

    BB.SERVICES.STUDIO_SELECT_VIEW = 'StudioSelectView';

    var StudioSelectView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES.STUDIO_SELECT_VIEW, self);
            self.m_selectedStudioType;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('unauthenticated', {trigger: true});
            });
            self._listenStudioSelection();
            self._listenStudioFocus();
        },

        _checkCompatibility: function () {
            if (BB.APPS_SUPPORT == BB.CONSTS.OS_MOBILE)
                return 0
            return 1;
        },

        _listenStudioFocus: function () {
            var self = this;
            $('div.product-chooser').find('div.product-chooser-item').on('click', function (e) {
                if ($(this).attr('name') == 'StudioPro' && self._checkCompatibility() == 0) {
                    bootbox.alert($(Elements.MSG_BOOTBOX_NO_PRO_ON_MOBILE).text());
                    return;
                }
                $('div.product-chooser-item').removeClass('selected');
                $(this).addClass('selected');
                $(this).find('input[type="radio"]').prop("checked", true);
            });
        },

        _listenStudioSelection: function () {
            var self = this;
            $(Elements.STUDIO_LITE_SELECTION).on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioLite', {trigger: true});
                self.m_selectedStudioType = 'StudioLite';
            });
            $(Elements.STUDIO_PRO_SELECTED).on('click', function (e) {
                if (self._checkCompatibility() == 0) {
                    return;
                }
                self.m_selectedStudioType = 'StudioPro';
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioPro', {trigger: true});
            });
        },

        getStudioTypeSelected: function(){
            var self = this;
            return self.m_selectedStudioType;
        }
    });

    return StudioSelectView;

});

