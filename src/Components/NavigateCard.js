import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import NavFav from './NavFav';

const NavigateCard = () => {

    const dispatch = useDispatch();
    const Navigation = useNavigation();

    return (
        <SafeAreaView style={tailwind`bg-white flex-1`}>
            <Text style={tailwind`text-center py-5 text-xl text-black`}>Good Morning Priyansh</Text>
            <View style={tailwind`border-t border-gray-200 px-1 flex-shrink`}>
                <GooglePlacesAutocomplete
                    placeholder='Where To'
                    textInputProps={{
                        placeholderTextColor: 'black',
                        // returnKeyType: "search"
                    }}
                    styles={{
                        description: { color: 'black' },
                        container: {
                            flex: 0,
                            borderColor: 'black',
                            borderWidth: 2,
                        },
                        textInput: {
                            fontSize: 18,
                            color: '#000'
                        }
                    }}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }));
                        Navigation.navigate('RideOptionsCard');
                    }}
                    minLength={2}
                    enablePoweredByContainer={false}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />

                <NavFav />
            </View>

            <View style={tailwind`flex flex-row justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => { Navigation.navigate("RideOptionsCard") }}
                    style={tailwind`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name='car'
                        type='font-awesome'
                        color='white'
                        size={16}
                    />
                    <Text style={tailwind`text-white text-center`}>
                        Rides
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tailwind`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon
                        name='fast-food-outline'
                        type='ionicon'
                        color='black'
                        size={16}
                    />
                    <Text style={tailwind`text-black text-center`}>
                        Eats
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default NavigateCard