import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=d31aa2df";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    };


    useEffect(() => {
        searchMovies("avengers");
    }, []);

    return (
        <div className="app">
            <h1>MovieIsland</h1>
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for a movie"
                    value={searchValue}
                    onChange={(val) => setSearchValue(val.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={() => searchMovies(searchValue)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map(movie => (
                        <MovieCard movie={movie} />
                    ))
                    }
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}


        </div>
    );
}

export default App;
