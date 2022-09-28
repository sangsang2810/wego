import { Avatar, Box, HStack, Text, View } from 'native-base'
import React from 'react'

function WGChipComponent() {

    const text = ['a', 'b', 'alo', 'alo', 'alo', 'alo', 'alo']

    return (
        <View>
            <HStack space={3} flexWrap={'wrap'}>
                {
                    text.map((item, index) => (
                        <HStack
                            key={index}
                            rounded={'full'}
                            space={1}
                            bg={'amber.300'}>
                            <Avatar
                            size={'sm'}
                            bg="green.500"
                            source={{
                                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            }}>
                                AJ
                            </Avatar>
                            <Text
                                textAlign={'center'}
                                p={1}>
                                {item}
                            </Text>
                        </HStack>
                    ))
                }
            </HStack>
        </View>
    )
}

export default WGChipComponent