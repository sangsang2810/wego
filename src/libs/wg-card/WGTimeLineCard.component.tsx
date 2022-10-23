import React from 'react'
import { Box, Text, AspectRatio, Image, HStack, VStack } from 'native-base'
import { ASSETS_ENUM } from '../../utils/enums';

interface WGCardComponent {
    title: string;
    address: string;
    openTime: string;
    price: string;
    image: string;
}


function WGTimeLineCardComponent(props: WGCardComponent) {

    const { title, address, openTime, price } = props
    const addrIcon = ASSETS_ENUM.ICONS_ENUM.PIN;
    const clockIcon = ASSETS_ENUM.ICONS_ENUM.CLOCK;
    const priceIcon = ASSETS_ENUM.ICONS_ENUM.MONEY;

    const row = (sourceImg: any, value: string) => {
        return (
            <HStack space={2} alignItems='flex-start'>
                <Image maxH={5} source={sourceImg} alt="Alternate Text" resizeMode='contain'
                    style={{
                        width: 16,
                        height: 16,
                    }} />
                <Text flexWrap={'wrap'}color={'black'} >
                    {value}
                </Text>
            </HStack>
        )
    }

    return (
        <Box bg={"white"} flex={1}>
            <HStack space={3} w='full'>
                <Box maxW={'1/3'}>
                    <AspectRatio w="100%" ratio={1 / 1} >
                        <Image rounded="md" source={{
                            uri: "https://static1.personality-database.com/profile_images/54ad682613014cb9bfa536415bb1136b.png"
                        }} alt="image" />
                    </AspectRatio>
                </Box>
                <VStack maxW={'2/4'} alignItems="flex-start" h={'full'}>
                    <Text fontWeight="semibold" flexWrap={'wrap'} noOfLines={2} color={'violet.500'} >
                        {title}
                    </Text>
                    {row(addrIcon, address)}
                    {row(clockIcon, openTime)}
                    {row(priceIcon, price)}
                    <HStack alignItems={'flex-end'} justifyContent={'space-between'} w={'full'}>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    )
}

export default WGTimeLineCardComponent