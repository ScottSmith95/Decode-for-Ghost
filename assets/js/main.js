$( document ).ready(function() {

    // For some reason moot not work correct when facebook enabled
    new Share(".shareButtons", {
        networks: {
            facebook: {
                enabled: false,
                load_sdk: false
            }
        }
    });

    $(".site-content, .site-main").fitVids();
});