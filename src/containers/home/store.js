import React, { PureComponent } from 'react';
import { Text, SectionList } from 'react-native';
import { connect } from "react-redux"
import { _fetchStore } from "@actions/store"
import LoadingView from "@components/LoadingView";
import ErrorView from "@components/ErrorView";
import PropTypes from "prop-types";
import HorizontalBookList from "@components/HBookList";
import CategoryTextGridView from "@components/CategoryTextGridView";

class Store extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  componentDidMount() {
    this.props._fetchStore();
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingView />
    }
    if (this.props.errorMessage) {
      return <ErrorView errorMessage={this.props.errorMessage} onPress={() => this.onRefresh()} />
    }
    let { appTheme } = this.context;
    return (
      <SectionList style={{ flex: 1, backgroundColor: appTheme.palette.background, padding: 16 }}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          this.renderSectionHeader(title)
        )}
        renderItem={({ item, index, section }) => (this._renderItem(item, index, section))}
        sections={[
          { title: 'E-books', data: [{ item: this.props.ebooks }] },
          { title: 'Audio Books', data: [{ item: this.props.audiobooks }] },
          { title: 'Categories', data: [{ item: this.props.categories }], renderItem: this.renderCategories },
        ]}
      />
    );
  }

  renderSectionHeader = (title) => {
    return <Text style={{ color: "black", fontWeight: 'bold', fontSize: 18, marginTop: 16, marginBottom: 8 }}>{title}</Text>
  }

  _renderItem(item, index, section) {
    return <HorizontalBookList data={item.item} navigation={this.props.navigation} />;
  }

  renderCategories = ({ item, index, section: { title, data } }) => (
    <CategoryTextGridView data={item.item} numColumns={2} />
  )

  onRefresh = () => {
    this.props._fetchStore();
  }

}

function mapStateToProps(state) {
  return {
    ebooks: state.store.ebooks,
    audiobooks: state.store.audiobooks,
    categories: state.store.categories,
    isLoading: state.store.isLoading,
    errorMessage: state.store.errorMessage
  }
}

export default connect(mapStateToProps, { _fetchStore })(Store);
