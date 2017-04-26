/**
 @class StudioSelectView - selecting between StudioLite and StudioPro
 @constructor
 @return {Object} instantiated StudioSelectView
 **/
define(['jquery', 'backbone', 'bootbox', 'Elements'], function ($, Backbone, bootbox, Elements) {

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
            self._listenPanelHeaderSelection();
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
                switch ($(this).attr('name')) {
                    case 'StudioLite':
                    {
                        self.m_selectedStudioType = 'StudioLite';
                        Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectStudioLite', {trigger: true});
                        break;
                    }
                    case 'StudioPro':
                    {
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

        /**
         A workaround for IE 9 to allow opening and closing of accordion
         @method _listenPanelHeaderSelection
         **/
        _listenPanelHeaderSelection: function () {
            var self = this;
            $(Elements.ACCORDION_STUDIO).on('click', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return false;

                return;
                var e = $(Elements.CLASS_PROD_SELECT_ACC, self.el)[0];
                $(e).trigger('click');
            });

            $(Elements.ACCORDION_PLAYER).on('click', function () {
                var e = $(Elements.CLASS_PROD_SELECT_ACC, self.el)[1];
                $(e).trigger('click');
            });

            $(Elements.CLASS_PROD_SELECT_ACC + ',' + Elements.ACCORDION_PLAYER, self.el).on('click', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return false;
                $('html, body').animate({
                    scrollTop: $(Elements.FOOTER).offset().top
                }, 'slow');
            });
        },

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
                    $(Elements.ACCORDION_STUDIO).trigger('click');
                    break;
                }
                case '2':
                {
                    // open player
                    if ($('#collapseTwo').hasClass('in'))
                        return;
                    self.$('div.accordion-body.in').collapse('hide');
                    $(Elements.ACCORDION_PLAYER).trigger('click');
                    break;
                }
                case '3':
                {
                    // open studio delayed
                    self.$('div.accordion-body.in').collapse('hide');
                    setTimeout(function () {
                        $(Elements.ACCORDION_STUDIO).trigger('click');
                    }, 500);

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
