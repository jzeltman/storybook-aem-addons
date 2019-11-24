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
            classes: [],
            policyJSON: []
        };
    }

    storyChangedHandler(event) {
        if (this.props.parameters && this.props.parameters.policy && this.props.parameters.policy !== this.state.policyPath) {
            this.setState({ policyPath: this.props.parameters.policy });
            this.fetchComponentPolicy();
        }
    }

    componentDidMount() {
        this.fetchComponentPolicy();
    }

    async fetchComponentPolicy() {
        if (this.state.policyPath) {
            const response = await fetch(this.state.policyPath);
            const policyJSON = await response.json();
            this.setState({ policyJSON: parsePolicy(policyJSON) });
        }
    }

    setClasses(event, passedClass) {
        let classes = [...this.state.classes];
        let index = classes.indexOf(passedClass)
        if (index === -1) classes.push(passedClass);
        else classes.splice(index, 1);

        this.setState({ classes });
        
        this.channel.emit('aemStyleSystem:update', { classes: classes.join(' ') });
        this.channel.emit(FORCE_RE_RENDER);
    }

    renderStyleGroup(group,groupKey) {
        return (
            <div key={groupKey}>
                <h3>{group.styleGroupLabel}</h3>
                <Form>{group.styles.map((style,styleKey) => 
                    <Form.Field key={styleKey} label={style.label}>
                        <input type="checkbox" 
                                value={style.classes} 
                                onChange={e => this.setClasses(e, style.classes)} />
                    </Form.Field>
                )}</Form>
            </div>
        )
    }

    renderPolicies() {
        return this.state.policyJSON.map((policy,key) => {
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
        if (this.state.policyPath === null) return <Placeholder>No Style System Policy Path configured</Placeholder>
        else if (this.state.policyJSON.length) {
            return (
                <ScrollArea>{this.renderPolicies()}</ScrollArea>
            )
        } else return <Placeholder>Fetching Style System Policy</Placeholder>
    }
}