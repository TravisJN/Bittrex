import React from 'react';

export class ControlPanel extends React.Component {
    buttons = [
        {
            label: 'Get Balances',
            endPointKey: 'balances'
        },
        {
            label: 'Get Current BTC Price',
            endPointKey: 'BTCPrice'
        }
    ]

    constructor(props) {
        super(props);
    }

    getButtons() {
        return this.buttons.map((aButton) => {
            return <button key={aButton.endPointKey} type="button" onClick={this.getButtonCallback(aButton)}>{aButton.label}</button>
        });
    }

    getButtonCallback(aButtonObj) {
        return (event) => {
            this.props.buttonClicked(event, aButtonObj);
        }
    }

    render() {
        return (
            <div className="div-control-panel">
                {this.getButtons()}
            </div>
        )
    }
}

export default ControlPanel;