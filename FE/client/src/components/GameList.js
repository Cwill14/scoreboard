import React from 'react';
import { graphql } from 'react-apollo';

import { getGamesQuery } from '../queries/queries';

const GameList = props => {

    const displayGames = () => {
        let data = props.data
        if (data.loading) {
            return (
                <p>loading games...</p>
            )
        } else {
            return data.games.map(game => {
                return (
                    <li key={game.id}>
                        <p>game ID: {game.id}</p>
                        <p>home score: {game.homeScore}</p>
                        <p>away score: {game.awayScore}</p>
                        <p>user: {game.user.username}</p>
                    </li>
                )
            })
        }
    }

    return (
        <div>
            <ul id="game-list">
                {displayGames()}
            </ul>
        </div>
    );
};

export default graphql(getGamesQuery)(GameList);