import { useEffect, useState } from 'react';
import { pokemonTypeList } from './data';

const usePokemonTypeData = (key) => {
  const [typeInfo, setTypeInfo] = useState(null);

  useEffect(() => {
    if (key && key in pokemonTypeList) {
      setTypeInfo(pokemonTypeList[key]);
    } else {
      setTypeInfo(null);
    }
  }, [key]);

  return typeInfo;
};

export {
  usePokemonTypeData
}