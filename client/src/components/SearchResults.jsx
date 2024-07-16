import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!searchResults) {
    return <div>Cargando resultados...</div>;
  }

  return (
    <div>
      <h2>Resultados de búsqueda para "{query}"</h2>
      {/* Aquí puedes mostrar los resultados como prefieras */}
    </div>
  );
};

export default SearchResult;
