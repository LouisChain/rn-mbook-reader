import { ThemeContainer } from "@containers/themes";

const initialAction = ThemeContainer.router.getActionForPathAndParams("BottomTab");
const initialState = ThemeContainer.router.getStateForAction(initialAction);
console.log("Navigation reducer started here >>>")
console.log(initialState);
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Navigation/NAVIGATE":
    case "Navigation/COMPLETE_TRANSITION":
    case "Navigation/BACK":
      const nextState = ThemeContainer.router.getStateForAction(action, state);
      return nextState;
    default:
      return state;
  }
};

export default reducer;  
