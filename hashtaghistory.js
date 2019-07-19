(function($) {
    $.fn.hashtaghistory = function(userSettings) {
        let $container = this;
        let searchUrl = "";
        let settings = $.extend({
            get         : "",
            type        : "",
            imageSize   : 150,
            limit       : 6,
            link        : true
        }, userSettings);
        

        if(typeof userSettings == "string") {
            settings.get = userSettings;
        }

        if(settings.get == "") {
            console.group("Instastory.js log");
            console.warn("You failed to specify what you want");
            console.log("For more info on how to use the plugin, please see: https://github.com/kasperlegarth/hashtaghistory.js");
            console.groupEnd();

            return false;
        }

        determineType(settings.get);

        const determineType = function(searchString) {
            if(searchString.indexOf("@") > -1) {
                settings.type = "user";
                settings.get = searchString.substring(searchString.indexOf('@') + 1);
            } else if(searchString.indexOf("#") > -1) {
                settings.type = "hashtag";
                settings.get = searchString.substring(searchString.indexOf('#') + 1);
            } else {
                settings.type = "hashtag";
                settings.get = searchString;
            }
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

            console.log(postsObject);

            switch (settings.type) {
                case user:
                    
                    break;
            
                default:
                    break;
            }

            for(var i = 0; i < settings.limit; i++) {

                if(postsObject[i] !== undefined) {
                    let post = postsObject[i].node;
                
                    let tempHtml = "<img src='" + post.thumbnail_resources[getImageSize(settings.imageSize)].src + "' alt='" + post.accessibility_caption + "'>"
                    
                    if(settings.link) {
                        tempHtml = "<a href='https://www.instagram.com/p/"+ post.shortcode +"'>" + tempHtml + "</a>";
                    }

                    html += tempHtml;
                }   
            }

            return html;
        };

        if(settings.type == "user") {
            searchUrl = "https://www.instagram.com/" + settings.get + "/?__a=1"
        } else {
            searchUrl = "https://www.instagram.com/explore/tags/" + settings.get + "/?__a=1";
        }

        $.ajax({
            url: searchUrl,
            success: function(data) {
                let posts = data.graphql.hashtag.edge_hashtag_to_media.edges;

                $container.html(generateHtml(posts));
            }
        });
    }
})(jQuery);
