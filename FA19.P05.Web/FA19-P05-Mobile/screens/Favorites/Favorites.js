import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import HamburgerHeader from '../../components/HamburgerHeader/HamburgerHeader';
import Vehicle from '../VehicleList/Vehicle';
import AppSettings from '../../constants/AppSettings';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Favorites = (props) => {
    const [vehicleState, setVehicleState] = useState([[]]);
    const [vehiclesLoaded, setVehiclesLoaded] = useState("bam");
    const [userInfo, setUserInfo] = useState({username: ""});
    const [finalInfo, setFinalInfo] = useState({username: ""});

    useEffect(() => {
        AsyncStorage.getItem('UserInfo', (err, info) => {
            setUserInfo(JSON.parse(info));
        })
    }, [])

    useEffect(() => {
        if(userInfo === null)
            console.log("No user.")
        else
        {
            setFinalInfo(userInfo);
            GetCars(userInfo.username)
        }
        },
        [userInfo]
    );

    const GetCars = (username) => {
        if(username !== "")
        {
            Axios.get(`${AppSettings.baseUrl}/api/Favorites/${username}`)
            .then((response) => {
                setVehicleState(response.data);
                setVehiclesLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setVehiclesLoaded(false);
            })
        }
    }

    const FavoritesList = () => {
        if(finalInfo.username !== "")
        {
            if(vehiclesLoaded === true)
            {
                return(
                <ScrollView>
                    {vehicles}
                </ScrollView>
                )
            }
            else if(vehiclesLoaded === false)
                return (
                    <View style={{alignItems: 'center', padding: 40}}>
                        <Text style={{fontSize: 30, textAlign: 'center'}}>You currently have no favorites.</Text>
                    </View>
                );
            else
                return null;
        }
        else
        {
            return(
                <View style={{alignItems: 'center', padding: 40}}>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>You must log in to have favorites.</Text>
                </View>
            )
        }
    }

    let vehicles = (
        vehicleState.map((vh) => {
            return<View key={vh.id}>
                <Vehicle
                    id  = {vh.id}
                    vin = {vh.VIN}
                    year={vh.year}
                    make={vh.make}
                    model={vh.model}
                    baseCost={vh.baseCost}
                    location={vh.dealershipName}
                    image={vh.image}
                    listProps={props}
                    user = {finalInfo.username}
                />
            </View>
        })
    );
    
    return(
        <View style={styles.page}>
            <HamburgerHeader onPress={() => {props.navigation.toggleDrawer();}}/>
            <Text style={styles.title}>Favorited Vehicles</Text>
            <FavoritesList/>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        fontSize:25,
        color: '#76e364',
        fontWeight: 'bold',
        margin:'5%'
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize:30,
        textAlign: 'center'
    },
    picture: {
        width: 300,
        height: 300
    }
})

export default Favorites;