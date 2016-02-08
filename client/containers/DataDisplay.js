import React, { Component } from 'react'

module.exports = React.createClass({
    render: function() {
        return (<div className="prod-data-display">
            { this.props.sData.map(x => <div className="prod-item">
                <img src={ x.Poster }/>
                <p>{ x.Plot }</p>
                <ul>
                    <li>Actors: { x.Actors }</li>
                    <li>Year: { x.Year }</li>
                    <li>IMDB Rating: { x.imdbRating }</li>
                    <li>IMDB Votes: { x.imdbVotes }</li>
                </ul>
            </div>) }
        </div>)
    }
});