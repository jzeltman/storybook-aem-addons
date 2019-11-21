import React, { Component } from 'react';
import AEMRow from './aem-row';
import Centered from './centered';

export class PageTemplate extends Component {
    render() {
        if (typeof this.props.template === 'function') {
            const Template = this.props.template;
            return <Template>{this.props.children}</Template>;
        } else return <div>{this.props.children}</div>;
    }
}

export const templates = {
    'AEM Grid Row': AEMRow,
    'Centered': Centered,
}

export default { 
    PageTemplate,
    templates
}