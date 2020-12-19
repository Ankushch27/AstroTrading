import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ToolsTabFilterHeader = ({ onStrategyPress, onFilterPress, strategyText }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={onStrategyPress}
        activeOpacity={0.5}>
        <Text style={styles.headerText}>{strategyText}</Text>
        <Icon name="chevron-down" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFilterPress} activeOpacity={0.5}>
        <Icon
          name="filter-outline"
          size={24}
          style={{ paddingHorizontal: 5 }}
          color="#FFC000"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ToolsTabFilterHeader;
