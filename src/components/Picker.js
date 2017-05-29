import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';

import * as constants from '../constants';
import DownArrowIcon from '../icons/DownArrowIcon';
import CloseIcon from '../icons/CloseIcon';

class Picker extends Component {
  static defaultProps = {
    primaryOptionList: [],
    secondaryOptionList: [],
    selected: '',
    onSelect: () => {}
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      selected: this.props.selected,
      modalVisible: false,
      primaryOptionDataSource: ds.cloneWithRows(this.props.primaryOptionList)
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
      selected: rowId,
      modalVisible: false
    });
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
        dataSource={this.state.primaryOptionDataSource}
        renderRow={(rowData) =>
          this.renderRow(rowData.udemySubcategory)
        }
      />
    );
  }

  render() {
    const {
      picker,
      label,
      downArrow,
      modal,
      closeIcon,
      modalScrollView
    } = styles;

    return (
      <TouchableOpacity
        style={picker}
        onPress={this.showModal}
      >
        <Text style={label}>{this.state.selected}</Text>
        <View style={downArrow}>
          <DownArrowIcon
            color={constants.LIGHT_GRAY_COLOR}
            size="small"
          />
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          style={modal}
        >
          <TouchableOpacity
            style={closeIcon}
            onPress={this.hideModal}
          >
            <CloseIcon
              color={constants.LIGHT_GRAY_COLOR}
              size="large"
            />
          </TouchableOpacity>
          <ScrollView style={modalScrollView}>
            {this.renderPrimaryOptionList()}
          </ScrollView>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
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
  modal: {
    flex: 1
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    right: 5
  },
  modalScrollView: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 25,
    paddingRight: 25
  },
  listView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  listViewRow: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8
  },
  listviewRowTitle: {
    color: constants.LIGHT_GRAY_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
  }
});

export default Picker;
