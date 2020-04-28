import React, { Component } from "react";

class InfectionControlIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 44 44"
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
                <path class="a" d="M31.6709,23.00977l-2.68-.29981a7.11821,7.11821,0,0,0-.5-2.31006l.93-.71a1.5041,1.5041,0,1,0-1.84-2.37988l-.78.60986a7.125,7.125,0,0,0-2.03-1.3501l.22-1.8999a1.49965,1.49965,0,1,0-2.98-.33984l-.2,1.67969a6.97182,6.97182,0,0,0-3.17.85009l-2-2.33984a1.50333,1.50333,0,1,0-2.28,1.96l2.02,2.35986a6.96094,6.96094,0,0,0-1.13,2.34034l-1.58-.17041a1.49989,1.49989,0,0,0-.34,2.98046l1.78.19971a6.93423,6.93423,0,0,0,.74,2.1499l-1.27.97022a1.50412,1.50412,0,0,0,1.84,2.37988l1.4-1.08008a7.19784,7.19784,0,0,0,2.38,1.14991l-.19,1.57031a1.49564,1.49564,0,0,0,1.32,1.66015.936.936,0,0,0,.17.00977,1.50146,1.50146,0,0,0,1.49-1.33008l.21-1.77978a6.985,6.985,0,0,0,2.06-.7002l1.1,1.29a1.5117,1.5117,0,0,0,2.12.16016,1.50416,1.50416,0,0,0,.16-2.12012l-1.09-1.27a7.091,7.091,0,0,0,.92-1.58008l2.86.32031a1.05223,1.05223,0,0,0,.17.00977,1.5,1.5,0,0,0,.17-2.99023ZM20.00092,23a2,2,0,1,1,2-2A2.00583,2.00583,0,0,1,20.00092,23Zm3.5,4a1.5,1.5,0,1,1,1.5-1.5A1.49793,1.49793,0,0,1,23.50092,27Z"
                    fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                />
                <path class="a" d="M38,0H6A6.00657,6.00657,0,0,0,0,6V38a6.00657,6.00657,0,0,0,6,6H38a6.00657,6.00657,0,0,0,6-6V6A6.00657,6.00657,0,0,0,38,0Zm2,38a2.0026,2.0026,0,0,1-2,2H6a2.0026,2.0026,0,0,1-2-2V6A2.0026,2.0026,0,0,1,6,4H38a2.0026,2.0026,0,0,1,2,2Z"
                    fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                />
            </svg>
        )
    }
}

export default InfectionControlIcon;