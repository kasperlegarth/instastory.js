(function($) {
    $.fn.hashtaghistory = function(userSettings) {
        let defaultSettings = $.extend({
            get         : "",
            imageSize   : 150,
            limit       : 6,
            link        : true
        }, userSettings);
    }
})(jQuery);