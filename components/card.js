import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dash from 'react-native-dash';
import { colors } from '../constants';

const features = ['Watchlist', 'Scanner', 'Alerts']

export const ActiveSubscriptionCard = ({ plan, price, planStatus }) => (
  <View style={styles.subscriptionCard}>
    <View style={styles.plan}>
      <View
        style={{
          backgroundColor: colors.darkColor,
          alignSelf: 'center',
          paddingHorizontal: 30,
          paddingVertical: 5,
          borderRadius: 5,
        }}>
        <Text style={{ color: colors.lightColor }}>{plan}</Text>
      </View>
      <Text style={{ fontSize: 29, fontWeight: '500' }}>&#8377; {price}</Text>
      <Text>Per month</Text>
      <View style={styles.topCut}></View>
      <View style={styles.bottomCut}></View>
    </View>
    <View>
      <Dash
        dashColor={colors.lightColor}
        dashGap={5}
        style={{ width: 1, height: 110, flexDirection: 'column' }}
      />
    </View>
    <View style={styles.features}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Features</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>{'\u2022'}</Text>
        <Text style={{ fontSize: 16 }}>Performance</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>{'\u2022'}</Text>
        <Text style={{ fontSize: 16 }}>Pivot</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>{'\u2022'}</Text>
        <Text style={{ fontSize: 16 }}>Resistance</Text>
      </View>
    </View>
    <View style={styles.planStatus}>
      <Text
        style={{ color: colors.lightColor, textAlign: 'center', fontSize: 16 }}>
        {planStatus}
      </Text>
    </View>
  </View>
);

export const UpgradeSubscriptionCard = ({ plan, price, planStatus, active }) => {
  console.log(active)
  return (
  <View
    style={[styles.subscriptionCard, (active) ? {backgroundColor: colors.primaryColor} : {backgroundColor: colors.accentColor}]}>
    <View style={styles.plan}>
      <Text style={(active) ? { color: colors.darkColor } : { color: colors.lightColor }}>{plan}</Text>
      <Text style={[{ fontSize: 29, fontWeight: '500' }, (active) ? { color: colors.darkColor } : { color: colors.lightColor }]}>&#8377; {price}</Text>
      <Text style={(active) ? { color: colors.darkColor } : { color: colors.lightColor }}>Per month</Text>
      <View style={styles.topCut}></View>
      <View style={styles.bottomCut}></View>
    </View>
    <View>
      <Dash
        dashColor={colors.lightColor}
        dashGap={5}
        style={{ width: 1, height: 110, flexDirection: 'column' }}
      />
    </View>
    <View style={styles.features}>
      <Text style={[{fontSize: 20, fontWeight: '700' }, (active) ? { color: colors.darkColor } : { color: colors.lightColor }]}>Features</Text>
      {features.map((name, id) => <View key={id} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[{fontSize: 20, marginRight: 10 }, (active) ? { color: colors.darkColor } : { color: colors.lightColor }]}>{'\u2022'}</Text>
        <Text style={[{fontSize: 16 }, (active) ? { color: colors.darkColor } : { color: colors.lightColor }]}>{name}</Text>
      </View>)}
    </View>
    <View style={styles.planStatus}>
      <Text
        style={{ color: colors.lightColor, textAlign: 'center', fontSize: 16 }}>
        {active ? 'Active' : 'Upgrade'}
      </Text>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  subscriptionCard: {
    flexDirection: 'row',
    marginVertical:15,
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    paddingVertical: 20,
  },
  plan: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  features: {
    justifyContent: 'center',
    paddingLeft: 20,
  },
  planStatus: {
    backgroundColor: colors.darkColor,
    alignSelf: 'center',
    transform: [{ rotate: '-90deg' }],
    paddingVertical: 6,
    width: 80,
    position: 'absolute',
    right: -23,
  },
  topCut: {
    position: 'absolute',
    backgroundColor: colors.lightColor,
    padding: 10,
    borderRadius: 20,
    top: -30,
    right: -10,
  },
  bottomCut: {
    position: 'absolute',
    backgroundColor: colors.lightColor,
    padding: 10,
    borderRadius: 20,
    bottom: -30,
    right: -10,
  },
});
