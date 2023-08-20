import { Box, Dialog, Stack } from '@mui/material';
import { PokemonCard, Stats } from '.';
import { useEffect, useState, useRef } from 'react';
import { getDataFromUrl } from '../utils/api';
import PropTypes from 'prop-types';

export default function PokemonListForFilteredType({
  selectedPokemon,
  setSelectedPokemon,
  selectedType,
}) {
  
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(20);
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  const loadingRef = useRef(null);

  const handleOpenStatsDialog = () => {
    setOpenStatsDialog((prev) => !prev)
    if (openStatsDialog){
      setSelectedPokemon({})
    }
  }

  const handleSelectPokemon = (data) => {
    setSelectedPokemon(data);
    handleOpenStatsDialog()
  }

  const loadMorePokemons = async () => {
    if (pokemonList.length > offset){
      setOffset(offset + 20)
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
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
  }, [loadingRef.current, offset]);

  useEffect(() => {
    if (selectedType.url){
      setOffset(20)
      getDataFromUrl(selectedType?.url).then((data) => {
        const mappedData = data.pokemon.map((item) => (
          {
            name: item.pokemon.name,
            url: item.pokemon.url
          }
        ))
        setPokemonList(mappedData)
      })
    }
  }, [selectedType?.url])

  return (
    <Stack direction='row' flexWrap='wrap'>
      {pokemonList.slice(0, offset).map((pokemon) => (
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
      <Dialog
        open={openStatsDialog}
        onClose={handleOpenStatsDialog}
      >
        <Stats 
          selectedPokemon={selectedPokemon} 
          handleClose={handleOpenStatsDialog}
        />
      </Dialog>
    </Stack>
  );
}

PokemonListForFilteredType.propTypes = {
  selectedPokemon: PropTypes.object,
  setSelectedPokemon: PropTypes.func,
  selectedType: PropTypes.object,
};