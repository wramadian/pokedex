import styled from '@emotion/styled'
import { Box, Chip, IconButton, Paper, Stack, Typography } from '@mui/material'
import TypeBadge from './TypeBadge'
import PropTypes from 'prop-types';
import { useFindPokemonId, usePokemonTypeData, useTitleCase } from '../utils/hooks';
import { statTitle } from '../utils/data';
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, CloseRounded } from '@mui/icons-material';
import PokemonBadge from './PokemonBadge';
import { createElement, useState } from 'react';

export default function Stats({
  selectedPokemon,
  handleClose
}) {

  const [currentPage, setCurrentPage] = useState(0);

  const pokemonName = useTitleCase(selectedPokemon?.name);
  const pokemonId = useFindPokemonId(selectedPokemon?.id);
  const backgroundColor = usePokemonTypeData(selectedPokemon?.types?.[0]?.type?.name);

  const pageMaster = [
    RenderStatsSection,
    RenderMovesSection,
    RenderPictureSection,
  ]

  const handleChangePage = (action) => () => {
    if (action === 'back'){
      if (currentPage === 0){
        setCurrentPage(2)
      } else {
        setCurrentPage(currentPage-1)
      }
    } else {
      if (currentPage === 2){
        setCurrentPage(0)
      } else {
        setCurrentPage(currentPage+1)
      }
    }
  }
  
  return (
    <StyledPaper>
      <Stack spacing={4}>
        <Box>
          <Stack
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
          >
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='flex-start'
              spacing={1}
            >
              <PokemonBadge 
                photo_url={selectedPokemon?.sprites?.front_default} 
                backgroundColor={backgroundColor?.darken}
              />
              <Box>
                <Stack
                  alignItems='baseline'
                  direction='row'
                  justifyContent='flex-start'
                >
                  <Typography 
                    sx={{fontWeight: 600}}
                    variant='h3'
                  >{pokemonName}</Typography>
                  <Typography 
                    color='#B3B3B3'
                    sx={{fontWeight: 600}}
                    variant='h4'
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
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Stack>
        </Box>
        {
          createElement(pageMaster[currentPage], {
            selectedPokemon
          })
        }
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='flex-end'
          spacing={1}
        >
          <IconButton onClick={handleChangePage('back')}><ArrowBackIosNewRounded /></IconButton>
          <IconButton onClick={handleChangePage('forward')}><ArrowForwardIosRounded /></IconButton>
        </Stack>
      </Stack>
    </StyledPaper>
  )
}

Stats.propTypes = {
  selectedPokemon: PropTypes.object,
  handleClose: PropTypes.func,
};

const StyledPaper = styled(Paper)`
  padding: 24px;
`

const RenderStatsSection = ({
  selectedPokemon
}) => {

  const statData = selectedPokemon?.stats?.reduce((result, stat) => {
    result[stat.stat.name] = stat.base_stat;
    return result;
  }, {});

  return (
    <Box>
      <Typography 
        sx={{fontWeight: 600}}
        variant='h5'
      >Stats</Typography>
      <Stack direction='row' spacing={2} flexWrap='wrap' justifyContent='space-between'>
        <Stack sx={{width: '40%', marginLeft: '16px !important'}} alignItems='flex-start'>
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
          statTitle.map((item) => (
            <Stack sx={{width: '40%'}} alignItems={'flex-start'} key={item.key}>
              <Typography variant='body1' color='#B3B3B3'>{item.label}</Typography>
              <Typography variant='h3'>{statData?.[item.key]}</Typography>
            </Stack>
          ))
        }
      </Stack>
    </Box>
  )
}

RenderStatsSection.propTypes = {
  selectedPokemon: PropTypes.object,
};

const RenderMovesSection = ({
  selectedPokemon
}) => {
  return (
    <Box>
      <Typography 
        sx={{fontWeight: 600}}
        variant='h5'
      >Moves</Typography>
      <Stack
        direction='row' 
        alignItems='center' 
        justifyContent='flex-start'
        flexWrap='wrap'
        sx={{gap: 1}}
      >
        {
          selectedPokemon?.moves?.map((move) => (
            <Chip label={move?.move?.name} key={move?.move?.name} />
          ))
        }
      </Stack>
    </Box>
  )
}

RenderMovesSection.propTypes = {
  selectedPokemon: PropTypes.object,
};

const RenderPictureSection = ({
  selectedPokemon
}) => {
  return (
    <Box>
      <Typography 
        sx={{fontWeight: 600}}
        variant='h5'
      >Pics</Typography>
      <img src={selectedPokemon?.sprites?.other?.home?.front_default} alt="" />
    </Box>
  )
}

RenderPictureSection.propTypes = {
  selectedPokemon: PropTypes.object,
};