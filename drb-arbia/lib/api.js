// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// export const fetchHeaderDetails = async (locale = 'en') => {
//   try {
//     const { data } = await axios.get(`${API_URL}/api/header?populate=*&_locale=${locale}`);
//     return data.data;
//   } catch (error) {
//     console.error('Error fetching header details:', error);
//     return null;
//   }
// };


// export const fetchHeaderDetails = async (locale = 'en') => {
//   const data = await axios.get('http://localhost:1337/api/header?populate=*');
//   return data.data.data;
// }

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const fetchHeaderDetails = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/header?populate=*`);
    return data.data; // Return the data from the API response
  } catch (error) {
    console.error('Error fetching header details:', error);
    throw error; // Re-throw the error for debugging if necessary
  }
};

export const fetchSiteSetting = async () => {
  const {data} = await axios.get(`${API_URL}/api/setting?populate=*`)
  return data.data;
}

export const fetchAllPageDetails = async () => {
  const {data} = await axios.get(`${API_URL}/api/pages?populate=*`)
  return data.data;
}

export const fetchSinglePageDetails = async (locale, id) => {
  const {data} = await axios.get(`${API_URL}/api/pages/${id}?populate=Sections.Image&locale=${locale}`);
  return data.data;
}