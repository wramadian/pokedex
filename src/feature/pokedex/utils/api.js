export function getPokemonList({ offset }) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data dari API:', data);
        resolve(data); // Menggunakan resolve saat data berhasil diambil
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error); // Menggunakan reject saat terjadi kesalahan
      });
  });
}

export function getDetailPokemonData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data dari API:', data);
        resolve(data); // Menggunakan resolve saat data berhasil diambil
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error); // Menggunakan reject saat terjadi kesalahan
      });
  });
}