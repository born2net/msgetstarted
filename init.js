/**
 Require js initialization module definition file for GetStarted
 @class Require init js
 **/
// require.config({
//     waitSeconds: 115,
//     /** release or local host  **/
//     // baseUrl: '/msgetstarted',
//     /** enable to debug gsignage.com **/
//     baseUrl: '/',
//     paths: {
//         'jquery': '_common/_jquery/std/jq1.9.1/jquery-1.9.1',
//         'backbone': '_common/_js/backbone/backbone',
//         'text': '_common/_js/requirejs/text',
//         'backbone.controller': '_common/_js/backbone-controller/backbone.controller',
//         'backbone.stickit': '_common/_js/backbone-stickit/backbone.stickit',
//         'Lib': '_libs/Lib',
//         'bootbox': '_common/_js/bootbox/bootbox',
//         'platform': '_common/_js/platform/platform',
//         'video': '_common/_js/video/video.dev',
//         'nouislider': '_common/_js/nouislider/jquery.nouislider',
//         'placeholder': '_common/_js/placeholder/placeholder',
//         'Cookie': '_common/_js/cookie/jquery.cookie',
//         'Base64': '_common/_js/base64/jquery.base64',
//         'validator': '_common/_js/validator/validator',
//         'RC4': '_common/_js/rc4/RC4',
//         'RC4V2': '_common/_js/rc4/RC4V2',
//         'ComBroker': '_controllers/ComBroker',
//         'XDate': '_common/_js/xdate/xdate',
//         'simplestorage': '_common/_js/simplestorage/simpleStorage',
//         'underscore': '_common/_js/underscore/underscore',
//         'bootstrap': '_common/_js/bootstrap/js/bootstrap',
//         'socketio': '_common/_js/socketio/socketio',
//         'flashdetect': '_common/_js/flashdetect/flashdetect',
//         'Elements': 'Elements',
//         'localizer': '_common/_js/localizer/dist/jquery.localize',
//         'LayoutRouter': '_controllers/LayoutRouter',
//         'MailWasp': '_controllers/MailWasp',
//         'EverNodes': '_controllers/EverNodes',
//         'StackView': '_views/StackView',
//         'AppAuth': '_controllers/AppAuth',
//         'AppContentFaderView': '_views/AppContentFaderView',
//         'AppSelectorView': '_views/AppSelectorView',
//         'AppEntryFaderView': '_views/AppEntryFaderView',
//         'PopModalView': '_views/PopModalView',
//         'OrientationSelectorView': '_views/_billing/OrientationSelectorView',
//         'LoginView': '_views/LoginView',
//         'SignagePlayerView': '_views/SignagePlayerView',
//         'NavigationView': '_views/NavigationView',
//         'CreateAccView': '_views/CreateAccView',
//         'DirectDownloadView': '_views/DirectDownloadView',
//         'PortalView': '_views/PortalView',
//         'BillingView': '_views/BillingView',
//         'OrdersView': '_views/OrdersView',
//         'RenameView': '_views/RenameView',
//         'ChangePassView': '_views/ChangePassView',
//         'ChangeBusinessView': '_views/ChangeBusinessView',
//         'ForgetPassView': '_views/ForgetPassView',
//         'StudioSelectView': '_views/StudioSelectView',
//         'StudioListView': '_views/StudioListView',
//         'SampleCreator': '_views/SampleCreator',
//         'AccountView': '_views/AccountView',
//         'WebDeskSelectView': '_views/WebDeskSelectView',
//         'WebDeskSelectNoFlashView': '_views/WebDeskSelectNoFlashView',
//         'WebDeskSelectNoFlashWinView': '_views/WebDeskSelectNoFlashWinView',
//         'VerifyEmailView': '_views/VerifyEmailView',
//         'WaitView': '_views/WaitView',
//         'PropertiesView': '_views/_billing/PropertiesView',
//         'LogoutView': '_views/_billing/LogoutView',
//         'CampaignManagerView': '_views/_billing/CampaignManagerView',
//         'CampaignSliderStackView': '_views/_billing/CampaignSliderStackView',
//         'CampaignNameSelectorView': '_views/_billing/CampaignNameSelectorView',
//         'CampaignSelectorView': '_views/_billing/CampaignSelectorView',
//         'LanguageSelectorView': '_views/LanguageSelectorView',
//         'NavigationViewEverNodes': '_views/_billing/NavigationViewEverNodes',
//         'ResolutionSelectorView': '_views/_billing/ResolutionSelectorView',
//         'ResourcesView': '_views/_billing/ResourcesView',
//         'ProStudioView': '_views/_billing/ProStudioView',
//         'ScreenLayoutSelectorView': '_views/_billing/ScreenLayoutSelectorView',
//         'SettingsView': '_views/_billing/SettingsView',
//         'StationsViewLoader': '_views/_billing/StationsViewLoader',
//         'HelpView': '_views/_billing/HelpView',
//         'CampaignManagerWaspView': '_views/_orders/CampaignManagerWaspView',
//         'CampaignSliderStackWaspView': '_views/_orders/CampaignSliderStackWaspView',
//         'CampaignNameSelectorWaspView': '_views/_orders/CampaignNameSelectorWaspView',
//         'CampaignSelectorWaspView': '_views/_orders/CampaignSelectorWaspView',
//         'OrientationSelectorWaspView': '_views/_orders/OrientationSelectorWaspView',
//         'ResolutionSelectorWaspView': '_views/_orders/ResolutionSelectorWaspView',
//         'NavigationWaspView': '_views/_orders/NavigationWaspView',
//         'ResourcesWaspView': '_views/_orders/ResourcesWaspView',
//         'ScreenLayoutSelectorWaspView': '_views/_orders/ScreenLayoutSelectorWaspView',
//         'LogoutWaspView': '_views/_orders/LogoutWaspView',
//         'BusinessModel': '_models/BusinessModel',
//         'Pepper': '_libs/Pepper'
//     },
//
//     shim: {
//         'backbone': {
//             deps: ['underscore', 'jquery'],
//             exports: 'Backbone'
//         },
//         'backbone.controller': {
//             deps: ['underscore', 'jquery']
//         },
//         'LayoutRouter': {
//             deps: ['Elements', 'backbone.controller']
//         },
//         'underscore': {
//             exports: '_'
//         },
//         'bootstrap': {
//             deps: ['jquery']
//         },
//         'Pepper': {
//             deps: ['jquery', 'RC4V2'],
//             exports: 'Pepper'
//         },
//         'placeholder': {
//             exports: 'placeholder'
//         },
//         'RC4': {
//             exports: 'RC4'
//         },
//         'RC4V2': {
//             exports: 'RC4V2'
//         },
//         'Cookie': {
//             deps: ['jquery'],
//             exports: 'cookie'
//         },
//         'socketio': {
//             exports: 'socketio'
//         },
//         'nouislider': {
//             exports: 'nouislider'
//         },
//         'ComBroker': {
//             deps: ['backbone', 'jquery']
//         },
//         'Elements': {
//             exports: 'Elements'
//         },
//         'bootbox': {
//             deps: ['jquery'],
//             exports: 'bootbox'
//         }
//     }
// });

require(['App'], function (App) {
    new App();
});
