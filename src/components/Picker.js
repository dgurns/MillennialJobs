import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';
import DownArrowIcon from '../icons/DownArrowIcon';
import ModalView from './ModalView';

class Picker extends Component {
  static defaultProps = {
    primaryOptionList: [],
    secondaryOptionList: [],
    selected: '',
    style: {}
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      modalVisible: false,
      primaryDataSource: ds.cloneWithRows(this.props.primaryOptionList),
      secondaryDataSource: ds.cloneWithRows(this.props.secondaryOptionList)
    };
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  selectRow = (rowId) => {
    this.setState({
      modalVisible: false
    });

    this.props.selectInterest(rowId);
  }

  renderRow(rowId) {
    const { listViewRow, listviewRowTitle } = styles;

    return (
      <TouchableOpacity
        style={listViewRow}
        onPress={() => this.selectRow(rowId)}
      >
        <Text style={listviewRowTitle}>
          {rowId}
        </Text>
      </TouchableOpacity>
    );
  }

  renderPrimaryOptionList() {
    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.state.primaryDataSource}
        renderRow={(rowData) =>
          this.renderRow(rowData.udemySubcategory)
        }
        renderHeader={() =>
          <Text style={styles.listViewHeader}>POPULAR</Text>
        }
      />
    );
  }

  renderSecondaryOptionList() {
    return (
      <ListView
        contentContainerStyle={styles.listView}
        dataSource={this.state.secondaryDataSource}
        renderRow={(rowData) =>
          this.renderRow(rowData.udemySubcategory)
        }
        renderHeader={() =>
          <Text style={styles.listViewHeader}>A TO Z</Text>
        }
      />
    );
  }

  render() {
    const {
      picker,
      label,
      downArrow
    } = styles;

    return (
      <TouchableOpacity
        style={[picker, this.props.style]}
        onPress={this.showModal}
      >
        <Text style={label}>{this.props.selected}</Text>
        <View style={downArrow}>
          <DownArrowIcon
            color={constants.LIGHT_GRAY_COLOR}
            size="small"
          />
        </View>

        <ModalView
          visible={this.state.modalVisible}
          onClose={this.hideModal}
        >
            {this.renderPrimaryOptionList()}
            {this.renderSecondaryOptionList()}
        </ModalView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: constants.LIGHT_GRAY_COLOR,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F6F6F6'
  },
  label: {
    flex: 1,
    minWidth: 0,
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE
  },
  downArrow: {
    marginRight: 'auto'
  },
  listView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 50
  },
  listViewHeader: {
    fontSize: constants.DETAIL_FONT_SIZE,
    color: constants.LIGHT_GRAY_COLOR,
    paddingBottom: 8,
    fontWeight: 'bold'
  },
  listViewRow: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    minWidth: 0
  },
  listviewRowTitle: {
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
  }
});

export default connect(null, actions)(Picker);
