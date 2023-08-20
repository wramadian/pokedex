import { useEffect, useState } from 'react';
import { pokemonTypeList } from './data';

export const usePokemonTypeData = (key) => {
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

export const useTitleCase = (initialText = '') => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    setText(toTitleCase(initialText));
  }, [initialText]);

  return text;
};

export const useFindPokemonId = (inputNumber = "0") => {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    function formatNumber(num) {
      return "#" + num.toString().padStart(4, "0");
    }

    setFormattedNumber(formatNumber(inputNumber));
  }, [inputNumber]);

  return formattedNumber;
};

