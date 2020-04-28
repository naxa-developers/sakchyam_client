import React, { Component } from "react";

class InfectedIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#ff0000",
            width: "100%",
            className: "dot",
            viewBox: "0 0 37 48"
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
                <path class="st0" d="M0,0h14v7H0V0z M1,9h12v33c0,3.3-2.7,6-6,6s-6-2.7-6-6V9z M4,28h6V17H4V28z M37,27.5c0,0.8-0.7,1.5-1.5,1.5
	c-0.1,0-0.1,0-0.2,0l-2.9-0.3c-0.2,0.6-0.5,1.1-0.9,1.6l1.1,1.3c0.5,0.6,0.5,1.6-0.2,2.1c-0.6,0.5-1.6,0.5-2.1-0.2l-1.1-1.3
	c-0.6,0.3-1.3,0.6-2.1,0.7L27,34.7c-0.1,0.8-0.7,1.3-1.5,1.3c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c-0.8-0.1-1.4-0.8-1.3-1.7l0.2-1.6
	c-0.9-0.2-1.7-0.6-2.4-1.1l-1.4,1.1c-0.7,0.5-1.6,0.4-2.1-0.3c-0.5-0.7-0.4-1.6,0.3-2.1l1.3-1c-0.4-0.7-0.6-1.4-0.7-2.1L17.3,27
	c-0.8-0.1-1.4-0.8-1.3-1.7c0.1-0.8,0.8-1.4,1.7-1.3l1.6,0.2c0.2-0.8,0.6-1.6,1.1-2.3l-2-2.4c-0.5-0.6-0.5-1.6,0.2-2.1
	c0.6-0.5,1.6-0.5,2.1,0.2l2,2.3c1-0.5,2.1-0.8,3.2-0.9l0.2-1.7c0.1-0.8,0.8-1.4,1.7-1.3c0.8,0.1,1.4,0.8,1.3,1.7l-0.2,1.9
	c0.7,0.3,1.4,0.8,2,1.4l0.8-0.6c0.7-0.5,1.6-0.4,2.1,0.3c0.5,0.7,0.4,1.6-0.3,2.1l-0.9,0.7c0.3,0.7,0.5,1.5,0.5,2.3l2.7,0.3
	C36.4,26.1,37,26.7,37,27.5z M26,24c0-1.1-0.9-2-2-2s-2,0.9-2,2s0.9,2,2,2C25.1,26,26,25.1,26,24z M29,28.5c0-0.8-0.7-1.5-1.5-1.5
	S26,27.7,26,28.5s0.7,1.5,1.5,1.5c0,0,0,0,0,0C28.3,30,29,29.3,29,28.5z"
                            fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                            />
            </svg>
        )
    }
}

export default InfectedIcon;