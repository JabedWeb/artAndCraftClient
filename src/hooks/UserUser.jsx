import {useQuery} from '@tanstack/react-query'

const UseUser =() => {
    
        const {data:ReUser=[],isLoading,refetch}=useQuery(['ReUser'], async () => {
                const response = await fetch(`http://localhost:5000/users`);
                const data = await response.json();
                return data;
        })
        return [ReUser,isLoading,refetch]

}


export default UseUser