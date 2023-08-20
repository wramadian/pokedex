import styled from '@emotion/styled'
import { Box } from '@mui/material'

export default function PokemonBadge() {
  return (
    <BorderedBagde>
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png" 
        alt="pokemon icon" 
        style={{
          width: 95,
          height: 95
        }}
      />
    </BorderedBagde>
  )
}

const BorderedBagde = styled(Box)`
  border-radius: 1rem;
  border: 2px solid #B3B3B3;
  background: #FFF;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`