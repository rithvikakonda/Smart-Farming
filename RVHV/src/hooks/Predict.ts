import { useEffect, useState } from 'react';

function Predict(){

    const [Prediction,setPrediction] = useState(Object);
    const [Preloading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/app/data')
        .then(response => response.json())
        .then(prediction =>{
            setPrediction(prediction);
            setLoading(false);
        } )
        .catch(error => {
            console.error('Error:', error);
            setLoading(false);}
        )
    },[]);
    
    return {Prediction,Preloading};
}

export default Predict;
