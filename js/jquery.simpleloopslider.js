/*
  Name     : jQuery.simpleLoopSlider.js
  Required : jQuery.js
  Author   : Matori/ub-pnr (pnr.matori@gmail.com)
  Copyright: Unformed Building (http://unformedbuilding.com/)
  Lisence  : MIT (http://www.opensource.org/licenses/mit-license.php)
  Link     : http://unformedbuilding.com/articles/jquery-simple-loop-slider-js/
  Modified : 2011-03-10 (v0.1)
*/

(function ($) {

$.fn.simpleLoopSlider = function (options) {

  var defaults = {
    controller: true,
    pagination: true,
    autoSlide : true,
    interval  : 3000,
    duration  : 300,
    easing    : 'linear'
  };

  var o = $.extend(defaults, options);

  this.each(function () {

    var $slider     = $(this),
        $view       = $slider.children('.sls-view'),
        $container  = $view.children('.sls-container'),
        $contents   = $container.children().addClass('sls-content'),
        $firstChild = $contents.filter(':first-child'),
        $lastChild  = $contents.filter(':last-child');

    var size = {
      width : $view.width(),
      height: $view.height()
    };

    var count = {
      min    : 0,
      max    : $contents.length,
      current: 0
    };

    $container.css({
      width      :  size.width * ($contents.length + 2),
      marginLeft : -size.width,
      paddingLeft:  size.width
    });

    // slider
    var distance;

    var slide = {

          next: function (index) {
                  fnc.range(index, 'positive');
                  if(count.current < count.max - 1) {
                    fnc.scroll(distance);
                  } else {
                    $firstChild.css('left', size.width * $contents.length);
                    $container.stop(true, false)
                              .animate({left: -distance}, o.duration, o.easing,
                                function () {
                                  $firstChild.css('left', 0);
                                  $container.css('left', 0);
                                }
                              );
                    count.current = -1;
                  }
                  fnc.counter(index, 'increment');
                  fnc.pageNav(count.current);
                },

          prev: function (index) {
                  fnc.range(index, 'negative');
                  if(count.current > count.min) {
                    fnc.scroll(distance);
                  } else {
                    $lastChild.css('left', -(size.width * $contents.length));
                    $container.stop(true, false)
                              .animate({left: -distance}, o.duration, o.easing,
                                function () {
                                  $lastChild.css('left', '');
                                  $container.css('left', -(size.width * ($contents.length - 1)));
                                }
                              );
                    count.current = count.max;
                  }
                  fnc.counter(index, 'decrement');
                  fnc.pageNav(count.current);
                }

        };

    var fnc = {

          range  : function (n, d) {
                     if(n >= 0) {
                       distance = size.width * n;
                     } else {
                       var addNum;
                       if(d === 'negative') { addNum = -1; }
                       if(d === 'positive') { addNum = +1; }
                       distance = size.width * (count.current + addNum);
                     }
                   },

          scroll : function (d) {
                     $container.stop(true, false)
                               .animate({left: -d}, o.duration, o.easing);
                   },

          counter: function (n, c) {
                     if(n >= 0) {
                       count.current = n;
                     } else {
                       if(c === 'increment') { count.current++; }
                       if(c === 'decrement') { count.current--; }
                     }
                   },

          pageNav: function (n) {
                     if(!o.pagination) {
                       return;
                     } else {
                       $pagination.children('a').removeClass('current');
                       $pagination.children('a:eq(' + n + ')').addClass('current');
                     }
                   },

          pager  : function (d, e) {
                     e.preventDefault();
                     if(!$container.is(':animated')) {
                       if(o.autoSlide) { clearInterval(start); }
                       if(d === 'positive') {
                         slide.next();
                       } else if(d === 'negative') {
                         slide.prev();
                       }
                       if(o.autoSlide) { play(); }
                     }
                   }

        };


    // create pagination
    if(o.pagination) {
      var $pagination = $('<div/>').addClass('sls-pagination');
      $contents.each(function (i) {
        $('<a/>').attr('href', '#')
                 .text(i + 1)
                 .appendTo($pagination)
                 .click(function (e) {
                   e.preventDefault();
                   if(o.autoSlide) { clearInterval(start); }
                   if(i > count.current) {
                     slide.next(i);
                   } else if(i < count.current) {
                     slide.prev(i);
                   }
                   if(o.autoSlide) { play(); }
                 });
      });
      $pagination.appendTo($slider);
      $pagination.find('a:first-child').addClass('current');
    }

    // create next/prev controller
    if(o.controller) {
      $('<a/>').attr('href', '#')
               .addClass('sls-next sls-controller')
               .text('\u00BB')
               .appendTo($slider)
               .click(function (e) {
                 fnc.pager('positive', e);
               });
      $('<a/>').attr('href', '#')
               .addClass('sls-prev sls-controller')
               .text('\u00AB')
               .appendTo($slider)
               .click(function (e) {
                 fnc.pager('negative', e);
               });
    }


    // autoslide
    if(o.autoSlide) {

      var play, start;
      play = function () {
               start = setInterval(function () {
                         slide.next();
                       }, o.interval);
             };

      // hover event (stop)
      $contents.hover(
        function () {
          clearInterval(start);
        },
        function () {
          play();
        }
      );

      play();

    }

  });

  return this;

};

})(jQuery);