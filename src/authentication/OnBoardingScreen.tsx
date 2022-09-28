import { Text, View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

function OnBoardingScreen() {
    return (
        <View style={styles.container}>
            <Text fontSize="6xl" style={styles.text}>WEGO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7879F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white'
    }
})

export default OnBoardingScreen