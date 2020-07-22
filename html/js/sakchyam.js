
(function ($) {

  "use strict";

  function resize(){
    var y = screen.height;
    var x = $(window).innerHeight();
    //on resizing
    $(window).on('resize',function(){
        if(window.innerHeight == screen.height){
            $(".login-wrapper").css('height', y);
            // $(".page-100").css('height', y);
            console.log(y);
        }
        else{
            $(".login-wrapper").css('height', x);
            // $(".page-100").css('height', x);
            console.log(x);
        }
    });
  }
  resize();
 
 function toggle_content(){
   $('.toggle_button').on('click', function(e){
    
    $('.sidebar').toggleClass('ls-toggle-menu');
    $(this).toggleClass('active');
    e.preventDefault();
   });
 }
 toggle_content();

/*  function downlaod_dropdown(){
  $('.info-slider .download-icon-image'),on('click', function(e){
    $(this).toggleClass('active');
    e.preventDefault();
  });
 }
 downlaod_dropdown(); */

  var options = {
    series: [{
    name: 'Planned As per AFP contract Budget',
    type: 'column',
    data: [ 5, 15, 25,  35, 45, 55, 65, 75, 85, 95, 105, 125]
  },
  {
    name: 'Achieved',
    type: 'column',
    data: [5, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 250]
  },
  { 
    type: 'line',
    data: [ 5, 15, 25,  35, 45, 55, 65, 75, 85, 95, 105, 125]
  },
  { 
    name: 'Achieved',
    type: 'line',
    data:  [5, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 220]
  }],
    chart: {
      height: 445,
      type: 'line',
      stacked: false,
  },
/*   responsive: [{
  
    breakpoint: 992,
    options: {
      chart: {
        height: 320
      },
    }
}], */
  legend: {
    position: "top",
    horizontalAlign: "left",
  },

  stroke: {
    width: [1, 1, 1],
    curve: 'straight'
  },
  plotOptions: {
    bar: {
      columnWidth: '60%'
    },
   
  },
  colors:['#C2002F', '#007078'],
 
  labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
  '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
  ],
  markers: {
    size: 0
  },
  xaxis:{
      type: 'datetime'
    },
  yaxis: [
    {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        style: {
          colors: "#757575"
        }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
  
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render(); 

  var options = {
    chart: {
      height: 445,
      type: "line"
    },
    series: [
      {
        name: "Planned As per AFP contract Budget",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
      },
      {
        name: "Achieved",
        type: "column",
        data: [230, 420, 350, 270, 430, 220, 170, 310, 220, 220, 120, 160]
      },
      {
        name: "Planned As per AFP contract Budget",
        type: "area",
        data: [530, 620, 450, 370, 730, 420, 570, 210, 420, 220, 520, 660]
      }
    ],
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      },
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth'
    },
    stroke: {
      width: [1, 1, 1],
      curve: 'straight'
    },
    
  colors:['#C2002F', '#007078'],
  
  labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
  '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
  ],
    xaxis: {
      type: "datetime"
    },
    yaxis: [
      {
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        labels: {
          style: {
            colors: "#757575"
          }
        },
        title: {
          text: "Budget (£)"
        }
      }
    ],
  };
  
  var chart_one = new ApexCharts(document.querySelector("#chartone"), options);
  
  chart_one.render();
  
  function openModal() {
    $('.header-icons .zoom').on('click', function (e) {
      e.preventDefault();
      var targetId = $(this).attr('popup-link');
      $('#' + targetId).addClass('open');
    });
  }
  openModal();
  
  function closeModal() {
    $('.popup-footer .common-button, .close-icon').on('click', function (e) {
      e.preventDefault();
      $(this).closest('.popup').removeClass('open');
    });
  }
  closeModal();
  //Update Header Style and Scroll to Top
 function headerStyle() {
    if ($('.main-header').length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $('.main-header');
      var scrollLink = $('.scroll-top');
      if (windowpos >= 110) {
        siteHeader.addClass('fixed-header');
        scrollLink.addClass('open');
      } else {
        siteHeader.removeClass('fixed-header');
        scrollLink.removeClass('open');
      }
    }
  }
  headerStyle();

  function toggle_button() {
    $('.top-header .toggle-button').on('click', function () {
      $(this).toggleClass('active');
      $('body').toggleClass('Is-toggle');

    });
  }
  toggle_button();

  function smoothScroll(){
      $('.main-menu li a').on('click', function(e) {
          e.preventDefault()

          $('html, body').animate(
            {
              scrollTop: $($(this).attr('href')).offset().top,
            },
            900,
            'linear'
          )
        })
  }
  smoothScroll();

  //tooltip

  $('[data-toggle="tooltip"]').tooltip();
  
  function mainHeight() {
    var $header = $('.main-header');
    var $footer = $('.main-footer');
    var $content = $('.main');
    var $banner=$(window).height() - $header.height();
    var height = $(window).height() - $header.height() + $footer.height();
    // $('.banner, .banner-content').css('min-height', $banner);
    $content.css('min-height', height);
    $(window).on('resize', function () {
      $content.css('min-height', height);
      // $('.banner, .banner-content').css('min-height', $banner);
    }).trigger('resize'); //on page load
  }
  mainHeight();

  // $('.banner-slider').slick({
  //   dots: false,
  //   infinite: false,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // });
 $('.slider-container').slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
  });
  $('.testi-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $('.client-slider').slick({
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      }
    ]
  }); 

  // Scroll to a Specific Div
  if ($('.scroll-to-target').length) {
    $(".scroll-to-target").on('click', function () {
      var target = $(this).attr('data-target');
      // animate
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 1000);

    });
  }

  //===== Isotope Project 1
  function Isotope() {
    var $grid = $('.grid').isotope({
      // options
      transitionDuration: '1s'
    });
    $('.grid').isotope({ filter: '.cat-1' });

    // filter items on button click
    $('.portfolio-nav ul').on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });
    });

    //for menu active class
    $('.portfolio-nav ul li').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });
  }
  Isotope();

  $(window).on('scroll', function () {
    headerStyle();
  });
  $(window).on('load', function () {
    Isotope();
  });


})(window.jQuery);

