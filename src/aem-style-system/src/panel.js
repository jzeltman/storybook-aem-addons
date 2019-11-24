import React, { Component } from 'react';
import { Form, Placeholder, ScrollArea, TabWrapper, TabState, Tabs, TabBar, TabButton } from '@storybook/components';
import { FORCE_RE_RENDER, STORY_CHANGED } from '@storybook/core-events';
import { parsePolicy } from './utils';

// add a way to customize the grid
export default class Panel extends Component {
    constructor(props){
        super();
        this.api = props.api;
        this.channel = this.api.getChannel();
        this.channel.on(STORY_CHANGED, this.storyChangedHandler.bind(this));

        this.state = { 
            policyPath: props.parameters.policy || null,
            policy: null,
            policyJSON: [],
            styleIdKeyValues: {},
            styleIds: props.parameters.styleIds || []
        };
    }

    storyChangedHandler(event) {
        if (this.props.parameters && this.props.parameters.policy && this.props.parameters.policy !== this.state.policyPath) {
            this.setState({ policyPath: this.props.parameters.policy });
            this.fetchComponentPolicy();
        }
        if (this.props.parameters && this.props.parameters.styleIds && this.props.parameters.styleIds !== this.state.styleIds) {
            this.setState({ styleIds: this.props.parameters.styleIds });
            this.renderStory(this.props.parameters.styleIds);
        }
    }

    componentDidMount() {
        this.fetchComponentPolicy();
    }

    async fetchComponentPolicy() {
        if (this.state.policyPath) {
            const response = await fetch(this.state.policyPath);
            const policyJSON = await response.json();
            const parsedPolicy = parsePolicy(policyJSON);
            this.setState({ 
                policyJSON: policyJSON,
                policy: parsedPolicy.policy,
                styleIdKeyValues: parsedPolicy.styleIdKeyValues
            });
        }
    }

    getClassesFromStyleIds(styleIds) {
        return (styleIds || this.state.styleIds).map( id => this.state.styleIdKeyValues[id] );
    }

    setStyleIds(id) {
        let ids = [...this.state.styleIds];
        let index = ids.indexOf(id)
        if (index === -1) ids.push(id);
        else ids.splice(index, 1);

        this.setState({ styleIds: ids });
        this.renderStory(ids);
    }

    renderStory(passedIds) {
        const styleIds = passedIds || this.state.styleIds;
        this.channel.emit('aemStyleSystem:update', { classes: this.getClassesFromStyleIds(styleIds).join(' ') });
        this.channel.emit(FORCE_RE_RENDER);
    }

    renderStyleGroup(group,groupKey) {
        return (
            <div key={groupKey}>
                <h3>{group.styleGroupLabel}</h3>
                <Form>{group.styles.map((style,styleKey) => <Form.Field key={styleKey} label={style.label}>
                        <input  type="checkbox" 
                                value={style.id}
                                checked={this.state.styleIds.includes(style.id)}
                                onChange={e => this.setStyleIds(style.id)} />
                    </Form.Field>
                )}</Form>
            </div>
        )
    }

    renderPolicies() {
        return this.state.policy.map((policy,key) => {
            return (
                <div key={key}>
                    <h2>{policy.tabName}</h2>
                    <p>{policy.tabDescription}</p>
                    {policy.styleGroups.map((policy,policyKey) => this.renderStyleGroup(policy,policyKey))}
                </div>
            );
        });
    }

    render() {
        if (this.state.policy === null) return <Placeholder>No Style System Policy Path configured</Placeholder>
        else if (this.state.policy.length) {
            return (
                <ScrollArea>{this.renderPolicies()}</ScrollArea>
            )
        } else return <Placeholder>Fetching Style System Policy</Placeholder>
    }
}