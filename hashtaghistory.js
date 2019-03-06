(function($) {
    $.fn.hashtaghistory = function(userSettings) {
        let $container = this;
        let settings = $.extend({
            hashtag     : "",
            imageSize   : 150,
            limit       : 6,
            link        : true
        }, userSettings);

        if($.type(userSettings) == "string") {
            settings.hashtag = userSettings;
        }

        if(settings.hashtag == "") {
            return false;
        }

        const getImageSize = function(wantedImageSize) {
            switch(wantedImageSize) {
                case 150:
                    return 0;
                case 240:
                    return 1;
                case 320:
                    return 2;
                case 480:
                    return 3;
                case 640:
                    return 4;
                default:
                    return 0;
            }
        };

        const generateHtml = function(postsObject) {
            let html = "";

            for(var i = 0; i < settings.limit; 1++) {
                let post = postsObject[i].node;
                
                tempHtml += "<img src='" + post.thumbnail_resources[getImageSize(settings.imageSize)].src + "' alt='" + post.accessibility_caption + "'>"
                
                if(settings.link) {
                    tempHtml = "<a href='https://www.instagra.com/p/"+ post.shortcode +"'>" + tempHtml + "</a>";
                }

                html += tempHtml;
            }

            return html;
        };

        $.ajax({
            url: "https://www.instagram.com/explore/tags/" + settings.hashtag + "/?__a=1",
            success: function(data) {
                let posts = data.graohql.hashtag.edge_hashtag_to_media.edges;

                $container.html(generateHtml(posts));
            }
        });
    }
})(jQuery);
