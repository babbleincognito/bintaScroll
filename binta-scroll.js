
(function ($) {
    $.fn.bintaScroll = function (opt) {
        if (!opt)
            return $.fn.bintaScroll.registry[this];

        $.fn.bintaScroll.registry[this] = $.fn.bintaScroll;
        $.fn.bintaScroll.settings = $.extend($.fn.bintaScroll.defaults, opt);
        $.fn.bintaScroll.settings.container = this.target;
        $($.fn.bintaScroll.settings.sectionEl).each((i, e) => { $(e).attr("data-start-width", $(e).width()); });
        
        if ($.fn.bintaScroll.settings.horizontal) {
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
        e.currentTarget.scrollLeft -= (delta * 40);
        $.fn.bintaScroll.scaleOff();

        e.preventDefault();
    };
    $.fn.bintaScroll.scaleOff = function () {
        $($.fn.bintaScroll.settings.scaleOffEl).each((i, e) => {
            var $e = $(e);
            if (!$e.data('anchor'))
                return;
            var anchor = $($e.data('anchor')).position().left;
            var startWidth = $e.data("start-width");
            if (anchor < 0) {
                var scale = Math.max(0, 1 - (Math.abs(anchor) / startWidth));
                $($e.data('anchor')).width(Math.abs(anchor) / 2);
                $e.css("transform", "scaleX(" + scale + ")")
                    .css("margin-right", -1 * Math.min(Math.abs(anchor), startWidth) / 2 + "px");
            }
            else {
                $e.css("transform", "scaleX(1)")
                    .css("margin-right", 0);
                $($e.data('anchor')).width(0);
            }
        });
    }
}(jQuery));