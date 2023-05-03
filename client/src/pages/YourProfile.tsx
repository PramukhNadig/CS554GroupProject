import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function App() {
    const { data } = useQuery(["MySets"], () => {
        return axios.get("/v1/users/auth").then((res) => {
        return res.data;
        });
    });

    
    if (data._id === undefined) { 
        return (
            <div className="app">
                <h1>My Profile</h1>
                <h2>Log in to view your profile</h2>
            </div>
        );
    }


  return (
      <div className="app">
          <h1>My Profile</h1>
          <h2>{data.username}</h2>
          <h2>{data.email}</h2>    
          <h2>{data.owned_sets}</h2>
          <h2>{data.saved_sets}</h2>
    </div>
);
}

export default App;
