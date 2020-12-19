import React, { useContext } from 'react';
import { View } from 'react-native';
import ToolsTable from '../components/ToolsTable';
import { colors } from '../constants';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { staticCSV } from '../utils/helperFunctions';
import { FilterContext } from '../contexts/FilterContext';

const Pivot = ({ route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let pivotTableData = [];
  let watchArray = staticCSV.split('\r\n');
  // 0,28,29,30,24,25,26,27
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let watchArray = watchString.split('\r\n');
    watchArray.map((rowString) => {
      if (rowString.trim() !== '' && rowString) {
        const r = rowString.split(',');
        if (filterState.filter.key == '-1') {
          let str = `${r[0]} ${r[28]} ${r[29]} ${r[30]} ${r[24]} ${r[25]} ${r[26]} ${r[27]}`;
          pivotTableData.push(str.split(' '));
        } else {
          if (r[1] && r[1] == filterState.filter.key) {
            let str = `${r[0]} ${r[28]} ${r[29]} ${r[30]} ${r[24]} ${r[25]} ${r[26]} ${r[27]}`;
            pivotTableData.push(str.split(' '));
          }
        }
      }
    });
  }
  const pivotHeader = ['Name', 'R1', 'R2', 'R3', 'PV', 'S1', 'S2', 'S3'];
  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <ToolsTable
        tableHeader={pivotHeader}
        tableData={pivotTableData}
        tabName={route.name}
        isDataLoaded={dataState.data}
      />
    </View>
  );
};

export default Pivot;
