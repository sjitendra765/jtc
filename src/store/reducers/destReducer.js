import {initDestinationData} from './initialStates';
const destinationData = (state = initDestinationData, action) => {
  switch (action.type) {
    case 'SET_DESTINATION_INPUT':
      return {
        ...state,
        [action.key]: action.payload,
      };
    case 'THROW_KODEPOSTO_TO_DESTINATIONDATA':
      return {
        ...state,
        kodePos: action.kodePos,
        kodeTo: action.kodeTo,
      };
    case 'RESET_FORM':
      return state;
    case 'RESET_ALL_FORM':
      return {
        ...initDestinationData,
      };
    case 'SET_VIEW_CONSIGNMENT':
      return {
        ...state,
        ...action.payload.DestinationData,
      };
    default:
      return state;
  }
};
export default destinationData;
