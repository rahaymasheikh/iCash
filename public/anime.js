// Modified from anime.js documentation on github: https://github.com/juliangarnier/anime - used for animation of titles.

anime({
    targets: 'div.heading',
    delay: 1000,
    translateY: [
        {value: 200, duration: 900},
        {value: 0, duration: 900}
    ],
    scale: '*=2.0',
    easing: 'easeOutExpo',
    duration: 5000,
});


anime({
    targets: '.login',
    delay: 600,
    rotate: {
        value: 360,
        duration: 1000,
        easing: 'easeInOutSine'
    }
});


anime({
    targets: '.register',
    delay: 600,
    rotate: {
        value: 360,
        duration: 1000,
        easing: 'easeInOutSine'
    }
});
