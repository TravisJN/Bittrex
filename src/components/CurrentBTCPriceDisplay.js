import React from 'react';

export class CurrentBTCDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyle() {
        return {
            display: this.props.loadingAnimation ? 'inline' : 'none'
        }
    }

    getPriceStyle() {
        return {
            display: this.props.loadingAnimation ? 'none' : 'inline'
        }
    }

    render() {
        return (
            <div className="div-btc-price">
                <img style={this.getStyle()} className="img-loading-btc-price" src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/4ef13910395367.560e43c184ee6.gif' alt="loading"></img>
                <h5 style={this.getPriceStyle()} className="h5-btc-price">1 BTC = ${this.props.price}</h5>
            </div>
        )
    }
}

export default CurrentBTCDisplay;