(function ($) {

    "use strict";

   
 function topPayment() {
     $('.top-payment li a').on('click',function (e) {
         e.preventDefault();
         
         if($('.top-payment li').hasClass('active')){
            $('.top-payment li').removeClass('active');
         }
         $(this).closest('li').addClass('active');
     });

 }
 topPayment();

 function rtgs() {
    $('.top-payment li.red-light a').on('click',function (e) {
        e.preventDefault();
        $('.switch-connect-system, .rtgs-switch-line').addClass('active');
    });
 }
 rtgs();

 function nrb() {
    $('.top-payment li.blue-light a').on('click',function (e) {
        e.preventDefault();
        
        $('.retail-payement,.nrb-medium-line').addClass('active');
    });
 }
 nrb();

 function csd() {
    $('.top-payment li.green-light a').on('click',function (e) {
        e.preventDefault();
        
        $('.bottom-section-payment,.cs-capital-line').addClass('active');
    });
 }
 csd();

  })(window.jQuery);
