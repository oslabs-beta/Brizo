import React from 'react';
import { statusToColor, passedNumberFromTest, checkStatusFromTest } from '../../../functions';
interface CISSummary {
  data: string[]
}

/**
 * Takes in a props object of type CISSummary and renders the summary based on the values.
 */
function GrandCISResults (props: CISSummary) {
  const { data } = props;
  data.shift(); // remove '=== Summary Total ==='

  /**
   * The function `renderResult` takes a `resultText` parameter and returns JSX elements that display a number and a status based on the result text.
   * @param {string} resultText - The `resultText` parameter is a string that represents the result of a
   */
  const renderResult = (resultText: string) => {
    return (
      <>
        <h5>{passedNumberFromTest(resultText)}</h5>
        <br />
        <p style={{ color: statusToColor(checkStatusFromTest(resultText)) }}>{checkStatusFromTest(resultText)}</p>
      </>
    );
  };

  return (
    <div className='summary-container'>
      <h3>cis check summary</h3>
      <div className='result-container'>
        {data.map((item, index) => {
          return (
          <div key={index}>
            {
              renderResult(item)}
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default GrandCISResults;
