import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { WGBackgroundComponent, WGBigCardComponent, WGCardComponent } from '../../libs';
import { Box, Button, Text, Flex, VStack, Avatar, Image } from 'native-base';
import { BlurView } from 'expo-blur';
import STYLE_ENUMS from '../../../assets/styles/style';

function HomeScreen({ navigation }) {
  const rocketImg = require('../../../assets/rocket.png');
  return (
    <VStack style={styles.container} px={5} space={5}>
      <Box bg="white" rounded="md" roundedTop={'3xl'} p={5} style={styles.header}>
        <Flex direction="row" bg="red" justifyContent="space-between">
          <Box maxW={'4/5'}>
            <Text fontSize="md" color={'indigo.400'}>
              Good Morning ✨
            </Text>
            <Text fontSize="2xl" color={'fuchsia.400'} bold>
              Becky Bei
            </Text>
          </Box>
          <Box>
            <Avatar
              alignSelf="center"
              bg="amber.500"
              size="lg"
              borderWidth={3}
              borderColor={'violet.400'}
              source={{
                uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            ></Avatar>
          </Box>
        </Flex>
      </Box>

      <BlurView intensity={100} style={STYLE_ENUMS.blurContainer}>
        <Box height="150" rounded="lg">
          <Flex mt={6} px={5} direction="row" justifyContent="space-between">
            <Box maxW={'3/5'}>
              <Text fontSize="md">Hey, it seems like you don't have any trip ?</Text>
              <Button
                mt={3}
                _text={{
                  fontSize: 'sm',
                  fontWeight: 'bold',
                }}
                size="sm"
              >
                Let's create once
              </Button>
            </Box>
            <Image source={rocketImg} alt="Alternate Text" size="lg" />
          </Flex>
        </Box>
      </BlurView>

      <ScrollView style={styles.scrollView}>
        <VStack flex="1" mb="8" space={5}>
          <WGBigCardComponent></WGBigCardComponent>
          <WGCardComponent></WGCardComponent>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
const a = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
  },
  scrollView: {
    marginBottom: 60,
  },
});

export default WGBackgroundComponent(HomeScreen);
