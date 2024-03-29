﻿/// <reference path="jquery-1.4.2.min.js"/>
/// <reference path="jquery.timers.js"/>
/*
@author Dan Gidman
released under GNU General Public License v3
http://www.gnu.org/licenses/gpl.html
version 1.0
requires jQuery.timers
http://plugins.jquery.com/project/timers
*/
(function ($) {
    $.fn.autoscroll = function (settings) {
        /// <summary>Auto scroll scrollable elements.</summary>
        /// <param name="settings" type="object">
        ///     [optional]
        ///     1: action - [start]|stop|delay|fastfoward|rewind|update|pause|resume|reverse|toggle
        ///     2: step  -  unit [50] in pixels - higher units means faster scroll, lower units means slower scroll
        ///     3: direction - up|[down]|left|right|(up|down)(left|right)
        ///     4: scroll - [true]|false
        ///     5: delay -  unit [5000] in milliseconds
        ///     6: speed -  slow|[fast]|unit in milliseconds - used with fastforward and rewind
        ///</param>
        var config = {
            step: 50,
            scroll: true,
            event: false
        };
        $.extend(config, settings);
        switch (config.action) {
            case "pause": this.each(function () {
                var c = this.$autoscroll;
                if (c && c.scroll) { c.scroll = false; }
            }); break;
            case "resume": this.each(function () {
                var c = this.$autoscroll;
                if (c) { c.scroll = true; }
            }); break;
            case "toggle": this.each(function () {
                var c = this.$autoscroll;
                if (c) { c.scroll = !c.scroll; }
            }); break;
            case "reverse": this.each(function () {
                var c = this.$autoscroll;
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
            case "update": this.each(function () { if (this.$autoscroll) { $.extend(this.$autoscroll, settings); } }); break;
            case "delay": this.each(function () {
                var c = this.$autoscroll;
                if (c && c.scroll) {
                    c.scoll = false;
                    $(this).oneTime(config.delay || 5000, "autoscroll", function () {
                        this.$autoscroll.scroll = true;
                    });
                }
            }); break;
            case "stop": this.each(function () {
                if (this.$autoscroll) { $(this).stop(true); $.timer.remove(this, "autoscroll"); $(this).removeAttr("$autoscroll"); }
            }); break;
            case "rewind": case "fastforward": this.each(function () {
                var c = this.$autoscroll;
                if (c) {
                    var scroll = c.scroll;
                    c.scroll = false;
                    var speed = config.speed || "fast";
                    switch (c.direction) {
                        case "up": $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "left": $(this).stop(true).animate({ scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "right": $(this).stop(true).animate({ scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "upleft": $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step, scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "upright": $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "+=" : "-=") + config.step, scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "downleft": $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step, scrollLeft: ((config.action == "rewind") ? "+=" : "-=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        case "downright": $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step, scrollLeft: ((config.action == "rewind") ? "-=" : "+=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                        default: $(this).stop(true).animate({ scrollTop: ((config.action == "rewind") ? "-=" : "+=") + config.step }, speed, function () { if (scroll) this.$autoscroll.scroll = true; }); break;
                    }
                }
            }); break;
            default: this.each(function () {
                if (this.$autoscroll) return;
                else $.extend(this, { $autoscroll: config });
                $(this).hover(function () {
                    var c = this.$autoscroll;
                    if (c && c.scroll) {
                        $(this).stop(true);
                        c.event = true;
                        c.scroll = false;
                    }
                }, function () {
                    var c = this.$autoscroll;
                    if (c && c.event) {
                        c.event = false;
                        c.scroll = true;
                    }
                });
                $(this).everyTime(50, "autoscroll", function () {
                    var c = this.$autoscroll;
                    if (c && c.scroll) {
                        switch (c.direction) {
                            case "up": $(this).stop(true).animate({ scrollTop: "-=" + c.step }, 100); break;
                            case "left": $(this).stop(true).animate({ scrollLeft: "-=" + c.step }, 100); break;
                            case "right": $(this).stop(true).animate({ scrollLeft: "+=" + c.step }, 100); break;
                            case "upleft": $(this).stop(true).animate({ scrollTop: "-=" + c.step, scrollLeft: "-=" + c.step }, 100); break;
                            case "upright": $(this).stop(true).animate({ scrollTop: "-=" + c.step, scrollLeft: "+=" + c.step }, 100); break;
                            case "downleft": $(this).stop(true).animate({ scrollTop: "+=" + c.step, scrollLeft: "-=" + c.step }, 100); break;
                            case "downright": $(this).stop(true).animate({ scrollTop: "+=" + c.step, scrollLeft: "+=" + c.step }, 100); break;
                            default: $(this).stop(true).animate({ scrollTop: "+=" + c.step }, 100); break;
                        }
                    }
                });
            }); break;
        }
    };
})(jQuery);