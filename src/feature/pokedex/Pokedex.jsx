import { Stack } from '@mui/material';
import { PokemonList, PokemonListForFilteredType, TypeFilter } from './components';
import { useState } from 'react';

export default function Pokedex() {

  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [selectedType, setSelectedType] = useState({});

  return (
    <Stack 
      direction='row'
      spacing={2}
      sx={{
        padding: 1, 
        position: 'relative',
      }}
    >
      <Stack spacing={2} sx={{maxWidth: 1080, margin: 'auto !important'}}>
        <TypeFilter 
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        {
          selectedType?.url ?
          <PokemonListForFilteredType 
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
            selectedType={selectedType}
          /> :
          <PokemonList 
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
            selectedType={selectedType}
          />
        }
      </Stack>
    </Stack>
  )
}
