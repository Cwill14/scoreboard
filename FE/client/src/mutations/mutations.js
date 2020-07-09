import { gql } from 'apollo-boost';

const addGameMutation = gql`
    mutation {
        addGame(homeScore: 0, awayScore: 0, userId: ""){
            id
            userId
        }
    }
`

export { addGameMutation };