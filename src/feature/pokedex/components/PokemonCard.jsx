import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getDataFromUrl } from '../utils/api';
import { useFindPokemonId, usePokemonTypeData, useTitleCase } from '../utils/hooks';

export default function PokemonCard({
  url,
  selectedPokemon,
  handleSelectPokemon
}) {

  const [pokemonDetail, setPokemonDetail] = useState({});

  const pokemonName = useTitleCase(pokemonDetail?.name);
  const pokemonId = useFindPokemonId(pokemonDetail?.id)
  const firstBackgroundColor = usePokemonTypeData(pokemonDetail?.types?.[0]?.type?.name);
  const secondBackgroundColor = usePokemonTypeData(
    pokemonDetail?.types?.length > 1 
    ? pokemonDetail?.types?.[1]?.type?.name
    : pokemonDetail?.types?.[0]?.type?.name
  );


  useEffect(() => {
    getDataFromUrl(url).then(data => {
      setPokemonDetail(data)
    })
  }, [url])


  return (
    <Box p={1}>
      <CardContainer 
        isSelected={selectedPokemon}
        borderColor={firstBackgroundColor?.color}
        onClick={() => handleSelectPokemon(pokemonDetail)}
      >
        <PhotoContainer
          firstColor={firstBackgroundColor?.color}
          secondColor={secondBackgroundColor?.color}
        >
          <img 
            src={pokemonDetail?.sprites?.other?.['official-artwork']?.front_default} 
            alt={pokemonDetail?.name} 
            style={{
              aspectRatio: '1/1',
              height: '80%'
            }}
          />
        </PhotoContainer>
        <NameContainer>
          <Typography 
            sx={{fontWeight: 600}}
            variant='body1'
          >{pokemonName}</Typography>
          <Typography 
            color='#DEDEDE'
            sx={{fontWeight: 600}}
            variant='body1'
          >{pokemonId}</Typography>
        </NameContainer>
      </CardContainer>
    </Box>
  )
}

PokemonCard.propTypes = {
  url: PropTypes.string,
  selectedPokemon: PropTypes.object,
  handleSelectPokemon: PropTypes.func
};

const CardContainer = styled(Box)`
 border-radius: 24px; 
 overflow: hidden;
 border: ${(_) => _.isSelected ? `1px solid ${_.borderColor}` : 'none'};
 cursor: pointer;
`

const PhotoContainer = styled(Box)`
  width: 100%;
  aspect-ratio: 1/1;
  background: ${(_) => `linear-gradient(135deg, ${_.firstColor} 0%, #FFF 50%, ${_.secondColor} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
`

const NameContainer = styled(Box)`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 240/78;
  background: #FFF;
  padding: 12px 24px 0 24px;
`