import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { globalStyles } from '../styles/globalStyles';
import { colors, baseURL } from '../constants';
import { SolidButton } from '../components/button';
import { Formik } from 'formik';
import Axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Coupon = ({ navigation, route }) => {
  const { price, module } = route.params;
  const { loginState, loginDispatch } = useContext(AuthContext);
  const userInfo = loginState.userData;
  // const [clickable, setClickable] = useState(true);
  const [amount, setAmount] = useState(price);
  const [couponMsg, setCouponMsg] = useState('');
  const [couponName, setCouponName] = useState('');

  const api = Axios.create({
    baseURL: baseURL,
  });

  let RazorAppId = __DEV__
    ? 'rzp_test_Fal16y2DSzGQBU'
    : 'rzp_live_hYE01NBhzRC2J4';
  let RazorAppSecret = __DEV__
    ? 'BOqSh9zRwyp78WEffeb7EsoT'
    : 'cq2B6VqHIrxVEObdqLO1yCkq';

  let receiptNo = 'rcpti_11';

  const checkCoupon = async (coupon) => {
    console.log('coupon', coupon);
    console.log('loginState.userToken', loginState.userToken);
    setCouponMsg('');
    setAmount(price);
    let data = JSON.stringify({
      CouponName: coupon,
      Mobile: userInfo.email,
    });
    try {
      let couponRes = await api.post('/GetCouponValue', data, {
        headers: {
          Authorization: `Bearer ${loginState.userToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('couponRes', couponRes);
      if (couponRes.data.error) {
        setCouponMsg(couponRes.data.data);
        return;
      }
      let couponArray = couponRes.data.data.split(':');
      let resAmount = couponArray[0];
      let resModuleList = couponArray[1].split(',');
      let payableAmount = (resAmount * price) / 100;
      if (resModuleList.includes(module)) {
        setCouponName(coupon);
        setCouponMsg(`Coupon code ${coupon} has been successfully applied`);
        setAmount(payableAmount);
      } else {
        if (module == '2') {
          setCouponMsg('Coupon is available on Positional only');
        }
        if (module == '3') {
          setCouponMsg('Coupon is available on Intraday only');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = (amount, updateModule) => {
    if (amount > 0) {
      // setClickable(false);
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
          receipt: receiptNo,
        },
      }).then(function (response) {
        console.log(response.data);
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
            console.log('inside');
            console.log('Razorpay res:', data);
            try {
              let req = {
                Username: userInfo.name,
                Password: userInfo.password,
                Email: userInfo.email,
                Amount:
                  response.data.amount.toString().slice(0, -2) +
                  '.' +
                  response.data.amount.toString().slice(-2),
                Mobile: userInfo.mobile,
                Module: updateModule,
                NumberOfLicenses: 1,
                Lic_update: true,
                Update: false,
              };
              //console.log(JSON.stringify(req))
              let res = await api.post('/RegisterUser', req);

              let transRes = await api.post('/TransactionUpdate', {
                Mobile: userInfo.email,
                Receipt_no: receiptNo,
                Amount:
                  response.data.amount.toString().slice(0, -2) +
                  '.' +
                  response.data.amount.toString().slice(-2),
                Order_no: data.razorpay_order_id,
                Trans: '',
                Coupon: couponName,
                Payment_no: data.razorpay_payment_id,
                Sign: data.razorpay_signature,
                isSuccess: 1,
              });
              console.log('transRes', transRes);
              console.log('res.data', res);
              if (res.data.code == '400') {
                let res2 = await api.get('/GetDetails', {
                  headers: { Authorization: `Bearer ${loginState.userToken}` },
                });
                let currentUser = res2.data.data[0];
                loginDispatch({ type: 'SAVE_USER', id: currentUser });
              }
            } catch (e) {
              console.log('catch e', e);
            }
          })
          .catch(async (error) => {
            // handle failure
            let transRes = await api.post('/TransactionUpdate', {
              Mobile: userInfo.email,
              Receipt_no: receiptNo,
              Amount:
                response.data.amount.toString().slice(0, -2) +
                '.' +
                response.data.amount.toString().slice(-2),
              Order_no: response.data.id,
              Coupon: '',
              Trans: '',
              Payment_no: '',
              Sign: '',
              isSuccess: 0,
            });
            console.log('F.inside', error.error.description);
            alert(`Error: ${error.error.description}`);
          });
          navigation.navigate('Home')
      });
      console.log('outside');
    } else {
      let req = {
        Username: userInfo.name,
        Password: userInfo.password,
        Email: userInfo.email,
        Amount: '0.00',
        Mobile: userInfo.mobile,
        Module: updateModule,
        NumberOfLicenses: 1,
        Lic_update: true,
        Update: false,
      };
      //console.log(JSON.stringify(req))
      api
        .post('/RegisterUser', req)
        .then((res) => {
          if (res.data.code == '400') {
            api
              .get('/GetDetails', {
                headers: { Authorization: `Bearer ${loginState.userToken}` },
              })
              .then((res2) => {
                let currentUser = res2.data.data[0];
                loginDispatch({ type: 'SAVE_USER', id: currentUser });
              })
              .catch((e) => {
                console.log('catch e', e);
              });
          }
        })
        .catch((e) => {
          console.log('catch e', e);
        });

      api
        .post('/TransactionUpdate', {
          Mobile: userInfo.email,
          Receipt_no: receiptNo,
          Amount: '0.00',
          Order_no: 'NA',
          Trans: '',
          Coupon: couponName,
          Payment_no: 'NA',
          Sign: 'NA',
          isSuccess: 1,
        })
        .then((transRes) => {
          console.log('transRes', transRes);
        })
        .catch((e) => {
          console.log('catch e', e);
        });
        navigation.navigate('Home')
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          // backgroundColor: colors.darkColor,
          padding: 24,
        }}>
        <Formik
          initialValues={{
            coupon: '',
          }}
          onSubmit={(values, actions) => {
            setCouponMsg('');
            createOrder(amount * 100, module);
            actions.resetForm();
            console.log('pay');
          }}>
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
            handleSubmit,
          }) => (
            <>
              <View>
                <View
                  style={[
                    globalStyles.inputContainer,
                    { borderWidth: 1, borderColor: colors.darkColor },
                  ]}>
                  <TextInput
                    style={{ color: colors.darkColor }}
                    // selectionColor="white"
                    onChangeText={handleChange('coupon')}
                    value={values.coupon}
                    placeholder="Have a Coupon code?"
                    placeholderTextColor={colors.secondaryColor}
                  />
                  {values.coupon ? (
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        backgroundColor: colors.darkColor,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{ color: colors.lightColor }}
                        onPress={() => checkCoupon(values.coupon)}>
                        Apply
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                {values.coupon && couponMsg ? (
                  <Text style={globalStyles.error}>{couponMsg}</Text>
                ) : null}
              </View>
              <SolidButton
                text={`Pay \u20B9${amount}`}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Coupon;
