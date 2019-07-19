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

    $('#demo1').hashtaghistory('');
    
    let playgroundOptions = {
        hashtag: 'summer',
        imageSize: 240,
        limit: 9,
        link: true
    };
    
    $('#playground-result').hashtaghistory(playgroundOptions);

    $('#new-feed').click(function() {
        let newHashtag = $('#hashtag-input').val();
        let newLimit = $('#limit-input').val();

        if(newHashtag !== '') {
            playgroundOptions.hashtag = newHashtag;
        }

        if(newLimit !== '') {
            playgroundOptions.limit = newLimit;
        }

        $('#playground-result').hashtaghistory(playgroundOptions);
    });
});
