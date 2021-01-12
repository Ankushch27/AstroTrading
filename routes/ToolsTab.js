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
import { ToastAndroid } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

const ToolsTabScreen = () => {
  const sheetRef = React.useRef(null);
  const [visibleToast, setvisibleToast] = useState(false);
  const { loginState, loginDispatch  } = useContext(AuthContext);
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

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('mobile');
      await AsyncStorage.removeItem('password');
    } catch (e) {
      console.log(e);
    }
    loginDispatch({ type: 'LOGOUT' });
  };

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
    else if(csvData == "Login Expired!"){
      signOut()
      setvisibleToast(true);
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
      <Toast visible={visibleToast} message="Another user has logged in using this account!" />
    </>
  );
};

export default ToolsTabScreen;
