import React, { useContext } from 'react';
import { View } from 'react-native';
import { colors } from '../constants';
import ToolsTable from '../components/ToolsTable';
import { staticCSV } from '../utils/helperFunctions';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { FilterContext } from '../contexts/FilterContext';

const Alerts = ({ route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let alertsTableData = [];
  let sortData = [];
  let alertsArray = staticCSV.split('\r\n');
  // 1,34,35
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let alertsArray = watchString.split('\r\n');
    alertsArray.map((rowString) => {
      if (rowString.trim() != '' && rowString) {
        const r = rowString.split(',');
        let text_code = 'None';
        switch (r[34]) {
          case '1':
            text_code = 'Long Entry';
            break;
          case '-1':
            text_code = 'Short Entry';
            break;
          case '2':
            text_code = 'Long Target 1 Achieved';
            break;
          case '-2':
            text_code = 'Short Target 1 Achieved';
            break;
          case '3':
            text_code = 'Long Target 2 Achieved';
            break;
          case '-3':
            text_code = 'Short Target 2 Achieved';
            break;
          case '4':
            text_code = 'Long Target 3 Achieved';
            break;
          case '-4':
            text_code = 'Short Target 3 Achieved';
            break;
          case '5':
            text_code = 'Long Stoploss Hit';
            break;
          case '-5':
            text_code = 'Short Stoploss Hit';
            break;
          default:
            text_code = '0';
            break;
        }

        // if (filterState.filter.key == '-1') {
        //   let str = `${r[0]}*${text_code}*${r[35]}`;
        //   alertsTableData.push(str.split('*'));
        // } else {
        //   if (r[1] && r[1] == filterState.filter.key) {
        //     let str = `${r[0]}*${text_code}*${r[35]}`;
        //     alertsTableData.push(str.split('*'));
        //   }
        // }
        if (filterState.filter.key == '-1' && text_code != '0') {
          r[35] = r[35].padStart(6, '0');
          let time = `${r[35][0]}${r[35][1]}:${r[35][2]}${r[35][3]}`;
          let str = `${r[0]}*${text_code}*${time}`;
          sortData.push({ line: str, key: parseInt(r[35]) + parseInt(r[4]) });
        } else {
          if (r[1] && r[1] == filterState.filter.key && text_code != '0') {
            r[35] = r[35].padStart(6, '0');
            let time = `${r[35][0]}${r[35][1]}:${r[35][2]}${r[35][3]}`;
            let str = `${r[0]}*${text_code}*${time}`;
            sortData.push({ line: str, key: parseInt(r[35]) + parseInt(r[4]) });
          }
        }
      }
    });
    sortData
      .sort((a, b) => b.key - a.key)
      .map((rowString) => {
        //console.log(rowString.line);
        alertsTableData.push(rowString.line.split('*'));
      });
  }
  const alertsHeader = ['Name', 'Text Code', 'Time'];
  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <ToolsTable
        tableHeader={alertsHeader}
        tableData={alertsTableData}
        tabName={route.name}
        isDataLoaded={dataState.data}
      />
    </View>
  );
};

export default Alerts;
