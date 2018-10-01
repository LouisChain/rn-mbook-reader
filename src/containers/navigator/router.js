import LibraryContainer from "@containers/home/library";
import StoreContainer from "@containers/home/store";
import ProfileContainer from "@containers/home/profile";

export default {
  home: {
    library: {
      screen: LibraryContainer
    },
    store: {
      screen: StoreContainer
    },
    profile: {
      screen: ProfileContainer
    }
  }
};
