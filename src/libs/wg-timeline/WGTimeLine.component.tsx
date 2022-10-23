import React, { useEffect } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Image, Text, View } from 'native-base';
import { WGTimeLineCardComponent } from '../wg-card';

interface WGTimeLineProps {
  data?: any;
}

function WGTimeLineComponent(props: WGTimeLineProps) {
  const { data } = props;

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const renderDetail = (rowData, sectionID, rowID) => {
    return (
      <View flex={1} rounded="md" style={styles.description}>
        <WGTimeLineCardComponent
          title={rowData.title}
          address={rowData.address}
          note={rowData.note}
        />
      </View>
    );
  };

  // const onEventPress = (data) => {
  //   console.log('data', data);
  //   return (
  //     <Timeline
  //       data={timeLinedata}
  //       lineColor="gray"
  //       circleColor="gray"
  //       style={styles.list}
  //       timeStyle={styles.time}
  //       options={{
  //         style: { paddingTop: 5 },
  //       }}
  //       timeContainerStyle={{ minWidth: 52 }}
  //       // descriptionStyle={styles.description}
  //       // renderDetail={renderDetail}
  //       // innerCircle={'dot'}
  //       renderFullLine={true}
  //       // onEventPress={onEventPress}
  //     />
  //   );
  // };

  return (
    <View minHeight={'80'} paddingBottom={'10'}>
      <Timeline
        data={data}
        lineColor="#ede9fe"
        circleColor="#ede9fe"
        style={styles.list}
        timeStyle={styles.time}
        // options={{
        //   style: { paddingTop: 5 },
        // }}
        timeContainerStyle={{ minWidth: 44 }}
        // descriptionStyle={styles.description}
        renderDetail={renderDetail}
        innerCircle={'dot'}
        renderFullLine={true}
        // onEventPress={onEventPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 65,
  },
  list: {
    flex: 1,
    paddingTop: 15,
  },
  time: {
    color: 'black',
    marginTop: -3,
    fontSize: 14,
  },
  description: {},
  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
});
export default WGTimeLineComponent;
