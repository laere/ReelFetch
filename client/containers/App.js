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
    //Make this return a specific amount of posters.
    filterMovies: function() {
      //initialize array
      var moviePosters = [];
      //return 5 posters
      for (var i; i <= 5; i++) {
        //if movie rating > 8
        if(this.state.sData.rating >= 8) {
          //return poster of movie and push into array
          return moviePosters.push(this.state.sData.Poster[i]);
          //else do nothing
        }
      }
    },
    render: function() {

      var topMovies = this.state.sData.filter(filterMovies);
        return (
          <div>
            <form onSubmit={ this.handleSubmit }>
                <input type="text" value={ this.state.inquiry } onChange={ this.handleChange } />
            </form>
            {topMovies}
            <DataDisplay sData={ this.state.sData } />
            <SceneOptionPanel />
        </div>
      )
    }
});
