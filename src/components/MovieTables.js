import React, { Component } from 'react';
import _ from 'lodash';
import './MovieTables.scss';
import MovieRowData from './rows/MovieRow';
import MovieService from '../service/MovieService';
import FavoritesTable from './favorites/FavoritesTable';

export default class MovieTables extends Component {
    constructor() {
        super();
        this.movieService = new MovieService();
        this.removeRow = this.removeRow.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);

        this.state = {
            tableData: [],
            currentSorted: ''
        }
    }

    componentDidMount() {
        this.movieService.getNowPlaying().then((response) => {
            this.updateComponentState(response.results);
        });
    }

    sortColumns(sortBy) {
        const rowsOfData = _.sortBy(this.state.tableData, sortBy);

        if (sortBy === this.state.currentSorted) {
            this.updateComponentState(rowsOfData.reverse(), null);
        }
        this.updateComponentState(rowsOfData, sortBy);
    }

    removeRow(id) {
        const rowsOfData = this.state.tableData;

        _.remove(rowsOfData, {
            id: id
        });
        
        this.updateComponentState(rowsOfData);
    }

    updatingRating(id, newRating) {
        const rowsOfData = this.findRow;
        const index = _.findIndex(rowsOfData, function(o) { 
            return o.id === id; 
        });

        rowsOfData[index].vote_average = newRating;
        this.updateComponentState(rowsOfData);
    }

    toggleFavorite(id) {
        let addToFavorites = null;
        const rowsOfData = this.findRow;
        const index = _.findIndex(rowsOfData, function(o) { 
            return o.id === id; 
        });

        // Toggle Off
        if (rowsOfData[index].favorite && 
            rowsOfData[index].favorite === true) {
                addToFavorites = false;
        } else {
            addToFavorites = true;
        }

        rowsOfData[index].favorite = addToFavorites;
        this.updateComponentState(rowsOfData);
    }

    updateComponentState(rowsOfData, sortBy) {
        this.setState({
            tableData: rowsOfData,
            currentSorted: sortBy
        });
    }

    render() {
        const movieData = this.state.tableData.map((value) => {
            return <MovieRowData 
                        key={value.id} 
                        id={value.id}
                        title={value.title}
                        vote_count={value.vote_count}
                        popularity={value.popularity}
                        poster_path={value.poster_path}
                        overview={value.overview}
                        favorite={value.favorite}
                        vote_average={value.vote_average}
                        onRemoveListing={this.removeRow}
                        updateFavorites={this.toggleFavorite}
                        onRatingUpdate={this.updatingRating}
                        showDelete={true}>
                    </MovieRowData>
        });

        const favoritedRows = this.state.tableData.filter(row => {
            return row.vote_average > 7 || row.favorite === true;
        });

        const favoriteData = _.sortBy(favoritedRows, 'vote_count');

        return (
            <div>
                <h2>Latest Movies</h2>
                <div className="movie-component">
                    <table>
                        <tbody>
                            <tr>
                                <th onClick={() => this.sortColumns('title')} className='title'>Title</th>
                                <th onClick={() => this.sortColumns('vote_count')} className='count'>Vote Count</th>
                                <th onClick={() => this.sortColumns('vote_average')} className='count'>Average Vote</th>
                                <th onClick={() => this.sortColumns('popularity')} className='count'>Popularity</th>
                                <th className='poster'>Poster</th>
                                {/* <th className='overview'>Overview</th> */}
                                <th className='action'>Favorite</th>
                                <th className='action'>Delete</th>
                            </tr>
                            {movieData}
                        </tbody>
                    </table>    
                </div>   
                <FavoritesTable 
                    data={favoriteData}
                    onToggle={this.toggleFavorite}></FavoritesTable>      
            </div>
        );
    }
}