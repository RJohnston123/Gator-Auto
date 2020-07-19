import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBG = () => {
    return(
        <LinearGradient
        colors={['#76e364', '#184f0e']}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 2000,
        }}/>
    );
}

export default GradientBG;