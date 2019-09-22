
(function ($) {
    $.fn.bintaScroll = function (opt) {
        if (!opt)
            return $.fn.bintaScroll.registry[this];

        $.fn.bintaScroll.registry[this] = $.fn.bintaScroll;
        $.fn.bintaScroll.settings = $.extend($.fn.bintaScroll.defaults, opt);
        $.fn.bintaScroll.settings.container = this;
        $($.fn.bintaScroll.settings.sectionEl).each((i, e) => { $(e).attr("data-start-width", $(e).width()); });
        $($.fn.bintaScroll.settings.scaleOffEl).each((i, e) => { $(e).attr("data-start-width", $(e).width()); });
        
        if ($.fn.bintaScroll.settings.horizontal) {
            $($.fn.bintaScroll.settings.container).on('scroll', function() {
                $($.fn.bintaScroll.settings.scaleOffEl).each((i, e) => {
                    var $e = $(e);
                    if (!$e.data('anchor'))
                        return;
                    var anchor = $e.position().left;

                    if (anchor < 0) {
                        $e.addClass('trigger');                          
                    }
                    else {
                        $e.removeClass('trigger');  
                    }
                });
            });
            this.each((i, e) => {
                if (e.addEventListener) {
                    // IE9, Chrome, Safari, Opera
                    e.addEventListener("mousewheel", $.fn.bintaScroll.scrollHorizontally, false);
                    // Firefox
                    e.addEventListener("DOMMouseScroll", $.fn.bintaScroll.scrollHorizontally, false);
                    e.addEventListener("touchmove", $.fn.bintaScroll.scrollHorizontally, false);
                } else {
                    // IE 6/7/8
                    e.attachEvent("onmousewheel", $.fn.bintaScroll.scrollHorizontally);
                }
            });
        }
        return this;
    };
    $.fn.bintaScroll.defaults = {
        container: "body"
        , horizontal: false
        , sectionEl: ".binta-section"
        , scaleOffEl: ".binta-section.scale-off"
    };
    $.fn.bintaScroll.registry = {};
    $.fn.bintaScroll.settings = {
        container: "body"
        , horizontal: false
        , sectionEl: ".binta-section"
        , scaleOffEl: ".binta-section.scale-off"
    };
    $.fn.bintaScroll.scrollHorizontally = function (e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if(delta < 0)
            $(e.currentTarget)[0].scrollBy({top:0,left:50,behavior:'smooth'});
        else
            $(e.currentTarget)[0].scrollBy({top:0,left:-50,behavior:'smooth'});

        e.preventDefault();
    };
}(jQuery));