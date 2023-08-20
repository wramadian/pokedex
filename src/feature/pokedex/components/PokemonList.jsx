import { Grid } from '@mui/material';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
  return (
    <Grid container>
      {
        Array.from({length: 6}).map((_, index) => (
          <Grid item xs={3} key={index}>
            <PokemonCard />
          </Grid>
        ))
      }
    </Grid>
  )
}
