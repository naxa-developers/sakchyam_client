/* eslint-disable  */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import domtoimage from 'dom-to-image';

// import Canvas2Image, {
//   saveAsPNG,
// } from '../../../../../library/canvas2image';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import saveAlt from '../../../../../img/save_alt.svg';
import CustomChart from '../CustomChart';
import {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
  filterOuputIndicatorWithPercentOrNumber,
  filterPlanned2ndPieChart,
} from '../../../../actions/logFrame.actions';
import Modal from '../../../common/Modal';
import ModalChart from '../ModalChart';
import DonutChart from '../DonutChart';
import StackedBarWithProvince from '../TestChart';
// function convert(x) {
//   // eslint-disable-next-line no-restricted-globals
//   if (isNaN(x)) return x;

//   if (x < 9999) {
//     return x;
//   }

//   if (x < 1000000) {
//     return `${Math.round(x / 1000)}K`;
//   }
//   if (x < 10000000) {
//     return `${(x / 1000000).toFixed(2)}M`;
//   }

//   if (x < 1000000000) {
//     return `${Math.round(x / 1000000)}M`;
//   }

//   if (x < 1000000000000) {
//     return `${Math.round(x / 1000000000)}B`;
//   }

//   return '1T+';
// }
  // eslint-disable-next-line
  var Canvas2Image = function () {

	// check if support sth.
	var $support = function () {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		return {
			canvas: !!ctx,
			imageData: !!ctx.getImageData,
			dataURL: !!canvas.toDataURL,
			btoa: !!window.btoa
		};
	}();

	var downloadMime = 'image/octet-stream';

	function scaleCanvas (canvas, width, height) {
		var w = canvas.width,
			h = canvas.height;
		if (width == undefined) {
			width = w;
		}
		if (height == undefined) {
			height = h;
		}

		var retCanvas = document.createElement('canvas');
		var retCtx = retCanvas.getContext('2d');
		retCanvas.width = width;
		retCanvas.height = height;
		retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
		return retCanvas;
	}

	function getDataURL (canvas, type, width, height) {
		canvas = scaleCanvas(canvas, width, height);
		return canvas.toDataURL(type);
	}

	function saveFile (strData) {
		document.location.href = strData;
	}

	function genImage(strData) {
		var img = document.createElement('img');
		img.src = strData;
		return img;
	}
	function fixType (type) {
		type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		var r = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	}
	function encodeData (data) {
		if (!window.btoa) { throw 'btoa undefined' }
		var str = '';
		if (typeof data == 'string') {
			str = data;
		} else {
			for (var i = 0; i < data.length; i ++) {
				str += String.fromCharCode(data[i]);
			}
		}

		return btoa(str);
	}
	function getImageData (canvas) {
		var w = canvas.width,
			h = canvas.height;
		return canvas.getContext('2d').getImageData(0, 0, w, h);
	}
	function makeURI (strData, type) {
		return 'data:' + type + ';base64,' + strData;
	}


	/**
	 * create bitmap image
	 * 按照规则生成图片响应头和响应体
	 */
	var genBitmapImage = function (oData) {

		//
		// BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
		// BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
		//

		var biWidth  = oData.width;
		var biHeight	= oData.height;
		var biSizeImage = biWidth * biHeight * 3;
		var bfSize  = biSizeImage + 54; // total header size = 54 bytes

		//
		//  typedef struct tagBITMAPFILEHEADER {
		//  	WORD bfType;
		//  	DWORD bfSize;
		//  	WORD bfReserved1;
		//  	WORD bfReserved2;
		//  	DWORD bfOffBits;
		//  } BITMAPFILEHEADER;
		//
		var BITMAPFILEHEADER = [
			// WORD bfType -- The file type signature; must be "BM"
			0x42, 0x4D,
			// DWORD bfSize -- The size, in bytes, of the bitmap file
			bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
			// WORD bfReserved1 -- Reserved; must be zero
			0, 0,
			// WORD bfReserved2 -- Reserved; must be zero
			0, 0,
			// DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
			54, 0, 0, 0
		];

		//
		//  typedef struct tagBITMAPINFOHEADER {
		//  	DWORD biSize;
		//  	LONG  biWidth;
		//  	LONG  biHeight;
		//  	WORD  biPlanes;
		//  	WORD  biBitCount;
		//  	DWORD biCompression;
		//  	DWORD biSizeImage;
		//  	LONG  biXPelsPerMeter;
		//  	LONG  biYPelsPerMeter;
		//  	DWORD biClrUsed;
		//  	DWORD biClrImportant;
		//  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
		//
		var BITMAPINFOHEADER = [
			// DWORD biSize -- The number of bytes required by the structure
			40, 0, 0, 0,
			// LONG biWidth -- The width of the bitmap, in pixels
			biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
			// LONG biHeight -- The height of the bitmap, in pixels
			biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
			// WORD biPlanes -- The number of planes for the target device. This value must be set to 1
			1, 0,
			// WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
			// has a maximum of 2^24 colors (16777216, Truecolor)
			24, 0,
			// DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
			0, 0, 0, 0,
			// DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
			biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
			// LONG biXPelsPerMeter, unused
			0,0,0,0,
			// LONG biYPelsPerMeter, unused
			0,0,0,0,
			// DWORD biClrUsed, the number of color indexes of palette, unused
			0,0,0,0,
			// DWORD biClrImportant, unused
			0,0,0,0
		];

		var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

		var aImgData = oData.data;

		var strPixelData = '';
		var biWidth4 = biWidth<<2;
		var y = biHeight;
		var fromCharCode = String.fromCharCode;

		do {
			var iOffsetY = biWidth4*(y-1);
			var strPixelRow = '';
			for (var x = 0; x < biWidth; x++) {
				var iOffsetX = x<<2;
				strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX]);
			}

			for (var c = 0; c < iPadding; c++) {
				strPixelRow += String.fromCharCode(0);
			}

			strPixelData += strPixelRow;
		} while (--y);

		var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

		return strEncoded;
	};

	/**
	 * saveAsImage
	 * @param canvasElement
	 * @param {String} image type
	 * @param {Number} [optional] png width
	 * @param {Number} [optional] png height
	 */
	var saveAsImage = function (canvas, width, height, type) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);
			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				saveFile(makeURI(strData, downloadMime));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				saveFile(strData.replace(type, downloadMime));
			}
		}
	};

	var convertToImage = function (canvas, width, height, type) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);

			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				return genImage(makeURI(strData, 'image/bmp'));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				return genImage(strData);
			}
		}
	};



	return {
		saveAsImage: saveAsImage,
		saveAsPNG: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'png');
		},
		saveAsJPEG: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'jpeg');
		},
		saveAsGIF: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'gif');
		},
		saveAsBMP: function (canvas, width, height) {
			return saveAsImage(canvas, width, height, 'bmp');
		},

		convertToImage: convertToImage,
		convertToPNG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'png');
		},
		convertToJPEG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'jpeg');
		},
		convertToGIF: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'gif');
		},
		convertToBMP: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'bmp');
		}
	};

}();
function convert(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? `${Math.abs(Number(labelValue)) / 1.0e9}B`
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? `${Math.abs(Number(labelValue)) / 1.0e6}M`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? `${Math.abs(Number(labelValue)) / 1.0e3}K`
    : Math.abs(Number(labelValue));
}
class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // statsData: [],
      // dateRange: [],
      allIndicatorCategory: null,
      selectedOption: null,
      toggleTimePeriodDropdown: false,
      toggleDataDropdown: false,
      firstPlannedSelected: false,
      secondAchievedSelected: false,
      downloadActive: false,
      options: null,
      activeModal: false,
      secondPieChartFilter: 'Milestone Year 1',
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.plotChart();
    // window.addEventListener('resize', this.checkTooltip());

    // window.removeEventListener('resize', this.handleClickOnLegend);
  }

  plotChart = () => {
    // console.log('plotchart call');
    const currentComponent = this;
    const that = this;
    // console.log(that.state, 'state');
    const { activeLayer } = currentComponent.props;
    const option = {
      options: {
        chart: {
          parentHeightOffset: 15,
          // offsetY: -0,
          toolbar: {
            show: true,
            // offsetX: 0,
            // offsetY: 0,
            tools: {
              // download: `<a href="#/" class="download-icon-image"><img src=${DownloadIcon} alt=""></a>`,
              download: `<i class="fa fa-download" aria-hidden="true"></i>`,
              // download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
              //   // reset: true | '<img src="/static/icons/reset.png" width="20">',
              //   // customIcons: []
            },
            // autoSelected: 'zoom',
          },
          height: 445,
          // width: '100%',
          type: 'line',
          stacked: false,
          // events: {
          //   // eslint-disable-next-line object-shorthand
          //   legendClick: function(chartContext, seriesIndex, config) {
          //     // console.log('a');
          //     // console.log(
          //     //   currentComponent.state.activeBar1,
          //     //   'activeBar1',
          //     // );
          //     // console.log(seriesIndex, 'serieIndex');
          //     // if (seriesIndex === 0) {
          //     //   console.log('seriesIndex 0 Inside');
          //     // }
          //   },
          // },
          // events: {
          //   // eslint-disable-next-line object-shorthand
          //   legendClick: function(chartContext, seriesIndex, config) {
          //     console.log('legendClick');
          //   },
          //   // eslint-disable-next-line object-shorthand
          //   click: function(event, chartContext, config) {
          //     // ...
          //     // console.log('chart Click');
          //   },
          // },
        },
        // responsive: [
        //   {
        //     breakpoint: 992,
        //     options: {
        //       chart: {
        //         height: 320,
        //         events: {
        //           legendClick(chartContext, seriesIndex, config) {},
        //         },
        //       },
        //     },
        //   },
        // ],
        legend: {
          show: false,
          position: 'top',
          horizontalAlign: 'right',
          // markers: {
          //   onClick(chart, seriesIndex, opts) {
          //     console.log(`series- ${seriesIndex}'s marker was clicked`);
          //   },
          // },
          // onItemClick: e => {
          //   console.log(e, 'a');
          // },
        },
        stroke: {
          width: [0, 1, 6, 6],
          curve: 'straight',
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
          },
        },
        colors: ['#AC3238', '#2A7178'],
        fill: {
          opacity: [0.75, 0.75, 0, 0],
          // opacity: [0.65, 0.65, 0.15, 0.15],
          // opacity: [0.45, 0.75, 0.15, 0.2],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          '01/01/2003',
          '02/01/2003',
          '03/01/2003',
          '04/01/2003',
          '05/01/2003',
          '06/01/2003',
          '07/01/2003',
          '08/01/2003',
          '09/01/2003',
          '10/01/2003',
          '11/01/2003',
          '12/01/2003',
          '01/01/2004',
          '02/01/2004',
        ],
        markers: {
          size: 5,
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          title: {
            text: 'Milestone/year',
            style: {
              fontFamily: 'Avenir Heavy',
              fontSize: '20px',
              color: '#f37b2e',
            },
          },
          labels: {
            style: {
              cssClass: 'x-axislabel',
            },
            show: true,
            // formatter(value, timestamp, index) {
            //   const splitFormat = value.split('(');
            //   console.log(splitFormat[0], splitFormat[1]);
            //   // return [splitFormat[0], splitFormat[1]];
            // },
            // minHeight: 200,
          },
          tickAmount: 10,
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#ffffff',
              width: 0,
              dashArray: 0,
            },
          },
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
          ],
          type: 'category',
          tickPlacement: 'between',
        },
        yaxis: {
          // floating: true
          // decimalsInFloat: 2,
          tickPlacement: 'between',
          // y: 8200,
          // y: 1000,
          // crosshairs: {
          //   show: true,
          //   position: 'back',
          //   stroke: {
          //     color: '#b6b6b6',
          //     width: 1,
          //     dashArray: 0,
          //   },
          // },
          title: {
            // text: 'Points',
            text: undefined,

            style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
          // floating: true,
          // align: 'center',
          // minWidth: '200',
          maxWidth: '200',
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: value => {
              // if (value <= 1) {
              //   return value.toFixed(1);
              // }
              // console.log(value, 'v');
              // const roundNumber = Math.round(value);
              // console.log(convert(roundNumber));
              //   console.log(convert(roundNumber));
              console.log(activeLayer, 'activeLayer');
              if (activeLayer === 'Output Indicator 1.4') {
                return value;
              }

              return convert(value);
            },
          },
          min: 0,
          forceNiceScale: true,
          // axisBorder: {
          //   show: true,
          //   color: '#78909C',
          //   offsetX: 100,
          //   offsetY: 0,
          // },
          // max: 10,
        },
        logarithmic: true,
        title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#f37b2e',
            // style: {
            //   fontFamily: 'Avenir Heavy',
            //   fontSize: '20px',
            // },
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        noData: {
          text: 'No Data Selected',
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(y) {
              // console.log(y, 'y');
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} £`;
              }
              return y;
            },
          },
        },
      },
    };
    this.setState({ options: option.options });
    return true;
  };
  // filterDataWithDate = () => {
  //   // eslint-disable-next-line react/destructuring-assignment
  //   const { activeDate, activeLayer } = this.props;
  //   const {
  //     logFrameReducer: { logDataGraph },
  //   } = this.props;
  //   // const { statsData } = this.state;
  //   const filtered = [];
  //   // eslint-disable-next-line array-callback-return
  //   activeDate.map(date => {
  //     // eslint-disable-next-line array-callback-return
  //     logDataGraph.map(data => {
  //       if (
  //         data.year.range === date &&
  //         data.sub_category.name === activeLayer
  //       ) {
  //         filtered.push(data);
  //       }
  //     });
  //   });

  //   // const filtered = statsData.filter(result => {
  //   //   return result.year.range === JSON.stringify(d);
  //   // });
  //   const planned = filtered.map(el => {
  //     return el.planned_afp;
  //   });
  //   const achieved = filtered.map(el => {
  //     return el.achieved;
  //   });
  //   const label = filtered.map(el => {
  //     return el.year.name;
  //   });
  //   // const category = 'Test Year';
  //   const category = filtered.map(el => {
  //     return el.year.name;
  //   });

  //   const series = [
  //     {
  //       name: 'Planned As per AFP contract Budget Bar',
  //       type: 'column',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved ',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget ',
  //       type: 'line',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Line',
  //       type: 'line',
  //       data: achieved,
  //     },
  //   ];
  //   this.setState(prevState => ({
  //     series,
  //     options: {
  //       ...prevState.options,
  //       labels: label,
  //       xaxis: { ...prevState.options.xaxis, categories: category },
  //     },
  //   }));
  // };

  // filterDataWithLayer = () => {
  //   const { activeLayer } = this.props;
  //   const a = activeLayer;
  //   //   const that = this;
  //   //   fetch('https://sakchyam.naxa.com.np/api/v1/log_data_alt')
  //   //     .then(function(response) {
  //   //       if (response.status !== 200) {
  //   //         console.log(
  //   //           `Looks like there was a problem. Status Code: ${response.status}`,
  //   //         );
  //   //         return;
  //   //       }
  //   //       // Examine the text in the response
  //   //       response.json().then(function(data) {
  //   //         console.log(data, 'data');
  //   //         that.setState({ statsData: data }, () => {
  //   // const { statsData } = this.state;
  //   const {
  //     logFrameReducer: { logDataGraph },
  //   } = this.props;
  //   console.log(logDataGraph, 'logdata');
  //   const filtered = logDataGraph.filter(result => {
  //     //   if (result.category === 'IMPACT') {
  //     //   console.log(a);
  //     return result.sub_category.name === a;
  //     //   }
  //   });
  //   this.setState({ filteredDynamicData: filtered });
  //   // console.log(filtered, 'filtered');
  //   // const { dataType } = filtered[0];
  //   const dataType = filtered[0].data_type;
  //   const dataUnit = filtered[0].unit;

  //   const planned = filtered.map(el => {
  //     return el.planned_afp;
  //   });
  //   const achieved = filtered.map(el => {
  //     return el.achieved;
  //   });
  //   const label = filtered.map(el => {
  //     //   console.log(el, 'elLabel');
  //     return el.year.name;
  //   });
  //   const category = filtered.map(el => {
  //     //   console.log(el, 'elLabel');
  //     return el.year.name;
  //   });
  //   const totalDateList = filtered.map(el => {
  //     // console.log(el, 'elLabel');
  //     return el.year;
  //   });
  //   // console.log(category, 'cat');
  //   // console.log(label, 'label');
  //   // console.log(achieved, 'achieved');
  //   const series = [
  //     {
  //       name: 'Planned As per AFP contract Budget Bar',
  //       type: 'column',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved ',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget ',
  //       type: 'line',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Line',
  //       type: 'line',
  //       data: achieved,
  //     },
  //   ];
  //   // console.log(series, 'se');
  //   const { getDateRange } = this.props;
  //   getDateRange(totalDateList);
  //   this.setState(prevState => ({
  //     series,
  //     options: {
  //       ...prevState.options,
  //       labels: label,
  //       xaxis: { ...prevState.options.xaxis, categories: category },
  //       yaxis: {
  //         ...prevState.options.yaxis,
  //         title: {
  //           text: `${dataType}  (${dataUnit})`,
  //         },
  //       },
  //     },
  //   }));

  //   // this.setState({
  //   //   series,
  //   //   options: { ...this.state.options, labels: label },
  //   // });
  // };

  // handleClickOnLegend = () => {
  //   console.log('clicked');
  // };
  toggleDownloadDropdown = () => {
    this.setState(prevState => ({
      downloadActive: !prevState.downloadActive,
    }));
  };

  checkTooltip = () => {
    // console.log('checktooltip');
    // alert('ss');
    if (this.props.activeLine1 && this.props.activeBar1) {
      // alert('2selected activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[2]
          .classList.add('none');
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[6]
          .classList.add('none');
      }, 200);
    } else {
      // alert('else activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[2]
          .classList.remove('none');
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[6]
          .classList.remove('none');
      }, 200);
    }
    if (this.props.activeLine2 && this.props.activeBar2) {
      // alert('2selected activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[3]
          .classList.add('none');
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[7]
          .classList.add('none');
      }, 200);
    } else {
      // alert('else activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[3]
          .classList.remove('none');
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[7]
          .classList.remove('none');
      }, 200);
    }
  };

  changeChart = () => {
    this.checkTooltip();
    if (this.props.activeBar1) {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.remove('none');
      // }, 2000);
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[2]
      //     .classList.remove('none');
      // }, 2000);
      this.chartRef.chart.showSeries('Target');
      console.log(this.chartRef, 'modalRef');
      console.log(this.chartModalRef, 'modalRef');
      this.chartModalRef.chart.showSeries('Target');
    } else {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.add('none');
      // }, 2000);
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[2]
      //     .classList.remove('none');
      // }, 2000);
      this.chartRef.chart.hideSeries('Target');

      this.chartModalRef.chart.hideSeries('Target');
    }
    if (this.props.activeBar2) {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[2]
      //     .classList.remove('none');
      // }, 2000);
      this.chartRef.chart.showSeries('Achievement ');

      this.chartModalRef.chart.showSeries('Achievement ');
    } else {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[2]
      //     .classList.add('none');
      // }, 2000);
      this.chartRef.chart.hideSeries('Achievement ');

      this.chartModalRef.chart.hideSeries('Achievement ');
    }
    if (this.props.activeLine1) {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.remove('none');
      // }, 2000);
      this.chartRef.chart.showSeries('Target ');

      this.chartModalRef.chart.showSeries('Target ');
    } else {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.add('none');
      // }, 2000);
      this.chartRef.chart.hideSeries('Target ');

      this.chartModalRef.chart.hideSeries('Target ');
    }
    if (this.props.activeLine2) {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.remove('none');
      // }, 2000);
      this.chartRef.chart.showSeries('Achievement');

      this.chartModalRef.chart.showSeries('Achievement');
    } else {
      // setTimeout(() => {
      //   document
      //     .getElementsByClassName(
      //       'apexcharts-tooltip-series-group',
      //     )[1]
      //     .classList.add('none');
      // }, 2000);
      this.chartRef.chart.hideSeries('Achievement');

      this.chartModalRef.chart.hideSeries('Achievement');
    }
  };

  componentDidMount() {
    this.checkTooltip();
    window.addEventListener('resize', this.checkTooltip);
    // document
    //   .getElementsByClassName('exportPNG')[0]
    //   .addEventListener('click', this.downloadPng);

    // setTimeout(() => {
    //   const firstLegend = document.getElementsByClassName(
    //     'apexcharts-legend-series',
    //   )[0];
    //   // firstLegend.addEventListener('click', function() {
    //   //   alert('clicked First Legend');
    //   // });
    //   // const firstLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[0];
    //   // const secondLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[3];
    //   firstLegend.addEventListener('change', event => {
    //     console.log('clicked firstlegend');
    //     this.setState(prevState => ({
    //       firstPlannedSelected: !prevState.firstPlannedSelected,
    //     }));
    //   });
    // }, 2000);
    // setTimeout(() => {
    //   const secondLegend = document.getElementsByClassName(
    //     'apexcharts-legend-series',
    //   )[3];
    //   // firstLegend.addEventListener('click', function() {
    //   //   alert('clicked First Legend');
    //   // });
    //   // const firstLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[0];
    //   // const secondLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[3];
    //   secondLegend.addEventListener('change', event => {
    //     console.log('clicked secondlegend');
    //     this.setState(prevState => ({
    //       secondAchievedSelected: !prevState.secondAchievedSelected,
    //     }));
    //   });
    // }, 2000);
    const { activeLayer, activeDate } = this.props;
    this.props.getIndicatorsGraphData(activeLayer, false);

    const timeDropdownEl = document.getElementById('duration_id');
    const dataDropdownEl = document.getElementById('data_id');
    const downloadDropdown = document.getElementById(
      'downloadDropdown',
    );
    // console.log(specifiedElement, 'ss');
    document.addEventListener('click', async event => {
      const isClickInside = timeDropdownEl.contains(event.target);

      if (!isClickInside) {
        this.setState({
          toggleTimePeriodDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = downloadDropdown.contains(event.target);

      if (!isClickInside) {
        this.setState({
          downloadActive: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = dataDropdownEl.contains(event.target);

      if (!isClickInside) {
        this.setState({
          toggleDataDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    this.checkTooltip();
    // setTimeout(() => {
    //   console.log('s');
    //   this.props.handleOneTimeLayerChange();
    // }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkTooltip);
  }

  // eslint-disable-next-line camelcase

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.activeDate, 'prev');
    // console.log(this.props.activeDate, 'new');
    const {
      state: { options, secondPieChartFilter },
      props: { activeDate, activeLayer },
    } = this;
    if (prevState.secondPieChartFilter !== secondPieChartFilter) {
      this.props.filterPlanned2ndPieChart(secondPieChartFilter);
    }
    if (prevProps.activeDate !== activeDate) {
      // if (prevProps.activeLayer !== activeLayer) {
      //   if (activeLayer === 'Output Indicator 1.4') {
      //     document.getElementById('check_time4').checked = false;
      //     document.getElementById('check_time5').checked = false;
      //   }
      // }
      if (activeDate.length <= 3) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          options: {
            ...options,
            plotOptions: {
              ...options.plotOptions,
              bar: {
                columnWidth: '20%',
              },
            },
          },
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          options: {
            ...options,
            plotOptions: {
              ...options.plotOptions,
              bar: {
                columnWidth: '60%',
              },
            },
          },
        });
      }
    }
    // document
    //   .getElementsByClassName('exportPNG')[0]
    //   .addEventListener('click', this.downloadPng);
    if (
      prevProps.logFrameReducer.options !==
      this.props.logFrameReducer.options
    ) {
      // console.log(prevProps.logFrameReducer.options);
      // console.log(this.props.logFrameReducer.options);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        options: { ...this.props.logFrameReducer.options },
      });
    }
    if (
      prevProps.logFrameReducer.series !==
      this.props.logFrameReducer.series
    ) {
      // this.plotChart();
      this.changeChart();
    }
    // console.log(this.props.chartRef, 'chartref');
    if (
      prevProps.activeBar1 !== this.props.activeBar1 ||
      prevProps.activeBar2 !== this.props.activeBar2 ||
      prevProps.activeLine1 !== this.props.activeLine1 ||
      prevProps.activeLine2 !== this.props.activeLine2
    ) {
      // setTimeout(() => {
      this.changeChart();
    }
    const {
      props: {
        logFrameReducer: { filteredDynamicData },
      },
    } = this;
    // if (
    //   prevProps.logFrameReducer.filteredDynamicData &&
    //   prevProps.logFrameReducer.filteredDynamicData[0] &&
    //   prevProps.logFrameReducer.filteredDynamicData[0].sub_category
    //     .title !== filteredDynamicData &&
    //   filteredDynamicData[0] &&
    //   filteredDynamicData[0].sub_category.title
    // ) {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     activeBar: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //     activeTimeGraph: true,
    //   });
    // }
    if (
      prevProps.logFrameReducer.totalRangeDateName !==
      this.props.logFrameReducer.totalRangeDateName
    ) {
      // if (!this.state.activeBar && !this.state.activeTimeGraph) {
      //   // eslint-disable-next-line react/no-did-update-set-state
      //   this.setState({
      //     activeBar1: true,
      //     activeBar2: true,
      //     activeLine1: true,
      //     activeLine2: true,
      //   });
      // }
      this.props.selectAllDate();
    }

    // const that = this;
    // const { selectedDataType } = this.state;
    // const { activeLayer, activeDate } = this.props;
    // if (prevProps.activeLayer !== activeLayer) {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     activeBar: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //     activeTimeGraph: true,
    //   });
    //   // this.filterDataWithLayer();
    //   if (activeDate.length === 0) {
    //     // console.log('if active layer changed');
    //     this.props.filterIndicatorGraphData(activeLayer);
    //   } else {
    //     // console.log('else active layer changed');

    //     this.props.filterIndicatorGraphDataWithDate(
    //       activeLayer,
    //       activeDate,
    //     );
    //   }

    //   // console.log('xxxss');
    //   // setTimeout(function() {

    //   //   console.log('setTimeout');
    //   // }, 3000);
    // }
    // const { activeDataType } = this.props;
    // if (prevProps.activeDate !== activeDate) {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     activeBar: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //     activeTimeGraph: true,
    //   });
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //   });
    //   this.props.filterIndicatorGraphDataWithDate(
    //     activeLayer,
    //     activeDate,
    //   );
    // }
    // if (
    //   this.props.logFrameReducer.isDataFetched &&
    //   this.props.logFrameReducer.isDataFetched !==
    //     prevProps.logFrameReducer.isDataFetched
    // ) {
    //   this.props.handleOneTimeLayerChange();
    //   // selectActivelayer("activelayer1")
    // }

    // const firstLegend = document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[0];
    // const secondLegend = document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[3];
    // console.log(firstLegend, 'firsttt');
    // console.log(secondLegend, 'second');
    // firstLegend.addEventListener('click', async event => {
    //   console.log('clicked firstlegend');
    //   this.chartRef.chart.toggleSeries(
    //     'Planned As per AFP contract Budget Bar',
    //   );
    //   this.chartRef.chart.toggleSeries(
    //     'Planned As per AFP contract Budget ',
    //   );
    // });
    // secondLegend.addEventListener('click', async event => {
    //   console.log('clicked 2ndlegend');
    //   this.chartRef.chart.toggleSeries('Achieved ');
    //   this.chartRef.chart.toggleSeries('Achieved Line');
    // });
  }

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleToggleTimePeriodDropdown = () => {
    this.setState(prevState => ({
      toggleTimePeriodDropdown: !prevState.toggleTimePeriodDropdown,
    }));
  };

  handleToggleDataDropdown = () => {
    this.setState(prevState => ({
      toggleDataDropdown: !prevState.toggleDataDropdown,
    }));
  };

  changedElementCssBar = () => {
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[0]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[1]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[2]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[3]
      .classList.add('flex');
  };

  changedElementCssTime = () => {
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[0]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[1]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[2]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[3]
      .classList.add('flex');
  };

  handleChange = selectedOption => {
    // console.log('selectedOption', selectedOption);
    // this.setState({ selectedOption }, () =>
    //   // console.log(`Option selected:`, this.state.selectedOption),
    // );
  };
  downloadPngs = (chartid, imageTitle, selectedModal) => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
               '<foreignObject width="100%" height="100%">' +
               '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
                 '<em>I</em> like ' +
                 '<span style="color:white; text-shadow:0 0 2px blue;">' +
                 'cheese</span>' +
               '</div>' +
               '</foreignObject>' +
               '</svg>';
        
     data = encodeURIComponent(data);
     var img = new Image();

    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      console.log(canvas.toDataURL());
      // const pdfUrl = URL.createObjectURL(
      //   new Blob([canvas.toDataURL()], { type: 'application/pdf' })
      // );
      // const link = document.createElement('a');
      // link.href = pdfUrl;
      // link.target = '_blank';
      // document.body.appendChild(link);
      // link.click();
      // link.remove();

      canvas.toBlob(function(blob) {
        var newImg = document.createElement('img'),
        url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        link.remove();
        

        newImg.onload = function() {
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);
      };

      newImg.src = url;
      document.body.appendChild(newImg);
    });
    }

    img.src = "data:image/svg+xml," + data
    
  };
  downloadPng = (chartid, imageTitle, selectedModal) => {
    // document.querySelector('.info-header-bottom').style.display =
    //   'none';
    // document
    //   .querySelector('.download-dropdown')
    //   .classList.remove('active');
    document.querySelector('.info-header-bottom').style.display =
    'none';
    if(document.querySelector('.multiple-bar')){
      document.querySelector('.multiple-bar').style.display =
      'none';
    }
  document.querySelectorAll('.download-icon-image').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'none';
  });
  document
    .querySelector('.download-dropdown')
    .classList.remove('active');
    const popupEl=document.querySelector(chartid ? chartid :'.info-content-wrap');
    const useWidth = document.querySelector(chartid ? chartid :'.info-content-wrap').style.width;
    const useHeight = document.querySelector(chartid ? chartid :'.info-content-wrap').style.height;
    // const titleEl = document.createElement('h6');
    // popupEl.appendChild(titleEl).textContent = 'spaghetti';
    // titleEl.setAttribute('class', 'popup_title');
    setTimeout(() => {
      // document
      //   .querySelector(`.${chartid}`)
      //   .append(<label>Varun</label>);
      html2canvas(popupEl, {
        // logging: true,
        // letterRendering: 1,
        allowTaint: true,
        // scale: window.devicePixelRatio,
        // windowWidth: window.innerWidth+120,
        // windowHeight: window.innerHeight + 120,
        // x: 20,
        // y: 70,
        // width: useWidth,
        // height: useHeight,
        // width: window.innerWidth + 40,
        // height: window.innerHeight + 40,
        // foreignObjectRendering: true,
        // useCORS: true,
      }).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${imageTitle}.png`);
        });
        document.querySelector('.info-header-bottom').style.display =
          'block';
        document
          .querySelectorAll('.download-icon-image')
          .forEach(el => {
            // eslint-disable-next-line no-param-reassign
            el.style.display = 'block';
          });
      });
    }, 500);
  
    // this.setState({ downloadActive: false });
  };
  // downloadPng = (title) => {
  //   // console.log('test');
  //   const {
  //     props: {
  //       logFrameReducer: { filteredDynamicData },
  //     },
  //   } = this;
  //   document.querySelector('.info-header-bottom').style.display =
  //     'none';
  //     if(document.querySelector('.multiple-bar')){
  //       document.querySelector('.multiple-bar').style.display =
  //       'none';
  //     }
  //   document.querySelectorAll('.download-icon-image').forEach(el => {
  //     // eslint-disable-next-line no-param-reassign
  //     el.style.display = 'none';
  //   });
  //   document
  //     .querySelector('.download-dropdown')
  //     .classList.remove('active');
  //   setTimeout(() => {
  //     html2canvas(document.querySelector('.info-content-wrap'), {
  //       // logging: true,
  //       // letterRendering: 1,
  //       // allowTaint: true,
  //       // scale: window.devicePixelRatio,
  //       // windowWidth: window.innerWidth,
  //       // windowHeight: window.innerHeight + 120,
  //       // x: 270,
  //       // y: 70,
  //       // width: window.innerWidth + 40,
  //       // height: window.innerHeight + 40,
  //       // foreignObjectRendering: true,
  //       // useCORS: true,
  //     }).then(function(canvas) {
  //       console.log(canvas, 'canvas');
  //       // theCanvas = canvas;
  //       // document.body.appendChild(canvas);

  //       // Convert and download as image
  //       Canvas2Image.saveAsPNG(canvas);
  //       document.querySelector('.info-header-bottom').style.display =
  //         'block';
  //       document
  //         .querySelectorAll('.download-icon-image')
  //         .forEach(el => {
  //           // eslint-disable-next-line no-param-reassign
  //           el.style.display = 'block';
  //         });
  //         if(document.querySelector('.multiple-bar')){
  //           document.querySelector('.multiple-bar').style.display ='flex';
  //         }
  //       // document.body.append(canvas);
  //     });

  //     // Clean up
  //     // document.body.removeChild(canvas);
  //   }, 500);
  
  // }
  downloadPiePng = (imageTitle) => {
  //   document.querySelector('.info-header-bottom').style.display =
  //   'none';
  //   if(document.querySelector('.multiple-bar')){
  //     document.querySelector('.multiple-bar').style.display =
  //     'none';
  //   }
  // document.querySelectorAll('.download-icon-image').forEach(el => {
  //   // eslint-disable-next-line no-param-reassign
  //   el.style.display = 'none';
  // });
  // document
  //   .querySelector('.download-dropdown')
  //   .classList.remove('active');
    const popupEl=document.querySelector('.info-content-wrap');
    console.log(popupEl,'popupel');
  //   const useWidth = document.querySelector('.info-content-wrap').style.width;
  //   const useHeight = document.querySelector('.info-content-wrap').style.height;
    // const titleEl = document.createElement('h6');
    // popupEl.appendChild(titleEl).textContent = 'spaghetti';
    // titleEl.setAttribute('class', 'popup_title');
    setTimeout(() => {
      // document
      //   .querySelector(`.${chartid}`)
      //   .append(<label>Varun</label>);
      html2canvas(popupEl, {
        // logging: true,
        // letterRendering: 1,
        allowTaint: true,
        // scale: window.devicePixelRatio,
        // windowWidth: window.innerWidth+120,
        // windowHeight: window.innerHeight + 120,
        // x: 20,
        // y: 70,
        // width: useWidth,
        // height: useHeight,
        // width: window.innerWidth + 40,
        // height: window.innerHeight + 40,
        // foreignObjectRendering: true,
        // useCORS: true,
      }).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${imageTitle}.png`);
        });
        // document.querySelector('.info-header-bottom').style.display =
        //   'block';
        // document
        //   .querySelectorAll('.download-icon-image')
        //   .forEach(el => {
        //     // eslint-disable-next-line no-param-reassign
        //     el.style.display = 'block';
        //   });
      });
    }, 1000);
  };

  handle2ndPieFilter = e => {
    // console.log(e.target, 'e');
    this.setState({ secondPieChartFilter: e.target.value });
  };

  render() {
    const optionsd = [
      { label: 'Thing 1', value: 1 },
      { label: 'Thing 2', value: 2 },
    ];
    const {
      // series,
      options,
      toggleTimePeriodDropdown,
      toggleDataDropdown,
      // activeBar,
      // activeTimeGraph,
      firstPlannedSelected,
      secondAchievedSelected,
      allIndicatorCategory,
      selectedOption,
      selectedDataType,
      // activeBar1,
      // activeBar2,
      // activeLine1,
      // activeLine2,
      downloadActive,
      activeModal,
      secondPieChartFilter,
      // dateRange,
    } = this.state;
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   afterChange(i) {
    //     // console.log(i, 'aft');
    //     // console.log('after change');
    //   },
    //   beforeChange(j) {
    //     // console.log(j, 'bef');
    //     // console.log('before change');
    //   },
    // };
    const {
      activeLayer,
      activeDateValues,
      activeDate,
      handleActiveDate,
      updateChart,
      handleModal,
      activeDataType,
      handleSelectedDataType,
      activeBar,
      activeTimeGraph,
      activeBar1,
      activeBar2,
      activeLine1,
      activeLine2,
      // options,
      handleLegend1Click,
      handleLegend2Click,
      expandMore,
      output14firstState,
      setOutput14firstState
    } = this.props;
    const {
      props: {
        logFrameReducer: {
          series,
          dateRange,
          filteredDynamicData,
          isDataFetched,
          totalRangeDateName,
          indicatorCategory,
        },
      },
    } = this;
    // console.log(this.props, 'props');
    // console.log(activeBar, 'activeBar Props');
    // console.log(activeTimeGraph, 'activeTimeGraph Props');
    // console.log(active)
    return (
      <div className="info-content">
        {/* <canvas id="canvas" style={{border:"2px solid black", width:"200", height:"200"}}>
      </canvas> */}
        <Modal
          // visible={selectedModal === 'bar' ? true : false}
          headerTitle={
            filteredDynamicData &&
            filteredDynamicData[0] &&
            filteredDynamicData[0].sub_category.title
          }
          downloadFn={this.downloadPng}
          // handleShowBarOf={handleShowBarOf}
          // resetFilters={resetFilters}
          selectedModal="logframe"
          handleModal={this.handleModal}
          activeModal={activeModal}
          component={
            () => {
              // eslint-disable-next-line no-unused-expressions
              return (
                <>
                  <ModalChart
                    activeModal={activeModal}
                    activeDateValues={activeDateValues}
                    activeLayer={activeLayer}
                    activeDate={activeDate}
                    updateChart={updateChart}
                    series={series}
                    options={options}
                    chartModalRef={arg => {
                      this.chartModalRef = arg;
                    }}
                  />
                  {/* <CustomChart
                    activeModal={activeModal}
                    activeDateValues={activeDateValues}
                    activeLayer={activeLayer}
                    activeDate={activeDate}
                    updateChart={updateChart}
                    series={series}
                    options={options}
                    chartModalRef={arg => {
                      this.chartModalRef = arg;
                    }}
                  /> */}
                  {/* <StackedBarWithProvince /> */}
                  {/* <CustomChart
                    activeBar1={activeBar1}
                    activeLine1={activeLine1}
                    activeModal
                    activeDateValues={activeDateValues}
                    activeLayer={activeLayer}
                    activeDate={activeDate}
                    updateChart={updateChart}
                    series={series}
                    options={options}
                    // chartRef={arg => {
                    //   this.chartRef = arg;
                    // }}
                  /> */}
                </>
              );
            }
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />

        <a className="toggle_button">
          <i className="material-icons">keyboard_backspace</i>
        </a>

        <div className="info-content-wrap">
          <div className="info-content-header">
            {/* <h5>Logical framework</h5> */}
            <h3>
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].category.title}
            </h3>
            <div className="info-header-top">
              <h3 className="h3-red">
                {filteredDynamicData &&
                  filteredDynamicData[0] &&
                  filteredDynamicData[0].sub_category.title}
              </h3>
              {/* <span className="span_black_15">{activeLayer}</span> */}
            </div>
            {/* <CustomChart
              activeBar1={activeBar1}
              activeLine1={activeLine1}
              activeModal
              activeDateValues={activeDateValues}
              activeLayer={activeLayer}
              activeDate={activeDate}
              updateChart={updateChart}
              series={series}
              options={options}
            /> */}
            <div className="info-header-bottom">
              <div className="bottom-wrapper">
                <div className="duration-wrap">
                  <span className="span-option">Time period</span>
                  <div
                    className="dropdown"
                    id="duration_id"
                    role="button"
                    tabIndex="-1"
                    onClick={this.handleToggleTimePeriodDropdown}
                    onKeyDown={this.handleToggleTimePeriodDropdown}
                  >
                    <span
                      className={`span-label span-dropdown ${
                        toggleTimePeriodDropdown ? 'span-active' : ''
                      }`}
                    >
                      {activeDateValues.length === 0
                        ? 'Choose Time Period'
                        : activeDateValues.length >= 6
                        ? 'All'
                        : `${activeDateValues}`}
                    </span>
                    <ul
                      className={`ul-dropdown ${
                        toggleTimePeriodDropdown ? 'active' : ''
                      }`}
                      id="dropdown-list"
                    >
                      <li className="checkbox">
                        <input
                          type="checkbox"
                          checked={
                            activeDate.length >= 6 === true
                              ? true
                              : false
                          }
                          id="check_time"
                          onClick={e => {
                            handleActiveDate('All', e);
                          }}
                          onKeyDown={e => {
                            handleActiveDate('All', e);
                          }}
                        />
                        <label htmlFor="check_time">All</label>
                      </li>
                      {dateRange.map((d, key) => {
                        return (
                          <li key={d.id} className="checkbox">
                            <input
                              type="checkbox"
                              checked={
                                activeDate.includes(d.range) === true
                                  ? true
                                  : false
                              }
                              id={`check_time${key}`}
                              onClick={e => {
                                handleActiveDate(d.range, e, d.name);
                              }}
                              onKeyDown={e => {
                                handleActiveDate(d.range, e, d.name);
                              }}
                            />
                            <label htmlFor={`check_time${key}`}>
                              {d.name}
                            </label>
                          </li>
                        );
                      })}

                      {/* <li className="checkbox">
                        <input type="checkbox" id="check_time2" />
                        <label htmlFor="check_time2">
                          Milestone Year 2
                        </label>
                        Milestone Year 2
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time3" />
                        <label htmlFor="check_time3">
                          Milestone Year 3
                        </label>
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time4" />
                        <label htmlFor="check_time4">
                          Milestone Year 4
                        </label>
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time5" />
                        <label htmlFor="check_time5">
                          Milestone Year 5
                        </label>
                        Milestone Year 5
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time6" />
                        <label htmlFor="check_time6">
                          Milestone Year 6
                        </label>
                        Milestone Year 6
                      </li> */}
                    </ul>
                    {/* <select>
                      {dateRange.map((d, key) => {
                        return (
                          <option value={d.name}>{d.name}</option>
                        );
                      })}
                    </select> */}
                    {/* <ReactMultiSelectCheckboxes
                      // value={selectedOption}
                      // onChange={this.handleChange}
                      options={optionsd}
                    /> */}
                  </div>
                </div>
                <div className="option-wrap">
                  <div className="data">
                    <span className="span-option">Data</span>
                    <div
                      role="button"
                      tabIndex="-1"
                      onClick={this.handleToggleDataDropdown}
                      onKeyDown={this.handleToggleDataDropdown}
                      className="data-wrap"
                      id="data_id"
                    >
                      <span
                        className={`span-label span-dropdown ${
                          toggleDataDropdown ? 'span-active' : ''
                        }`}
                      >
                        {activeDataType}
                      </span>
                      <ul
                        className={`ul-dropdown ${
                          toggleDataDropdown ? 'active' : ''
                        }`}
                        id="data-list"
                      >
                        <li
                          className={
                            activeDataType === 'Cumulative'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
                          onClick={() => {
                            handleSelectedDataType('Cumulative');
                          }}
                          onKeyDown={() => {
                            handleSelectedDataType('Cumulative');
                          }}
                        >
                          Cumulative
                        </li>
                        <li
                          // className={
                          //   {activeDataType === 'Individual'
                          //     ? 'li-active'
                          //     : ''}
                          //     activeLayer === 'Output Indicator 2.1' ? 'disabled':''
                          // }
                          className={`${
                            activeDataType === 'Individual'
                              ? 'li-active'
                              : ''
                          } ${
                            activeLayer === 'Output Indicator 2.1'
                              ? 'disabled'
                              : ''
                          }`}
                          role="tab"
                          // style={activeLayer === 'Output Indicator 2.1'? ''}}
                          onClick={() => {
                            handleSelectedDataType('Individual');
                          }}
                          onKeyDown={() => {
                            handleSelectedDataType('Individual');
                          }}
                        >
                          Individual
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="chart">
                    <span className="span-option">Chart</span>
                    <div className="chart-wrap">
                      <span
                        className={`span-label ${
                          activeBar ? 'active' : 'span-inactive'
                        }`}
                        role="button"
                        tabIndex="-1"
                        onKeyDown={this.props.handleBarClick}
                        onClick={this.props.handleBarClick}
                      >
                        Bar
                      </span>
                      <span
                        className={`span-label ${
                          activeTimeGraph ? 'active' : 'span-inactive'
                        }`}
                        role="button"
                        tabIndex="-1"
                        onKeyDown={this.props.handleTimeGraphClick}
                        onClick={this.props.handleTimeGraphClick}
                      >
                        Line graph
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-wrap">
            <span
              className={`span-label ${
                activeBar1 ? '' : activeLine1 ? '' : 'span-inactive'
              }`}
              role="button"
              tabIndex="-1"
              onKeyDown={this.props.handleLegend1Click}
              onClick={this.props.handleLegend1Click}
            >
              Target
            </span>
            <span
              className={`span-label ${
                activeBar2 ? '' : activeLine2 ? '' : 'span-inactive'
              }`}
              role="button"
              tabIndex="-1"
              onKeyDown={this.props.handleLegend2Click}
              onClick={this.props.handleLegend2Click}
            >
              Achievement
            </span>
          </div>
          {activeLayer === 'Output Indicator 1.4' && (
            <div
              className="multiple-bar"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <button
                onClick={() => {
                  setOutput14firstState();
                  this.props.filterOuputIndicatorWithPercentOrNumber(
                    activeLayer,
                    activeDate,
                    'percent',
                  );
                }}
                type="button"
                className="first-btn common-button is-border"
              >
                Milestone Year 15-18 Percent
              </button>
              <button
                onClick={() => {
                  setOutput14firstState();
                  this.props.filterOuputIndicatorWithPercentOrNumber(
                    activeLayer,
                    activeDate,
                    'number',
                  );
                }}
                type="button"
                className="second-btn common-button is-border"
              >
                Milestone Year 19-so on Number
              </button>
            </div>
          )}
          <div className="info-slider">
            <a
              role="tab"
              tabIndex="0"
              id="downloadDropdown"
              className="download-icon-image"
              // onClick={this.downloadPng}
              onClick={this.toggleDownloadDropdown}
              onKeyPress={this.toggleDownloadDropdown}
              style={{ right: '37px' }}
            >
              {/* <label>Download</label> */}
              <img src={saveAlt} alt="" />
              {/* <i className="fa fa-download" aria-hidden="true" /> */}
            </a>
            <a
              role="tab"
              tabIndex="0"
              // id="downloadDropdown"
              className="download-icon-image"
              onClick={this.handleModal}
              onKeyPress={this.handleModal}
              // onClick={this.toggleDownloadDropdown}
              // onKeyPress={this.toggleDownloadDropdown}
            >
              <img src={ExpandIcon} alt="open" />
            </a>

            {/* <a
              href="#/"
              className={`download-icon-image ${downloadActive}`}
              onClick={this.toggleDownloadDropdown}
            >
              <img src="../../save_alts.svg" alt="" />
            </a> */}

            <ul
              className={`download-dropdown ${
                downloadActive ? 'active' : ''
              }`}
            >
              <li>
                <a
                  onClick={()=>{this.downloadPng('.info-content-wrap',filteredDynamicData &&
                    filteredDynamicData[0] &&
                    filteredDynamicData[0].category.title)}}
                  onKeyPress={()=>{this.downloadPng('.info-content-wrap',filteredDynamicData &&
                    filteredDynamicData[0] &&
                    filteredDynamicData[0].category.title)}}
                  role="button"
                  tabIndex="0"
                >
                  Download .PNG
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    document
                      .getElementsByClassName('exportCSV')[0]
                      .click();
                  }}
                  onKeyPress={() => {
                    document
                      .getElementsByClassName('exportCSV')[0]
                      .click();
                  }}
                  role="button"
                  tabIndex="0"
                >
                  Download .CSV
                </a>
              </li>
            </ul>
            <div className="slider-container">
              {/* <div id="chart" /> */}
              {/* <Slider {...settings}> */}
              <button
                onClick={this.props.prevBtnClick}
                type="button"
                data-role="none"
                className="slick-arrow slick-prev"
                // style="display: block;"
              >
                {' '}
                Previous
              </button>
              <CustomChart
                activeModal={activeModal}
                activeDateValues={activeDateValues}
                activeLayer={activeLayer}
                activeDate={activeDate}
                updateChart={updateChart}
                series={series}
                options={options}
                chartRef={arg => {
                  this.chartRef = arg;
                }}
              />
              {/* <CustomChart
                activeModal={activeModal}
                activeDateValues={activeDateValues}
                activeLayer={activeLayer}
                activeDate={activeDate}
                updateChart={updateChart}
                series={series}
                options={options}
                chartRef={arg => {
                  this.chartRef = arg;
                }}
              /> */}
              {activeLayer === 'Outcome Indicator 4' && (
                <>
                <div className="card">
                  {/* <div className="card-header"></div> */}
                  <div className="card-body">
                  <div className="row">
                  {/* <a
                    role="tab"
                    tabIndex="0"
                    id="downloadDropdown"
                    className="download-icon-image"
                    // onClick={this.downloadPng}
                    onClick={this.downloadPng}
                    onKeyPress={this.downloadPng}
                    style={{ right: '37px' }}
                  >
                    <img src={saveAlt} alt="" />
                  </a> */}
                    <div className="col-lg-6" >
                    <label>Planned</label>
                      <DonutChart reducerDataProps="planned1stPieData" />
                    </div>
                    <div className="col-lg-6">
                    <label>Achieved</label>
                      <DonutChart reducerDataProps="achieved1stPieData" />
                    </div>
                  </div>
                  </div>
                  </div>
                  <div className="card mt-5">
                  <div className="card-header" style={{display:'flex'}}>
                  <select
                  
                      style={{
                        height: '32px',
                        width: '140px',
                      }}
                      onChange={this.handle2ndPieFilter}
                      value={secondPieChartFilter}
                    >
                      {totalRangeDateName.map(data => {
                        return <option value={data}>{data}</option>;
                      })}
                    </select>
                    <h5 style={{marginLeft:"20px"}}>Ratio of men and women getting new access to financial Services</h5>
                    {/* <a
                      role="tab"
                      tabIndex="0"
                      id="downloadDropdown"
                      className="download-icon-image"
                      // onClick={this.downloadPng}
                      onClick={()=>{this.downloadPng('.secondpie','Ratio of men and women getting new access to financial Services')}}
                      onKeyPress={()=>{this.downloadPng('.secondpie','Ratio of men and women getting new access to financial Services')}}
                      style={{ right: '37px' }}
                    >
                      <img src={saveAlt} alt="" />
                    </a> */}
                  </div>
                  <div className="card-body">
                      
                  <div className="row secondpie">
                    <div className="col-lg-6">
                      <DonutChart reducerDataProps="planned2ndPieData" />
                    </div>
                    <div className="col-lg-6">
                      <DonutChart reducerDataProps="achieved2ndPieData" />
                    </div>
                  </div>
                  </div>
                  </div>
                </>
              )}

              <button
                onClick={this.props.nextBtnClick}
                type="button"
                data-role="none"
                className="slick-arrow slick-next"
                // style="display: block;"
              >
                {' '}
                Next
              </button>
              {/* <CustomChart
                  activeLayer={activeLayer}
                  activeDate={activeDate}
                  updateChart={updateChart}
                  series={series}
                  options={options}
                  chartRef={arg => {
                    this.chartRef2 = arg;
                  }}
                /> */}
              {/* </Slider> */}
              <div id="chartone" />
              <div
                id="center_loader"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
              >
                <label
                  style={{
                    display:
                      activeDateValues.length === 0
                        ? 'block'
                        : activeBar1 === false &&
                          activeBar2 === false &&
                          activeLine1 === false &&
                          activeLine2 === false
                        ? 'block'
                        : 'none',
                    marginLeft: '15px',
                  }}
                >
                  {/* No Data Selected */}
                </label>
              </div>
              <div
                id="center_loader"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
              >
                <Loader
                  type="Audio"
                  color="#c21c2e"
                  height={100}
                  width={100}
                  visible={!isDataFetched}
                />
                <label
                  style={{
                    display: isDataFetched ? 'none' : 'block',
                    marginLeft: '15px',
                  }}
                >
                  Loading...
                </label>
              </div>
            </div>
          </div>
          {filteredDynamicData &&
            filteredDynamicData[0] &&
            !filteredDynamicData[0].sub_category.name.includes(
              'Output',
            ) && (
              <div
                className={`info-content-footer footer-flex ${
                  expandMore ? 'active' : ''
                }`}
              >
                <span className="important" />
                <p className="span_book_14">
                  {filteredDynamicData &&
                    filteredDynamicData[0] &&
                    filteredDynamicData[0].sub_category.description}
                </p>
                {/* eslint-disable-next-line */}
                <a
                  className="more span_heavy_15"
                  role="button"
                  tabIndex="0"
                  onClick={handleModal}
                  onKeyDown={handleModal}
                />
                {/* <a
                  role="button"
                  tabIndex="0"
                  onClick={handleModal}
                  onKeyDown={handleModal}
                  className="more"
                >
                  more
                </a> */}
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
  filterOuputIndicatorWithPercentOrNumber,
  filterPlanned2ndPieChart,
})(MiddleChartSection);
