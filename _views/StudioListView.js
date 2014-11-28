/**
 @class StudioListView
 @constructor
 @return {Object} instantiated StudioListView
 **/
define(['jquery', 'backbone', 'SampleFactory'], function ($, Backbone, SampleFactory) {

    BB.CONSTS.STUDIO_LITE = 'STUDIO_LITE';
    BB.CONSTS.STUDIO_PRO = 'STUDIO_PRO';

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
            if (self.m_sampleFactory)
                return;
            self.m_sampleFactory = new SampleFactory();
        }
    });

    return StudioListView;

});

