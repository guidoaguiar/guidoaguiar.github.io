# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Screenshot

![](./images\Screenshot.png)
![](./images\Screenshot-Mobile.png)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Google Fonts - Family: [Outfit](https://fonts.google.com/specimen/Outfit)

### What I learned

Here I learned how to start doing responsive pages, using percentage and relative size. I'm sure I can improve the code, but this was the first page that I built alone withou any course or tutorial.

I need to understand better how to use the media detector to improve websites, start to think what I'll need to add here before getting to this part so I don't need to change much on the base code.

int his challenge I added this to make it responsive when the screen widht is smaller then the QR Code block.

```css
@media (max-width:350px) { 
    .qrblock {
        width: 80vw;
    }
}
```

### Continued development

I'm still learning, so there is a lot I want to improve and learn, still haven't decided if I want to focus on back or front-end

### Useful resources

- [How to Center a Div Horizontally and Vertically](https://blog.hubspot.com/website/center-div-css#center-div-horizontally-vertically) - This helped me for centering the QR block on the screen. I really liked this pattern and will use it going forward.

```css
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```
## Author

- Website - [Guido](https://www.linkedin.com/in/guidoaguiar/?locale=en_US)
- Frontend Mentor - [@guidoaguiar](https://www.frontendmentor.io/profile/guidoaguiar)
- Twitter - [@guidoaguiar](https://www.twitter.com/guidoaguiar)