import React from 'react';
import '../App.js';

export class PriceDisplay extends React.Component{

    constructor(props) {
        super(props);

        this.mModel = props.model;
    }

    getBalanceRows() {
        return this.props.balances.map((aCurrency) => {
                    let symbol = aCurrency.Currency,
                        balance = aCurrency.Balance.toFixed(4);

                    return (
                        <tr key={aCurrency.Currency}>
                            <td>{aCurrency.Currency}</td>
                            <td>{balance}</td>
                            <td>{this.mModel.getBTCValue(aCurrency.Currency)}</td>
                            <td>{this.mModel.getDollarValue(aCurrency.Currency)}</td>
                        </tr>
                    )
                });
    }

    getSumRow() {
        return (
            <tr className="tr-sum">
                <td> </td>
                <td> </td>
                <td> </td>
                <td>{this.mModel.dollarSum}</td>
            </tr>
        )
    }

    render() {
        return( 
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Balance</th>
                            <th>BTC Value</th>
                            <th>Dollar Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getBalanceRows()}
                        {this.getSumRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PriceDisplay;