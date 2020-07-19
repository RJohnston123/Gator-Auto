import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HamburgerHeader = (props) => {
    return(
        <View style={styles.header}>
            <FontAwesome5 
            name={'bars'}
            onPress={props.onPress}
            size={35}
            color={'#42b52d'}
            style={styles.hamburger}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        paddingTop: '15%',
        paddingLeft: '8%'
    },
})

export default HamburgerHeader;