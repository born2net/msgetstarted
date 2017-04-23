var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '.'),
    entry: {
        bundle: ['babel-polyfill', './init.js', './App.js']
    },
    // amd: {
    //     jQuery: true
    // },
    devtool: "source-map",
    plugins: [
        new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', "window.jQuery": "jquery", 'jquery': 'jquery'}),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        new CompressionPlugin({asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$|\.css$|\.html$/, threshold: 10240, minRatio: 0.8}),
        new HTMLWebpackPlugin({
      template:'msgetstarted.html'
    }),
    ],
    output: {
        path: path.resolve(__dirname, '_dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        alias: {
            'text': 'raw-loader'
        }

    },
    resolve: {
        modules: [
            'node_modules', '.'
        ],
        alias: {

            'backbone': path.resolve(__dirname, '_common/_js/backbone/backbone.js'),
            'backbone.controller': path.resolve(__dirname, '_common/_js/backbone-controller/backbone.controller.js'),
            'backbone.stickit': path.resolve(__dirname, '_common/_js/backbone-stickit/backbone.stickit.js'),
            'bootstrap': path.resolve(__dirname, '_common/_js/bootstrap/js/bootstrap'),
            'Lib': path.resolve(__dirname, '_libs/Lib'),
            'bootbox': path.resolve(__dirname, '_common/_js/bootbox/bootbox'),
            'platform': path.resolve(__dirname, '_common/_js/platform/platform'),
            'video': path.resolve(__dirname, '_common/_js/video/video.dev'),
            'nouislider': path.resolve(__dirname, '_common/_js/nouislider/jquery.nouislider'),
            'placeholder': path.resolve(__dirname, '_common/_js/placeholder/placeholder'),
            'Cookie': path.resolve(__dirname, '_common/_js/cookie/jquery.cookie'),
            'Base64': path.resolve(__dirname, '_common/_js/base64/jquery.base64'),
            'validator': path.resolve(__dirname, '_common/_js/validator/validator'),
            'RC4': path.resolve(__dirname, '_common/_js/rc4/RC4'),
            'RC4V2': path.resolve(__dirname, '_common/_js/rc4/RC4V2'),
            'ComBroker': path.resolve(__dirname, '_controllers/ComBroker'),
            'XDate': path.resolve(__dirname, '_common/_js/xdate/xdate'),
            'simplestorage': path.resolve(__dirname, '_common/_js/simplestorage/simpleStorage'),
            'underscore': path.resolve(__dirname, '_common/_js/underscore/underscore'),
            'bootstrap': path.resolve('_common/_js/bootstrap/js/bootstrap'),
            'socketio': path.resolve(__dirname, '_common/_js/socketio/socketio'),
            'flashdetect': path.resolve(__dirname, '_common/_js/flashdetect/flashdetect'),
            'Elements': path.resolve(__dirname, 'Elements'),
            'localizer': path.resolve(__dirname, '_common/_js/localizer/dist/jquery.localize'),
            'LayoutRouter': path.resolve(__dirname, '_controllers/LayoutRouter'),
            'MailWasp': path.resolve(__dirname, '_controllers/MailWasp'),
            'EverNodes': path.resolve(__dirname, '_controllers/EverNodes'),
            'StackView': path.resolve(__dirname, '_views/StackView'),
            'AppAuth': path.resolve(__dirname, '_controllers/AppAuth'),
            'AppContentFaderView': path.resolve(__dirname, '_views/AppContentFaderView'),
            'AppSelectorView': path.resolve(__dirname, '_views/AppSelectorView'),
            'AppEntryFaderView': path.resolve(__dirname, '_views/AppEntryFaderView'),
            'PopModalView': path.resolve(__dirname, '_views/PopModalView'),
            'OrientationSelectorView': path.resolve(__dirname, '_views/_billing/OrientationSelectorView'),
            'LoginView': path.resolve(__dirname, '_views/LoginView'),
            'SignagePlayerView': path.resolve(__dirname, '_views/SignagePlayerView'),
            'NavigationView': path.resolve(__dirname, '_views/NavigationView'),
            'CreateAccView': path.resolve(__dirname, '_views/CreateAccView'),
            'DirectDownloadView': path.resolve(__dirname, '_views/DirectDownloadView'),
            'PortalView': path.resolve(__dirname, '_views/PortalView'),
            'BillingView': path.resolve(__dirname, '_views/BillingView'),
            'OrdersView': path.resolve(__dirname, '_views/OrdersView'),
            'RenameView': path.resolve(__dirname, '_views/RenameView'),
            'ChangePassView': path.resolve(__dirname, '_views/ChangePassView'),
            'ChangeBusinessView': path.resolve(__dirname, '_views/ChangeBusinessView'),
            'ForgetPassView': path.resolve(__dirname, '_views/ForgetPassView'),
            'StudioSelectView': path.resolve(__dirname, '_views/StudioSelectView'),
            'StudioListView': path.resolve(__dirname, '_views/StudioListView'),
            'SampleCreator': path.resolve(__dirname, '_views/SampleCreator'),
            'AccountView': path.resolve(__dirname, '_views/AccountView'),
            'WebDeskSelectView': path.resolve(__dirname, '_views/WebDeskSelectView'),
            'WebDeskSelectNoFlashView': path.resolve(__dirname, '_views/WebDeskSelectNoFlashView'),
            'WebDeskSelectNoFlashWinView': path.resolve(__dirname, '_views/WebDeskSelectNoFlashWinView'),
            'VerifyEmailView': path.resolve(__dirname, '_views/VerifyEmailView'),
            'WaitView': path.resolve(__dirname, '_views/WaitView'),
            'PropertiesView': path.resolve(__dirname, '_views/_billing/PropertiesView'),
            'LogoutView': path.resolve(__dirname, '_views/_billing/LogoutView'),
            'CampaignManagerView': path.resolve(__dirname, '_views/_billing/CampaignManagerView'),
            'CampaignSliderStackView': path.resolve(__dirname, '_views/_billing/CampaignSliderStackView'),
            'CampaignNameSelectorView': path.resolve(__dirname, '_views/_billing/CampaignNameSelectorView'),
            'CampaignSelectorView': path.resolve(__dirname, '_views/_billing/CampaignSelectorView'),
            'LanguageSelectorView': path.resolve(__dirname, '_views/LanguageSelectorView'),
            'NavigationViewEverNodes': path.resolve(__dirname, '_views/_billing/NavigationViewEverNodes'),
            'ResolutionSelectorView': path.resolve(__dirname, '_views/_billing/ResolutionSelectorView'),
            'ResourcesView': path.resolve(__dirname, '_views/_billing/ResourcesView'),
            'ProStudioView': path.resolve(__dirname, '_views/_billing/ProStudioView'),
            'ScreenLayoutSelectorView': path.resolve(__dirname, '_views/_billing/ScreenLayoutSelectorView'),
            'SettingsView': path.resolve(__dirname, '_views/_billing/SettingsView'),
            'StationsViewLoader': path.resolve(__dirname, '_views/_billing/StationsViewLoader'),
            'HelpView': path.resolve(__dirname, '_views/_billing/HelpView'),
            'CampaignManagerWaspView': path.resolve(__dirname, '_views/_orders/CampaignManagerWaspView'),
            'CampaignSliderStackWaspView': path.resolve(__dirname, '_views/_orders/CampaignSliderStackWaspView'),
            'CampaignNameSelectorWaspView': path.resolve(__dirname, '_views/_orders/CampaignNameSelectorWaspView'),
            'CampaignSelectorWaspView': path.resolve(__dirname, '_views/_orders/CampaignSelectorWaspView'),
            'OrientationSelectorWaspView': path.resolve(__dirname, '_views/_orders/OrientationSelectorWaspView'),
            'ResolutionSelectorWaspView': path.resolve(__dirname, '_views/_orders/ResolutionSelectorWaspView'),
            'NavigationWaspView': path.resolve(__dirname, '_views/_orders/NavigationWaspView'),
            'ResourcesWaspView': path.resolve(__dirname, '_views/_orders/ResourcesWaspView'),
            'ScreenLayoutSelectorWaspView': path.resolve(__dirname, '_views/_orders/ScreenLayoutSelectorWaspView'),
            'LogoutWaspView': path.resolve(__dirname, '_views/_orders/LogoutWaspView'),
            'BusinessModel': path.resolve(__dirname, '_models/BusinessModel'),
            'Pepper': path.resolve(__dirname, '_libs/Pepper')

        },
        extensions: ['.js']
    },

    module: {
        rules: [
            {

                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /ComBroker/,
                loader: 'imports-loader?this=>window,jquery,backbone,underscore'
            }, {
                test: /backbone/,
                use: ['expose-loader?Backbone', 'imports-loader?this=>window,underscore,jquery']
            }, {
                test: /underscore/,
                use: ['imports-loader?this=>window','expose-loader?_']
            }, {
                test: /Pepper/,
                use: ['imports-loader?this=>window,jquery,RC4V2', 'exports-loader?Pepper']
            }, {
                test: /jquery/,
                use: ['imports-loader?this=>window','expose-loader?$']
            }, {
                test: /Elements/,
                use: ['imports-loader?this=>window','exports-loader?Elements']
            }, {
                test: /backbone.controller/,
                loader: 'imports-loader?this=>window'
            },
             {
                test: /LayoutRouter/,
                use: ['imports-loader?this=>window,Elements,backbone.controller']
            }, {
                test: /bootstrap/,
                use: ['imports-loader?this=>window,jquery']
            }, {
                test: /placeholder/,
                use: ['imports-loader?this=>window','expose-loader?placeholder']
            }, {
                test: /RC4V2/,
                use: ['imports-loader?this=>window','expose-loader?RC4V2']
            }, {
                test: /Cookie/,
                use: ['imports-loader?this=>window,jquery,', 'expose-loader?cookie']
            },
        ]
    },

};
