import React, { Component } from 'react';
import AEMRow from './aem-row';
import Centered from './centered';

export class PageTemplate extends Component {
    render() {
        switch(this.props.template) {
            case 'Row':
            case 'row':
                return (
                    <div className="template row">
                        <AEMRow children={this.props.children} />
                    </div>
                );
                break;
            case 'centered':
            case 'Centered':
                return (
                    <div className="template centered">
                        <Centered children={this.props.children} />
                    </div>
                );
                break;
            default: 
                return (
                    <div className="template default">{this.props.children}</div>
                );
        }
    }
}

export default { 
    PageTemplate
}