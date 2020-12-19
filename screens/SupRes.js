import React, { useContext } from 'react';
import { View } from 'react-native';
import ToolsTable from '../components/ToolsTable';
import { colors } from '../constants';
import { staticCSV } from '../utils/helperFunctions';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { FilterContext } from '../contexts/FilterContext';

const SupRes = ({ route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let supresTableData = [];
  let trend = [];
  let watchArray = staticCSV.split('\r\n');
  // 0,2,22,23
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let watchArray = watchString.split('\r\n');
    watchArray.map((rowString) => {
      if (rowString.trim() !== '' && rowString) {
        const r = rowString.split(',');
        if (filterState.filter.key == '-1') {
          let str = `${r[0]} ${r[2] == '1' ? 'Long' : 'Short'} ${r[22]} ${
            r[23]
          }`;
          trend.push(r[2]);
          supresTableData.push(str.split(' '));
        } else {
          if (r[1] && r[1] == filterState.filter.key) {
            let str = `${r[0]} ${r[2] == '1' ? 'Long' : 'Short'} ${r[22]} ${
              r[23]
            }`;
            trend.push(r[2]);
            supresTableData.push(str.split(' '));
          }
        }
      }
    });
  }
  const supresHeader = ['Name', 'Trend', 'Breakout', 'Support'];
  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <ToolsTable
        tableHeader={supresHeader}
        tableData={supresTableData}
        tabName={route.name}
        supresTrend={trend}
        isDataLoaded={dataState.data}
      />
    </View>
  );
};

export default SupRes;
