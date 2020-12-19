import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterModalContent from './FilterModelContent';
import StrategyModalContent from './StrategyModalContent';
import { FilterContext } from '../contexts/FilterContext';

const FilterModal = ({ sheetRef }) => {
  const { filterState } = useContext(FilterContext);
  return (
    <RBSheet
      ref={sheetRef}
      height={450}
      animationType="slide"
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        wrapper: {
          backgroundColor: '#00000080',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {filterState.openFilterModal ? (
            <FilterModalContent />
          ) : (
            <StrategyModalContent />
          )}
        </ScrollView>
      </View>
    </RBSheet>
  );
};

export default FilterModal;
