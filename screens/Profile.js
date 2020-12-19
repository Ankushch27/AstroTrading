import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActiveSubscriptionCard, UpgradeSubscriptionCard } from '../components/card';
import { api, colors } from '../constants';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { loginState, dispatch } = useContext(AuthContext);
  const userInfo = loginState.userData;
  const [clickable, setClickable] = useState(true)
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('mobile');
      await AsyncStorage.removeItem('password');
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: 'LOGOUT' });
  };

  let RazorAppId = __DEV__
    ? 'rzp_test_Fal16y2DSzGQBU'
    : 'rzp_live_hYE01NBhzRC2J4';
  let RazorAppSecret = __DEV__
    ? 'BOqSh9zRwyp78WEffeb7EsoT'
    : 'cq2B6VqHIrxVEObdqLO1yCkq';
  
  const createOrder = (amount, updateModule) => {
    if (clickable) {
      setClickable(false);
      Axios({
        method: 'post',
        url: 'https://api.razorpay.com/v1/orders',
        auth: {
          username: RazorAppId,
          password: RazorAppSecret,
        },
        data: {
          amount: amount,
          currency: 'INR',
          receipt: 'rcpti_11',
        },
      }).then(function (response) {
        console.log(response.data.id);
        var options = {
          description: 'Credits towards consultation',
          image: 'https://cdn.razorpay.com/logos/GArhRIXEDZ2mMU_medium.jpg',
          currency: response.data.currency,
          key: RazorAppId,
          amount: response.data.amount,
          name: 'Astro Trading',
          order_id: response.data.id,
          prefill: {
            email: userInfo.email,
            contact: userInfo.mobile,
            name: userInfo.username,
          },
          theme: { color: '#53a20e' },
        };
        RazorpayCheckout.open(options)
          .then(async (data) => {
            // handle success
            console.log("inside");
            console.log('Razorpay res:', data);
            try {
              let res = await api.post('/RegisterUser', {
                Username: userInfo.name,
                Password: userInfo.password,
                Email: userInfo.email,
                Mobile: userInfo.mobile,
                Module: updateModule,
                NumberOfLicenses: 1,
                Lic_update: true,
                Update: false,
              });
              console.log(res.data);
              if (res.data.code == '400') {
                let res2 = await api.get('/GetDetails', {
                  headers: { Authorization: `Bearer ${loginState.userToken}` },
                });
                let currentUser = res2.data.data[0];
                dispatch({ type: 'SAVE_USER', id: currentUser });
              }
              // dispatch({
              //   type: 'SAVE_USER',
              //   id: { ...userInfo, module: updateModule },
              // });
            } catch (e) {
              console.log('catch e', e);
            }
            setClickable(true);
            // alert(`Success: ${data.razorpay_payment_id}`);
          })
          .catch((error) => {
            // handle failure
            console.log("F.inside",error.error.description);
            alert(`Error: ${error.error.description}`);
            setClickable(true);
          });
        //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      });
      console.log("outside");
      
    } else {
      console.log('click failed');
      return;
    }
  };

  // console.log('Profile userInfo', userInfo);

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
            <View style={{ marginLeft: 40 }}>
              <Text style={{ fontWeight: 'bold' }} onPress={signOut}>
                Signout
              </Text>
            </View>
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
            <ActiveSubscriptionCard plan="Free" price="0" planStatus="Active" />
            <TouchableOpacity
              onPress={() => {
                if (userInfo.module != '3') {
                  createOrder(240000, 2);
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
              onPress={() => createOrder(420000, 3)}
              activeOpacity={0.8}>
              <UpgradeSubscriptionCard
                plan="Positional"
                price="4200"
                planStatus="Upgrade"
                active={userInfo.module == '3'}
              />
            </TouchableOpacity>
          </View></ScrollView>
        </View>
      )}
    </>
  );
};

export default Profile;
