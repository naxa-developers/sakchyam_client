(function ($) {

    "use strict";

    // Sidebar only
    function sidebar_li(){
        //sidebar list
        $('.sidebar-li li').on('click', function (){
            if($(this).closest('li').next().hasClass('active')){
                $('.sidebar-li li').removeClass('active');
            }
            else{
                $('.sidebar-li li').removeClass('active');
            }
            $(this).closest('li').addClass('active');
        });

         //sidebar list nested
         $('.sidebar-sublist li').on('click', function (){
            if($(this).closest('li').next().hasClass('active-sublist')){
            $('.sidebar-sublist li').removeClass('active-sublist');
            }
            else{
                $('.sidebar-sublist li').removeClass('active-sublist');
            }
            $(this).closest('li').addClass('active-sublist');
        });
    }
    sidebar_li();

    // time period only
    function duration_toggle(){
        $('#duration_id').on('click', function (){
            $(this).find("#dropdown-list").addClass('active');
            $('.dropdown .span-label').addClass('span-active');
        });
      
        $(document).on("click", function(event){
            var $trigger = $(".dropdown");
            if($trigger !== event.target && !$trigger.has(event.target).length){
                $("#dropdown-list").removeClass('active');
                 $('.dropdown .span-label').removeClass('span-active');
            }            
        });
    }
    duration_toggle();

    function li_toggle(){
      $('.date-list li').on('click', function (){
        $(this).addClass('active').removeClass('span-inactive');
        $('.date-list li:last-child').removeClass('active');
      });
      $('li a.clear').on('click', function (e){
        $('li.active').removeClass('active').addClass('span-inactive');
        e.preventDefault();
      });
    }
    li_toggle();
  
    function dropdown_toggle(){
  
      $('#data_id').on('click', function (){
        $(this).find("#data-list").addClass('active');
        $('.data-wrap .span-label').addClass('span-active');
      });
  
      $(document).on("click", function(event){
          var $trigger1 = $(".data-wrap");
          if($trigger1 !== event.target && !$trigger1.has(event.target).length){
              $("#data-list").removeClass('active');
              $('.data-wrap .span-label').removeClass('span-active');
          }            
      });
  
      $('#data-list li').on('click', function(){
        if($(this).closest('li').next().hasClass('li-active')){
          $('#data-list li').removeClass('li-active');
        }else{
          $('#data-list li').removeClass('li-active');
        }
        $(this).closest('li').addClass('li-active');
      })
  
      $('.info-slider .download-icon-image').on('click', function(){
        $('.info-slider .download-dropdown').addClass('active');
      });
      $('.info-slider .download-dropdown li').on('click', function(){
        if($(this).closest('li').next().hasClass('list-active')){
          $('.info-slider .download-dropdown li').removeClass('list-active');
        }else{
          $('.info-slider .download-dropdown li').removeClass('list-active');
        }
        $(this).closest('li').addClass('list-active');
      });
      $(document).on("click", function(event){
        var $trigger2 = $(".info-slider");
        if($trigger2 !== event.target && !$trigger2.has(event.target).length){
            $(".info-slider .download-dropdown").removeClass('active');
        }            
      });
    }
    dropdown_toggle();

    function chart(){
      $('.chart-wrap .span-label').on('click', function(){
        $(this).toggleClass('span-inactive');
      });
      $('.chart-wrap .span-label').on('click', function(){
        if($(this).closest('li').next().hasClass('active')){
          $('.info-slider .download-dropdown li').removeClass('list-active');
        }else{
          $('.info-slider .download-dropdown li').removeClass('list-active');
        }
        $(this).closest('li').addClass('list-active');
      });
      $(document).on("click", function(event){
        var $chartscreen = $(".chart-wrap");
        if($chartscreen!== event.target && !$chartscreen.has(event.target).length){
            $(this).find('.span-label').removeClass('span-inactive');
        }            
      });
    }
    chart();

    function profile_dropdown(){
      $('.profile-img .log-out').on('click', function(){
        $('.dropdown_menu').addClass('active');
      })
      $(document).on("click", function(event){
        var $logout = $(".profile-img");
        if($logout!== event.target && !$logout.has(event.target).length){
            $(this).find('.dropdown_menu').removeClass('active');
        }            
      });
      $('.profile-img .dropdown_menu li').on('click', function(){
        if($(this).closest('li').next().hasClass('list-active')){
          $('.profile-img .dropdown_menu li').removeClass('list-active');
        }else{
          $('.profile-img .dropdown_menu li').removeClass('list-active');
        }
        $(this).closest('li').addClass('list-active');
      });

    }
    profile_dropdown()
 /*    function readmore(){
    //read more and less more
    var charLimit = 122;

    function truncate(element) {
      var content = element.children().first();
        if(content[0].innerHTML.trim().length>charLimit){
            content.removeClass('normHeight').addClass('modHeight');
        }else{
            content.removeClass('modHeight').addClass('normHeight');
        }
    }

    $("body").on("click",'a.link-more',function (e) {
        e.preventDefault();
        if ($('.info-content-footer p').hasClass('modHeight') ){
            $('.info-content-footer p').removeClass('modHeight').addClass('normHeight');
            $('a.link-more').addClass('less').removeClass('more');
        } else {
            $('.info-content-footer p').removeClass('normHeight').addClass('modHeight');
            $('a.link-more').addClass('more').removeClass('less');
        }
    });

    $(".info-content-footer").each(function () {
        truncate($(this));
    });
  }
  readmore(); */

  })(window.jQuery);
