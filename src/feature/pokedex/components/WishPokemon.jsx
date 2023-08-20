import styled from '@emotion/styled'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import PokemonBadge from './PokemonBadge'

export default function WishPokemon() {
  return (
    <StyledPaper>
      <Stack spacing={1}>
        <Stack 
          alignItems='baseline' 
          direction='row' 
          justifyContent='space-between'
        >
          <Typography 
            variant='h6'
            sx={{fontWeight: 600}}
          >Dream Pokemon</Typography>
          <Button
            variant='text'
          >
            <Typography 
              sx={{fontWeight: 600}}
              variant='caption'
            >View All</Typography>
          </Button>
        </Stack>
        <Grid container>
          {
            Array.from({length: 11}).map((_, index) => (
              <Grid item xs={2} key={index}>
                <PokemonBadge />
              </Grid>
            ))
          }
          <Grid item xs={2}>
            <BorderedNumberCount>
              <Typography 
                color='#B3B3B3'
                variant='h6'
                sx={{
                  fontWeight: 600,
                  fontSize: 32
                }}
              >+2</Typography>
            </BorderedNumberCount>
          </Grid>
        </Grid>
      </Stack>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 1.5rem;
`

const BorderedNumberCount = styled(Box)`
  border-radius: 1rem;
  border: 2px solid #B3B3B3;
  background: #FFF;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`