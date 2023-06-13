import { StyleSheet, Dimensions } from 'react-native';

let mobileW = Dimensions.get('window').width;
const mobileh = Dimensions.get('window').height;

const homestyles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'blue',
    }
});

export default homestyles;