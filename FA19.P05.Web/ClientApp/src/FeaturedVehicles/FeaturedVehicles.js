import React, {useEffect, useState} from 'react';
import './FeaturedVehicles.css';
import Axios from 'axios';
import AppSettings from '../AppSettings';

const FeaturedVehicles = (props) => {
    const [vehiclesReceived, setVehiclesReceived] = useState(false);
    const [featuredCars, setFeaturedCars] = useState([[]]);

    useEffect(() => {
        Axios.get(`${AppSettings.baseUrl}/api/Featured`)
        .then((response) => {
            console.log(response);
            setFeaturedCars(response.data);
            setVehiclesReceived(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const FeatureCell = (props) => {
        const vh = featuredCars[props.num];
        if(vehiclesReceived === true && featuredCars.length === 4){
        return(
            <div className="FeatureCell">
                <img className="FavPicture" src={vh.image}/>
                <div className="Details">
                    <div className="CarTitle">{vh.year}</div>
                    <div className="CarTitle">{vh.make} {vh.model}</div>
                    <div className="Price">${vh.baseCost}</div>
                </div>
            </div>
        )}
        else
        {return(null)}
    }

    return(
        <div hidden={props.hidden}>
            <div className="Container">
                <h1 className="SearchTitle">Featured Vechicles</h1>
                <FeatureCell num={0}/>
                <FeatureCell num={1}/>
                <FeatureCell num={2}/>
                <FeatureCell num={3}/>
            </div>
        </div>
    )
}

export default FeaturedVehicles;