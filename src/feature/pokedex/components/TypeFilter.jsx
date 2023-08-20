import { Box, Stack } from '@mui/material';
import { TypeBadge } from '../components'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPokemonType } from '../utils/api';

export default function TypeFilter({
  selectedType,
  setSelectedType
}) {

  const [typeList, setTypeList] = useState([]);

  const handleSelectType = (type) => {
    if (type.name === selectedType.name){
      setSelectedType({})
    } else {
      setSelectedType(type)
    }
  }

  useEffect(() => {
    getPokemonType().then((data) => {
      setTypeList(data.results);
    })
  }, [])
  
  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
      flexWrap='wrap'
      sx={{gap: 1, marginLeft: 2}}
    >
      {
        typeList.map((type, index) => (
          <Box 
            onClick={() => handleSelectType(type)} 
            key={index}
            sx={{width: 'calc(100% / 11)'}}
          >
            <TypeBadge  
              isBadgeActive={type?.name === selectedType.name}
              isSelection={true}
              typeName={type?.name}
            />
          </Box>
        ))
      }
    </Stack>
  )
}

TypeFilter.propTypes = {
  selectedType: PropTypes.object,
  setSelectedType: PropTypes.func,
};