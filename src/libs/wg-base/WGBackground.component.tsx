import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from 'native-base';
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
        <BlurView intensity={100} style={styles.container}>
          <Box bgColor={'transparent'} style={styles.container}>
            <Component {...other} />
          </Box>
        </BlurView>
      );
    }
  }

  return WrappedComponent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
