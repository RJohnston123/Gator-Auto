import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

const MyInput = (props) => {
    return(
        <View style={props.style}>
            <View style={{flexDirection: 'row'}}>
                <Image 
                style={{width: 25, height: 25, marginRight: 12, marginBottom: 4}}
                source={props.icon}
                />
                <TextInput 
                placeholder={props.placeholder}
                fontSize={props.fontSize}
                placeholderTextColor={props.placeholderTextColor}
                style={props.inputStyle}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                />
            </View>

            <View style={styles.underline}/>
        </View>
    );
}

const styles = StyleSheet.create({
    underline: {
        height: 2,
        backgroundColor: 'white',
    }
})

export default MyInput;