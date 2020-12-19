import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants';
import { FilterContext } from '../contexts/FilterContext';
import { FilterPill } from './button';

const segment = [
  { name: 'Auto', key: '4' },
  { name: 'Banking', key: '5' },
  { name: 'Capital', key: '6' },
  { name: 'Cement', key: '7' },
  { name: 'FMCG', key: '8' },
  { name: 'IT', key: '9' },
  { name: 'Metal', key: '10' },
  { name: 'Oil & Gas', key: '11' },
  { name: 'Pharma', key: '12' },
  { name: 'Power', key: '13' },
  { name: 'Telecom', key: '14' },
];

const category = [
  { name: 'All', key: '-1' },
  { name: 'NSE EQ', key: '0' },
  { name: 'NSE FNO', key: '1' },
  { name: 'MCX', key: '2' },
  { name: 'Currency', key: '3' },
];

const FilterModalContent = () => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log('Route name', routeName);
  const { filterState, filterDispatch } = useContext(FilterContext);

  const setWatchCategoryFilter = (category, parent) => {
    // console.log('category', category, filterState);
    if (parent)
      filterDispatch({
        type: 'FILTER',
        filter: { name: category.name, key: category.key, parent: parent },
      });
    else
      filterDispatch({
        type: 'FILTER',
        filter: {
          name: category.name,
          key: category.key,
          parent: filterState.parent,
        },
      });
  };

  const setWatchSegmentFilter = (segment, parent) => {
    // console.log('segment', segment);
    filterDispatch({
      type: 'FILTER',
      filter: { name: segment.name, key: segment.key, parent: parent },
    });
  };

  // const setScanCategoryFilter = (category, parent) => {
  //   if (parent)
  //     filterDispatch({
  //       type: 'SCAN_FILTER',
  //       scanFilter: { name: category.name, key: category.key, parent: parent },
  //     });
  //   else
  //     filterDispatch({
  //       type: 'SCAN_FILTER',
  //       scanFilter: {
  //         name: category.name,
  //         key: category.key,
  //         parent: filterState.parent,
  //       },
  //     });
  // };

  // const setScanSegmentFilter = (segment, parent) => {
  //   console.log('segment', segment);
  //   filterDispatch({
  //     type: 'SCAN_FILTER',
  //     scanFilter: { name: segment.name, key: segment.key, parent: parent },
  //   });
  // };

  return (
    <>
    <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: colors.accentColor,
              fontSize: 16,
              fontWeight: '700',
              paddingVertical: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState.filter.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState && filterState.filter.parent == 'NSE EQ' ? (
              segment.map((item, i) => (
                <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                  <FilterPill
                    text={item.name}
                    onPress={() =>
                      setWatchSegmentFilter(
                        item,
                        filterState.filter.parent,
                      )
                    }
                    bgColor={
                      filterState.filter.name === item.name
                        ? colors.primaryColor
                        : colors.secondaryLightColor
                    }
                    textColor={
                      filterState.filter.name === item.name
                        ? colors.darkColor
                        : colors.secondaryColor
                    }
                  />
                </View>
              ))
            ) : (
              <Text>Nothing to show here</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {category.map((item, i) => (
              <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                <FilterPill
                  text={item.name}
                  onPress={() => {
                    if (item.name === 'NSE EQ')
                      setWatchCategoryFilter(segment[0], item.name);
                    else setWatchCategoryFilter(item, item.name);
                  }}
                  bgColor={
                    (filterState.filter.parent &&
                      filterState.filter.parent === item.name) ||
                    filterState.filter.name === item.name
                      ? colors.accentColor
                      : colors.secondaryLightColor
                  }
                  textColor={
                    (filterState.filter.parent &&
                      filterState.filter.parent === item.name) ||
                    filterState.filter.name === item.name
                      ? colors.lightColor
                      : colors.secondaryColor
                  }
                />
              </View>
            ))}
          </View>
        </View>
      {/* {routeName == 'Watchlist' ? (
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: colors.accentColor,
              fontSize: 16,
              fontWeight: '700',
              paddingVertical: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState.watchFilter.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState && filterState.watchFilter.parent == 'NSE EQ' ? (
              segment.map((item, i) => (
                <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                  <FilterPill
                    text={item.name}
                    onPress={() =>
                      setWatchSegmentFilter(
                        item,
                        filterState.watchFilter.parent,
                      )
                    }
                    bgColor={
                      filterState.watchFilter.name === item.name
                        ? colors.primaryColor
                        : colors.secondaryLightColor
                    }
                    textColor={
                      filterState.watchFilter.name === item.name
                        ? colors.darkColor
                        : colors.secondaryColor
                    }
                  />
                </View>
              ))
            ) : (
              <Text>Nothing to show here</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {category.map((item, i) => (
              <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                <FilterPill
                  text={item.name}
                  onPress={() => {
                    if (item.name === 'NSE EQ')
                      setWatchCategoryFilter(segment[0], item.name);
                    else setWatchCategoryFilter(item, item.name);
                  }}
                  bgColor={
                    (filterState.watchFilter.parent &&
                      filterState.watchFilter.parent === item.name) ||
                    filterState.watchFilter.name === item.name
                      ? colors.accentColor
                      : colors.secondaryLightColor
                  }
                  textColor={
                    (filterState.watchFilter.parent &&
                      filterState.watchFilter.parent === item.name) ||
                    filterState.watchFilter.name === item.name
                      ? colors.lightColor
                      : colors.secondaryColor
                  }
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              color: colors.accentColor,
              fontSize: 16,
              fontWeight: '700',
              paddingVertical: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState.scanFilter.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {filterState && filterState.scanFilter.parent == 'NSE EQ' ? (
              segment.map((item, i) => (
                <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                  <FilterPill
                    text={item.name}
                    onPress={() =>
                      setScanSegmentFilter(
                        item,
                        filterState.scanFilter.parent,
                      )
                    }
                    bgColor={
                      filterState.scanFilter.name === item.name
                        ? colors.primaryColor
                        : colors.secondaryLightColor
                    }
                    textColor={
                      filterState.scanFilter.name === item.name
                        ? colors.darkColor
                        : colors.secondaryColor
                    }
                  />
                </View>
              ))
            ) : (
              <Text>Nothing to show here</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 15,
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLightColor,
            }}>
            {category.map((item, i) => (
              <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                <FilterPill
                  text={item.name}
                  onPress={() => {
                    if (item.name === 'NSE EQ')
                      setScanCategoryFilter(segment[0], item.name);
                    else setScanCategoryFilter(item, item.name);
                  }}
                  bgColor={
                    (filterState.scanFilter.parent &&
                      filterState.scanFilter.parent === item.name) ||
                    filterState.scanFilter.name === item.name
                      ? colors.accentColor
                      : colors.secondaryLightColor
                  }
                  textColor={
                    (filterState.scanFilter.parent &&
                      filterState.scanFilter.parent === item.name) ||
                    filterState.scanFilter.name === item.name
                      ? colors.lightColor
                      : colors.secondaryColor
                  }
                />
              </View>
            ))}
          </View>
        </View>
      )} */}
    </>
  );
};

export default FilterModalContent;
