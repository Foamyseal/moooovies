import axios from 'axios'

export default axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=`
})