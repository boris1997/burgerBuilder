import axios from "axios";



const instance = axios.create(
    { baseURL: 'https://burgerbuilder-74366-default-rtdb.firebaseio.com/'}
)

export default instance