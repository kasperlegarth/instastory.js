var tags = ['div', 'a', 'button', 'article', 'section', 'strong', 'i', 'input', 'script'];
var attr = ['class', 'src', 'href'];

function highlight(string) {
    string = string.replace(new RegExp('<', 'g'), '&lt;');
    string = string.replace(/"(.+?)"/g, '<span data-type="val">"$1"</span>');

    for(var i = 0; i < tags.length; i++) {
        string = string.replace(new RegExp('&lt;' + tags[i], 'g'), '&lt;<span data-type="tag">'+ tags[i] +'</span>');
        string = string.replace(new RegExp('&lt;/' + tags[i], 'g'), '&lt;/<span data-type="tag">'+ tags[i] +'</span>');
    }

    for(var i = 0; i < attr.length; i++) {
        string = string.replace(new RegExp(attr[i], 'g'), '<span data-type="attr">'+ attr[i] +'</span>');
    }

    string = string.replace(/span>>(.*)&lt;/, 'span>><span data-type="plain">$1</span>&lt;');

    return string;
}

$(document).ready(function() {
    $('.highlight-me').each(function() {
        $(this).html(highlight($(this).html()));
    });

    $('#demo1').instastory('#coding');
    
    let playgroundOptions = {
        get: '@instagram',
        imageSize: 240,
        limit: 9,
        link: true,
        template: '<div class="post"><a href="{{link}}"><img src="{{image}}" alt="{{accessibility_caption}}"><span class="meta"><p>{{caption}}</p><span class="stats"><span class="likes"><i class="fas fa-heart"></i>{{likes}}</span><span class="comments"><i class="fas fa-comment"></i>{{comments}}</span></span></a></div>'
    };
    
    $('#playground-result').instastory(playgroundOptions);

    setTimeout(function() {
        $('#playground-result .post').each(function() {
            let currentCaption = $(this).find('.meta p').text();
            let newCaption = currentCaption;
    
            if(currentCaption.length > 350) {
                newCaption = currentCaption.substring(0, 347) + '...';
            }
    
            $(this).find('.meta p').text(newCaption);
        });
    }, 2000);
    

    $('#new-feed').click(function() {
        let newSource = $('#hashtag-input').val();
        let newLimit = $('#limit-input').val();

        if(newSource !== '') {
            playgroundOptions.get = newSource;
        }

        if(newLimit !== '') {
            playgroundOptions.limit = newLimit;
        }

        $('#playground-result').instastory(playgroundOptions);

        setTimeout(function() {
            $('#playground-result .post').each(function() {
                let currentCaption = $(this).find('.meta p').text();
                let newCaption = currentCaption;
        
                if(currentCaption.length > 390) {
                    newCaption = currentCaption.substring(0, 387) + '...';
                }
        
                $(this).find('.meta p').text(newCaption);
            });
        }, 2000);
    });
});
