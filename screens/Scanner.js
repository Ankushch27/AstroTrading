import React, { useContext } from 'react';
import { View } from 'react-native';
import { ScannerHeader } from '../components/TableHeader';
import ToolsTable from '../components/ToolsTable';
import { colors } from '../constants';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { staticCSV } from '../utils/helperFunctions';
import { FilterContext } from '../contexts/FilterContext';

const Scanner = ({ route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let scannerTableData = [];
  let trend = [];
  let watchArray = staticCSV.split('\r\n');
  // 32,33,0,2,6,9,11,13,15
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let watchArray = watchString.split('\r\n');
    watchArray.map((rowString) => {
      if (rowString.trim() !== '' && rowString) {
        const r = rowString.split(',');
        if (filterState.filter.key == '-1') {
          if (r[31] == '1') {
            let str = `${r[0]} ${r[2] == '1' ? 'Long' : 'Short'} ${r[6]} ${
              r[9]
            } ${r[11]} ${r[13]} ${r[15]}`;
            trend.push(r[2]);
            scannerTableData.push(str.split(' '));
          }
        } else {
          if (r[1] && r[1] == filterState.filter.key) {
            if (r[31] == '1') {
              let str = `${r[0]} ${r[2] == '1' ? 'Long' : 'Short'} ${r[6]} ${
                r[9]
              } ${r[11]} ${r[13]} ${r[15]}`;
              trend.push(r[2]);
              scannerTableData.push(str.split(' '));
            }
          }
        }
      }
    });
  }

  const scannerHeader = [
    'Name',
    'Trend',
    'Entry Price',
    'T1',
    'T2',
    'T3',
    'SL',
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <ScannerHeader />
      <ToolsTable
        tableHeader={scannerHeader}
        tableData={scannerTableData}
        tabName={route.name}
        scanTrend={trend}
        isDataLoaded={dataState.data}
      />
    </View>
  );
};

export default Scanner;
