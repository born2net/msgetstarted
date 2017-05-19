/**
 MediaSignage Inc (c) open source digital signage project.
 Visit GitHub for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
 var jquery = require('jquery');
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'Pepper', 'Elements', 'bootbox', 'platform', 'flashdetect', 'placeholder', 'BusinessModel', 'RC4'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, Pepper, Elements, bootbox, platform, flashdetect, placeholder, BusinessModel, RC4) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            console.log('msGetStarted version 3.1');
            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.CONSTS.OS_UNKNOWN = 0;
            BB.CONSTS.OS_FLASH = 1;
            BB.CONSTS.OS_DESK_NO_FLASH = 2;
            BB.CONSTS.OS_MOBILE = 3;
            BB.CONSTS.STUDIO_LITE = 0;
            BB.CONSTS.STUDIO_PRO = 1;
            BB.APPS_SUPPORT = BB.CONSTS.OS_UNKNOWN;
            BB.STUDIO_TYPE = -1;
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.globs['ERI'] = '';
            // BB.globs['PRO_MODULES'] = '4.34';
            // BB.globs['PRO_VERSION'] = '4';
            BB.globs['MEDIA_CLOUD'] = true;
            BB.lib = new Lib();
            BB.Pepper = new Pepper();
            _.extend(BB.Pepper, BB.comBroker);
            //BB.Pepper.setServerAddress();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            window.pepper = BB.Pepper;

            // START_PROTOCOL
            window.g_protocol = 'https://';
            // END_PROTOCOL

            // START_MASTER
            window.g_masterDomain = 'galaxy.signage.me';
            // END_MASTER

            self.m_buinessModel = new BusinessModel();

            // localization
            require(['LanguageSelectorView', 'Elements'], function (LanguageSelectorView, Elements) {
                new LanguageSelectorView({el: Elements.LANGUAGE_PROMPT});
            });

            // router init
            require(['LayoutRouter'], function (LayoutRouter) {

                // START_REDIRECT
                BB.CONSTS.REDIRECT = 'http://www.digitalsignage.com';
                // END_REDIRECT

                // START_RESELLER
                BB.CONSTS.RESELLER = 1;
                // END_RESELLER

                // START_ERI
                BB.globs['ERI'] = '';
                // END_ERI

                // START_CLOUD
                BB.globs['CLOUD'] = true;
                // END_CLOUD

                // START_CHAT
                BB.globs['CHAT'] = 'http://www.digitalsignage.com/_html/live_chat.html';
                // END_CHAT

                // START_COMPANY
                BB.globs['COMPANY'] = 'DigitalSignage.com';
                // END_COMPANY

                var LayoutRouter = new LayoutRouter();
                Backbone.history.start({root: '/msgetstarted/'});
                BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
                // LayoutRouter.navigate('authenticate/_/_', {trigger: true});

                if (BB.CONSTS.RESELLER != 1)
                    self.m_buinessModel.set({resellerId: BB.CONSTS.RESELLER});

            });

            // debug platforms
            // console.log('name: ' + platform.name + ' version: ' + platform.version + ' product: ' + platform.product + ' os: ' + platform.os);

            $(Elements.CLASS_SAMPLE_PREVIEW).hide();


            if (FlashDetect.installed || FlashDetect.versionAtLeast(13)) {
                BB.APPS_SUPPORT = BB.CONSTS.OS_FLASH;
            } else {
                var os = BB.lib.getOS();
                if (os == 'windows' || os == 'osx') {
                    BB.APPS_SUPPORT = BB.CONSTS.OS_DESK_NO_FLASH;
                } else {
                    BB.APPS_SUPPORT = BB.CONSTS.OS_MOBILE;
                }
            }
        }
    });
    return App;
});
