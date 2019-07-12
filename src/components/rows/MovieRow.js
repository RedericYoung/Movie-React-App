import React, { Component } from 'react';
import './MovieRow.scss';

export default class MovieRowData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleUserInput: false,
            inputValue: '',
            imgSrc: `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${this.props.poster_path}`
        }
        this.removeListing = this.removeListing.bind(this);
        this.toggleUserInput = this.toggleUserInput.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    removeListing() {
        this.props.onRemoveListing(this.props.id);
    }

    addToFavorites() {
        this.props.updateFavorites(this.props.id);
    }

    toggleUserInput() {
        this.setState({
            toggleUserInput: true
        });
    }

    handleChangeInput(event) {
        const { value } = event.target;
        const newRating = parseInt(value);

        if(newRating && newRating > 0 && newRating <= 10) {
            this.props.onRatingUpdate(this.props.id, newRating);
            this.setState({
                toggleUserInput: false
            });
        }
    }

    render() {
        return (
            <tr className="movie-data-row">
                <td className="title">{this.props.title}</td>
                <td className="count">{this.props.vote_count}</td>
                <td className="count rating-score">
                    {this.state.toggleUserInput ? (
                        <input 
                            onBlur={this.handleChangeInput}
                            placeholder={this.props.vote_average}
                            maxLength="3" 
                            type="text"/>
                    ) : (
                        <span onClick={this.toggleUserInput}>
                            {this.props.vote_average}
                        </span>
                    )}
                    
                </td>
                <td className="count">{this.props.popularity}</td>
                <td><img src={this.state.imgSrc} alt={this.props.overview} /></td>
                <td>
                    <input 
                        defaultChecked={this.props.favorite}
                        onClick={this.addToFavorites} 
                        type="checkbox"/>
                </td>
                {this.props.showDelete ? (
                        <td>
                            <button onClick={this.removeListing}>Delete</button>
                        </td>
                    ) : (
                        <td></td>
                    )}
                
            </tr>
        );
    }
}