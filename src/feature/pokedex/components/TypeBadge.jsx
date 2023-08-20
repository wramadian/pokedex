import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export default function TypeBadge() {
  return (
    <StyledBadge alignItems='center' justifyContent='center'>
      <Typography 
        align='center'
        color='#FFF'
        sx={{fontWeight: 'bold'}}
        variant='body1' 
      >Grass</Typography>
    </StyledBadge>
  )
}

const StyledBadge = styled(Box)`
  width: 8rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: #9BCC50;
  display: flex;
`