import styled from '@emotion/styled'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import TypeBadge from './TypeBadge'
import PropTypes from 'prop-types';
import { useFindPokemonId, useTitleCase } from '../utils/hooks';
import { statTitle } from '../utils/data';

export default function Stats({
  selectedPokemon
}) {

  const pokemonName = useTitleCase(selectedPokemon?.name);
  console.log("💃 ~ file: Stats.jsx:13 ~ pokemonName:", selectedPokemon?.height*10)
  const pokemonId = useFindPokemonId(selectedPokemon?.id);

  const statData = selectedPokemon?.stats?.reduce((result, stat) => {
    result[stat.stat.name] = stat.base_stat;
    return result;
  }, {});
  

  return (
    <StyledPaper>
      <Stack spacing={4}>
        <Box>
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='space-between'
          >
            <Typography 
              sx={{fontWeight: 600}}
              variant='h3'
            >{pokemonName}</Typography>
            <Typography 
              color='#B3B3B3'
              sx={{fontWeight: 600}}
              variant='h3'
            >{pokemonId}</Typography>
          </Stack>
          <Stack 
            direction='row'
            alignItems='center'
            justifyContent='flex-start'
            spacing={1}
          >
            {
              selectedPokemon?.types?.map((type, index) => (
                <TypeBadge 
                  key={index} 
                  typeName={type?.type?.name}
                />
              ))
            }
          </Stack>
        </Box>
        <Box>
          <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
            <Stack sx={{width: '40%', marginLeft: '16px !important'}} alignItems='flex-end'>
              <Typography variant='body1' color='#B3B3B3'>Height</Typography>
              <Typography variant='h3'>{
                (selectedPokemon?.height*10)%1 !== 0 
                  ? Number(selectedPokemon?.height*10).toFixed(1)
                  : selectedPokemon?.height*10
              } cm</Typography>
            </Stack>
            <Stack sx={{width: '40%'}} alignItems='flex-start'>
              <Typography variant='body1' color='#B3B3B3'>Weight</Typography>
              <Typography variant='h3'>{
                (selectedPokemon?.weight*0.1)%1 !== 0 
                  ? Number(selectedPokemon?.weight*0.1).toFixed(1)
                  : selectedPokemon?.weight*0.1
              } kg</Typography>
            </Stack>
            {
              statTitle.map((item, index) => (
                <Stack sx={{width: '40%'}} alignItems={index%2 === 0 ? 'flex-end' : 'flex-start'} key={item.key}>
                  <Typography variant='body1' color='#B3B3B3'>{item.label}</Typography>
                  <Typography variant='h3'>{statData?.[item.key]}</Typography>
                </Stack>
              ))
            }
          </Stack>
        </Box>
        <Stack 
          direction='row'
          justifyContent='flex-end'
        >
          <Button variant='text'>
            Details
          </Button>
        </Stack>
      </Stack>
    </StyledPaper>
  )
}

Stats.propTypes = {
  selectedPokemon: PropTypes.object,
};

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 1.5rem;
`
