import { useEffect } from "react";
import { useState } from "react";


const UseClasses = () => {
    const [classesData, setClassesData] = useState([]);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
      // Fetch the classes data from the API
      fetch('http://localhost:5000/classes')
        .then((response) => response.json())
        .then((data) =>{
            setClassesData(data);
            setLoading(false);
        })
        .catch((error) => console.error(error));
    }, []);

    return [classesData,loading]

}

export default UseClasses;