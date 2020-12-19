import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import FilterModal from '../components/FilterModal';
import ToolsTabFilterHeader from '../components/ToolsTabFilterHeader';
import { baseURL } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import { CSVDataContext } from '../contexts/CSVDataContext';
import Alerts from '../screens/Alerts';
import Loading from '../screens/Loading';
import PastPerformance from '../screens/PastPerformance';
import Pivot from '../screens/Pivot';
import Scanner from '../screens/Scanner';
import SupRes from '../screens/SupRes';
import Watchlist from '../screens/Watchlist';
import { FilterContext } from '../contexts/FilterContext';

const Tab = createMaterialTopTabNavigator();

const ToolsTabScreen = () => {
  const sheetRef = React.useRef(null);
  const { loginState } = useContext(AuthContext);
  const { dispatch } = useContext(CSVDataContext);
  const { filterState, filterDispatch } = useContext(FilterContext);
  const userInfo = loginState.userData;
  let strategyText = '';

  const api = Axios.create({
    baseURL: baseURL,
  });

  const strategyKey = filterState.strategy.key;
  const strategyName=filterState.strategy.name;
  strategyText = `${
    strategyKey.includes('M')
      ? 'Positional/Money Monsoon'
      : 'Intraday/Money ATM'
  } ${
    strategyName.trim()
  }`;

  // switch (strategyKey) {
  //   case 'WL15':
  //     strategyText = 'Positional/Money Monsoon 15 Min';
  //     break;
  //   case 'WLMH':
  //     strategyText = 'Positional/Money Monsoon 15 Min';
  //     break;
  //   case 'WLMD':
  //     strategyText = 'Positional/Money Monsoon 15 Min';
  //     break;
  //   case 'WLMW':
  //     strategyText = 'Positional/Money Monsoon 15 Min';
  //     break;
  //   default:
  //     strategyText = 'Intraday/Money ATM 5 Min';
  //     break;
  // }

  // console.log('tools', strategyKey)

  const getCSVData = async (token) => {
    let res = await api.get(`/GetCSV/${strategyKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('get csv', strategyKey)
    const csvData = res.data.data;
    if (res.data.code == '200') {
      dispatch({ type: 'SAVE_CSV_DATA', data: csvData });
    }
  };

  useEffect(() => {
    let loop = setInterval(() => {
      getCSVData(loginState.userToken);
    }, 6000);
    return () => clearInterval(loop);
  });

  return (
    <>
      <ToolsTabFilterHeader
        onStrategyPress={() => {
          sheetRef.current.open();
          filterDispatch({
            type: 'OPEN_STRATEGY_MODAL',
            openStrategyModal: true,
          });
          filterDispatch({ type: 'OPEN_FILTER_MODAL', openFilterModal: false });
        }}
        onFilterPress={() => {
          sheetRef.current.open();
          filterDispatch({ type: 'OPEN_FILTER_MODAL', openFilterModal: true });
          filterDispatch({
            type: 'OPEN_STRATEGY_MODAL',
            openStrategyModal: false,
          });
        }}
        strategyText={strategyText}
      />
      {userInfo ? (
        userInfo.module == 1 ? (
          <Tab.Navigator
            lazy={true}
            sceneContainerStyle={{ backgroundColor: 'black' }}
            tabBarOptions={{
              scrollEnabled: true,
              style: { backgroundColor: '#AF001F' },
              activeTintColor: 'white',
              indicatorStyle: { backgroundColor: 'white' },
            }}>
            <Tab.Screen name="PastPerformance" component={PastPerformance} />
            <Tab.Screen name="Pivot" component={Pivot} />
            <Tab.Screen name="Sup / Res" component={SupRes} />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: 'black' }}
            tabBarOptions={{
              scrollEnabled: true,
              style: { backgroundColor: '#AF001F' },
              activeTintColor: 'white',
              indicatorStyle: { backgroundColor: 'white' },
            }}>
            <Tab.Screen name="Watchlist" component={Watchlist} />
            <Tab.Screen name="Scanner" component={Scanner} />
            <Tab.Screen name="Past Performance" component={PastPerformance} />
            <Tab.Screen name="Alerts" component={Alerts} />
            <Tab.Screen name="Pivot" component={Pivot} />
            <Tab.Screen name="Sup / Res" component={SupRes} />
          </Tab.Navigator>
        )
      ) : (
        <Loading />
      )}
      <FilterModal sheetRef={sheetRef} />
    </>
  );
};

export default ToolsTabScreen;
