import React from 'react';
import '../App.js';
import TextInputForm from './TextInputForm.js';

export class PriceDisplay extends React.Component{

    constructor(props) {
        super(props);

        // this.state = {
        //     balances: [],
        //     price: 0,
        //     onSubmit: this.onSubmit.bind(this)
        // }

        this.mModel = props.model;
    }



    getRows() {
        return this.props.balances
                .filter((aCurrency) => {
                    return aCurrency.Balance > 0;
                })
                .map((aCurrency) => {
                    return (
                        <tr key={aCurrency.Currency}>
                            <td>{aCurrency.Currency}</td>
                            <td>{aCurrency.Balance}</td>
                        </tr>
                    )
                });
    }

    render() {
        return( 
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    // render() {
    //     return( 
    //         <div>
    //             <TextInputForm onSubmit={this.state.onSubmit}/>
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>Currency</th>
    //                         <th>Balance</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.getRows()}
    //                 </tbody>
    //             </table>
    //         </div>
    //     )
    // }
    

    // onSubmit(event) {
    //     var endPoint = 'getBalances';

    //     this.mModel.fetchData(endPoint).then((value) => {
    //         this.setState({balances: value.result});
    //     })
    // }
}

export default PriceDisplay;