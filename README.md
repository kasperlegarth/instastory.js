# instastory.js
This is a jQuery plugin to make it easier for developers to implement instagram feeds on websites. There is no need for access tokens and stuff like that. Use good old Jquery.

**Table of contents**
* [Getting startet](#getting-startet)
* [Options](#options)
    * [Default options](#default-options)
    * [Templating](#templating)
* [License](#license)

## Getting startet
It is really simple to use the plugin all you need to to is include jQuery and the instastory.js file where you include your other scrips in the project.

```html
<script src="jquery.min.js"></script>
<script src="path/to/script/instastory.js"></script>
```

Then the only thing left is to call the plugin on the DOM element that should be the container, call it with a hashtag that you want the history from.

```javascript
$("#container").instastory("#coding");
```

As default the above line will give you the 6 most recent posts with the hashtag _"coding"_ and will output the following html into the container element:

```html
<a href="https://www.instagram.com/p/[POST URL]">
    <img src="[150x150 Image URL]" alt="[POST ACCESSIBILITY CAPTION]">
</a>
```

For more information about limit, image sizes etc. see [options](#options).


## Options
If you are not the happy with the default options you can overwite some of the options either when you call the plugin or make an object that you feed the call with.

**Directyly on plugin call.**
```javascript
$("#container").instastory({
    hashtag: "coding",
    limit: 9
});
```

**By using an object.**
```javascript
let options = {
    hashtag: "coding",
    limit: 9
};

$("#container").instastory(options);
```

### Default options
Here is the full list of options and their default value.

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| get | string | "" | Define wath hashtag to get the images from. This is the only option that is required to make it work. If nothing is defined as the hashtag, the plugin will return false. |
| imageSize | int\|string | 150 | Define what size you want the plugin to return the images in. Instagram provide images (thumbnails) in the following sizes: `150`, `240`, `320`, `480`, `640`. You can also get the raw image by defining `"raw"`as you image size. The raw image size have the original dimensions (not a sqaure) If the you specify a size that isn't reconized it will return 150. |
| limit | int | 6 | Define how many images you want the plugin to return. The max limit for an user feed is: `12` and the max limit for a hashtag feed is: `70` if limit is higher than descriped it will return the max limit | 
| link | boolean | true | Define if you want the images to be wrapped in links to the post. |
| template | string | "" | Define a custom template for the plugin to use when rendering the html for the feed. This is also create for custom styling. For more info see the [templating section](#templating) |

### Templating
When using the plugin you have the option to define a string of html to be used by the plugin when it is rendering your feed to the page. Simple example looks like this:
```javascript
options: {
    get: '#dog',
    template: '<img src="{{image}}" alt="{{caption}}">'
}
```

Here is a full list of tags to be used in the template:

| Tag | Description |
| --- | ----------- |
| {{accessibility_caption}} | Returns the accessibility caption of the image. Great for alt tags, but be aware this it is not always possible for instagram to figure this out and then it returns: `"No photo description available."` |
| {{caption}} | Returns the caption that the user uploaded with the image. |
| {{comments}} | Returns the comment count of the image. |
| {{image}} | Returns the image url in the desired image size. |
| {{likes}} | Returns the number of people that have liked the image. |
| {{link}} | Returns the url for the post (not the same as the image url) |

## License
This project is licensed under the MIT Liense - see the [LICENCE.md](LICENSE.md)