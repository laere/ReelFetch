import React, { Component } from 'react'
import DataDisplay from './DataDisplay'
import SceneOptionPanel from './SceneOptionPanel'

module.exports = React.createClass({
    getInitialState: function() {
        return {
            inquiry: '',
            sData: []
        };
    },
    handleChange: function(e) {
        this.setState({
            inquiry: e.target.value
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var inquiry = this.state.inquiry;
        var query = this.formatInquiry(this.state.inquiry);
        var apiData = this.state.sData;
        var self = this;

        fetch('http://www.omdbapi.com/?t=' + query + '&r=json')
            .then(function(response) {
                if (response.status !== 200) {
                    alert(response.status);
                    return;
                }
                return response.json()
            })
            .then(function(data) {
                // Add error handler if inquiry !movie || !series
                if (data.Error) {
                    alert("No results found for: " + inquiry);
                    self.setState({
                        inquiry: ''
                    });
                    return;
                }
                console.log(data);
                apiData.push(data);
                self.setState({
                    inquiry: '',
                    sData: apiData
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    formatInquiry: function(input) {
        return input.split(' ').join('+');
    },

    render: function() {
        return (
          <div>
            <form onSubmit={ this.handleSubmit }>
                <input type="text" value={ this.state.inquiry } onChange={ this.handleChange } />
            </form>
            <DataDisplay sData={ this.state.sData } hover={this.hoverToggle}/>
            <SceneOptionPanel />
        </div>
      )
    }
});
