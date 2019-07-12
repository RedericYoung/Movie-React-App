import React, { Component } from 'react';
import MovieRowData from '../rows/MovieRow';
import '../MovieTables.scss';

export default class FavoritesTable extends Component {
    constructor() {
        super();

        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    removeFromFavorites(id) {
        this.props.onToggle(id);
    }

    render() {
        const movieData = this.props.data.map((value) => {
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
                        updateFavorites={this.removeFromFavorites}
                        showDelete={false}>
                    </MovieRowData>
        });

        return(
            <div>
                <h2>Favorite Movies</h2>
                <div className="movie-component">
                    <table>
                        <tbody>
                            <tr>
                                <th className='title'>Title</th>
                                <th className='count'>Vote Count</th>
                                <th className='count'>Average Vote</th>
                                <th className='count'>Popularity</th>
                                <th className='poster'>Poster</th>
                                {/* <th className='overview'>Overview</th> */}
                                <th className='action'>Favorite</th>
                            </tr>
                            {movieData}
                        </tbody>
                    </table> 
                </div>
            </div> 
        )
    }
}