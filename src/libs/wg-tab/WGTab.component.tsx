import { Box, Container, Text, View, VStack } from 'native-base';
import * as React from 'react';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

interface WGTabProps {
  routes?: routeConfig[] | [],
}

interface routeConfig {
  // key is unique
  key: string,
  tabTitle: string,
  tabView: JSX.Element,
}

function WGTab(props: WGTabProps) {

  const initialLayout = {
    width: Dimensions.get('window').width
  };

  React.useEffect(() => {
    let routeSetting: { key: string; title: string }[] = [];
    let sceneSetting = {};

    const temp = props.routes;
    temp?.map((item) => {
      routeSetting.push({ key: item.key, title: item.tabTitle });
      Object.assign(sceneSetting, {
        [item.key]: () => (
          <View h={'full'}>
            {item.tabView}
          </View>
        )
      });
    })
    setRoutes(routeSetting)
    setScene(sceneSetting)
  }, []);

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
        <Text style={{ color, fontWeight: '600' }}>
          {route.title}
        </Text>
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
export default React.memo(WGTab);


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
