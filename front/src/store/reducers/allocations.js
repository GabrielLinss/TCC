const INITIAL_STATE = {
  data: []
};

export default function allocations(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'LOAD_ALLOCATIONS':
      return { data: action.data };
    default:
      return state;
  }
}
