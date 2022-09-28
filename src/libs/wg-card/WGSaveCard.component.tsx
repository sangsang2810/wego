import React from 'react'
import { Box, Text, AspectRatio, Image, HStack, VStack, View, Heading } from 'native-base'
import { ASSETS_ENUM } from '../../utils/enums';

interface WGCardComponent {
    title: string;
    description: string;
}


function WGSaveCardComponent(props: WGCardComponent) {

    const { title, description } = props



    return (
        <Box bg={"white"} flex={1} rounded={'md'}>
            <HStack w='full' space={3}>
                <Box maxW={'1/3'}>
                    <AspectRatio h={'full'} w="90%" ratio={3 / 3} >
                        <Image rounded="md" source={{
                            uri: "https://static1.personality-database.com/profile_images/54ad682613014cb9bfa536415bb1136b.png"
                        }} alt="image" />
                    </AspectRatio>
                </Box>
                <View maxW={'2/3'}>
                    <Box alignItems="flex-start">
                        <Text fontWeight="semibold" flexWrap={'wrap'} w={'full'} noOfLines={2} color={'violet.500'} >
                            {title}
                        </Text>
                        <Text fontWeight="400" flexWrap={'wrap'} noOfLines={3}>
                            {description}
                        </Text>
                    </Box>
                </View>
            </HStack>
        </Box>
    )
}

export default WGSaveCardComponent