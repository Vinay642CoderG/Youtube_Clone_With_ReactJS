//data from API fetching function 
import axios from "axios";
const BASE_URL = 'https://youtube-v2.p.rapidapi.com'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY ,
		'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
  }
};
export const fetchFromAPI = async(url)=>{
    try {
        const response = await axios.get(`${BASE_URL}/${url}`,options)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

