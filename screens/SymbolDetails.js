import React, { useContext, useState } from 'react';
import { Image, View } from 'react-native';
import ToolsTable from '../components/ToolsTable';
import { colors, baseURL } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import { CSVDataContext } from '../contexts/CSVDataContext';
import Axios from 'axios';
import { FilterContext } from '../contexts/FilterContext';

const SymbolDetails = ({ route }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const { loginState } = useContext(AuthContext);
  const { dataState } = useContext(CSVDataContext);
  const { filterState } = useContext(FilterContext);
  const { data } = route.params;
  let r = '';
  let detailsTableData1 = [];
  let detailsTableData2 = [];
  let symbolHighlights = [];
  let trend = [];
  let imgEndPoint = '';

  const strategyKey = filterState.strategy.key;

  switch (strategyKey) {
    case 'WLM15':
    case 'WL15':
      imgEndPoint = 'GetData15m';
      break;
    case 'WLF':
      imgEndPoint = 'GetData5m';
      break;
    default:
      imgEndPoint = '';
      break;
  }

  // // 0, 4,5,2,6,9,11,13,15,3
  // // 7,16,17,18,19,20,22,21

  if (dataState.data) {
    let watchString = dataState.data.Watch;
    let watchArray = watchString.split('\r\n');
    watchArray.map((rowString) => {
      if (rowString.trim() !== '' && rowString) {
        r = rowString.split(',');
        if (r[0] == data) {
          // console.log(r[0]);
          if (r[5]) {
            r[5] = r[5].padStart(6, '0');
          }
          var datetime = `${r[4][4]}${r[4][5]}/${r[4][2]}${r[4][3]}  ${r[5][0]}${r[5][1]}:${r[5][2]}${r[5][3]}`;
          let str1 = `${r[0]}*${datetime}*${r[2] == '1' ? 'Long' : 'Short'}*${
            r[6]
          }*${r[9]}*${r[11]}*${r[13]}*${r[15]}`;
          detailsTableData1.push(str1.split('*'));

          let str2 = `${r[3]}*${r[7]}*${r[17]}*${r[18]}*${r[19]}*${r[20]}*${r[21]}*${r[23]}*${r[22]}`;
          detailsTableData2.push(str2.split('*'));

          symbolHighlights = [r[10], r[12], r[14], r[16]];
          trend.push(r[2]);
        }
      }
    });
    Axios.create({
      baseURL: `${baseURL}/${imgEndPoint}`,
    })
      .get(`${detailsTableData1[0][0]}`, {
        headers: { Authorization: `Bearer ${loginState.userToken}` },
      })
      .then((res) => {
        setImageSrc(res.data.data);
      });
  }

  const symbolHeader1 = [
    'Name',
    'Entry Time',
    'Trend',
    'Entry Price',
    'T1',
    'T2',
    'T3',
    'SL',
  ];
  const symbolHeader2 = [
    'LTP',
    'PnL',
    'Open',
    'High',
    'Low',
    'Close',
    'Vol',
    'Support',
    'Resistance',
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.darkColor }}>
      <View style={{ flex: 5 }}>
        <Image
          defaultSource={require('../assets/LogoHome.jpg')}
          source={{
            uri: `data:image/png;base64,${imageSrc}`,
            // uri: `http://103.16.222.196/user/GetData5m/${detailsTableData1[0][0]}`,
            // method: 'GET',
            // headers: {
            //   Authorization: `Bearer ${loginState.userToken}`,
            // },
            // cache: 'force-cache'
          }}
          style={{
            alignSelf: 'center',
            height: '100%',
            width: '100%',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 3.5 }}>
      <ToolsTable
        tableHeader={symbolHeader1}
        tableData={detailsTableData1}
        tabName={route.name}
        symbolTrend={trend}
        symbolHighlights={symbolHighlights}
        isDataLoaded={dataState.data}
      />
      <ToolsTable tableHeader={symbolHeader2} tableData={detailsTableData2} isDataLoaded={dataState.data} />
      
    </View>
    </View>
  );
};

export default SymbolDetails;
