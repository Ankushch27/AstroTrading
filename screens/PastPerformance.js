import React, { useContext } from 'react';
import { View } from 'react-native';
import { PastPerformanceHeader } from '../components/TableHeader';
import ToolsTable from '../components/ToolsTable';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { FilterContext } from '../contexts/FilterContext';

const PastPerformance = ({ route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let performanceTableData = [];
  let PnLHighlight = [];

  // 1,36,37,38
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let watchArray = watchString.split('\r\n');
    watchArray.map((rowString) => {
      if (rowString.trim() !== '' && rowString) {
        const r = rowString.split(',');
        if (filterState.filter.key == '-1') {
          let str = `${r[0]} ${r[36]} ${r[37]} ${r[38]}%`;
          PnLHighlight.push(r[37])
          performanceTableData.push(str.split(' '));
        } else {
          if (r[1] && r[1] == filterState.filter.key) {
            let str = `${r[0]} ${r[36]} ${r[37]} ${r[38]}`;
            PnLHighlight.push(r[37])
            performanceTableData.push(str.split(' '));
          }
        }
      }
    });
  }

  const performanceHeader = ['Name', 'Qty', 'PnL', 'ROI'];

  return (
    <View style={{ flex: 1 }}>
      <PastPerformanceHeader />
      <ToolsTable
        tableHeader={performanceHeader}
        tableData={performanceTableData}
        tabName={route.name}
        isDataLoaded={dataState.data}
        PnLHighlight={PnLHighlight}
      />
    </View>
  );
};

export default PastPerformance;
