/**
 @class SampleCreator
 @constructor
 @return {Object} instantiated SampleCreator
 **/
define(['jquery', 'backbone', 'video', 'text!_templates/_templateSampleItem.html'], function ($, Backbone, videojs, templateSampleItem) {

    var SampleCreator = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_sampleTemplate = _.template(templateSampleItem);
            self.m_videoIntro = $('#videoIntro');
            self._initVideo();
            self._render();
            self._listenFilterList();
            self._listenStopVideo();

            self.m_fakeVideos = [1,2,3,4];
        },

        _listenFilterList: function () {
            var self = this;
            $(Elements.CLASS_FILTER_SAMPLE, self.el).on('keyup', function () {
                var rex = new RegExp($(this).val(), 'i');
                self.$('.sampleItem').hide();
                self.$('.sampleItem').filter(function () {
                    return rex.test($(this).text());
                }).show();
            });
        },

        _listenPreview: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).off('click');
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).on('click', function () {

                // old url preview, will open in new browser full screen
                //var url = $(this).attr('name');
                //window.open(url, '_blank');

                // video popup preview, release
                var videoName = $(this).attr('data-video');
                // test
                videoName = self.m_fakeVideos.shift();
                self.m_videoPlayer.pause();
                //self.m_videoIntro.find('video:nth-child(1)').attr("src", videoUrl);
                self.m_videoIntro.find('video:nth-child(1)').find('source').remove();
                self.m_videoIntro.find('video:nth-child(1)').append('<source src="' + videoName + '.mp4" type="video/mp4"><source src="' + videoName + '.webm" type="video/webm">');
                self.m_videoPlayer.load();
                self.m_videoIntro.width('768').height('432');
                $('#videoModal').modal('show');
                self._listenStopVideo();
                self.m_videoPlayer.play();
                return false;
            });
        },

        /**
         init HTML5 video.js component
         @method _listenAutoPopup
         **/
        _initVideo: function () {
            var self = this;
            videojs(BB.lib.unhash('#videoIntro')).ready(function () {
                self.m_videoPlayer = this;
                self.m_videoPlayer.load();

                BB.comBroker.listen(BB.EVENTS.APP_SIZED, function () {
                    var w = BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).getAppWidth() - 100;
                    var h = BB.comBroker.getService(BB.SERVICES.LAYOUT_ROUTER).getAppHeight() - 200;
                    $('#videoIntro').width(w).height(h);
                });
            });
        },

        /**
         Listen to stop video clicks
         @method _listenAutoPopup
         **/
        _listenStopVideo: function () {
            var self = this;
            var stopVideo = function () {
                self.m_videoPlayer.pause();
                //self.m_videoPlayer.load();
            };
            $('.close').on('click', function () {
                stopVideo();
            });
            $('#closeModal').on('click', function () {
                stopVideo();
            });
        },


        _listenSelection: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_ITEM, self.el).off('click');
            $(Elements.CLASS_SAMPLE_ITEM, self.el).on('click', function () {
                var templateBusinessId = $(this).find(Elements.CLASS_SAMPLE_PREVIEW).attr('data-templateBusinessId');
                BB.comBroker.getService(BB.SERVICES.BUSINESS_MODEL).set('templateBusinessId', templateBusinessId);
                Backbone.comBroker.getService(Backbone.SERVICES.LAYOUT_ROUTER).navigate('createAcc', {trigger: true});
                return false;
            });
        },

        _render: function () {
            var self = this;
            var accountType;
            switch (self.options.studioType) {
                case BB.CONSTS.STUDIO_PRO:
                {
                    accountType = 0;
                    break;
                }
                case BB.CONSTS.STUDIO_LITE:
                {
                    accountType = 1;
                    break;
                }
            }

            var $ul = self.$('ul');
            var ul = $ul[0];
            BB.Pepper.getSampleList(function (data) {
                for (var i in data['templates']) {
                    var sample = data['templates'][i];
                    var sampleType = sample.lite;
                    if (accountType != sampleType)
                        continue;
                    var templateBusinessId = data['templates'][i].businessId;
                    var sampleItem = {
                        templateBusinessId: templateBusinessId,
                        name: data['templates'][i].name,
                        video: 'ballet',
                        icon: 'http://galaxy.signage.me/Resources/Images/lite_html/' + templateBusinessId + '.png',
                        preview: data['templates'][i].previewUrl
                    };
                    $ul.append(self.m_sampleTemplate(sampleItem));
                }

            });

            // workaround as we can't force repaint in time for diff devices
            BB.lib.setIntervalTimes(function () {
                self._listenSelection();
                self._listenPreview();
            }, 400, 10);

            // no flash support so remove preview capabilities
            if (BB.APPS_SUPPORT != BB.CONSTS.OS_FLASH)
                $(Elements.CLASS_SAMPLE_PREVIEW).hide();
        }
    });

    return SampleCreator;

});

