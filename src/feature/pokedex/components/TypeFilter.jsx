import { Button, Stack } from '@mui/material';
import { TypeBadge } from '../components'

export default function TypeFilter() {
  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
    >
      {
        Array.from({length: 7}).map((_, index) => (
          <TypeBadge key={index} />
        ))
      }
      <Button variant='outlined'>View All</Button>
    </Stack>
  )
}
