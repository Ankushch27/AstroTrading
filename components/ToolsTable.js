import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';
import { colors } from '../constants';
import Loading from '../screens/Loading';

const ToolsTable = ({
  tableHeader,
  tableData,
  tabName,
  onSymbolPress,
  indicatorColor,
  watchTrend,
  scanTrend,
  supresTrend,
  symbolTrend,
  symbolHighlights,
  PnLHighlight,
  isDataLoaded,
}) => {
  // console.log('highlights', symbolHighlights);
  const symbolName = (data, index) => (
    <TouchableOpacity onPress={() => onSymbolPress(index)} activeOpacity={0.5}>
      <View>
        <Text style={[styles.dataText, { color: colors.orangeColor }]}>
          {data}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isDataLoaded ? (
        <>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: colors.lightColor }}>
            <Row
              data={tableHeader}
              style={styles.head}
              textStyle={styles.headText}
              flexArr={
                tabName == 'Watchlist'
                  ? [1, 1, 1.8, 1, 1.5, 1]
                  : tabName == 'SymbolDetails'
                  ? [1, 1.7, 1, 1, 1, 1, 1, 1]
                  : []
              }
            />
          </Table>
          <ScrollView style={{ marginTop: -1 }}>
            <Table
              borderStyle={{ borderWidth: 1, borderColor: colors.lightColor }}>
              {/* <Rows data={tableData} textStyle={styles.dataText} /> */}
              {tableData &&
                tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={
                          tabName == 'Watchlist' && cellIndex == 0
                            ? symbolName(cellData, index)
                            : cellData
                        }
                        textStyle={
                          tabName == 'Watchlist' && cellIndex == 5
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    indicatorColor[index] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : tabName == 'Watchlist' && cellIndex == 1
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    watchTrend[index] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : tabName == 'Scanner' && cellIndex == 1
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    scanTrend[index] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : tabName == 'Sup / Res' && cellIndex == 1
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    supresTrend[index] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : tabName == 'SymbolDetails' && cellIndex == 2
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    symbolTrend[index] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : tabName == 'SymbolDetails' && cellIndex == 4
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    symbolHighlights[0] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.lightColor,
                                },
                              ]
                            : tabName == 'SymbolDetails' && cellIndex == 5
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    symbolHighlights[1] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.lightColor,
                                },
                              ]
                            : tabName == 'SymbolDetails' && cellIndex == 6
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    symbolHighlights[2] == '1'
                                      ? colors.greenIndicatorText
                                      : colors.lightColor,
                                },
                              ]
                            : tabName == 'SymbolDetails' && cellIndex == 7
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    symbolHighlights[3] == '1'
                                      ? colors.redIndicatorText
                                      : colors.lightColor,
                                },
                              ]
                            : tabName == 'Past Performance' && cellIndex == 2
                            ? [
                                styles.dataText,
                                {
                                  color:
                                    parseInt(PnLHighlight) > 0
                                      ? colors.greenIndicatorText
                                      : colors.redIndicatorText,
                                },
                              ]
                            : styles.dataText
                        }
                        style={
                          tabName == 'Watchlist' && cellIndex == 2
                            ? {
                                flex: 1.8,
                              }
                            : tabName == 'Watchlist' && cellIndex == 4
                            ? {
                                flex: 1.5,
                              }
                            : tabName == 'Watchlist' && cellIndex == 5
                            ? {
                                flex: 1,
                                backgroundColor:
                                  indicatorColor[index] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : tabName == 'Watchlist' && cellIndex == 1
                            ? {
                                flex: 1,
                                backgroundColor:
                                  watchTrend[index] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : tabName == 'Scanner' && cellIndex == 1
                            ? {
                                flex: 1,
                                backgroundColor:
                                  scanTrend[index] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : tabName == 'Sup / Res' && cellIndex == 1
                            ? {
                                flex: 1,
                                backgroundColor:
                                  supresTrend[index] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 1
                            ? {
                                flex: 1.7,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 2
                            ? {
                                flex: 1,
                                backgroundColor:
                                  symbolTrend[index] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 4
                            ? {
                                flex: 1,
                                backgroundColor:
                                  symbolHighlights[0] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.darkColor,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 5
                            ? {
                                flex: 1,
                                backgroundColor:
                                  symbolHighlights[1] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.darkColor,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 6
                            ? {
                                flex: 1,
                                backgroundColor:
                                  symbolHighlights[2] == '1'
                                    ? colors.greenIndicatorBg
                                    : colors.darkColor,
                              }
                            : tabName == 'SymbolDetails' && cellIndex == 7
                            ? {
                                flex: 1,
                                backgroundColor:
                                  symbolHighlights[3] == '1'
                                    ? colors.redIndicatorBg
                                    : colors.darkColor,
                              }
                            : tabName == 'Past Performance' && cellIndex == 2
                            ? {
                                flex: 1,
                                backgroundColor:
                                parseInt(PnLHighlight) > 0
                                    ? colors.greenIndicatorBg
                                    : colors.redIndicatorBg,
                              }
                            : { flex: 1, backgroundColor: colors.darkColor }
                        }
                      />
                    ))}
                  </TableWrapper>
                ))}
            </Table>
          </ScrollView>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 50,
    alignContent: 'center',
  },
  headText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.primaryColor,
  },
  dataText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: colors.lightColor,
    fontSize: 12,
  },
  row: { flexDirection: 'row' },
});

export default ToolsTable;
