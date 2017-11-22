import React from 'react';
import '../App.js';
//import KEYS from '../private/Keys.js'

export class TextInputForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="Text-Input-Form">
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Get Balances" />
                </form>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div className="Text-Input-Form">
    //             <form onSubmit={this.handleSubmit}>
    //                 <label>
    //                     Ticker Symbol:
    //                     <input type="text" value={this.state.value} onChange={this.handleChange} />
    //                 </label>
    //                 <input type="submit" value="Submit" />
    //             </form>
    //         </div>
    //     )
    // }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();        
        this.props.onSubmit(event);
    }
}

export default TextInputForm;