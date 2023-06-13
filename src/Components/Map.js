import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useNavigation } from '@react-navigation/native'

const Map = () => {


    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const Navigator = useNavigation();

    const updateMap = async () => {
        mapRef.current.fitToSuppliedMarkers(['destination', 'origin'],
            { animated: true, edgePadding: { top: 100, bottom: 50, left: 50, right: 50 }, });
        console.log("test");
    }

    useEffect(() => {
        if (!origin || !destination) return;
        updateMap();
    }, [origin, destination]);

    const getAPIData = async () => {
        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`;
            let result = await fetch(url);
            result = await result.json();
            console.log(result);
            if (result) {
                console.log("result");
                setData(result.rows[0].elements[0]);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!origin || !destination) return;
        console.log(data);
        console.log("test data");
        dispatch(setTravelTimeInformation(data));
        mapRef.current.fitToSuppliedMarkers(['destination', 'origin'],
            { animated: true, edgePadding: { top: 100, bottom: 50, left: 50, right: 50 }, });
    }, [origin, destination, data])

    useEffect(() => {
        if (!origin || !destination) return;
        console.log(origin.description);
        console.log(destination.description);
        getAPIData();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])



    return (

        <MapView

            ref={mapRef}
            style={tailwind`flex-1`}
            mapType='standard'
            zoomControlEnabled={true}
            region={{

                // latitude: 37.78825,
                // longitude: -122.4324,
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                // latitude: 28.69579, //28.69579, 77.22968
                // longitude: 77.22968,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}

        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    onError={() =>
                        Alert.alert('Alert', 'You are trying to move from one Island to another Island', [
                            { text: 'OK', onPress: () => Navigator.navigate('NavigateCard') },
                        ])}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title='Destination'
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>

    )
}

export default Map

const styles = StyleSheet.create({})