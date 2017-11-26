import React from 'react';

/**
 * @description This component builds a group of buttons to be displayed at the top of the application
 */
export class ControlPanel extends React.Component {
    // This array is used to build the group of buttons
    // label: The string displayed on the button element
    // endPointKey: the key to be used with the endPointKey map in PriceModel
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