import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

interface SearchProps {
    searchTerm: string;
}
function App() { 
    
    const [searchTerm, setSearchTerm] = useState(useParams().searchTerm || "");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
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

    if (searchResults.length === 0) {
        return (
            <div className="App">
                <h1>Search</h1>
                <input type="text" placeholder="Search" value={searchTerm} onSubmit={handleSubmit} onChange={onChange} />
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
                <p>No Results For {searchTerm}</p>
            </div>
        );
    }
    return (
        <div className="App">
            <h1>Search</h1>
            <input type="text" placeholder="Search" value={searchTerm} onSubmit={handleSubmit} onChange={onChange} />
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            {searchResults.length > 0 && searchResults.map(card)}
        </div>
    );
}

export default App;