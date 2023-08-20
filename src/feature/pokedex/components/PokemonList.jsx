import { Box, CircularProgress, Stack } from '@mui/material';
import PokemonCard from './PokemonCard';
import { useEffect, useState, useRef } from 'react';
import { getPokemonList } from '../utils/api';
import PropTypes from 'prop-types';

export default function PokemonList({
  selectedPokemon,
  setSelectedPokemon
}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);

  const handleSelectPokemon = (data) => {
    setSelectedPokemon(data);
  }

  const loadMorePokemons = async () => {
    setLoading(true);
    const data = await getPokemonList({ offset });
    setPokemonList(prevList => [...prevList, ...data.results]);
    setOffset(prevOffset => prevOffset + data.results.length);
    setLoading(false);
  };

  useEffect(() => {
    loadMorePokemons();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadMorePokemons();
      }
    }, options);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef.current, offset, loading]);

  return (
    <Stack direction='row' flexWrap='wrap'>
      {pokemonList.map((pokemon) => (
        <Box sx={{ width: 'calc(100% / 5)' }} key={pokemon.name}>
          <PokemonCard
            url={pokemon.url}
            selectedPokemon={selectedPokemon?.name === pokemon.name}
            handleSelectPokemon={handleSelectPokemon}
          />
        </Box>
      ))}
      <Box 
        ref={loadingRef} 
        style={{ height: '20px' }} 
      />
      {loading && (
        <Stack 
          justifyContent='center' 
          alignItems='center'
          sx={{
            height: 100,
            width: '100%'
          }}
        >
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
}

PokemonList.propTypes = {
  selectedPokemon: PropTypes.object,
  setSelectedPokemon: PropTypes.func,
};
