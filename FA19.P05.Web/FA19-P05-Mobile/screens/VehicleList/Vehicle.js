import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {Button, ThemeProvider, Overlay} from 'react-native-elements';
import AppSettings from '../../constants/AppSettings';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { getTimeFieldValues } from 'uuid-js';

const Vehicle = (props) => {
    const [inventoryOptions, setInventoryOptions] = useState([[]]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [favColor, setFavColor] = useState("green");
    const [visible, setVisible] = useState(true);
    const [userInfo, setUserInfo] = useState({username: ""});
    const [finalInfo, setFinalInfo] = useState({username: ""});
    const [favLoaded, setFavLoaded] = useState(false);

    useEffect(() => {
        Axios.get(`${AppSettings.baseUrl}/api/InventoryOption`)
        .then((response) => {
            setInventoryOptions(response.data);
        })

        AsyncStorage.getItem('UserInfo', (err, info) => {
            setUserInfo(JSON.parse(info));
        })}, [])

    useEffect(() => {
        if(userInfo === null)
        {
            console.log("No user.")
            setFavLoaded(true);
        }
        else
        {
            GetFavorite(userInfo.username);
            setFinalInfo(userInfo);
        }
    }, [userInfo])

    const GetFavorite = (user) => {
        Axios.get(`${AppSettings.baseUrl}/api/Favorites/${user}/${props.id}`)
        .then((response) => {
            setFavColor("gray");
            setFavLoaded(true);
        })
        .catch(() => {
            console.log("This vehicle is not favorited by this user.")
            setFavLoaded(true);
        })
    }

    const Options = () => {
        var filteredOptions = inventoryOptions.filter((data) => {
            return data.make === props.make;
        })

        if(filteredOptions.length === 0)
            return (
                <View>
                    <Text style={styles.noOptions}>
                        No options are available for this vehicle. :(
                    </Text>
                </View>
            )
        else
        return filteredOptions.map((op) =>
                <View style={styles.optionsContainer}>
                    <Text style={styles.price}>${op.price}</Text>
                    <Text style={styles.description}>{op.optionDescription}</Text>
                </View>
            )
    }

    const favoriteVehicle = () => {
        Axios.post(`${AppSettings.baseUrl}/api/Favorites`, {
            "userName": finalInfo.username,
            "inventoryId": props.id
        })
        .then((response) => {
            setFavColor("gray");
            console.log("Vehicle favorited!");
        })
        .catch((error) => {
            deleteFavorite();
        })
    }

    const deleteFavorite = () => {
        Axios.delete(`${AppSettings.baseUrl}/api/Favorites`, {
            params: {
                userName: finalInfo.username,
                inventoryId: props.id
            }
        })
        .then((response) => {
            console.log("Vehicle unfavorited!");
            setFavColor("green");
            if(props.listProps.navigation.state.routeName === 'Favorites')
                setVisible(false);
        })
    }

    const FavoriteButton = () => {
        if(favLoaded === false)
        {
            return(
                <View style={{width: 100, padding: 5}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        else
        {
            if(finalInfo.username !== "")
            {
                if(favColor === "green")
                {
                    return (
                        <ThemeProvider theme={greenButton}>
                            <Button title="Favorite" onPress={() => favoriteVehicle()}/>
                        </ThemeProvider>
                    )
                }
                else
                {
                    return (
                        <ThemeProvider theme={grayButton}>
                            <Button title="Un-Favorite" onPress={() => favoriteVehicle()}/>
                        </ThemeProvider>
                    )
                }
            }
            else
                return null;
        }
    }

    if(visible === true)
    {
    return (
        <View style={styles.container} isVisible={false}>
            <View style={{height: 180}}>
                <AutoHeightImage style={styles.image} width={240} source={{uri: props.image}}/>
            </View>
            <Text style={styles.title}>{props.year} {props.make} {props.model}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.price}>${props.baseCost}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <ThemeProvider theme={greenButton}>
                        <Button title="Options" onPress={() => setOptionsVisible(true)}/>
                    </ThemeProvider>
                    <FavoriteButton/>
                </View>
                <Overlay isVisible={optionsVisible} style={{height: 2000}}>
                <Text style={styles.optionsTitle}>{props.year} {props.make} {props.model} Options</Text>
                    <ScrollView>
                        <Options/>
                    </ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <ThemeProvider theme={optionsButton}>
                            <Button title="Close" onPress={() => setOptionsVisible(false)}/>
                        </ThemeProvider>
                    </View>
                </Overlay>
            </View>
        </View>
    )
    }
    else
    {
        return null;
    }
};
//<View ><Text style={styles.VIN}>VIN:{props.vin}</Text></View>
//<Text style={styles.titleSearch}>{props.location}</Text>

const greenButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 16
        },
        buttonStyle: {
            backgroundColor: '#76e364',
            borderRadius: 30,
            width: 100,
            height: 40,
            marginLeft: 3,
            margin: 5
        }
    },
};

const grayButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 16
        },
        buttonStyle: {
            backgroundColor: '#BDBDBD',
            borderRadius: 30,
            width: 100,
            height: 40,
            marginLeft: 3,
            margin: 5
        }
    },
};

const optionsButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 20
        },
        buttonStyle: {
            backgroundColor: '#76e364',
            borderRadius: 30,
            width: 100,
            height: 40,
            marginLeft: 3
        }
    },
};

const styles = StyleSheet.create({
    container: {
        margin: '5%',
        padding: '2.5%',
        borderWidth:5,
        borderRadius: 30,
        borderColor: '#76e364',
    },
    title: {
        textAlign: 'left',
        fontSize:26,
        fontWeight: 'bold',
        color: 'black',
    },
    price: {
        textAlign: 'left',
        fontSize:34,
        fontWeight: 'bold',
        color: 'black',
    },
    VIN: {
        textAlign: 'left',
        fontSize:16,
        color: 'black',
    },

    image:{
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    optionsTitle:{
        textAlign: 'center',
        color: '#76e364',
        fontSize: 26,
        fontWeight: 'bold'
    },
    optionsContainer: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#76e364',
        padding: 10,
        margin: 5
    },
    description: {
        textAlign: 'left',
        fontSize:20,
        color: 'black',
    },
    noOptions: {
        paddingTop: '20%',
        textAlign: 'center',
        fontSize:22,
        color: 'black',
    }

});

export default Vehicle;