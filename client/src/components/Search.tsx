import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function App() { 
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        const fetchSets = async () => {
            setLoading(true);
            setError(false);
            try {
                setSearchResults([]);
                let url = 'http://localhost:4000/v1/sets/';
                const res = await axios.get(url);
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].subject.includes(searchTerm) || res.data[i].title.includes(searchTerm) || res.data[i].description.includes(searchTerm)) {
                        setSearchResults(searchResults => [...searchResults, res.data[i]]);
                    }
                }

            } catch (err) {
                setError(true);
            }
            setLoading(false);
        }
        fetchSets();
    }
        , [searchTerm]);
    
    const navigate = useNavigate();
    const card = (set: any) => (
        <div>
            <button onClick={() => {
                navigate("/set/" + set._id);
            }}>
                <h3>{set.subject}</h3>
                <h3>{set.title}</h3>
                <h3>{set.description}</h3>
            </button>
        </div>
    );
    return (
        <div className="App">
            <h1>Search</h1>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            {searchResults.length === 0 && <p>No results for </p> + searchTerm}
            {searchResults.length > 0 && searchResults.map(card)}
        </div>
    );
}

export default App;