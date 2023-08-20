import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export default function PokemonCard() {
  return (
    <Box p={1}>
      <CardContainer>
        <PhotoContainer>
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" 
            alt="pokemon photo" 
          />
        </PhotoContainer>
        <NameContainer>
          <Typography 
            sx={{fontWeight: 600}}
            variant='body1'
          >Bulbasaur</Typography>
          <Typography 
            color='#DEDEDE'
            sx={{fontWeight: 600}}
            variant='body1'
          >#0001</Typography>
        </NameContainer>
      </CardContainer>
    </Box>
  )
}

const CardContainer = styled(Box)`
 border-radius: 24px; 
 overflow: hidden;
 border: 1px solid #9BCC50;
`

const PhotoContainer = styled(Box)`
  width: 100%;
  aspect-ratio: 1/1;
  background: linear-gradient(135deg, #9BCC50 0%, #FFF 50%, #B97FC9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* filter: blur(2px); */
`

const NameContainer = styled(Box)`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 240/78;
  background: #FFF;
  padding: 12px 24px 0 24px;
`