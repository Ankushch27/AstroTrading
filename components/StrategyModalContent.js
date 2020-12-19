import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../constants';
import { FilterPill } from './button';
import { FilterContext } from '../contexts/FilterContext';

const intraday = [
  { name: '5 Min', key: 'WLF' },
  { name: '15 Min', key: 'WL15' },
];

const positional = [
  { name: ' 15 Min', key: 'WLM15' },
  { name: 'Hourly', key: 'WLMH' },
  { name: 'Daily', key: 'WLMD' },
  // { name: 'Weekly', key: 'WLMW' },
];

const StrategyModalContent = () => {
  const { filterState, filterDispatch } = useContext(FilterContext);

  const setStrategyFilter = (strategy) => {
    if (strategy.key != '') {
      // console.log('strategy', strategy);
      // console.log('fstrategy', filterState.strategy)

      filterDispatch({
        type: 'STRATEGY',
        strategy: { name: strategy.name, key: strategy.key },
      });
    }
  };
  return (
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
        Intraday (Money Atm)
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
        {filterState && intraday.map((item, i) => (
          <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
            <FilterPill
              onPress={() => {
                setStrategyFilter(item);
              }}
              text={item.name}
              bgColor={
                filterState.strategy.name == item.name
                  ? colors.accentColor
                  : colors.secondaryLightColor
              }
              textColor={
                filterState.strategy.name == item.name
                  ? colors.lightColor
                  : colors.secondaryColor
              }
            />
          </View>
        ))}
      </View>
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
        Positional (Money Monsoon)
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
        {filterState && positional.map((item, i) => (
          <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
            <FilterPill
              onPress={() => {
                setStrategyFilter(item);
              }}
              text={item.name}
              bgColor={
                filterState.strategy.name == item.name
                  ? colors.accentColor
                  : colors.secondaryLightColor
              }
              textColor={
                filterState.strategy.name == item.name
                  ? colors.lightColor
                  : colors.secondaryColor
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default StrategyModalContent;
