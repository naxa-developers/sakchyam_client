import React, { Component } from "react";

class BoreholeIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 48 48"
          }
      }
    }
    componentDidMount() {}
    render() {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" 
          width={this.state.setting.width}
          style={this.state.setting.style}
          className={this.state.setting.className}
          viewBox={this.state.setting.viewBox}>
          <title>Health Facility</title>
          {/* <path class="cls-1" d="M47,12H32V33a8,8,0,0,1-16,0V12H1a1.00291,1.00291,0,0,0-1,1V47a1.00291,1.00291,0,0,0,1,1H47a1.00291,1.00291,0,0,0,1-1V13A1.00291,1.00291,0,0,0,47,12Z"/> */}
          <path class="cls-1" d="M24,37a4.98641,4.98641,0,0,0,2.97253-9H27V3a3,3,0,0,0-6,0V28h.02747A4.98641,4.98641,0,0,0,24,37Z"
          fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                      />
          </svg>
        )
    }
}

export default BoreholeIcon;