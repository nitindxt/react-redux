//old state = Seattle
// action: {type: "CHANGE_LOCATION", payload: "SLC"}
//new state = "SLC"
//this is more testableff
export default function location(state = "Seattle, WA", action) {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
}

/* 
In redux you dispatch the action object. When state changes you call actionCreator which returns action object. that actino object is going to be passed to redux and then redux pass it to rootReducer. rootReducer takes in old state and returns new state. rootReducer might delegate it to subReducer(another reducer) when rootReducer is simple and subReducer handles all different type of action. subReducer will return the new state given on the action and old state to the rootReducer which will return to redux and then redux will call into react the new state, then react rerenders accordingly. Sure, it took like 2 steps but redux made it like 10 steps but it's worth it because all these steps are testable.
*/
