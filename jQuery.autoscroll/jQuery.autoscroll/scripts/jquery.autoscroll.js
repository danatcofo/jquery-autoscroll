/// <reference path="jquery-1.4.2-vsdoc.js"/>
/// <reference path="jquery.timers.js"/>
/*
@author Dan Gidman
released under GNU General Public License v3
http://www.gnu.org/licenses/gpl.html
version 1.0
*/
(function ($) {
    $.fn.autoscroll = function (settings) {
        /// <summary>Auto scroll scrollable elements.</summary>
        /// <param name="settings" type="object">
        ///     [optional]
        ///     1: action - [start]|stop|delay|fastfoward|rewind|update|pause|resume|reverse|toggle
        ///     2: step  -  unit defaults to 50  higher units means faster scroll, lower units means slower scroll
        ///     3: direction - up|[down]|left|right|(up|down)(left|right)
        ///     4: scroll - [true]|false
        ///     5: delay -  unit [5000] in milliseconds
        ///</param>
        var config = {
            action: "start",
            step: 50,
            direction: null,
            scroll: true,
            delay: 5000
        };
        $.extend(config, settings);
        switch (config.action) {
            case "pause": this.each(function () {
                var c = this.autoscroll;
                if (c && c.scroll) { c.scroll = false; }
            }); break;
            case "resume": this.each(function () {
                var c = this.autoscroll;
                if (c) { c.scroll = true; }
            }); break;
            case "toggle": this.each(function () {
                var c = this.autoscroll;
                if (c) { c.scroll = !c.scroll; }
            }); break;
            case "reverse": this.each(function () {
                var c = this.autoscroll;
                if (c) {
                    switch (c.direction) {
                        case "up": c.direction = "down"; break;
                        case "left": c.direction = "right"; break;
                        case "right": c.direction = "left"; break;
                        case "upleft": c.direction = "downright"; break;
                        case "upright": c.direction = "downleft"; break;
                        case "downleft": c.direction = "upright"; break;
                        case "downright": c.direction = "upleft"; break;
                        default: c.direction = "up"; break;
                    }
                }
            }); break;
            case "update": this.each(function () { if (this.autoscroll) { $.extend(this.autoscroll, config); } }); break;
            case "delay": this.each(function () {
                var c = this.autoscroll;
                if (c && c.scroll) {
                    c.scoll = false;
                    $(this).oneTime(config.delay, "autoscroll", function () {
                        c.scroll = true;
                    });
                }
            }); break;
            case "stop": this.each(function () {
                if (this.autoscroll) {
                    $(this).stop();
                    $.timer.remove(this, "autoscroll");
                    $(this).removeAttr("autoscroll");
                }
            }); break;
            case "rewind": case "fastforward": this.each(function () {
                var c = this.autoscroll;
                if (c) {
                    if (c.step > 0 && false) {
                        c.delayedStep = c.step;
                        c.step = 0;
                    }
                    switch (c.direction) {
                        case "up": $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step }, 1); break;
                        case "left": $(this).stop().animate({ scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, 1); break;
                        case "right": $(this).stop().animate({ scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, 1); break;
                        case "upleft": $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step, scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, 1); break;
                        case "upright": $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step, scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, 1); break;
                        case "downleft": $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step, scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, 1); break;
                        case "downright": $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step, scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, 1); break;
                        default: $(this).stop().animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step }, 1); break;
                    }
                }
            }); break;
            default: this.each(function () {
                if (this.autoscroll) return;
                else $.extend(this, { autoscroll: config });
                $(this).scroll(function () { $(this).stop(); });
                $(this).everyTime(100, "autoscroll", function () {
                    var c = this.autoscroll;
                    c.direction = c.direction || "down";
                    if (c && c.scroll) {
                        switch (c.direction) {
                            case "up": $(this).stop().animate({ scrollTop: "-=" + c.step }, 100); break;
                            case "left": $(this).stop().animate({ scrollLeft: "-=" + c.step }, 100); break;
                            case "right": $(this).stop().animate({ scrollLeft: "+=" + c.step }, 100); break;
                            case "upleft": $(this).stop().animate({ scrollTop: "-=" + c.step, scrollLeft: "-=" + c.step }, 100); break;
                            case "upright": $(this).stop().animate({ scrollTop: "-=" + c.step, scrollLeft: "+=" + c.step }, 100); break;
                            case "downleft": $(this).stop().animate({ scrollTop: "+=" + c.step, scrollLeft: "-=" + c.step }, 100); break;
                            case "downright": $(this).stop().animate({ scrollTop: "+=" + c.step, scrollLeft: "+=" + c.step }, 100); break;
                            default: $(this).stop().animate({ scrollTop: "+=" + c.step }, 100); break;
                        }
                    }
                });
            }); break;
        }
    };
})(jQuery);