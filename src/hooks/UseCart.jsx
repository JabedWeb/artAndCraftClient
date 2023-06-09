

import {useQuery} from '@tanstack/react-query'
import { useContext } from 'react'
import { authContext } from '../providers/AuthProvider/AuthProvider';

const UseCart =() => {
    const {user}=useContext(authContext);

    const {data:cart=[],isLoading}=useQuery({
        queryKey:['cart',user?.email],

        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`);
            const data = await response.json();
            return data;
        }
    })
    return [cart,isLoading]
}


export default UseCart