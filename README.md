# hashtagstory.js
This is a jQuery plugin to make it easy to get hashtags from instagram. No need of access tokens and other stuff, only thing needed is jQuery.

**Table of contents**
* [Getting startet](#getting-startet)
* [Options](#options)
* [License](#license)

## Getting startet
It is really simple to use the plugin all you need to to is include jQuery and the hashtaghistory.js file where you include your other scrips in the project.

```html
<script src="jquery.min.js"></script>
<script src="path/to/script/hashtaghistory.js"></script>
```

Then the only thing left is to call the plugin on the DOM element that should be the container, call it with a hashtag that you want the history from.

```javascript
$("#container").hashtaghistory("coding");
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
$("#container").hashtaghistory({
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

$("#container").hashtaghistory(options);
```

### Default options
Here is the full list of options and their default value.

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| get | string | "" | Define wath hashtag to get the images from. This is the only option that is required to make it work. If nothing is defined as the hashtag, the plugin will return false. |
| imageSize | int | 150 | Define what size you want the plugin to return the images in. Instagram provide images in the following sizes: `150`, `240`, `320`, `480`, `640`. If the you specify a size that isn't reconized it will return 150. |
| limit | int | 6 | Define how many images you want the plugin to return. The max limit is: `64` if limit is higher than 64 the plugin will only return 64. | 
| link | boolean | true | Define if you want the images to be wrapped in links to the post.

## License
This project is licensed under the MIT Liense - see the [LICENCE.md](LICENSE.md)