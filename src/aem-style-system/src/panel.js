import React, { Component } from 'react';
import { useParameter, useChannel } from '@storybook/api';
import addons from '@storybook/addons';
import { Placeholder, AddonPanel } from '@storybook/components';
import { PARAM_KEY } from '../constants';
// import { FORCE_RE_RENDER } from '@storybook/core-events';

export default class Panel extends Component {
    constructor(props){
        super();
        console.log('props:', props)
        this.storySettings = useParameter(PARAM_KEY, null);
        this.channel = addons.getChannel();

        this.state = { 
            policy: null,
            classes: [],
            selectedStyles: []
        }
    }

    render() {
        return (
            <AddonPanel active={this.props.active} key={this.props.key}>
                <Placeholder>boooooo No Style System settings found</Placeholder>
            </AddonPanel>
        )
    }
}