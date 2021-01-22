import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActiveSubscriptionCard, UpgradeSubscriptionCard } from '../components/card';
import { baseURL, colors } from '../constants';
import { AuthContext } from '../contexts/AuthContext';

const Profile = ({navigation}) => {
  const { loginState, loginDispatch } = useContext(AuthContext);
  const userInfo = loginState.userData;
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } catch (e) {
      console.log(e);
    }
    loginDispatch({ type: 'LOGOUT' });
  };

  let expiryDate = userInfo
    ? new Date(Date.parse(userInfo.expiry)).toString().substring(4, 15)
    : 'expiry';

  let subscriptionDetails = [
    {
      module: '1',
      plan: 'Free',
      price: '0',
      planStatus: 'Active',
      features: ['Performance', 'Pivot', 'Resistance'],
    },
    {
      module: '2',
      plan: 'Intraday',
      price: '2400',
      planStatus: 'Upgrade',
      features: ['Watchlist', 'Scanner', 'Alerts'],
    },
    {
      module: '3',
      plan: 'Positional',
      price: '4200',
      planStatus: 'Upgrade',
      features: ['Watchlist', 'Scanner', 'Alerts'],
    },
  ];

  return (
    <>
      {userInfo && (
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.lightColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 20,
              borderBottomColor: colors.secondaryLightColor,
              borderBottomWidth: 1,
            }}>
            <Icon name="account-circle-outline" size={80} />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>
                {userInfo.username}
              </Text>
              <Text style={{ fontSize: 16, color: colors.secondaryColor }}>
                {userInfo.email}
              </Text>
              <Text style={{ fontSize: 16, color: colors.secondaryColor }}>
                {userInfo.mobile}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}
              style={{
                backgroundColor: colors.darkColor,
                alignSelf: 'center',
                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 5,
                marginLeft: 40,
              }}>
              <Text
                style={{ color: colors.lightColor, fontWeight: 'bold' }}
                onPress={signOut}>
                Signout
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.secondaryColor,
                paddingTop: 15,
              }}>
              Subscription Details
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.secondaryColor,
                  paddingTop: 15,
                  marginRight: 5,
                  fontWeight: '700',
                }}>
                Expires on:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.secondaryColor,
                  paddingTop: 15,
                }}>
                {expiryDate}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <ActiveSubscriptionCard
                plan="Free"
                price="0"
                planStatus="Active"
              />
              <TouchableOpacity
                onPress={() => {
                  if (userInfo.module != '3') {
                    navigation.navigate('Coupon', {
                      price: 2400,
                      module: '2'
                    });
                  } else {
                    Alert.alert(
                      'Info:',
                      'Downgrade is not available, Wait for your licence to expire or renew Positional.',
                    );
                  }
                }}
                activeOpacity={0.8}>
                <UpgradeSubscriptionCard
                  plan="Intraday"
                  price="2400"
                  planStatus="Upgrade"
                  active={userInfo.module != '1'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Coupon', {
                  price: 4200,
                  module: '3'
                })}
                activeOpacity={0.8}>
                <UpgradeSubscriptionCard
                  plan="Positional"
                  price="4200"
                  planStatus="Upgrade"
                  active={userInfo.module == '3'}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Profile;
