import React, { Component } from 'react'

module.exports = React.createClass({
    getInitialState: function() {
        return {
            sQuery: ''
        };
    },
    handleChange: function(e) {
        this.setState({
            sQuery: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var query = this.formatQuery(this.state.sQuery);
        var self = this;

        fetch('http://www.omdbapi.com/?t=' + query + '&r=json')
            .then(function(response) {
                if (response.status !== 200) {
                    console.log(response.status);
                    return;
                } 
                return response.json()
            })
            .then(function(data) {
                console.log(data);
                self.setState({
                    sQuery: ''
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    formatQuery: function(input) {
        return input.split(' ').join('+');
    },
    render: function() {
        return (<div>
            <form onSubmit={ this.handleSubmit }>
                <input type="text" value={ this.state.sQuery } onChange={ this.handleChange } />
            </form>
        </div>)
    }
});