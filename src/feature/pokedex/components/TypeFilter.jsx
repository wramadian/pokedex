import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { TypeBadge } from '../components'
import { pokemonTypeList } from '../utils/data';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CloseRounded } from '@mui/icons-material';

export default function TypeFilter() {

  const masterType = Object.keys(pokemonTypeList);

  const [slicedMasterType, setSlicedMasterType] = useState(masterType.slice(0, 8));
  const [selectedType, setSelectedType] = useState('');
  const [openAllTypesDialog, setOpenAllTypesDialog] = useState(false);

  const handleSelectType = (type) => {
    setSelectedType(type)
  }

  const handleOpenAllTypesDialog = () => {
    setOpenAllTypesDialog((prev) => !prev);
  }

  useEffect(() => {
    setSlicedMasterType(
      [
        selectedType, 
        ...masterType.filter((type) => type !== selectedType).slice(0, 7)
      ]
    )
  }, [masterType, selectedType])
  
  return (
    <Stack 
      direction='row' 
      justifyContent='space-between'
      flexWrap='wrap'
    >
      {
        slicedMasterType.map((typeName, index) => (
          <Box onClick={() => handleSelectType(typeName)} key={index}>
            <TypeBadge  
              isBadgeActive={typeName === selectedType}
              isSelection={true}
              typeName={typeName}
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
        />
      </Dialog>
    </Stack>
  )
}

const RenderViewAllTypes = ({
  handleSelectType,
  handleOpenAllTypesDialog,
  selectedType
}) => {

  const masterType = Object.keys(pokemonTypeList);

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
          masterType.map((typeName, index) => (
            <Box onClick={() => handleSelect(typeName)} key={index}>
              <TypeBadge  
                isBadgeActive={typeName === selectedType}
                isSelection={true}
                typeName={typeName}
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
  selectedType: PropTypes.string,
};

const DialogContainer = styled(Stack)`
  padding: 24px;
`
