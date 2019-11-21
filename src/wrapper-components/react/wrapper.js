import React, { Component } from "react";

export default class Wrapper extends Component {
    constructor() {
        super();
        this.getMarkup.bind(this);
        this.state = { html: this.props.html };
    }

    getMarkup(prop) {
        return { __html: prop };
    }

    async componentDidMount() {
        if (this.props.contentPath) {
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

        return classes;
    }

    render() {
        let classes = getClasses();

        if (this.state.html === null) return <div className={classes.join(' ')}>Loading...</div>;
        else return (
            <div className={classes.join(' ')}
                    dangerouslySetInnerHTML={this.getMarkup(this.state.html)} />
        );
    }
}
