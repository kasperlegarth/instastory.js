(function($) {
    const constructUrlSettings = function(searchString) {
        let type = '';
        let keyword = '';
        let url = '';

        if(searchString.indexOf("@") > -1) {
            type = "user";
            keyword = searchString.substring(searchString.indexOf('@') + 1);
        } else if(searchString.indexOf("#") > -1) {
            type = "hashtag";
            keyword = searchString.substring(searchString.indexOf('#') + 1);
        } else {
            type = "hashtag";
            keyword = searchString;
        }

        if(type == "user") {
            url = "https://www.instagram.com/" + keyword + "/?__a=1"
        } else {
            url = "https://www.instagram.com/explore/tags/" + keyword + "/?__a=1";
        }

        return {
            url: url,
            type: type
        };
    }

    $.fn.instastory = function(userSettings) {
        let $container = this;
        let settings = $.extend({
            get         : "",
            type        : "",
            imageSize   : 150,
            limit       : 6,
            link        : true,
            template    : "",
            after       : function(){}
        }, userSettings);

        if(!$container.length) {
            console.group("Instastory.js log");
            console.warn("The DOM element you tried to initiate the plugin on, does not exist");
            console.log("For more info on how to use the plugin, please see: https://github.com/kasperlegarth/instastory.js");
            console.groupEnd();

            return false;
        }
        
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

        let urlSettings = constructUrlSettings(settings.get);
        settings.type = urlSettings.type;

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
                "{{caption}}": ((post.edge_media_to_caption.edges.length > 0) ? post.edge_media_to_caption.edges[0].node.text : ""),
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

        $.ajax({
            url: urlSettings.url,
        }).done(function(data) {
            $container.html(generateHtml(data.graphql[settings.type]));
            settings.after();
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

    $.instastory = function(keyword) {
        let urlSettings = constructUrlSettings(keyword);
        let result = '';

        $.ajax({
            url: urlSettings.url,
            async: false
        }).done(function(data) {
            result = data.graphql[urlSettings.type];
        }).fail(function(data) {
            switch(data.status) {
                case 404:
                    console.warn("The " + urlSettings.type + " do not exsists, please try another one");
                break;
                default:
                    console.warn('An unknow error happend');
                break;
            }
        });

        return result;
    }
})(jQuery);
