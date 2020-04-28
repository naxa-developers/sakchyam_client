import React, { Component } from "react";

class HospitalIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 32 48"
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
                      <path className="cls-1" d="M28,0a3.99992,3.99992,0,0,0-4,4V20H8V4A4,4,0,0,0,0,4V44a4,4,0,0,0,8,0V28H24V44a4,4,0,0,0,8,0V4A3.99992,3.99992,0,0,0,28,0Z"
                      fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                      />
          </svg>
        )
    }
}

export default HospitalIcon;