const React = require("react-native");

import { Dimensions } from "react-native";

const { StyleSheet } = React;

export default {
    container: {
        flex: 1,
      },
    button:{
        width: '80%',
        backgroundColor: '#5C5CF0',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
        position: 'absolute',
        top: 400,
    },
    overlay:{
        width: '100%',
        // backgroundColor: '#5C5CF0',
        // borderRadius: 25,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    }
}
