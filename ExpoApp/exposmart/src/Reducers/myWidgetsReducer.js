export const widgetReducer = (
  state = {
    devices: []
  },
  action
) => {
  switch (action.type) {
    case "DEVICE_ADDED":
      return {
        ...state,
        devices: action.payload
      };
    case "SWITCH_CHANGED":
      let newGadgetsState = state.devices.map(gadget => {
        if (gadget.gadget_id === action.payload.gadget_id) {
          gadget.status = action.payload.value;
        }
        return gadget;
      });
      return {
        ...state,
        devices: newGadgetsState
      };

    default:
      return state;
  }
};
