import React, { Component } from "react";

class DoctorIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:4},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 30 48"
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
                <path class="a" d="M23,25a7.001,7.001,0,0,0-2,13.71v.79a4.5,4.5,0,0,1-9,0V22.80005A10.01737,10.01737,0,0,0,20,13V0H14a2,2,0,0,0,0,4h2v9A6,6,0,0,1,4,13V4H6A2,2,0,0,0,6,0H0V13a10.01737,10.01737,0,0,0,8,9.8V40h.03A8.48377,8.48377,0,0,0,24.97,40H25V38.71A7.001,7.001,0,0,0,23,25Zm0,10a3,3,0,1,1,3-3A3.00887,3.00887,0,0,1,23,35Z"
                            fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                            />
            </svg>
        )
    }
}

export default DoctorIcon;
