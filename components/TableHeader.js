import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ScannerHeader = () => {
  const currentDatetime = new Date();
  // console.log(currentDatetime.toLocaleTimeString());
  // console.log(    currentDatetime.getMinutes() + 5 - (currentDatetime.getMinutes() % 5));
  currentDatetime.setMinutes(
    currentDatetime.getMinutes() + 5 - (currentDatetime.getMinutes() % 5),
  );

  const currentDate = currentDatetime.toLocaleDateString();
  const currentTime = currentDatetime
    .toLocaleTimeString()
    .padStart(8, 0)
    .substring(0, 5);

  return (
    <View style={styles.header}>
      <View style={styles.headerParts}>
        <Icon name="calendar-month" size={30} color="black" />
        <Text style={styles.headerText}>{currentDate}</Text>
      </View>
      <View style={styles.headerParts}>
        <Icon name="alarm" size={30} color="black" />
        <Text style={styles.headerText}>{currentTime}</Text>
      </View>
    </View>
  );
};

export const PastPerformanceHeader = () => {
  const now = new Date();
  const prevMonthFirstDate = new Date(
    now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
    (now.getMonth() - 1 + 12) % 12, now.getDate() - 1).toLocaleDateString();
  const prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toLocaleDateString();
  return (
    <View style={styles.header}>
      <View style={styles.headerParts}>
        <Icon name="calendar-month" size={30} color="black" />
        <Text style={styles.headerText}>{`${prevMonthFirstDate} - ${prevMonthLastDate}`}</Text>
      </View>
      <View style={styles.headerParts}>
        <Icon name="trending-up" size={30} color="black" />
        <View>
          <Text style={styles.headerText}>1,00,000/-</Text>
          <Text style={[styles.headerText, { fontSize: 10 }]}>
            (Or As per lot size)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFC000',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerParts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    fontWeight: '600',
    marginLeft: 5,
  },
});
