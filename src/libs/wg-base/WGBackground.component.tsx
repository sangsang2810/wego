import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from 'native-base';

export default function WGBackgroundComponent(Component: any) {
  class WrappedComponent extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = {};
    }

    render() {
      const { ...other } = this.props;
      return (
        <Box style={styles.container}>
          <Component {...other} />
        </Box>
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
