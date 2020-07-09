import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { getUsersQuery } from '../queries/queries';
import { addGameMutation } from '../mutations/mutations';

const AddGame = props => {
    
    const [state, setState] = useState({
        homeScore: 0,
        awayScore: 0,
        userId: ""
    })

// potential hooks version for mutation
//     import { useQuery, useMutation } from '@apollo/react-hooks';


//   const [addBookMut, { dataMutation }] = useMutation(addBookMutation);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addBookMut({
//       variables: {
//         name: form.name,
//         genre: form.genre,
//         authorId: form.authorId,
//       },
//     });
//   };

    const displayUsers = () => {
        let data = props.data
        if(data.loading) {
            return (<option disabled>loading users...</option>)
        } else {
            return (
                data.users.map(user => {
                    return <option 
                        key={user.id} 
                        value={user.id}
                    >
                        {user.username}
                    </option>
                })
            )
        }
    }

    const handleChanges = e => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submit = e => {
        e.preventDefault()
        console.log(state)
        setState({
            homeScore: 0,
            awayScore: 0,
            userId: ""
        })
    }

    return (
        <div>
            add game:
            <form onSubmit={submit}>
                <label>
                    home score
                    <input
                        type="number"
                        onChange={handleChanges}
                        value={state.homeScore}
                        name="homeScore"
                    />
                </label>
                <label>
                    away score
                    <input
                        type="number"
                        onChange={handleChanges}
                        value={state.awayScore}
                        name="awayScore"
                    />
                </label>
                <label>
                    user
                    <select
                        onChange={handleChanges}
                        value={state.userId}
                        name="userId"
                    >
                        <option>select user</option>
                        { displayUsers() }
                    </select>
                </label>
                <button>submit</button>
            </form>
        </div>
    );
};

export default graphql(getUsersQuery)(AddGame);