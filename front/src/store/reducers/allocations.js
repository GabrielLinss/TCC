const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
};

export default function allocations(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_ALLOCATIONS_SAGA':
      return { ...state, loading: true };
    case 'LOAD_ALLOCATIONS_SUCCESS':
      return { data: action.data, loading: false, error: false };
    case 'LOAD_ALLOCATIONS_FAILURE':
      return { data: [], loading: false, error: true };
    default:
      return state;
  }
}
