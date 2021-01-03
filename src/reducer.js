export const initialState = {
  //token: "",
  user: null,
  palying: false,
  playlist: [],
  weekly_playlist: null,
  item: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };
    case "SET_WEEKLY_PLAYLIST":
      return {
        ...state,
        weekly_playlist: action.weekly_playlist,
      };
    default:
      return state;
  }
};

export default reducer;
