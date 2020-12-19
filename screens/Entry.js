import React from 'react';
import { View, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { SolidButton, OutlineButton } from '../components/button';
import { colors } from '../constants';

const Entry = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 2  }}/>
      <View style={{ flex: 5  }}>
        <Image
          defaultSource={require('../assets/astro.png')}
          source={require('../assets/LogoHome.jpg')}
          style={{
            alignSelf: 'center',
            height: '80%',
            width: '80%',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 5 }}>
        <SolidButton text="login" onPress={() => navigation.push('Login')} />
        <OutlineButton
          text="sign up"
          onPress={() => navigation.push('Signup')}
        />
      </View>
    </View>
  );
};

export default Entry;
