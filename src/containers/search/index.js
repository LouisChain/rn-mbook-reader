import React, { PureComponent } from 'react';
import {
  Container, Header, View, Button, Body, Right, Left
} from 'native-base';
import Icon from "@components/Icon"
import { TextInput } from "react-native"
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { doSearch, fetchByCategory } from "@actions/search"
import VBookList from "@components/VBookList"
import LoadingView from "@components/LoadingView"
import ErrorView from "@components/ErrorView"

let refresh = '';
class Search extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  static propTypes = {
    category: PropTypes.string
  }

  componentDidMount() {
    let param = this.props.navigation.state.params;
    if (param) {
      this.props.fetchByCategory(param.category._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    let param = nextProps.navigation.state.params;
    if (param && param.category._id !== refresh) {
      this.props.fetchByCategory(param.category._id);
      refresh = param.category._id;
    } else {
      return;
    }
  }

  render() {
    let { appTheme } = this.context;
    return (
      <Container>
        <Header style={{ backgroundColor: appTheme.palette.background }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch' }}>
            <TextInput style={{ flex: 1, color: 'black', paddingHorizontal: 8, textAlign: 'left' }}
              placeholder='Search by title, author, category'
              placeholderTextColor='#bbb'
              returnKeyType='search'
              autoFocus={true}
              ref={c => { this.searchBox = c }}
              selectionColor={appTheme.bottomTab.active}
              onSubmitEditing={this.searchSubmit}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            <Button transparent style={{ maxWidth: 56, paddingHorizontal: 16 }} onPress={() => this.searchSubmit()}>
              <Icon name='search' color='gray' />
            </Button>
          </View>
        </Header>
        <View style={{ flex: 1 }}>
          {this.renderContent()}
        </View>
      </Container >
    );
  }

  renderContent = () => {
    if (this.props.errorMessage) {
      return <ErrorView errorMessage={this.props.errorMessage} onPress={() => this.searchSubmit()} />
    }
    if (this.props.isLoading) {
      return <LoadingView size="small" />
    }
    return <VBookList data={this.props.data} navigation={this.props.navigation} />
  }

  searchSubmit = () => {
    let keyword = this.searchBox._lastNativeText || '';
    this.props.doSearch(keyword.trim());
  }

  onOpenBook = () => {
  }
}

function mapStateToProps(state) {
  return {
    data: state.search.data,
    count: state.search.count,
    isLoading: state.search.isLoading,
    errorMessage: state.search.errorMessage
  }
}

export default connect(mapStateToProps, { doSearch, fetchByCategory })(Search)
