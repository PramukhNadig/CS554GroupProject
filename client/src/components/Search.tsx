import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ShowSets from './ShowSets';
import cookies from "../helpers/cookies";
import { Navigate } from "react-router-dom";


function App() { 
    
    const [searchTerm, setSearchTerm] = useState(useParams().searchTerm || "");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        let cancelToken = axios.CancelToken.source();
        const fetchSets = async () => {
            setLoading(true);
            setError(false);
            try {
                setSearchResults([]);
                let url = 'http://localhost:4000/v1/sets/';
                const res = await axios.get(url, { cancelToken: cancelToken.token });
                let filteredResults = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].subject.toLowerCase().includes(searchTerm.toLowerCase()) || res.data[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || res.data[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        filteredResults.push(res.data[i]);
                    }
                }
                setSearchResults(filteredResults.slice(0, 10));
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled');
                } else {
                    setError(true);
                }
            }
            setLoading(false);
        }
        fetchSets();
        return () => {
            cancelToken.cancel('Search term changed');
        };
    }, [searchTerm, refresh]);
    

    if (cookies.doesExist("username") === false) {
        return (<Navigate to="/login" />);
    }

    const onSetDeleted = (setId: string) => {
        setSearchResults(searchResults.filter((set) => set._id !== setId));
        setRefresh(!refresh);
    }
      

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
            {searchResults.length > 0 && <ShowSets sets={searchResults} onSetDeleted={onSetDeleted} />}
        </div>
    );
}

export default App;
