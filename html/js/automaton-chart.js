$(document).ready(function(){
  function toggleSidebar (){
    $('.sidebar-right .sidebar-toggle').on('click',function(e){
      e.preventDefault();
      $(this).closest('.sidebar-right').toggleClass('active');
    })
  }
  toggleSidebar();
  
  function filterButton(){
    $('.filter-bar .filter-button').on('click',function(e){
      e.preventDefault();
      $(this).closest('.filter-bar').toggleClass('active');
    })
  }
  filterButton();
  
  function expandRightSidebar(){
    $('.right-sidebar .expand-button').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $('.automation-wrapper').toggleClass('expand-right-sidebar');
    });
    
  }
  expandRightSidebar();

  $('.right-sidebar-header a').on('click',function(e){
    e.preventDefault();
    $(this).closest('.automation-wrapper').addClass('active');
  });
  $('.table-card-header .top-header a').on('click',function(e){
    e.preventDefault();
    $(this).closest('.automation-wrapper').removeClass('active');
  });

  function expandLeftSidebar(){
    $('.left-sidebar .expand-button').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $('.automation-wrapper').toggleClass('expand-left-sidebar');
    });
    
  }
  expandLeftSidebar();
    function normalChart(){
        var options = {
            series: [{
            data: [400, 430, 448]
          }],
            chart: {
            type: 'bar',
            height: 150
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['CH', 'SK', 'K'
            ],
          },
          fill: {
            opacity: 1,
            colors: ['#E11D3F' ],
            
          },
          };
          
        
          var chart = new ApexCharts(document.querySelector("#normal-chart"), options);
          chart.render();
    }
    normalChart();
    
    function motivationPie(){
        var options = {
            series: [44, 55],
            chart: {
            width: 150,
            type: 'donut',
          },
          dataLabels: {
            enabled: false
          },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            show:false,
            position: 'right',
            offsetY: 0,
            height: 230,
          },
          fill: {
            opacity: 1,
            colors: ['#E11D3F','#489FA7' ],
            
          },
          };
  
          var chart = new ApexCharts(document.querySelector("#motivation-pie"), options);
          chart.render();
        
        }
        motivationPie();

        function areaChart(){
          var options = {
            series: [{
            name: 'series1',
            data: [ 42, 109, 100]
          }, {
            name: 'series2',
            data: [ 34, 52, 41]
          }],
            chart: {
            height: 300,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          fill: {
            opacity: 1,
            colors: ['#E11D3F','#489FA7' ],
            
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
          };
  
          var chart = new ApexCharts(document.querySelector("#area-chart"), options);
          chart.render();
        }
        areaChart();
    });