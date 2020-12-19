import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../constants';
import { globalStyles } from '../styles/globalStyles';

const Loading = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator color={colors.primaryColor} />
    </View>
  );
};

export default Loading;
