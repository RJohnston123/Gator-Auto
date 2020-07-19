import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Picker,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HamburgerHeader from '../../components/HamburgerHeader/HamburgerHeader';
import RNPickerSelect from 'react-native-picker-select';
import {Button, ThemeProvider} from "react-native-elements";
import Axios from "axios"
import AppSettings from '../../constants/AppSettings';
import { black } from 'ansi-colors';
import MultiSelect from 'react-native-multiple-select';


const Search = (props) => {



    const [makeState, setMakeState] = useState({ make: [] });

    const [defaultModelState, setDefaultModelState] = useState({ model: [] });

    const [modelState, setModelState] = useState({ model: [] });

    const [selectedMakeState, setSelectedMakeState] = useState({ make:[] });

    const [selectedFormattedMakeState, setSelectedFormattedMakeState] = useState({ make:[] });

    const [selectedFormattedModelState, setSelectedFormattedModelState] = useState({ model:{} });

    const [selectedFormattedLocState, setSelectedFormattedLocState] = useState({ location:{} });


    const [selectedModelState, setSelectedModelState] = useState({  });

    const [inputtedMinYearState, setInputtedMinYearState] = useState({minYear: 2000});

    const [inputtedMaxYearState, setInputtedMaxYearState] = useState({maxYear: 2020});

    const [inputtedVINState, setInputtedVINState] = useState({vin: "0"});

    const [inputtedMinState, setInputtedMinState] = useState({min: 0});

    const [inputtedMaxState, setInputtedMaxState] = useState({max: 1000000});

    const [dataFilteredState, setDataFilteredState] = useState({data:[{}]});

    // eslint-disable-next-line no-unused-vars
    const [locationState, setLocationState] = useState({
        location: []
    });

    const [selectedLocationState, setsSelectedLocationState] = useState({

    });

    useEffect(() => {

        Axios.get(`${AppSettings.baseUrl}/api/MakeList`)
            .then(function (response) {
                // handle success
                setMakeState({ make: response.data.map(function (car) { return { value: car.make, label: car.make } }) });
                setSelectedFormattedMakeState({ make: response.data.map(function (car) { return { value: car.make, label: car.make } }) });
            });

        Axios.get(`${AppSettings.baseUrl}/api/MakeModelOption`)
            .then(function (response) {
                // handle success
                setDefaultModelState({ model: response.data.map(function (car) { return { value: car.model, label: car.make + ": " + car.model, link: car.make } }) });
                setSelectedFormattedModelState({ model: response.data.map(function (car) { return { value: car.model, label: car.make + ": " + car.model, link: car.make } }) });
            });

        Axios.get(`${AppSettings.baseUrl}/api/Dealership`)
            .then(function (response) {
                // handle success
                setLocationState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });
                setSelectedFormattedLocState({ location: response.data.map(function (city) { return { value: city.address.city, label: city.address.city + ": " + city.storeName, key: city.id } }) });
            });

            console.log(makeState.make);
            console.log(selectedFormattedMakeState.make);
    }, []);


    const locChangeHandler = (selectedLocations) => {
        console.log("here" + selectedLocations.location)
        if (selectedLocations[0] == undefined) {
             setsSelectedLocationState({ location: selectedLocations });
             setSelectedFormattedLocState({ location: locationState.location }) 
             console.log("here2" + selectedFormattedLocState)
            }
        else {
            let formatSelectedLocations = selectedLocations.map(function (car) { return {key: car} });
            setsSelectedLocationState({ location: selectedLocations });
            setSelectedFormattedLocState({location: formatSelectedLocations})
        }
        console.log(selectedLocations)
        //location = selectedLocations
    };

    const makeChangeHandler = (selectedMake) => {
        if (selectedMake[0] == undefined) {
             setSelectedMakeState({make: selectedMake})
             setSelectedFormattedMakeState({ make: makeState.make }) 
             console.log("here brah" + selectedFormattedMakeState.make);
            }
        else {
            let formatSelectedMakes = selectedMake.map(function (car) { return {label: car} });
            setSelectedMakeState({ make: selectedMake });
            setSelectedFormattedMakeState({make: formatSelectedMakes});
            console.log("here brah" + selectedFormattedMakeState.make);
        }
    };

    useEffect(() => {
        let filterChange = defaultModelState.model.filter(function (array_el) { return !selectedFormattedMakeState.make.filter(function (anotherOne_el) { return anotherOne_el.label === array_el.link; }).length == 0 });
        setModelState({model: filterChange});

    }, [selectedMakeState]);

    const modelChangeHandler = (selectedModel) => {
        if (selectedModel[0] == undefined) {
            setSelectedModelState({ model: selectedModel });
            setSelectedFormattedModelState({ model: modelState.model }) 
            }

        else {
            let formatSelectedModels = selectedModel.map(function (car) { return {value: car} });
            setSelectedModelState({ model: selectedModel });
            setSelectedFormattedModelState({model: formatSelectedModels});
            //console.log(formatSelectedModels)
        }
    };

    const minChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMinState({ min: 0 }) }

        else {
            setInputtedMinState({min: event.target.value})
        }
    };

    const vinChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedVINState({ vin: "0"}) }

        else {
            setInputtedVINState({vin: event.target.value})
        }
    };

    const maxChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMaxState({ max: 1000000 }) }

        else {
            setInputtedMaxState({max: event.target.value})
        }
    };

    const minYearChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMinYearState({ minYear: 0 }) }
        else {
            setInputtedMinYearState({minYear: event.target.value})
        }
    };

    const maxYearChangeHandler = (event) => {
        if (event.target.value === '') { setInputtedMaxYearState({ maxYear: 0 }) }

        else{
            setInputtedMaxYearState({maxYear: event.target.value})
        }
    };




    const searchHandler = () => {

        Axios.get(`${AppSettings.baseUrl}/api/InventoryItem/search`, {params: { VIN: inputtedVINState.vin, minYear: inputtedMinYearState.minYear, maxYear: inputtedMaxYearState.maxYear, min: inputtedMinState.min, max: inputtedMaxState.max, dealershipName: "" }})
            .then(function (response) {
                dataFiltered = response.data.map(function (car) { return { id: car.id, VIN: car.vin, make: car.make, model: car.model, min: car.baseCost, year: car.year, dealershipId: car.dealershipId, image: car.image } });

                dataFiltered = (dataFiltered.filter(function (data) { return !selectedFormattedMakeState.make.filter(function (selectedMake) { return selectedMake.label === data.make }).length == 0 }));

                dataFiltered = (dataFiltered.filter(function (data) { return !selectedFormattedModelState.model.filter(function (selectedModel) { return selectedModel.value === data.model }).length == 0 }));

                console.log(dataFiltered);

                dataFiltered = (dataFiltered.filter(function (data) { return !selectedFormattedLocState.location.filter(function (selectedLocation) {
                    //sif(selectedLocation.key === data.dealershipId){

                    //}
                    return selectedLocation.key === data.dealershipId }).length == 0 }));

                console.log(dataFiltered);
                //console.log(selectedMakeState);
                props.navigation.navigate('VehicleList');


            })
    };



    return (
    <KeyboardAvoidingView
    style={{flex: 1, backgroundColor: 'white'}}
    keyboardVerticalOffset={0}
    behavior={'padding'}
    >
        <ScrollView automaticallyAdjustContentInsets={true}>
            <View style={styles.page}>
                <HamburgerHeader onPress={() => {props.navigation.toggleDrawer();}}/>

                <View style={styles.container} >
                    <Text style={styles.title}>
                        Vehicle Search
                    </Text>
                    <Text style={styles.titleSearch}>
                        Dealerships Locations
                    </Text>
                    <View style={styles.multiSelect}>
                        <MultiSelect
                            items={locationState.location}
                            tagBorderColor="#000000"
                            uniqueKey="key"
                            onSelectedItemsChange={locChangeHandler}
                            selectedItems={selectedLocationState.location}
                            selectText="Select Locations: Any..."
                            displayKey="label"
                            searchInputPlaceholderText="Search Locations..."

                        />
                    </View>
                    <Text style={styles.titleSearch}>
                        Make
                    </Text>
                    <View style={styles.multiSelect}>
                        <MultiSelect
                            items={makeState.make}
                            tagBorderColor="#000000"
                            uniqueKey="value"
                            onSelectedItemsChange={makeChangeHandler.bind(this)}
                            selectedItems={selectedMakeState.make}
                            selectText="Select Makes: Any..."
                            displayKey="label"
                            searchInputPlaceholderText="Search Makes..."

                        />
                    </View>
                    <Text style={styles.titleSearch}>
                        Model
                    </Text>
                    <View style={styles.multiSelect}>
                        <MultiSelect
                            items={modelState.model}
                            tagBorderColor="#000000"
                            uniqueKey="value"
                            onSelectedItemsChange={modelChangeHandler}
                            selectedItems={selectedModelState.model}
                            selectText="Select Models: Any..."
                            displayKey="label"
                            searchInputPlaceholderText="Search Models..."
                        />
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.minPrice}>
                            Min Year
                        </Text>
                        <Text style={styles.maxPrice}>
                            Max Year
                        </Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.minSearch} >
                            <TextInput
                            placeholder=""
                            onChange={minYearChangeHandler}
                            fontSize={20}
                            placeholderTextColor={'black'}
                            style={styles.input}
                            />
                        </View>
                        <View style={styles.maxSearch}>
                            <TextInput
                            placeholder=""
                            onChange={maxYearChangeHandler}
                            fontSize={20}
                            placeholderTextColor={'black'}
                            style={styles.input}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.minPrice}>
                            Min Price
                        </Text>
                        <Text style={styles.maxPrice}>
                            Max Price
                        </Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.minSearch} >
                            <TextInput
                            placeholder=""
                            onChange={minChangeHandler}
                            fontSize={20}
                            placeholderTextColor={'black'}
                            style={styles.input}
                            />
                        </View>
                        <View style={styles.maxSearch}>
                            <TextInput
                            placeholder=""
                            onChange={maxChangeHandler}
                            fontSize={20}
                            placeholderTextColor={'black'}
                            style={styles.input}
                            />
                        </View>
                    </View>
                    <Text style={{fontSize: 20, marginTop: '8%', textAlign: 'center'}}>or</Text>
                    <Text style={styles.titleSearch}>
                        VIN
                    </Text>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={styles.searchContainer}>
                            <TextInput
                            placeholder=""
                            onChange={vinChangeHandler}
                            fontSize={20}
                            placeholderTextColor={'black'}
                            style={styles.input}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    </View>

                <View style={{alignItems: 'center'}}>
                    <ThemeProvider theme={searchButton}>
                        <Button 
                        title="Search"
                        onPress={searchHandler}/>
                    </ThemeProvider>
                </View>

            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
};

const searchButton = {
    Button: {
        titleStyle: {
            color: 'white',
            fontSize: 25
        },
        buttonStyle: {
            backgroundColor: '#6EE45A',
            borderRadius: 30,
            marginTop: 20,
            width: 135,
            height: 65,
        }
    },
};

        const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginLeft: '10%',
            marginRight: '10%',
        },
        page: {
            flex: 1,
            backgroundColor: 'white'
        },
        searchContainer: {
            fontSize:50 ,
            borderRadius: 12,
            color: 'black',
            backgroundColor: 'white',
            borderColor: '#bfbfbf' ,
            borderWidth: 1.5,
            shadowColor: 'black',
            shadowOffset: { width: 60, height: 60 },
        },
        multiSelect: {
            fontSize:50 ,
            color: 'black',
            backgroundColor: 'white',
            shadowColor: 'black',
            marginTop: 5,
            shadowOffset: { width: 60, height: 60 },
        },
        input: {
            color: 'black'
        },
        title: {
            textAlign: 'center',
            fontSize:45,
            color: '#76e364',
            fontWeight: 'bold',
            marginBottom:'2%'
        },
        titleSearch: {
            textAlign: 'left',
            fontSize:16,
            color: 'black',
            marginTop: '3%'
        },
        minSearch: {
            width: 150,
            fontSize: 20,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderColor: '#bfbfbf',
            borderWidth: 1.5,
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
            backgroundColor: 'white'
        },

        minPrice: {
            textAlign: 'left',
            fontSize:16,
            color: 'black',
            marginTop: '3%'
        },

        maxPrice: {
            textAlign: 'left',
            fontSize:16,
            color: 'black',
            marginLeft: '38%',
            marginTop: '3%'
        },

        maxSearch: {
            width: 150,
            fontSize:16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderColor: '#bfbfbf',
            borderWidth: 1.5,
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
            marginLeft: '10%',
            backgroundColor: 'white'

        },
        hamburger: {
            marginTop: '8%',
            marginLeft: '4%'
        }
    });


export default Search;
export let dataFiltered;
//() => {props.navigation.navigate('VehicleList');}