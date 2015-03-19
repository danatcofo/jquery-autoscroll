This project is no longer supported at this site.  Visit [aautoscroll](http://plugins.jquery.com/project/aautoscroll) at jquery.com for updated information.

Thanks.

This is a jQuery plugin that provides auto scroll capabilities to scrollable elements.

requires [jQuery Timers](http://plugins.jquery.com/project/timers)

```

$("#div").autoscroll();

$("#div").autoscroll({
  action: [start]|stop|delay|fastfoward|rewind|update|pause|resume|reverse|toggle
  step: unit [50] - higher means faster
  direction: up|[down]|left|right|(up|down)(left|right)
  scroll: [true]|false - used internally but allows you to set the 
                         autoscroll up and have it no autoscroll on init.
  delay: unit [5000] in milliseconds - used with delay action
  speed:  slow|[fast]|unit in milliseconds - used with fastforward and rewind actions
});

```

items with brackets " [ ] " around them indicate default values

Features:

  * Scroll any scrollable element up, down, left or right and even diagonal.
  * Automatically pauses scroll on mouse over.
  * Provides methods to fast forward, rewind, pause and reverse the scrolling.
  * Provides method to pause the scroll and resume after a specified delay

[Demonstration](http://jquery-autoscroll.googlecode.com/svn/trunk/jQuery.autoscroll/jQuery.autoscroll/Default.htm)