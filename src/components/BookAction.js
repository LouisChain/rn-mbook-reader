import React, { PureComponent } from "react"
import { Button, Footer, FooterTab, Text } from "native-base"
import PropTypes from "prop-types"

export default class BookAction extends PureComponent {
  static propTypes = {
    book: PropTypes.object,
    isAdded: PropTypes.bool,
    isDownloaded: PropTypes.bool,
    onAddBookToLibrary: PropTypes.func.isRequired,
    onOpenBook: PropTypes.func.isRequired
  }

  render() {
    let { isAdded, isDownloaded } = this.props;
    return (
      <Footer>
        <FooterTab>
          <Button style={{ backgroundColor: "white" }} full
            onPress={this.props.onAddBookToLibrary}>
            <Text style={{ color: isAdded ? "gray" : "black" }}>{isAdded ? "Added" : "Add to library"}</Text>
          </Button>
          <Button style={{ backgroundColor: "red" }} full
            onPress={this.props.onOpenBook}>
            <Text style={{ color: "white" }}>
              {this.props.book.format === "audio" ? "Listen for FREE" : "Read for FREE"}
            </Text>
          </Button>
        </FooterTab>
      </Footer >
    );
  }
}