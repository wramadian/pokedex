import styled from '@emotion/styled';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function PokemonBadge({
  photo_url,
  backgroundColor = '#FFF'
}) {
  return (
    <BorderedBagde backgroundColor={backgroundColor}>
      <img 
        src={photo_url} 
        alt="pokemon icon" 
        style={{
          width: 95,
          height: 95
        }}
      />
    </BorderedBagde>
  )
}

PokemonBadge.propTypes = {
  photo_url: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const BorderedBagde = styled(Box)`
  border-radius: 12px;
  background: ${(_) => _.backgroundColor};
  height: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
`