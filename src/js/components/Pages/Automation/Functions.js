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
            // console.log(document.getElementById("provinceCount1"), "setinnerhtml")
            
            var size = getProvinceCircleSize(data, max, min);
            // console.log(size, "size")
            // document.getElementById("provinceCount"+(i+1)).innerHTML = data;
            // document.getElementById("provinceCount"+(i+1)).style.lineHeight = size+"px";
            // document.getElementById("circle"+(i+1)).style.width = size+"px";
            // document.getElementById("circle"+(i+1)).style.height = size+"px";
            // document.getElementById("circle"+(i+1)).style.marginLeft = size>=35?-(size/4)+"px":-(size/15)+"px";
        
        return([data, size]);
    })            
}

export const label_Vector_Tiles = (feature, vt_label_province, vt_label_district, vt_label_municipality, labelcount, provinceCounts) => { 
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
            html: "<div align='center' class='circle' id = 'circle"+feature.properties.id+"' style='width:"+size+"px !important; height:"+size+"px !important; margin-left:"+marginLeft+"'><span id= 'provinceCount"+feature.properties.id+"' class='text_circle' style ='line-height:"+size+"px;'>"+provinceCounts[feature.properties.id]+"</span></div><text class='fed_labelText' style='color:#383838; font-size: 10px; margin-left: -10px;'>" + name + "</text>",
            iconAnchor: [12, 0],
        });
        
        var vt_label_marker_P = L.marker([lat, long], {
            icon: divIconP
        });

        if (countEqual(vt_label_province._layers, vt_label_marker_P, labelcount) > 0) {
            //do nothing
        } else {
            vt_label_marker_P.addTo(vt_label_province);
        }

    } else if (feature.properties.hasOwnProperty('DistLabel')) {
        name = feature.properties.Name;
        var divIconD = L.divIcon({
            html: "<span class='fed_labelText' style='color:white !important; background:none; font-size: 9px;'>" + name + "</span>",
            iconAnchor: [12, 0],
        });

        var vt_label_marker_D = L.marker([lat, long], {
            icon: divIconD
        });
        if (countEqual(vt_label_district._layers, vt_label_marker_D, labelcount) > 0) {
            //do nothing
        } else {
            vt_label_marker_D.addTo(vt_label_district);
        }
    } else if (feature.properties.hasOwnProperty('GaPa_NaPa')) {
        name = feature.properties.Name;
        var divIconM = L.divIcon({
            html: "<span class='fed_labelText' style='color:white !important;background:none; font-size: 8px; '>" + name + "</span>",
            iconAnchor: [12, 0],
        });

        var vt_label_marker_M = L.marker([lat, long], {
            icon: divIconM
        });
        //vt_label_marker_M.addTo(vt_label_muclnicipality);
        if (countEqual(vt_label_municipality._layers, vt_label_marker_M, labelcount) > 0) {
            //do nothing
        } else {
            vt_label_marker_M.addTo(vt_label_municipality);                    
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
        throw TypeError("Step cannot be zero.");
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

        while (step > 0 ? end >= start : end <= start) {
            if (end <= 10) {
                range.push(start.toFixed(2));
            } else {
                range.push(Math.round(start));
            }

            start += step;
        }
        if (isOdd(Math.round(end))) {
            if (end <= 10) {
                range.push(end.toFixed(2));
            } else {
                range.push(Math.round(end));
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

export const getProvinceName = (id) => {
      if (id === 3) {
        return "Bagmati";
      } else if (id === 4) {
        return "Gandaki";
      } else if (id === 6) {
        return "Karnali";
      } else if (id === 7) {
        return "Sudurpaschim";
      } else if(id === 1){
        return "Province1";
      }else if(id === 2){
        return "Province2";
      }else if(id === 5){
        return "Province5";
      }
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
    console.log(map,'map');
    console.log(layers,'layers');
    var zoom = map.getZoom();
    console.log(zoom, "zoom")
    layers.length>0 ? layers.map(layer =>{
        if((zoom<=5 || zoom > 7.5) && window[layer]){
            // console.log("zoom <=5 or zoom>7")
            map.addLayer(window[layer]);
        }
        else{
            map.removeLayer(window[layer])
        }
    }):(((zoom<=5 || zoom >7.5) && layers)?map.addLayer(layers):map.removeLayer(layers))
}

export const handleZoom = (map, province, district, municipality, vt_label_province, vt_label_district, vt_label_municipality, labelcount) => {
        var zoom = map.getZoom();
        var activeLayer = null;
        // console.log(zoom,"zoom");        
        if (map.hasLayer(district)) {
            activeLayer = vt_label_district;
        } else if (map.hasLayer(municipality)) {
            activeLayer = vt_label_municipality;
        } else {
            activeLayer = vt_label_province;
        }

        if ((zoom<=5 || zoom > 7.5) && activeLayer == vt_label_province) {
            map.removeLayer(vt_label_province);
            // console.log("zoom > 7")
        } else if (zoom < 9 && activeLayer == vt_label_district) {
            map.removeLayer(vt_label_district);
            map.removeLayer(vt_label_province);
        } else if (zoom < 11 && activeLayer == vt_label_municipality) {
            map.removeLayer(vt_label_municipality);
            map.removeLayer(vt_label_district);
            map.removeLayer(vt_label_province);
        } else if (zoom <= 7.5 && map.hasLayer(province)) {
            labelcount = 0;
            map.addLayer(vt_label_province);
            map.addLayer(activeLayer);
        }
}