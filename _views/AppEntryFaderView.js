/**
 The Core Application StackView between Login screen and Main app
 @class AppEntryFaderView
 @constructor
 @return {object} instantiated AppEntryFaderView
 **/
define(['jquery', 'backbone', 'StackView'], function ($, Backbone, StackView) {

    Backbone.SERVICES.APP_ENTRY_FADER_VIEW = 'AppEntryFaderView';

    var AppEntryFaderView = Backbone.StackView.Fader.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService(BB.SERVICES['APP_ENTRY_FADER_VIEW'], self);
            Backbone.StackView.ViewPort.prototype.initialize.call(this);
        }
    });

    return AppEntryFaderView;
});