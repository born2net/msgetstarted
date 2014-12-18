/**
 @class AccountView
 @constructor
 @return {Object} instantiated AccountView
 **/
define(['jquery', 'backbone', 'backbone.stickit', 'bootbox'], function ($, Backbone, backbonestickit, bootbox) {

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
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('verifyEmail', {trigger: true});

                var studioSelectView = BB.comBroker.getService(BB.SERVICES.STUDIO_SELECT_VIEW).getStudioTypeSelected();

                switch (studioSelectView){
                    case 'StudioLite': {
                        setTimeout(function(){
                            bootbox.alert('redirecting to studiolite');
                        },3000);
                        break;
                    }

                    case 'StudioPro': {
                        setTimeout(function(){
                            if (BB.APPS_SUPPORT==BB.CONSTS.OS_FLASH){
                                // Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDesk', {trigger: true});
                            } else {
                                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('selectWebOrDeskNoFlash', {trigger: true});
                            }
                        },3000);
                        break;
                    }
                }

               return false;
            });
        }

    });

    return AccountView;

});

