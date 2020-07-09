import React from 'react';
import { graphql } from 'react-apollo';

import { getUsersQuery } from '../queries/queries';

const AddGame = props => {
    
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

    return (
        <div>
            add game:
            <form>
                <label>
                    home score
                    <input
                        type="number"
                    />
                </label>
                <label>
                    away score
                    <input
                        type="number"
                    />
                </label>
                <label>
                    user
                    <select>
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