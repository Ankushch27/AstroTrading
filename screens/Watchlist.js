import React, { useContext } from 'react';
import { View } from 'react-native';
import ToolsTable from '../components/ToolsTable';
import { CSVDataContext } from '../contexts/CSVDataContext';
import { FilterContext } from '../contexts/FilterContext';
import { colors } from '../constants';
import { staticCSV } from '../utils/helperFunctions';

const Watchlist = ({ navigation, route }) => {
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  let indicatorColor = [];
  let trend = [];
  let watchTableData = [];
  let SymbolDetailsData = [];
  if (dataState.data) {
    let watchString = dataState.data.Watch;
    // console.log('watch',watchString.split('\r\n').length);
    let watchArray = watchString.split('\r\n');
    /// Watch list colums 0,2,4,5,3,6,7,8
    /// 8=> if > value Green else red
    watchArray.map((rowString) => {
      if (rowString.trim() != '' && rowString) {
        let r = rowString.split(',');
        // filter select all
        try {
          if (filterState.filter.key == '-1') {
            SymbolDetailsData.push(rowString.split(','));
            //201203 122000

            if (!r[5]) {
              console.log(r);
            }
            r[5] = r[5].padStart(6, '0');

            var datetime = `${r[4][4]}${r[4][5]}/${r[4][2]}${r[4][3]}  ${r[5][0]}${r[5][1]}:${r[5][2]}${r[5][3]}`;
            let str = `${r[0]}*${r[2] == '1' ? 'Long' : 'Short'}*${datetime}*${
              r[3]
            }*${r[6]}*${r[7]}`;
            indicatorColor.push(r[8]);
            trend.push(r[2]);
            watchTableData.push(str.split('*'));
          } else {
            //select only filter
            if (r[1] && r[1] == filterState.filter.key) {
              SymbolDetailsData.push(rowString.split(','));
              //201203 122000
              var datetime = `${r[4][4]}${r[4][5]}/${r[4][2]}${r[4][3]}  ${r[5][0]}${r[5][1]}:${r[5][2]}${r[5][3]}`;
              let str = `${r[0]}*${
                r[2] == '1' ? 'Long' : 'Short'
              }*${datetime}*${r[3]}*${r[6]}*${r[7]}`;
              indicatorColor.push(r[8]);
              trend.push(r[2]);
              watchTableData.push(str.split('*'));
            }
          }
        } catch (e) {}
      }
    });
  }

  // Static CSV data
  let watchArray = staticCSV.split('\r\n');
  const watchlistHeader = [
    'Name',
    'Trend',
    'Entry Time',
    'LTP',
    'Entry Price',
    'PnL',
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <ToolsTable
        tableHeader={watchlistHeader}
        tableData={watchTableData}
        tabName={route.name}
        onSymbolPress={(index) =>
          navigation.navigate('SymbolDetails', {
            data: SymbolDetailsData[index][0],
          })
        }
        indicatorColor={indicatorColor}
        watchTrend={trend}
        isDataLoaded={dataState.data}
      />
    </View>
  );
};

export default Watchlist;
