import React, { Component } from "react";

class TestingIcon extends Component {
    constructor(props) {
      super(props);
      this.state = {
          setting: {
            style: {padding:2},
            fill: "#0000ff",
            width: "100%",
            className: "dot",
            viewBox: "0 0 42 48"
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
          <path class="cls-1" d="M42,44.5A3.49994,3.49994,0,0,1,38.5,48H3.5a3.5,3.5,0,0,1,0-7H29.18066a15.24822,15.24822,0,0,0-.49218-21.00879l3.53515-3.53516A20.25673,20.25673,0,0,1,35.34863,41H38.5A3.49994,3.49994,0,0,1,42,44.5ZM21.43312,24.93111l15.55-15.55a1.46767,1.46767,0,0,0,0-2.0756l-4.5206-4.5206a1.46767,1.46767,0,0,0-2.0756,0l-15.55,15.55a1.46768,1.46768,0,0,0,0,2.07561l4.52059,4.52059A1.46768,1.46768,0,0,0,21.43312,24.93111ZM39.32869,4.70127h0a1.5,1.5,0,0,0,0-2.12132L37.18808.43934a1.5,1.5,0,0,0-2.12132,0h0a1.5,1.5,0,0,0,0,2.12132l2.14061,2.14061A1.5,1.5,0,0,0,39.32869,4.70127ZM16.70127,27.32869h0a1.5,1.5,0,0,0,0-2.12132l-2.14061-2.14061a1.5,1.5,0,0,0-2.12132,0h0a1.5,1.5,0,0,0,0,2.12132L14.58,27.32869A1.5,1.5,0,0,0,16.70127,27.32869ZM21,37.5h0A1.5,1.5,0,0,0,19.5,36H1.5A1.5,1.5,0,0,0,0,37.5H0A1.5,1.5,0,0,0,1.5,39h18A1.5,1.5,0,0,0,21,37.5Z"
          fill={this.props.color!=undefined?this.props.color:this.state.setting.fill}
                      />
          </svg>
        )
    }
}

export default TestingIcon;