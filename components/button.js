import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../constants';

export const SolidButton = ({ text, onPress, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.btn, styles.btnSolid]}>
        {!isLoading ? (
          <Text style={[styles.btnText, styles.btnSolidText]}>{text}</Text>
        ) : (
          <ActivityIndicator color={colors.darkColor} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export const OutlineButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.btn, styles.btnOutline]}>
        <Text style={[styles.btnText, styles.btnOutlineText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const TextButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.btnText, styles.btnOutlineText]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const TradeButton = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? colors.accentColor : colors.primaryColor },
        styles.tradeBtn,
      ]}>
      {({ pressed }) => (
        <Text
          style={[
            { color: pressed ? colors.lightColor : colors.darkColor },
            styles.tradeBtnText,
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export const FilterPill = ({ text, onPress, bgColor, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.filterPill, { backgroundColor: bgColor }]}>
        <Text style={[styles.filterPillText, { color: textColor }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '80%',
    alignSelf: 'center',
  },
  btnSolid: {
    backgroundColor: colors.primaryColor,
    marginTop: 30,
  },
  btnOutline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primaryColor,
    marginTop: 20,
  },
  btnText: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnSolidText: {
    color: colors.darkColor,
  },
  btnOutlineText: {
    color: colors.primaryColor,
  },
  tradeBtn: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignSelf: 'center',
    width: '90%',
    marginBottom: 30,
  },
  tradeBtnText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  filterPill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    borderRadius: 30,
  },
  filterPillText: {
    // textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
