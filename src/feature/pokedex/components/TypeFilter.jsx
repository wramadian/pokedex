import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { TypeBadge } from '../components'
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CloseRounded } from '@mui/icons-material';
import { getPokemonType } from '../utils/api';

export default function TypeFilter({
  selectedType,
  setSelectedType
}) {

  const [typeList, setTypeList] = useState([]);
  const [slicedMasterType, setSliceMasterType] = useState([]);
  const [openAllTypesDialog, setOpenAllTypesDialog] = useState(false);

  const handleSelectType = (type) => {
    setSelectedType(type)
  }

  const handleOpenAllTypesDialog = () => {
    setOpenAllTypesDialog((prev) => !prev);
  }

  useEffect(() => {
    if (selectedType?.name){
      setSliceMasterType([
          selectedType, 
          ...typeList.filter((type) => type.name !== selectedType.name).slice(0, 5)
        ])
    }
  }, [selectedType.name])

  useEffect(() => {
    getPokemonType().then((data) => {
      setTypeList(data.results);
      setSliceMasterType(data.results.slice(0, 6));
    })
  }, [])
  
  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
      flexWrap='wrap'
    >
      {
        slicedMasterType.map((type, index) => (
          <Box onClick={() => handleSelectType(type)} key={index}>
            <TypeBadge  
              isBadgeActive={type?.name === selectedType.name}
              isSelection={true}
              typeName={type?.name}
            />
          </Box>
        ))
      }
      <Button 
        onClick={handleOpenAllTypesDialog}
        variant='text'
      >
        <Typography 
          sx={{fontWeight: 600}}
          variant='caption'
        >View All</Typography>
      </Button>
      <Dialog
        open={openAllTypesDialog}
        onClose={handleOpenAllTypesDialog}
      >
        <RenderViewAllTypes 
          handleSelectType={handleSelectType}
          handleOpenAllTypesDialog={handleOpenAllTypesDialog}
          selectedType={selectedType}
          typeList={typeList}
        />
      </Dialog>
    </Stack>
  )
}

TypeFilter.propTypes = {
  selectedType: PropTypes.object,
  setSelectedType: PropTypes.func,
};

const RenderViewAllTypes = ({
  handleSelectType,
  handleOpenAllTypesDialog,
  selectedType,
  typeList
}) => {

  const handleSelect = (type) => {
    handleSelectType(type)
    handleOpenAllTypesDialog()
  }

  return (
    <DialogContainer spacing={3}>
      <Stack 
        direction='row' 
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h6' sx={{fontWeight: 600}}
        >All Pokemon Types</Typography>
        <IconButton onClick={handleOpenAllTypesDialog}>
          <CloseRounded />
        </IconButton>
      </Stack>
      <Stack 
        direction='row' 
        flexWrap='wrap' 
        sx={{gap: 1}}
      >
        {
          typeList.map((type, index) => (
            <Box onClick={() => handleSelect(type)} key={index}>
              <TypeBadge  
                isBadgeActive={type.name === selectedType.name}
                isSelection={true}
                typeName={type.name}
              />
            </Box>
          ))
        }
      </Stack>
    </DialogContainer>
  )
}

RenderViewAllTypes.propTypes = {
  handleSelectType: PropTypes.func,
  handleOpenAllTypesDialog: PropTypes.func,
  selectedType: PropTypes.object,
  typeList: PropTypes.array,
};

const DialogContainer = styled(Stack)`
  padding: 24px;
`
