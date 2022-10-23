import React from 'react'
import { StyleSheet } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import { Image,  Text, View } from 'native-base'
import { WGTimeLineCardComponent } from '../wg-card'

function WGTimeLineComponent() {

    const timeLinedata = [
        {
            time: '09:00',
            title: 'Bánh canh bà 2',
            description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
            lineColor: '#818cf8',
            circleColor: '#818cf8',
            address: '123 Hai Bà Trưng',
            openTime: '9h ~ 22h',
            price: '80k ~ 100k',
            address: '123 Hai Bà Trưng',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
        },
        {
            time: '10:45',
            title: 'Play Badminton',
            description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
            address: '123 Hai Bà Trưng',
            openTime: '9h ~ 22h',
            price: '80k ~ 100k',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
        },
        {
            time: '12:00',
            title: 'Lunch',
            openTime: '9h ~ 22h',
            price: '80k ~ 100k',
            address: '123 Hai Bà Trưng',
        },
        {
            time: '14:00',
            title: 'Watch Soccer',
            description: 'Team sport played between two teams of eleven players with a spherical ball. ',
            address: '123 Hai Bà Trưng quận dài ơi là dài',
            openTime: '9h ~ 22h',
            price: '80k ~ 100k',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
        },
        {
            time: '16:30',
            title: 'Go to Fitness center',
            description: 'Look out for the Best Gym & Fitness Centers around me :)',
            address: '123 Hai Bà Trưng',
            openTime: '9h ~ 22h',
            price: '80k ~ 100k',
            imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
        }
    ]
    const renderDetail = (rowData, sectionID, rowID) => {
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData.imageUrl }} style={styles.image} alt='sample' />
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View flex={1} rounded='md' style={styles.description}>
                <WGTimeLineCardComponent
                title={rowData.title}
                address={rowData.address}
                openTime={rowData.openTime}
                price={rowData.price}
                />
            </View>
        )
    }

    const onEventPress = (data) => {
        console.log('data', data);

        return (
            <Timeline
                data={timeLinedata}
                lineColor='gray'
                circleColor='gray'
                style={styles.list}
                timeStyle={styles.time}
                options={{
                    style: { paddingTop: 5 },
                }}
                timeContainerStyle={{ minWidth: 52 }}
                // descriptionStyle={styles.description}
                renderDetail={renderDetail}
                // innerCircle={'dot'}
                renderFullLine={true}
                // onEventPress={onEventPress}
            />
        )
    }

    return (
        <View minHeight={'80'}>
            <Timeline
            data={timeLinedata}
            lineColor='#d6d3d1'
            circleColor='#d6d3d1'
            style={styles.list}
            timeStyle={styles.time}
            options={{
                style: { paddingTop: 5 },
            }}
            timeContainerStyle={{ minWidth: 44 }}
            // descriptionStyle={styles.description}
            renderDetail={renderDetail}
            // innerCircle={'dot'}
            renderFullLine={true}
            // onEventPress={onEventPress}
        />
        </View>
    )


}
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 65
    },
    list: {
        flex: 1,
        paddingTop: 15
    },
    time: {
        color: 'black',
        marginTop: -3
        ,
        fontSize: 14
    },
    description: {
    },
    descriptionContainer: {
        flexDirection: 'row',
    },

})
export default WGTimeLineComponent;
