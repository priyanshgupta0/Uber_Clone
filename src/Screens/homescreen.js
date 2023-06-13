import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import homestyles from '../Stylesheet/homescreenstyle';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import NavOptions from '../Components/NavOptions';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFav from '../Components/NavFav';


const Homescreen = () => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            {/* <Text style={
                [
                    tw`text-red-500 p-10`,
                    // { color: 'purple' }
                ]}>homescreen</Text> */}
            <View style={tw`p-5`}>
                <Image style={{
                    height: 100,
                    width: 100,
                    resizeMode: "contain"
                }} source={{
                    uri: "https://links.papareact.com/gzs"
                }} />

                <GooglePlacesAutocomplete
                    placeholder='Where From'
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
                        dispatch(setOrigin(
                            {
                                location: details.geometry.location,
                                description: data.description,
                            }
                        ));
                        dispatch(setDestination(null));
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
                <NavOptions />
                <NavFav />
            </View>
        </SafeAreaView>
    )
}

export default Homescreen;