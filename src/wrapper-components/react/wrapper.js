import React, { Component } from "react";

export default class Wrapper extends React.Component {
    constructor(props) {
        super();
        this.getMarkup.bind(this);
        this.getClasses.bind(this);

        this.state = {
            html: props.html || null
        };
    }

    getMarkup(prop) {
        return { __html: prop };
    }

    async componentDidMount() {
        if (this.props.contentPath) {
            console.log('fetching component', this.props.contentPath);
            const response = await fetch(this.props.contentPath);
            const html = await response.text();
            this.setState({ html: html });
        }
    }

    getClasses() {
        let classes = [this.props.classes];
        if (this.props.grid) classes.push(this.props.grid);
        if (this.props.gridTablet) classes.push(this.props.gridTablet);
        if (this.props.gridPhone) classes.push(this.props.gridPhone);
        if (this.props.styleSystem) classes.push(this.props.styleSystem);

        return classes.join(' ');
    }

    render() {
        let classes = this.getClasses();

        if (this.state.html === null) return <div className={classes}>Loading...</div>;
        else return (
            <div className={classes}
                    dangerouslySetInnerHTML={this.getMarkup(this.state.html)} />
        );
    }
}
