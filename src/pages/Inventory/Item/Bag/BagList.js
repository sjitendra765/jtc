// @flow

import React from 'react';
import {connect} from 'react-redux';
import {
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  Icon,
} from 'material-ui';
import {View} from 'react-native';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';

import {columnList} from './constants';
import {DEFAULT_ROWS_PER_PAGE} from '../../../../components/Table/TableFooter';

import type {Bag} from '../../../../data/bag/Bag-type';
import type {RootState, Dispatch} from '../../../../storeTypes';

type Props = {
  data: Array<Bag>,
  total: number,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  isLoading: boolean,
  activeNode: number,
  searchTextInput: string,
  fetchData: (
    searchTextInput: string,
    rowsPerPage: number,
    activeSortColumn: string,
    activeSortType: SortType,
    activePage: number,
    nodeID: number,
  ) => void,
  onSearchTextInputChanged: (searchTextInput: string) => void,
};

type State = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
};

export class ConnoteList extends React.Component<Props, State> {
  state = {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    activePage: 0,
    activeSortColumn: '',
    activeSortType: 'asc',
  };

  componentWillMount() {
    let {data, fetchData, searchTextInput, activeNode} = this.props;
    if (data.length === 0) {
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = this.state;
      fetchData(
        searchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        activeNode,
      );
    }
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.state;

    if (oldProps.activeNode !== newProps.activeNode) {
      newProps.fetchData(
        newProps.searchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        newProps.activeNode,
      );
    }
  }

  render() {
    let {
      data,
      total,
      fetchData,
      activeNode,
      searchTextInput,
      onSearchTextInputChanged,
    } = this.props;
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <TableTitle
          title="Bag List"
          searchTextInput={searchTextInput}
          onSearchTextChange={onSearchTextInputChanged}
          onSearchSubmit={(searchTextInput) => {
            fetchData(
              searchTextInput,
              rowsPerPage,
              activeSortColumn,
              activeSortType,
              activePage + 1,
              activeNode,
            );
          }}
        />
        <Table>
          <TableHead
            columnList={columnList}
            onSortClick={(
              activeSortType: SortType,
              activeSortColumn: string,
            ) => {
              fetchData(
                searchTextInput,
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage + 1,
                activeNode,
              );
              this.setState({activeSortColumn, activeSortType});
            }}
          />
          <TableBody
            data={data}
            render={(datum) => {
              return (
                <TableRow>
                  <TableCell>{datum.bagNo}</TableCell>
                  <TableCell>{datum.bagDate}</TableCell>
                  <TableCell>{datum.qtyConnote}</TableCell>
                  <TableCell numeric style={{width: 50}}>
                    {datum.weight}
                  </TableCell>
                  <TableCell>{datum.origin}</TableCell>
                  <TableCell>{datum.destination}</TableCell>
                  <TableCell>
                    {datum.consolidation ? (
                      <Icon style={{color: 'green', alignSelf: 'center'}}>
                        check_circle
                      </Icon>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="raised"
                      style={{backgroundColor: 'blue', color: 'white'}}
                      onClick={() => {}}
                    >
                      UNBAG
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }}
          />
          <TableFooter
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            dataLength={total}
            onChangePage={(activePage: number) => {
              fetchData(
                searchTextInput,
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage + 1,
                activeNode,
              );
              this.setState({activePage});
            }}
            onChangeRowsPerPage={(rowsPerPage) => {
              fetchData(
                searchTextInput,
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                1,
                activeNode,
              );
              this.setState({rowsPerPage, activePage: 0});
            }}
          />
        </Table>
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  let {
    list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
  } = state.bag;
  return {
    data: list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
    activeNode: state.node.activeNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchData: (
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    ) => {
      dispatch({
        type: 'GET_BAG_LIST_REQUESTED',
        search,
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },
    onSearchTextInputChanged: (searchTextInput: string) => {
      dispatch({
        type: 'BAG_SEARCH_TEXT_INPUT_CHANGED',
        searchTextInput,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnoteList);
