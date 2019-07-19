(function($) {
    $.fn.instastory = function(userSettings) {
        let $container = this;
        let searchUrl = "";
        let settings = $.extend({
            get         : "",
            type        : "",
            imageSize   : 150,
            limit       : 6,
            link        : true,
            template    : ""
        }, userSettings);
        
        if(typeof userSettings == "string") {
            settings.get = userSettings;
        }

        if(settings.get == "") {
            console.group("Instastory.js log");
            console.warn("You failed to specify what you want");
            console.log("For more info on how to use the plugin, please see: https://github.com/kasperlegarth/instastory.js");
            console.groupEnd();

            return false;
        }

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

        const determineUrl = function(searchType) {
            if(searchType == "user") {
                searchUrl = "https://www.instagram.com/" + settings.get + "/?__a=1"
            } else {
                searchUrl = "https://www.instagram.com/explore/tags/" + settings.get + "/?__a=1";
            }
        }

        const getImageSize = function(post) {
            const wantedImageSize = settings.imageSize;

            if(typeof wantedImageSize == "number") {
                switch(wantedImageSize) {
                    case 150:
                        return post.thumbnail_resources[0].src;
                    case 240:
                        return post.thumbnail_resources[1].src;
                    case 320:
                        return post.thumbnail_resources[2].src;
                    case 480:
                        return post.thumbnail_resources[3].src;
                    case 640:
                        return post.thumbnail_resources[4].src;
                    default:
                        return post.thumbnail_resources[0].src;
                }
            } else if(wantedImageSize == "raw") {
                return post.display_url;
            } else {
                return post.thumbnail_resources[0].src;
            }
            
        };

        const buildTemplate = function(post) {
            String.prototype.allReplace = function(obj) {
                let retStr = this;
                for (let x in obj) {
                    retStr = retStr.replace(new RegExp(x, "g"), obj[x]);
                }
                return retStr;
            };

            let templateCodes = {
                "{{accessibility_caption}}" : post.accessibility_caption,
                "{{caption}}": post.edge_media_to_caption.edges[0].node.text,
                "{{comments}}": post.edge_media_to_comment.count,
                "{{image}}": getImageSize(post),
                "{{likes}}": post.edge_liked_by.count,
                "{{link}}": "https://www.instagram.com/p/"+ post.shortcode,
            }

            let template = settings.template.allReplace(templateCodes);

            return template;
        }

        const generateHtml = function(ajaxResult) {
            let html = "";
            let postsObject = {};
            
            switch (settings.type) {
                case "user":
                    postsObject = ajaxResult.edge_owner_to_timeline_media;
                    break;
            
                default:
                    postsObject = ajaxResult.edge_hashtag_to_media;
                    break;
            }

            let posts = postsObject.edges;


            for(var i = 0; i < settings.limit; i++) {

                if(posts[i] !== undefined) {
                    let post = posts[i].node;
                    let tempHtml = "";

                    if(settings.template != "") {
                        tempHtml = buildTemplate(post);
                    } else {
                        tempHtml = "<img src='" + getImageSize(post) + "' alt='" + post.accessibility_caption + "'>"
                    
                        if(settings.link) {
                            tempHtml = "<a href='https://www.instagram.com/p/"+ post.shortcode +"'>" + tempHtml + "</a>";
                        }
                    }

                    html += tempHtml;
                }   
            }

            return html;
        };

        determineType(settings.get);
        determineUrl(settings.type);

        $.ajax({
            url: searchUrl,
            success: function(data) {
                $container.html(generateHtml(data.graphql[settings.type]));
            }
        }).fail(function(data) {
            switch(data.status) {
                case 404:
                    console.warn("The " + settings.type + " do not exsists, please try another one");
                break;
                default:
                    console.warn('An unknow error happend');
                break;
            }
        });
    }
})(jQuery);
