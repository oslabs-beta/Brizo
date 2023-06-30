/**
 * Takes a status string with possible inputs 'PASS', 'FAIL', 'WARN', or 'INFO' as input and returns the corresponding color code based on the status.
 * @param {string} status - The `status` parameter is a string that represents the status of the CIS test(s).
 */
export const statusToColor = (status: string) => {
  let textColor;
  if (status === 'PASS') textColor = '#90ee90';
  else if (status === 'FAIL') textColor = 'red';
  else if (status === 'WARN') textColor = '#ffd500';
  else if (status === 'INFO') textColor = '#787878';
  return textColor;
};
/**
 * Takes a status string with possible inputs 'Running', 'Succeeded', 'Pending', or nothing ('Failed/Unknown') as input and returns the corresponding color code based on the status.
 * @param {string} status - The `status` parameter is a string that represents the status of the Pod phase.
 */
export const podPhaseStatusToColor = (phase: string) => {
  let textColor;
  if (phase === 'Running' || phase === 'Succeeded') textColor = 'green';
  else if (phase === 'Pending') textColor = 'yellow';
  else textColor = 'red';
  return textColor;
};

/**
 * Takes a string as input and returns the parsed integer value of that string.
 * @param {string} resultText - A string that represents the numerical value(s) of the CIS test(s).
 */
export const passedNumberFromTest = (resultText: string) => parseInt(resultText);

/**
 * Extracts the first all uppercase word from the status. All statuses contain ['PASS'], ['FAIL'], ['WARN'], or ['INFO']
 * @param {string} resultStatus - The `resultStatus` parameter is a string that represents the status of a test.
 */
export const checkStatusFromTest = (resultStatus: string) => resultStatus.match(/[A-Z]+/g)![0];
