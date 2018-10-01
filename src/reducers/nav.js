import { RootContainer } from "@containers/navigator";

const initialAction = RootContainer.router.getActionForPathAndParams("BottomTab");
const initialState = RootContainer.router.getStateForAction(initialAction);
console.log("Navigation reducer started here >>>")
console.log(initialState);
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Navigation/NAVIGATE":
    case "Navigation/COMPLETE_TRANSITION":
    case "Navigation/BACK":
      const nextState = RootContainer.router.getStateForAction(action, state);
      return nextState;
    default:
      return state;
  }
};

export default reducer;  
