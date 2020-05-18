const state = {
  path:window.location.hash.split('#/')[1]
}

exports.reducer = (state=state, action) =>{
  switch (action.type) {
    case 'path_switch':
      
      return{
        path:window.location.hash.split('#/')[1]
      }
  
    default:
      break;
  }
  return state;
}
