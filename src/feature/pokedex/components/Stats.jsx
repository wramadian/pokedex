import styled from '@emotion/styled'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import TypeBadge from './TypeBadge'

const statTitle = [
  'HP',
  'Attack',
  'Defense',
  'Sp. Attack',
  'Sp. Defense',
  'Speed'
]

export default function Stats() {
  return (
    <StyledPaper>
      <Stack spacing={2}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <Typography 
            sx={{fontWeight: 600}}
            variant='h6'
          >Bulbasaur</Typography>
          <Typography 
            color='#B3B3B3'
            sx={{fontWeight: 600}}
            variant='h6'
          >#0001</Typography>
        </Stack>
        <Box>
          <Typography 
            sx={{fontWeight: 600}}
            variant='h6'
          >Type</Typography>
          <Stack 
            direction='row'
            alignItems='center'
            sx={{gap: 1}}
          >
            {
              Array.from({length: 2}).map((_, index) => (
                <TypeBadge key={index} />
              ))
            }
          </Stack>
        </Box>
        <Box>
          <Typography 
            sx={{fontWeight: 600}}
            variant='h6'
          >Weakness</Typography>
          <Stack 
            direction='row'
            alignItems='center'
            flexWrap='wrap'
            sx={{gap: 1}}
          >
            {
              Array.from({length: 5}).map((_, index) => (
                <TypeBadge key={index} />
              ))
            }
          </Stack>
        </Box>
        <Box>
          <Typography 
            sx={{fontWeight: 600}}
            variant='h6'
          >Stats</Typography>
          <Stack spacing={1}>
            {
              statTitle.map((item) => (
                <Stack 
                  key={item}
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography variant='body1'>{item}</Typography>
                  <RenderStatBar />
                </Stack>
              ))
            }
          </Stack>
        </Box>
        <Stack 
          direction='row'
          justifyContent='flex-end'
        >
          <Button variant='contained'>
            Details
          </Button>
        </Stack>
      </Stack>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 1.5rem;
`

const AbilityBar = styled(Box)`
  width: ${(_) => _.barWidth ? _.barWidth : '300px'};
  height: 20px;
  background-color: ${(_) => _.barColor ? _.barColor : '#DEDEDE'};
`

const RenderStatBar = () => {
  return (
    <AbilityBar>
      <AbilityBar  barColor='#9BCC50' barWidth='100px' />
    </AbilityBar>
  )
}