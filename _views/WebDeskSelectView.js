/**
 @class WebDeskSelectView for Web or AIR Desktop loaders
 @constructor
 @return {Object} instantiated WebDeskSelectView
 **/
define(['jquery', 'backbone', 'bootbox', 'platform', 'Elements'], function ($, Backbone, bootbox, platform, Elements) {

    var WebDeskSelectView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.$el.find('.back').on('click', function (e) {
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('appSelector', {trigger: true});
            });
            self._listenWebStudioLaunch();
        },

        /**
         Listen to launch of StudioPro and build the appropriate url loader
         @method _listenWebStudioLaunch
         **/
        _listenWebStudioLaunch: function () {
            var self = this;
            $(Elements.OPEN_STUDIO_PRO_WEB).on('click', function () {
                self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
                $(Elements.DOM_ROOT).fadeOut();
                $(Elements.IFRAME_STUDIOPRO).fadeIn();

                var user = self.m_businessModel.get('contactEmail');
                var pass = self.m_businessModel.get('newAccPassword');

                BB.Pepper.getStudioProURL(user, pass, BB.globs['MEDIA_CLOUD'], function (newRedirectUrl) {
                    // $(Elements.STUDIOPRO_INSERT).attr('src', newRedirectUrl);
                    window.location.replace(newRedirectUrl);
                });
            })
        }

        // old version
        // _listenWebStudioLaunch: function () {
        //     var self = this;
        //     $(Elements.OPEN_STUDIO_PRO_WEB).on('click', function () {
        //         self.m_businessModel = BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL);
        //         $(Elements.DOM_ROOT).fadeOut();
        //         $(Elements.IFRAME_STUDIOPRO).fadeIn();
        //         var credentials = '&user=' + self.m_businessModel.get('contactEmail') + '&pass=' + self.m_businessModel.get('newAccPassword');
        //         var lang = BB.comBroker.getService(BB.SERVICES.LANGUAGE_SELECTOR).getLanguage();
        //         var local = "&local=" + lang.langNative;
        //         var u =  'http://galaxy.mediasignage.com/WebService/signagestudio.aspx?mode=login&v=' + '4' + '&eri=' + 'f7bee07a7e79c8efdb961c4d30d20e10c66442110de03d6141' + credentials + local;
        //         $(Elements.STUDIOPRO_INSERT).attr('src', u)
        //     })
        // }
    });
    return WebDeskSelectView;
});


// var u = 'http://galaxy.mediasignage.com/WebService/signagestudio.aspx?mode=login&v=4&eri=f7bee07a7e79c8efdb961c4d30d20e10c66442110de03d6141&user=d4@ms.com&pass=xxx&local=en_US';
// var url = BB.Pepper.getStudioProURL();
// credentials = 'user=d4@ms.com,pass=xxx,local=en_US';
// credentials = $.base64.encode(credentials);
// url = url + '?mode=login&param=' + credentials;
// $(location).attr('href', url);
// var flashvars = {};
// flashvars.params = credentials;
// flashvars.ver = "4";
// flashvars.mode = "login";
// flashvars.eri = "f7bee07a7e79c8efdb961c4d30d20e10c66442110de03d6141";
// var swf = "http://galaxy.signage.me/Code/Modules/4.33/desktop/StudioLoginWeb.swf?ver=" + flashvars.ver;
// swf = "http://galaxy.mediasignage.com/WebService/signagestudio.aspx?mode=login&v=4&eri=f7bee07a7e79c8efdb961c4d30d20e10c66442110de03d6141"
// var params = {wmode: "direct"};
// var attributes = {};
// attributes.id = "Login";
// swfobject.embedSWF(swf, "studioProInsert", "1200px", "1200px", "9.0.0", false, flashvars, params, attributes);
// var u = 'http://galaxy.mediasignage.com/WebService/signagestudio.aspx?mode=login&v=4&eri=f7bee07a7e79c8efdb961c4d30d20e10c66442110de03d6141&user=d4@ms.com&pass=xxx&local=en_US';

// if (window.g_masterDomain== 'galaxy.signage.me') {
//     return window.g_protocol + 'galaxy.mediasignage.com/WebService/';
// } else {
//     return window.g_protocol + window.g_masterDomain + '/WebService/';
// }
// if (platform.name == 'IE' && platform.version < 10) {
//     bootbox.dialog({
//         message: $(Elements.MSG_BOOTBOX_OLD_BROWSER).text(),
//         buttons: {
//             danger: {
//                 label: $(Elements.MSG_BOOTBOX_OK).text(),
//                 className: "btn-danger"
//             }
//         }
//     });
//     return;
// }


// var credentials = '&user=' + self.m_businessModel.get('contactEmail') + '&pass=' + self.m_businessModel.get('newAccPassword');
// var u = BB.Pepper.getStudioProURL() + 'signagestudio.aspx?mode=login&v=' + BB.globs['PRO_VERSION'] + '&eri=' + BB.globs['ERI'] + credentials + local;
// u = u.replace('https','http');
// var url = 'https://galaxy.signage.me/WebService/ResellerService.ashx?command=GetLoginUrl&customerUserName=' + user + '&customerPassword=' + pass;

// $.get(url, function (redirectUrl) {
//     var lang = BB.comBroker.getService(BB.SERVICES.LANGUAGE_SELECTOR).getLanguage();
//     var local = "&local=" + lang.langNative;
//     // var newRedirectUrl = redirectUrl + '&mode=login&v=' + BB.globs['PRO_VERSION'] + '&eri=' + BB.globs['ERI'] + local;
//     // var newRedirectUrl = redirectUrl + '&eri=' + BB.globs['ERI'] + local;
//     var newRedirectUrl = redirectUrl + local;

// });


// var origin = window.location.toString();
// var re = new RegExp(/^(https|http)(:\/\/)(.*?)\//);
// //var protocol = origin.match(re)[1];
// var server = origin.match(re)[3];
// if (server == 'gsignage.com' || server.match(/digitalsignage.com/i)){}
