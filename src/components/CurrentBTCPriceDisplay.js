import React from 'react';

export class CurrentBTCDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.price}
            </div>
        )
    }
}

export default CurrentBTCDisplay;