import React, { PureComponent } from 'react';
import {
  Container, Header, Content, List,
  ListItem, Button, View, Text,
  Title, Left, Body, Right, Toast
} from 'native-base';
import Icon from "@components/Icon"
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { getCategory } from "@actions/book"
import BookInfoHeader from "@components/BookInfoHeader";
import BookAction from "@components/BookAction"
import Tags from "@components/Tags"
import * as StringUtils from "@utils/string"

class BookDetail extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  componentDidMount() {
    this.props.getCategory(this.props.navigation.state.params.book.category);
  }

  render() {
    let { appTheme } = this.context;
    let book = this.props.navigation.state.params.book;
    let { category, description, title, tag, author } = book;
    // description = StringUtils.removeMultiBlankLines(description);
    return (
      <Container>
        <Header style={{ backgroundColor: appTheme.palette.background }}>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black'}}>{title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='report'/>
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <BookInfoHeader book={book} />
            </ListItem>
            <ListItem>
              <View>
                <Text style={styles.title}>Introduction</Text>
                <Text style={styles.subtitle}>{description ? description.trim() : title + "-" + author}</Text>
              </View>
            </ListItem>
            <ListItem>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Category</Text>
                <Button onPress={() => this.onCategoryPress(category)} light full style={{ marginTop: 8 }} iconRight >
                  <Text style={{ color: 'gray' }}>{this.props.categoryName}</Text>
                  <Icon name='arrow-forward' style={{ position: 'absolute', right: 0 }} color='gray' />
                </Button>
              </View>
            </ListItem>
            {tag ?
              <ListItem>
                <Tags tags={tag} />
              </ListItem> : null}
          </List>
        </Content>
        <BookAction
          book={book}
          isAdded={false}
          isDownloaded={false}
          onAddBookToLibrary={() => this.onAddBookToLibrary()}
          onOpenBook={() => this.onOpenBook()} />
      </Container>

    );
  }

  onAddBookToLibrary = () => {
    // Toast.show({
    //   text: "added",
    //   buttonText: 'Okay'
    // })
  }

  onOpenBook = () => {
    let book = this.props.navigation.state.params.book;
    switch (book.format) {
      case 'audio':
        this.props.navigation.navigate("AudioReader", { book })
        break;
    }
  }

  onCategoryPress = (category) => {
    // Toast.show({
    //   text: category,
    //   buttonText: 'Okay'
    // })
    this.props.navigation.navigate("Search", {
      category: {
        _id: category
      }
    })
  }

  onTagPress = (value) => {
    // Toast.show({
    //   text: value,
    //   buttonText: 'Okay'
    // })
  }
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: 'gray'
  }
}

function mapStateToProps(state) {
  return {
    categoryName: state.book.categoryName
  }
}

export default connect(mapStateToProps, { getCategory })(BookDetail)
