/**
 @class AccountView
 @constructor
 @return {Object} instantiated AccountView
 **/
define(['jquery', 'backbone', 'bootbox'], function ($, Backbone) {

    var AccountView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self._listenCreateAccount();
        },

        _listenCreateAccount: function(){
            $(Elements.CREATE_ACCOUNT_INFO_BUTTON).on('click',function(e){
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
               return false;
            });
        }

    });

    return AccountView;

});

