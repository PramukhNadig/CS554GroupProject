
import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App(name: any) {

    const [set, setSets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    
    useEffect(() => {
    const fetchSets = async () => {
        setLoading(true);
        setError(false);
        try {
            let url = 'http://localhost:4000/v1/sets/sets/' + name.name;
            console.log(url)
            const res = await axios.get(url);
            console.log(res.data)
            setSets(res.data);
        } catch (err) {
            setError(true);
        }
        setLoading(false);
        }
        fetchSets();
        console.log(name)
    }, [name]);
        

    return (
        <div className="App">
            <h1>Home</h1>

            <h3>Sets</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            {set.map((Set: { _id: string | number | undefined; subject: React.ReactNode; title: React.ReactNode; description: React.ReactNode; }) => (
                <div key={Set._id}>
                    <h3>{Set.subject}</h3>
                    <h3>{Set.title}</h3>
                    <h3>{Set.description}</h3>
                </div>
            ))}
        </div>
    );

};


export default App;
