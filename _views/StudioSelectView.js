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
        },

        _checkCompatibility: function () {
            if (BB.APPS_SUPPORT == BB.CONSTS.OS_MOBILE)
                return 0;
            return 1;
        },

        _listenStudioSelection: function () {
            var self = this;
            var $elem = $('div.product-chooser').find('div.product-chooser-item');
            $elem.on('mouseover', function (e) {
                $('div.product-chooser-item').removeClass('selected');
                $(this).addClass('selected');
                $('input[type="radio"]').prop("checked", true);
            });
            $elem.on('click', function (e) {
                switch ($(this).attr('name')){
                    case 'StudioLite': {
                        self.m_selectedStudioType = 'StudioLite';
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioLite', {trigger: true});
                        break;
                    }
                    case 'StudioPro': {
                        if (self._checkCompatibility() == 0) {
                            bootbox.alert($(Elements.MSG_BOOTBOX_NO_PRO_ON_MOBILE).text());
                            return;
                        }
                        self.m_selectedStudioType = 'StudioPro';
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioPro', {trigger: true});
                        break;
                    }
                }
            });
        },

        /*
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
        */

        showAccordionStudioPlayer: function (i_id) {
            var self = this;
            switch (i_id) {

                case '0':
                {
                    self.$('div.accordion-body.in').collapse('hide');
                    break;
                }
                case '1':
                {
                    // open studio
                    self.$('div.accordion-body.in').collapse('hide');
                    $('#accordionStudio').trigger('click');
                    break;
                }
                case '2':
                {
                    // open player
                    self.$('div.accordion-body.in').collapse('hide');
                    $('#accordionPlayer').trigger('click');
                    break;
                }
                case '3':
                {
                    // open sudio delayed
                    self.$('div.accordion-body.in').collapse('hide');
                    setTimeout(function(){
                        $('#accordionStudio').trigger('click');
                    },1000);

                    break;
                }
            }
        },

        getStudioTypeSelected: function () {
            var self = this;
            return self.m_selectedStudioType;
        }
    });

    return StudioSelectView;

});

