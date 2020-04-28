import React, { Component } from "react";

class HealthWorkerIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 34 44"
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
                <title>Health Worker</title>
                <path class="st0" d="M34,38v6H0v-6c0-6,3.5-11.4,9-13.7V31H8c0,0,0,0,0,0c-2.2,0-4,1.8-4,4v6c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1
            s-0.4-1-1-1H6v-5c0-1.1,0.9-2,2-2h4c0,0,0,0,0,0c1.1,0,2,0.9,2,2v5h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1v-6c0,0,0,0,0,0
            c0-2.2-1.8-4-4-4h-1v-7.4c1.3-0.4,2.6-0.6,4-0.6h4c1.4,0,2.7,0.2,4,0.6v7.6c-0.9,0.3-1.5,1-1.8,1.8c-0.6,1.6,0.3,3.3,1.8,3.8
            s3.3-0.3,3.8-1.8s-0.3-3.3-1.8-3.8v-6.9C30.5,26.6,34,32,34,38z M17,20c5.5,0,10-4.5,10-10S22.5,0,17,0S7,4.5,7,10S11.5,20,17,20z"
                            fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                            />
                </svg>
        )
    }
}

export default HealthWorkerIcon;
