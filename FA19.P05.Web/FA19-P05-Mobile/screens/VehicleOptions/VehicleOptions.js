import React, {useState} from 'react';
import {View, Text} from 'react-native'

const VehicleOptions = (props) => {
    //const vehicle = props.vehicle;
    const bigboy = props.navigation.getParam(vehicle, defaultValue);

    return(
    <View>
        <Text>{bigboy}</Text>
    </View>
    )
}

export default VehicleOptions;