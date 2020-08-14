import React, { Component } from "react";
import {
  TileLayer,
  Pane,
  LayersControl
} from "react-leaflet";
import L from "leaflet";
const { BaseLayer } = LayersControl;

class BaseLayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBaseLayer: "mapbox",
        };
    }
    componentWillMount(){}
    componentDidMount(){}
    render() {
        const { selectedBaseLayer} = this.state;
        return (
            <Pane name="tilelayer-pane" style={{ zIndex: 1 }}>
          <LayersControl position="bottomleft">
            <BaseLayer
              checked={selectedBaseLayer === "openstreet"}
              name="OpenStreetMap"
            >
              <TileLayer
                attribution="OpenStreetMap ©"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === "googlestreet"}
              name="Google Streets"
            >
              <TileLayer
                attribution="Google Streets ©"
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === "googlehybrid"}
              name="Google Hybrid"
            >
              <TileLayer
                attribution="Google Hybrid © "
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === "googlesatellite"}
              name="Google Satellite"
            >
              <TileLayer
                attribution="Google Satellite © "
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === "googleterrain"}
              name="Google Terrain"
            >
              <TileLayer
                attribution="Google Terrain © "
                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer checked={selectedBaseLayer === "dark"} name="Darks">
              <TileLayer
                url="https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </BaseLayer>
            <BaseLayer checked={selectedBaseLayer === "mapbox"} name="Mapbox">
              <TileLayer
                attribution="&amp;copy "
                url="https://api.mapbox.com/styles/v1/naxa-np/cka9lr90s0tgp1is4gep38xi3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF4YS1ucCIsImEiOiJja2E5bGp0ZDQwdHE4MnJxdnhmcGxsdGpuIn0.kB42E50iZFlFPcQiqQMClw"
                maxZoom={20}
              />
            </BaseLayer>
          </LayersControl>
        </Pane>
        )
    }
}
export default BaseLayers;