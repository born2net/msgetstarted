/**
 @class StudioListView
 @constructor
 @return {Object} instantiated StudioListView
 **/
define(['jquery', 'backbone', 'SampleCreator', 'Elements'], function ($, Backbone, SampleCreator, Elements) {

    BB.CONSTS.STUDIO_LITE = 'STUDIO_LITE';
    BB.CONSTS.STUDIO_PRO = 'STUDIO_PRO';
    BB.CONSTS.STUDIO_DASH = 'STUDIO_DASH';

    var StudioListView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_stackView = self.options.stackView;
            if (self.options.el == Elements.STUDIO_LITE_VIEW){
                self.m_studioType = BB.CONSTS.STUDIO_LITE;
            } else {
                self.m_studioType = BB.CONSTS.STUDIO_PRO;
            }
            self.$el.find('.back').on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self._listenSelection();
        },

        _listenSelection: function(){
            var self = this;
            self.listenTo(self.options.stackView, BB.EVENTS.SELECTED_STACK_VIEW, function (e) {
                if (e != self) return;
                self._render();
            });
        },

        _render: function(){
            var self = this;
            var element;
            if (self.m_SampleCreator)
                return;
            switch(self.m_studioType){
                case BB.CONSTS.STUDIO_PRO: {
                    element = Elements.SAMPLE_LIST_PRO;
                    break;
                }
                case BB.CONSTS.STUDIO_LITE: {
                    element = Elements.SAMPLE_LIST_LITE;
                    break;
                }
            }

            self.m_SampleCreator = new SampleCreator({
                el: element,
                studioType: self.m_studioType
            });
        }
    });

    return StudioListView;

});
