const clearAllFields = (
  state: any,
  updateState: (val: any) => void,
  apiCall: any,
) => {
  const cleared = Object.keys(state).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as any);

  updateState(cleared);
  apiCall(false);
};

export default clearAllFields;
