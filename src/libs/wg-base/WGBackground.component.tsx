import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Image } from 'native-base';
import { ASSETS_ENUM } from '../../utils/enums';
import { BlurView } from 'expo-blur';

export default function WGBackgroundComponent(Component: any) {

    class WrappedComponent extends React.Component {
        constructor(props: any) {
            super(props);
            this.state = {};
        }

        render() {
            const { ...other } = this.props;
            return (
                // <Box bg={{
                //     linearGradient: {
                //         colors: ['indigo.200', 'fuchsia.300'],
                //         start: [0, 0],
                //         end: [1, 1]
                //     }
                // }} style={styles.container} >
                //     <BlurView intensity={100}>
                //         <Component {...other} />
                //     </BlurView>
                // </Box>
                // <View
                //     style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                // >
                //     <SvgComponent />
                // </View>


                <Box style={styles.container}>

                    <ImageBackground
                        source={ASSETS_ENUM.IMAGES_ENUM.BACKGROUND}
                        // alt="Alternate Text"
                        // size={'2xl'}
                        resizeMode={'cover'}
                        // blurRadius={8}
                        style={[styles.image, StyleSheet.absoluteFill]} />
                        
                    <BlurView intensity={100} style={styles.container}>
                        <Component {...other} />
                    </BlurView>
                </Box>
            )
        }
    }

    return WrappedComponent;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})