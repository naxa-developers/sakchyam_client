import gradStop from 'gradstop';
import districtData from './DistrictFunction'
import municipalityData from '../../../data/municipality.json'
import React from "react";
// import ReactDOMServer from 'react-dom/server';
// import HospitalIcon from './Icons/HealthFacilityIcon';

export const choroplethColorArray = (stops, color) =>{
    // console.log(color, "color func")
    var gradient = gradStop({
        stops: stops,
        inputFormat: 'hex',
        colorArray: ['#ffffff', color]
    });
    return gradient;
}

export const getMarkerColor = (value, type, colors) => {
    var color = "";
    type.map((data, i) => {
        if(value && value.toLowerCase().trim().replace(/\s/g, '') == data.toLowerCase().trim().replace(/\s/g, '')){
            color = colors[i];
        }
      
    })
    return color;
}

export const getProvinceCircleSize = (count, max, min) => {
    const sizes = [20,25,30,35,40];
    var size = 20;
    var range  = calculateRange(min, max, (max-min)/4)
    range.map((data, i) => {
        if(i<4? count>=range[i] && count<range[i+1]: count==range[i]){
            // console.log(sizes[i], "size");
            size = sizes[i];
        }
    });
    return size;
}

export const setProvinceCircleSize = (counts) => {
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    counts.map((data,i) =>{   
        var size = getProvinceCircleSize(data, max, min);
        return([data, size]);
    })            
}

export const label_Vector_Tiles = (feature, vt_label_province, labelcount, provinceCounts) => { 
    var name = "";
    // console.log(provinceCounts, "functions")
    var lat = feature.properties.Centroid_Y;
    var long = feature.properties.Centroid_X;
    if (feature.properties.hasOwnProperty('PROV_NAME')) {
        const min = Math.min(...provinceCounts);
        const max = Math.max(...provinceCounts);
        var size = getProvinceCircleSize(provinceCounts[feature.properties.id], max, min);
        name = getProvinceName(feature.properties.id+1);
        var marginLeft = size>=35?-(size/5)+"px":-(size/15)+"px";
        // console.log(name, "functions name")
        var divIconP = L.divIcon({
            html: "<div align='center' class='circle' id = 'circle"+feature.properties.id+"' style='width:"+size+"px !important; height:"+size+"px !important; margin-left:"+marginLeft+"'><span id= 'provinceCount"+feature.properties.id+"' class='text_circle' style ='margin-left:-2px; line-height:"+size+"px;'>"+provinceCounts[feature.properties.id]+"</span></div><text class='fed_labelText' style='color:#383838; font-size: 10px; margin-left: -10px;'>" + name + "</text>",
            // html: "<div align='center' class='circle' id = 'circle"+feature.properties.id+"' style='width:"+size+"px !important; height:"+size+"px !important; margin-left:"+marginLeft+"'>"+ReactDOMServer.renderToString(<HospitalIcon/>)+"<span id= 'provinceCount"+feature.properties.id+"' class='text_circle' style ='margin-left:-2px; line-height:"+size+"px;'>"+provinceCounts[feature.properties.id]+"</span></div><text class='fed_labelText' style='color:#383838; font-size: 10px; margin-left: -10px;'>" + name + "</text>",
            iconAnchor: [12, 0],
        });
        
        var vt_label_marker_P = L.marker([lat, long], {
            icon: divIconP
        });

        vt_label_marker_P.bindTooltip("<div>Number of Automation Deployed</div>")
        // vt_label_marker_P.on("mouseover", ()=>{
        //     vt_label_marker_P.openPopup();
        //   })
        
        //   vt_label_marker_P.on('mouseout', () => {
        //     vt_label_marker_P.closePopup();
        // });

        if (countEqual(vt_label_province._layers, vt_label_marker_P, labelcount) > 0) {
            //do nothing
        } else {
            vt_label_marker_P.addTo(vt_label_province);
        }

    } 
}


// dynamic range calculation start
export const isOdd = (num) => {
    return num % 2;
}
export const makeZeroLastNumber = (num) => {
return parseInt(num.toString().replace(/.$/,"0"))>12?parseInt(num.toString().replace(/.$/,"0")):12; //replace last digit by zero
}

export const calculateRange = (start, end1, step) => {
    const end = end1;//makeZeroLastNumber(end1);
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        console.log("Step cannot be zero.");
        // throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {
        // console.log("start is number", end)
        while (step > 0 ? end >= start : end <= start) {
            if (end <= 10) {
                range.push(start.toFixed(2));
            } else {
                // console.log("start math round", start)
                range.push(Math.round(start));
            }

            start += step;
        }
        if (isOdd(Math.round(end))) {
            if (end <= 10) {
                range[range.length-1] = end.toFixed(2);
            } else {
                range[range.length-1] = Math.round(end);
            }
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}

export const getProvinceName = (id, language) => {
    language == null?language='en':language
    var ProvinceName;
    if (id === 3) {
      ProvinceName = language == 'en'?"Bagmati":"बाग्मती प्रदेश";
    } else if (id === 4) {
      ProvinceName = language == 'en'?"Gandaki":"गण्डकी प्रदेश";
    } else if (id === 6) {
      ProvinceName = language == 'en'?"Karnali":"कर्णाली प्रदेश";
    } else if (id === 7) {
      ProvinceName = language == 'en'? "Sudurpashchim":"सुदूरपश्चिम प्रदेश";
    } else if(id === 1){
      ProvinceName = language == 'en'? "Province1":"प्रदेश नं १";
    }else if(id === 2){
      ProvinceName = language == 'en'? "Province2":"प्रदेश नं २";
    }else if(id === 5){
      ProvinceName = language == 'en'? "Province5":"प्रदेश नं ५";
    }
    return ProvinceName;
}

export const countEqual = (oo, pp, labelcount) => {
    // console.log(oo, "oo")
    var singleloopend = 0;
    Object.keys(oo).map((key) => {
        // console.log(oo[key], "data i")
        if (singleloopend == 0) {
            labelcount = 0;
        }
        if (oo[key]._latlng.lat == pp._latlng.lat && oo[key]._latlng.lng == pp._latlng.lng) {
            labelcount++;
        }

        singleloopend++;
    });
    // console.log(labelcount, "labelcount")
    return labelcount;
} 

export const handleMarkerZoom = (map, layers) => {
    var zoom = map.getZoom();
    // console.log(map.getBounds(), "bounds")
    layers.length>0 ? layers.map(layer =>{
        if((zoom<=5 || zoom > 7.5) && window[layer]){
            // console.log("zoom <=5 or zoom>7")
            map.addLayer(window[layer]);
        }
        else{
            map.removeLayer(window[layer])
        }
    }):(((zoom<=5 || zoom > 7.5) && layers)?map.addLayer(layers):map.removeLayer(layers))
}

export const handleZoom = (map, province, vt_label_province) => {
        var zoom = map.getZoom();
        // console.log(map.getBounds(), "bounds")
        if ((zoom<=5 || zoom > 7.5)) {
            map.removeLayer(vt_label_province);
        } else if (zoom <= 7.5 && map.hasLayer(province)) {
            map.addLayer(vt_label_province);
        }
}

export const getCenterBboxDistrict=(id,multiple_id)=>{
    const a = districtData.map(data=>{
        if(id === data.name){
            var bboxArray= data.bbox.split(",");
                // console.log(bboxArray,'bboxaray')
            const a = bboxArray.map(data=>{return parseFloat(data)});
            const b = [a[1],a[0],a[3],a[2]];
            return {name:data.name,center:[data.centroid_x,data.centroid_y],bbox:b}
        }
    })

}
