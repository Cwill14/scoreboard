import { gql } from 'apollo-boost';

const getGamesQuery = gql`
    {
        games {
            id
            homeScore
            awayScore
            user {
                username
                id
            }
        }
    }
`

const getUsersQuery = gql`
    {
        users {
            username
            id
        }
    }
`
export {getGamesQuery, getUsersQuery}