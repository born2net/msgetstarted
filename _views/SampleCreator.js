/**
 @class SampleCreator
 @constructor
 @return {Object} instantiated SampleCreator
 **/
define(['jquery', 'backbone', 'video', 'text!_templates/_templateSampleItem.html', 'Elements'], function ($, Backbone, videojs, templateSampleItem, Elements) {

    var SampleCreator = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_oldMode = false;
            self.m_sampleTemplate = _.template(templateSampleItem);
            self.m_videoIntro = $('#videoIntro');
            self._initData();
            self._initVideo();
            self._render();
            self._listenFilterList();
            self._listenStopVideo();
            // self.m_fakeVideos = [1, 2, 3, 4];
        },

        _initData: function(){
            var self = this;
            self.m_data = {
                507527: 'Bar',
                1019: 'Sushi Restaurant',
                1029: 'food menu board',
                1007: 'Home and Garden',
                1009: 'Hotel Lobby',
                1016: 'Coffee Shop',
                1011: 'Hobby Shop',
                1013: 'Sports Bar',
                1014: 'Museum',
                1017: 'Bank',
                1018: 'Gas Station',
                1020: 'Casino',
                1000: 'Travel',
                1021: 'Bicycle Shop',
                1022: 'Tanning Salon',
                1023: 'Pharmacy',
                1024: 'Laser Away',
                1025: 'Dentistry',
                1026: 'Clothing store',
                1027: 'Golf club',
                1028: 'RC Heli',
                1030: 'seven eleven',
                1031: 'Subway',
                1032: 'Super market',
                1033: 'Investment Group',
                1035: 'Synagogue',
                1036: 'Dry Cleaning',
                1037: 'Ice Cream Shop',
                1038: 'Real Estate office',
                1039: 'Night Club',
                1040: 'Hockey',
                1041: 'Train Station',
                1042: 'Realtor',
                1043: 'Toy Store',
                1044: 'Indian Restaurant',
                1045: 'Library',
                1046: 'Movie Theater',
                1047: 'Airport',
                1048: 'LAX',
                100310: 'Motel',
                100301: 'Parks and Recreations',
                100322: 'Corner Bakery',
                100331: 'Retirement home',
                100368: 'Navy recruiting office',
                100397: 'Martial arts school',
                100414: 'Supercuts',
                100432: 'The UPS Store',
                100438: 'Cruise One',
                100483: 'Car service',
                100503: 'fedex kinkos',
                100510: 'veterinarian',
                100556: 'YMCA',
                100574: 'Tax services',
                100589: 'Wedding planner',
                100590: 'Cleaning services',
                100620: 'Pet Training',
                100661: 'Gymboree Kids',
                100677: 'Trader Joes',
                100695: 'Men Haircuts',
                100722: 'Jiffy Lube',
                100738: 'Toyota  car dealer',
                100747: 'Winery',
                100771: 'Savings and Loans',
                100805: 'Nail Salon',
                100822: 'Weight Watchers',
                100899: 'Dollar Tree',
                100938: 'Western Bagles',
                100959: 'Kaiser Permanente',
                300143: 'Funeral home',
                205734: 'Church',
                220354: 'College',
                206782: 'Dr Waiting Room',
                300769: 'NFL Stadium',
                301814: 'University Campus',
                303038: 'Day care',
                304430: 'GameStop',
                307713: 'Del Taco',
                305333: 'General Hospital',
                305206: 'Starbucks',
                308283: 'training and fitness',
                311519: 'High school hall',
                309365: 'Winery',
                310879: 'Law Firm',
                1001: 'Health Club',
                1002: 'Gym',
                1003: 'Flower Shop',
                1004: 'Car Dealership',
                1012: 'Pet Shop',
                1005: 'Hair Salon',
                1209: 'Motorcycle shop,lite',
                1210: 'Sushi and Grill,lite',
                1211: 'the Coffee Shop,lite',
                1212: 'Pizzeria,lite',
                1213: 'Music Store,lite',
                1214: 'Diner,lite',
                1215: 'the Hair Salon,lite',
                1216: 'Dentist,lite',
                1203: 'Jewelry,lite',
                1217: 'Crossfit,lite',
                1218: 'Copy and Print shop,lite',
                1219: 'Antique Store,lite',
                1220: 'Watch and Clock Repair Store,lite',
                1221: 'Mediterranean Cuisine,lite',
                1222: 'the Toy Store,lite',
                1223: 'Pet Store and Grooming,lite',
                1224: 'the Veterinarian,lite',
                1225: 'Tattoo Parlor,lite',
                1226: 'Camera Store,lite',
                1228: 'Bike shop,lite',
                1229: 'Gun Shop,lite',
                1230: 'Chiropractic Clinic,lite',
                1231: 'French Restaurant,lite',
                1233: 'Winery,lite',
                1232: 'Mexican Taqueria,lite',
                1234: 'Bistro Restaurant,lite',
                1235: 'Vitamin Shop,lite',
                1227: 'Tailor Shop,lite',
                1236: 'Computer Repair,lite',
                1237: 'Car Detail,lite',
                1238: 'Asian Restaurants,lite',
                1239: 'Marijuana Dispensary,lite',
                1240: 'the Church,lite',
                1241: 'Synagogue,lite',
                1242: 'Frozen Yogurt Store,lite',
                1244: 'Baby Day Care,lite',
                1052: 'Car wash,lite',
                1053: 'Smoke shop,lite',
                1054: 'Yoga place,lite',
                1055: 'Laundromat,lite',
                1056: 'Baby clothes,lite',
                1057: 'Travel agency,lite',
                1058: 'Real Estate agent,lite'
            };
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

        _cleanName: function(i_fileName){
            var self = this;
            i_fileName = (i_fileName).toLowerCase();
            i_fileName = i_fileName.replace(/\.png/ig, '');
            i_fileName = i_fileName.replace(/[0-9]/ig, '');
            i_fileName = i_fileName.replace(/ /ig, '');
            i_fileName = i_fileName.replace(/_/ig, '');
            i_fileName = i_fileName.replace(/-/ig, '');
            i_fileName = i_fileName.replace(/|/ig, '');
            i_fileName = i_fileName.replace(/\|/ig, '');
            i_fileName = i_fileName.replace(/\\|/ig, '');
            i_fileName = i_fileName.replace(/%/ig, '');
            i_fileName = i_fileName.replace(/\%/ig, '');
            i_fileName = i_fileName.replace(/["'()]/g,"");
            return i_fileName;
        },

        _listenPreview: function () {
            var self = this;
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).off('click');
            $(Elements.CLASS_SAMPLE_PREVIEW, self.el).on('click', function () {

                if (self.m_oldMode){
                    // old url preview, will open in new browser full screen
                    var url = $(this).attr('name');
                    window.open(url, '_blank');
                    return;
                }

                var videoName = $(this).attr('data-video');
                videoName = self._cleanName(videoName);
                console.log(videoName);
                var businessID  = $(this).attr('data-templateBusinessId');
                console.log(videoName + ' ' + businessID);
                self.m_videoPlayer.pause();
                self._emptyVideos();
                self.m_videoIntro.find('video:nth-child(1)').append('<source src="https://www.digitalsignage.com/videos/samples/' + videoName + '.mp4" type="video/mp4"><source src="https://www.digitalsignage.com/videos/samples/' + videoName + '.webm" type="video/webm">');
                self.m_videoPlayer.load();
                self.m_videoIntro.width('768').height('432');
                $('#videoModal').modal('show');
                self.m_videoIntro.hide();
                self.m_videoPlayer.play();
                self.m_videoIntro.fadeIn(2000);
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

        _emptyVideos: function () {
            var self = this;
            self.m_videoIntro.find('video:nth-child(1)').find('source').remove();
        },

        /**
         Listen to stop video clicks
         @method _listenAutoPopup
         **/
        _listenStopVideo: function () {
            var self = this;
            var stopVideo = function () {
                self.m_videoPlayer.pause();
                self._emptyVideos();
                // self.m_videoPlayer.load();
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
                // console.log(data);
                for (var i in data['templates']) {
                    if (data['templates'][i].name.match('simple')) {
                        var newName = data['templates'][i].name.replace(/_simple/, '')
                        data['templates'][i].name = newName + ' (simple)'
                    } else if (data['templates'][i].name.match('touch')) {
                        var newName = data['templates'][i].name.replace(/_touch/, '')
                        data['templates'][i].name = newName + ' (touch)'
                    } else {
                        // data['templates'][i].name = data['templates'][i].name + ' (advanced mode)'
                        data['templates'][i].name = data['templates'][i].name;
                    }
                    var sample = data['templates'][i];
                    var sampleType = sample.lite;
                    if (accountType != sampleType)
                        continue;
                    var templateBusinessId = data['templates'][i].businessId;
                    var sampleItem = {
                        templateBusinessId: templateBusinessId,
                        name: data['templates'][i].name,
                        video: data['templates'][i].name,
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

            if (self.m_oldMode) {
                if (BB.APPS_SUPPORT != BB.CONSTS.OS_FLASH)
                    $(Elements.CLASS_SAMPLE_PREVIEW).hide();
            }

        }
    });

    return SampleCreator;

});
