 $(document).ready(function() {

     "use strict";

     // init photoset-grid
     $('.photoset-grid-lightbox').photosetGrid({
         highresLinks: true,
         rel: $('.photoset-grid-lightbox').attr('data-id'),
         gutter: '2px',
         onComplete: function() {}
     });

     // init magnific popup
     $('.photoset-grid-lightbox, .photo-lightbox').each(function() {
         $(this).magnificPopup({
             delegate: 'a',
             type: 'image',
             removalDelay: 300,
             gallery: {
                 enabled: true
             }
         })
     });

     /* Main menu */
     $('.sidebar-toggle a').click(function(e) {
         e.preventDefault();
         $('body').toggleClass('slide');
     });
     $('.sidebar--toggle a, .close').click(function(e) {
         e.preventDefault();
         $('body').removeClass('slide');
     });

     /* Post share */
     $('.share > span').click(function() {
         var $this = $(this).parent();
         $('.share').not($this).removeClass("active");
         $this.toggleClass('active');
     });
     $(document).click(function(e) {
         var target = $(e.target);
         if (!target.parents().andSelf().is('.share, .share-area')) {
             $('.share').removeClass('active');
         }
     });
 });
 jQuery(window).load(function() {
     // init Masonry
     var $grid = $('.grid');
     $grid.masonry({
         percentPosition: true,
         itemSelector: '.grid-item',
         columnWidth: '.grid-item',
         guuter: 0
     });

     $grid.imagesLoaded(function() {
         $grid.addClass('loaded');
     });
 });
 // jQuery(document).ready(function() {
 //     var userFeed = new Instafeed({
 //         get: 'user',
 //         userId: 3294400766,
 //         limit: 6,
 //         accessToken: '3294400766.04040eb.354ed7d10a9f412ba1b68f1fc73da163'
 //     });
 //     userFeed.run();
 // });
 // ! function(s) {
 //     s.src = 'https://px.srvcs.tumblr.com/impixu?T=1474707061&J=eyJ0eXBlIjoidXJsIiwidXJsIjoiaHR0cDpcL1wvbWFyaXVzdGhlbWUudHVtYmxyLmNvbVwvIiwicmVxdHlwZSI6MCwicm91dGUiOiJcLyJ9&U=MHBOGNDKAP&K=af3e0236763fb8956339074d3460c8f0fdeeea0ba4cbc7e4f71680b01c0a58ad&R=http%3A%2F%2Fpreview.themeforest.net%2Fitem%2Fmarius-responsive-masonry-blog-tumblr-theme%2Ffull_screen_preview%2F15515079%3F_ga%3D1.17762233.10824699.1463459745'.replace(/&R=[^&$]*/, '').concat('&R=' + escape(document.referrer)).slice(0, 2000).replace(/%.?.?$/, '');
 // }(new Image());
 (function(w, d) {
     'use strict';
     var l = function(el, type, listener, useCapture) {
         el.addEventListener ?
             el.addEventListener(type, listener, !!useCapture) :
             el.attachEvent && el.attachEvent('on' + type, listener, !!useCapture);
     };
     var a = function() {
         if (d.getElementById('tumblr-cdx')) {
             return;
         }
         var s = d.createElement('script');
         var el = d.getElementsByTagName('script')[0];
         s.async = true;
         s.src = 'http://assets.tumblr.com/assets/scripts/vendor/cedexis/cedexis.radar.js?_v=10347cfdbf1a0b22785f026ebcb63e21';
         s.type = 'text/javascript';
         s.id = 'tumblr-cdx';
         d.body.appendChild(s);
     };
     l(w, 'load', a);
 }(window, document));
 // ! function(s) {
 //     s.src = 'https://px.srvcs.tumblr.com/impixu?T=1474707061&J=eyJ0eXBlIjoicG9zdCIsInVybCI6Imh0dHA6XC9cL21hcml1c3RoZW1lLnR1bWJsci5jb21cLyIsInJlcXR5cGUiOjAsInJvdXRlIjoiXC8iLCJwb3N0cyI6W3sicG9zdGlkIjoiMTQxMjYyMDQ0Nzk4IiwiYmxvZ2lkIjoiMjg0ODQ3NDMwIiwic291cmNlIjozM30seyJwb3N0aWQiOiIxNDEyNjE5ODg3MTMiLCJibG9naWQiOiIyODQ4NDc0MzAiLCJzb3VyY2UiOjMzfSx7InBvc3RpZCI6IjE0MTI2MTgwMDM3OCIsImJsb2dpZCI6IjI4NDg0NzQzMCIsInNvdXJjZSI6MzN9LHsicG9zdGlkIjoiMTQxMjYxNDg3MjczIiwiYmxvZ2lkIjoiMjg0ODQ3NDMwIiwic291cmNlIjozM30seyJwb3N0aWQiOiIxNDEyNjExNjcwNTgiLCJibG9naWQiOiIyODQ4NDc0MzAiLCJzb3VyY2UiOjMzfSx7InBvc3RpZCI6IjE0MTI1ODQzNDcxOCIsImJsb2dpZCI6IjI4NDg0NzQzMCIsInNvdXJjZSI6MzN9LHsicG9zdGlkIjoiMTQxNDA5NzkyNzI4IiwiYmxvZ2lkIjoiMjg0ODQ3NDMwIiwic291cmNlIjozM30seyJwb3N0aWQiOiIxNDEyNjE4NDM2MjMiLCJibG9naWQiOiIyODQ4NDc0MzAiLCJzb3VyY2UiOjMzfSx7InBvc3RpZCI6IjE0MTQxNzYyNTY2MyIsImJsb2dpZCI6IjI4NDg0NzQzMCIsInNvdXJjZSI6MzN9XX0=&U=HDAOBGELPL&K=ed6648bf85f7dc6f9acdff2ffdf9a0b2380c3ae6cfb5a25faaa2b85c005d4952&R=http%3A%2F%2Fpreview.themeforest.net%2Fitem%2Fmarius-responsive-masonry-blog-tumblr-theme%2Ffull_screen_preview%2F15515079%3F_ga%3D1.17762233.10824699.1463459745'.replace(/&R=[^&$]*/, '').concat('&R=' + escape(document.referrer)).slice(0, 2000).replace(/%.?.?$/, '');
 // }(new Image());