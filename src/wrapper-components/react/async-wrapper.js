import React, { Component } from "react";

export default class AsyncWrapper extends Component {
    constructor() {
        super();
        this.getMarkup.bind(this);
        this.state = { html: null };
    }

    getMarkup(prop) {
        return { __html: prop };
    }

    async componentDidMount() {
        if (this.props.html === undefined) {
            const response = await fetch(this.props.contentPath);
            const html = await response.text();
            this.setState({ html: html });
        }
    }

    render() {
        if (this.state.html === null) return <div>Loading...</div>;
        else
            return (
                <div
                    dangerouslySetInnerHTML={this.getMarkup(
                        this.state.html
                    )}></div>
            );
    }
}
