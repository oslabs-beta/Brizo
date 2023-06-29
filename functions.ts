export const statusToColor = (status: string) => {
  let textColor;
  if (status === 'PASS') textColor = '#90ee90';
  else if (status === 'FAIL') textColor = 'red';
  else if (status === 'WARN') textColor = '#ffd500';
  else if (status === 'INFO') textColor = '#787878';
  return textColor;
};

export const podPhaseStatusToColor = (phase: string) => {
  let textColor;
  if (phase === 'Running' || phase === 'Succeeded') textColor = 'green';
  else if (phase === 'Pending') textColor = 'yellow';
  else textColor = 'red';
  return textColor;
};

export const passedNumberFromTest = (resultText: string) => parseInt(resultText);

export const checkStatusFromTest = (resultStatus: string) => resultStatus.match(/[A-Z]+/g)![0];
