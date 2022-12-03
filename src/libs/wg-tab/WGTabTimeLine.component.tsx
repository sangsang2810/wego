import { Text, View } from 'native-base';
import * as React from 'react';
import { Dimensions, LogBox, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { WGTimeLineComponent } from '../wg-timeline';

interface WGTabTimeLine {
  routes?: any;
}

interface routeConfig {
  // key is unique
  key: string;
  tabTitle: string;
}

function WGTabTimeLine(props: WGTabTimeLine) {
  const initialLayout = {
    width: Dimensions.get('window').width,
  };

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    let routeSetting: { key: string; title: string }[] = [];
    let sceneSetting = {};
    const object = props.routes;
    for (const property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        const { key, tabTitle, locations } = object[property];
        routeSetting.push({ key, title: tabTitle });
        Object.assign(sceneSetting, {
          [key]: () => (
            <View>
              <WGTimeLineComponent data={locations} />
            </View>
          ),
        });
      }
    }
    setRoutes(routeSetting);
    setScene(sceneSetting);
  }, [props]);

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState<{ key: string; title: string }[]>([]);
  const [scene, setScene] = React.useState<any>({});

  const renderScene = SceneMap(scene);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={'violet'}
      inactiveColor={'grey'}
      style={styles.tabBar}
      indicatorStyle={{ backgroundColor: 'violet' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, fontWeight: '600' }}>{route.title}</Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
}
export default React.memo(WGTabTimeLine);

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  tabView: {
    borderRadius: 5,
    flex: 1,
  },
});
