import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login'
import Search from './screens/Search/Search'
import Register from './screens/Register/Register';
import Favorites from './screens/Favorites/Favorites';
import Featured from './screens/Featured/Featured';
import VehicleOptions from './screens/VehicleOptions/VehicleOptions';
import ScanCode from './screens/ScanCode/ScanCode';
import VehicleList from './screens/VehicleList/VehicleList';
import CustomDrawer from './components/CustomDrawer/CustomDrawer';
import Authentication from './components/Authentication/Authentication';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

const VehicleNavigator = createStackNavigator({
  Search,
  VehicleList,
  VehicleOptions
},
{
  headerMode: 'none',
  navigationOptions: {headerVisible: false,}
});


const DrawerNavigator = createDrawerNavigator({
  "Search": {
    screen: VehicleNavigator,
    navigationOptions: {
      drawerIcon: () => (
        <Image 
        source={require('./icons/search.png')}
        style={styles.icon}/>
      ),
    },
  },
  "Favorites": {
    screen: Favorites,
    navigationOptions: {
      drawerIcon: () => (
        <Image 
        source={require('./icons/heart.png')}
        style={styles.icon}/>
      ),
    },
  },
  "Featured": {
    screen: Featured,
    navigationOptions: {
      drawerIcon: () => (
        <Image 
        source={require('./icons/star.png')}
        style={styles.icon}/>
      ),
    },
  },
  "Scan Code": {
    screen: ScanCode,
    navigationOptions: {
      drawerIcon: () => (
        <Image 
        source={require('./icons/camera.png')}
        style={styles.icon}/>
      ),
    },
  },
},
{
  headerMode: 'none',
  drawerType: 'back',
  drawerWidth: '80%',
  contentComponent: CustomDrawer,
  unmountInactiveRoutes: true
});

const MainNavigator = createStackNavigator({
  Welcome,
  Login,
  Register,
  DrawerNavigator
},
{
  headerMode: 'none',
  navigationOptions: {headerVisible: false,}
});

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40
  }
})

console.disableYellowBox = true;
const App = createAppContainer(MainNavigator);
export default App;