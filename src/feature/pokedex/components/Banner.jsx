import styled from '@emotion/styled';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

export default function Banner() {
  return (
    <StyledBanner>
      <Stack 
        alignItems='center' 
        direction='row' 
        justifyContent='space-between'
      >
        <Stack 
          justifyContent='space-between'
          sx={{
            minHeight: 250,
            marginRight: 16
          }}
        >
          <img 
            alt='catch em logo' 
            src="/images/catch'em_logo.png" 
            style={{
              width: 180,
              height: 87,
              marginBottom: 32,
            }}
          />
          <Box>
            <Typography 
              color='#FFF'
              sx={{fontWeight: 600}} 
              variant='h6' 
            >Jelajahi dunia Pokémon yang penuh petualangan, tangkap makhluk-makhluk menakjubkan, dan buktikan kemampuanmu sebagai seorang Trainer terbaik!</Typography>
            <Button 
              size='large'
              sx={{marginTop: 2}}
              variant='contained'
            >Play Now!</Button>
          </Box>
        </Stack>
        <img 
          alt='catch em logo' 
          src="/images/charizard.png" 
          style={{
            transform: 'scaleX(-1)',
            height: 250,
            width: 250
          }}
        />
      </Stack>
    </StyledBanner>
  )
}

const StyledBanner = styled(Paper)`
  padding: 32px;
  border-radius: 1.5rem;
  background: linear-gradient(165deg, #29211F 0%, #846659 100%);
`
