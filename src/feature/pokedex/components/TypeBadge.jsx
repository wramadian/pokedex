import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { usePokemonTypeData } from '../utils/hooks'
import PropTypes from 'prop-types';

export default function TypeBadge({
  typeName,
  isBadgeActive,
  isSelection
}) {

  const badgeInfo = usePokemonTypeData(typeName);

  return (
    <StyledBadge 
      alignItems='center' 
      justifyContent='center'
      badgeColor={isBadgeActive ? '#FFF' : badgeInfo?.color}
      borderColor={badgeInfo?.color}
      isSelection={isSelection}
    >
      <Typography 
        align='center'
        color={isBadgeActive ? badgeInfo?.color : badgeInfo?.textColor}
        sx={{fontWeight: 'bold'}}
        variant='body1' 
      >{badgeInfo?.label}</Typography>
    </StyledBadge>
  )
}

TypeBadge.propTypes = {
  typeName: PropTypes.string.isRequired,
  isBadgeActive: PropTypes.bool,
  isSelection: PropTypes.bool,
};

TypeBadge.defaultProps = {
  typeName: 'unknown',
  isBadgeActive: false,
  isSelection: false
};

const StyledBadge = styled(Box)`
  width: 100%;
  border-radius: 12px;
  height: 50px;
  background: ${(_) => _.badgeColor};
  display: flex;
  cursor: ${(_) => _.isSelection ? 'pointer' : 'auto'};
  border: ${(_) => `1px solid ${_.borderColor}`}
`