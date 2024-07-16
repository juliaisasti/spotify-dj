import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/search/details", {
        params: { q: query },
      });
      setResults(response.data);
      console.log(results.track.name);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
      setResults(null);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for a track..."
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#147B38] dark:hover:bg-[#116930] dark:focus:ring-[#116930]"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results && (
        <div className="mt-8">
          <h2 className="text-red-500 text-lg font-bold mb-4">Track Details</h2>
          <div className="mb-4 text-red-500">
            <p>
              <strong>Name:</strong> {results.track.name}
            </p>
            <p>
              <strong>Artist:</strong> {results.track.artist}
            </p>
            <p>
              <strong>Album:</strong> {results.track.album}
            </p>
            {results.track.albumImageUrl && (
              <img src={results.track.albumImageUrl} alt={results.track.name} />
            )}
          </div>

          <h2 className="text-red-500 text-lg font-bold mb-4">
            Audio Features
          </h2>
          <p className="text-red-500">
            <strong>Tempo:</strong> {results.audioFeatures.tempo}
          </p>

          <h2 className="text-red-500 text-lg font-bold mb-4">
            Recommendations
          </h2>
          <ul>
            {results.recommendations.map((rec, index) => (
              <li key={index} className="text-red-500 mb-2">
                <p>
                  <strong>Name:</strong> {rec.name}
                </p>
                <p>
                  <strong>Artist:</strong> {rec.artist}
                </p>
                <p>
                  <strong>Album:</strong> {rec.album}
                </p>
                {rec.albumImageUrl && (
                  <img src={rec.albumImageUrl} alt={rec.name} />
                )}
                <p>
                  <strong>Tempo:</strong> {rec.tempo}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
