import React, { useState } from 'react';
import type { sectionResultsInfo } from '../../../types';
import { statusToColor, passedNumberFromTest, checkStatusFromTest } from '../../../functions';

interface benchResult {
  data: sectionResultsInfo
  testName: string
}

/**
 * Takes in a props object of type benchResult and renders a group of lists based on the keys of the object.
 */
function CISConfigResult (props: benchResult) {
  const { data, testName } = props;
  const { remediations, summary, testResults } = data;
  const [showMore, setShowMore] = useState(false);
  const [showRemediations, setShowRemediations] = useState(false);
  const [showResults, setShowResults] = useState(true);
  if (summary[0].includes('== Summary')) summary.shift();
  /**
   * Takes a string and returns JSX elements that display the number of tests that fall under the status and the status which is based on severity.
   * @param {string} resultText - String that represents the result of the test.
  */
  const renderResult = (resultText: string) => (
    <>
      <h5>{passedNumberFromTest(resultText)}</h5>
      <br />
      <p style={{ color: statusToColor(checkStatusFromTest(resultText)) }}>{checkStatusFromTest(resultText)}</p>
    </>
  );

  return (
    <div className='config-container'>
      <button onClick={() => { setShowMore(!showMore); }}>
        <i className="fa-solid fa-arrow-down" /> {testName} <i className="fa-solid fa-arrow-down" /></button>
      {showMore && <>
      <div className='result-container' style={{ margin: 0 }}>
          {summary.map((summaryText: string, index) => {
            return (
              <div key={index}>
                {renderResult(summaryText)}
              </div>
            );
          })}
      </div>
      <div className='config-result-container'>
          <button className='center-result-button' onClick={() => { setShowResults(!showResults); }}><i className="fa-solid fa-arrow-down" /> results <i className="fa-solid fa-arrow-down" /></button>
          <div className='result-list-container'>
          {showResults && <> {
            testResults.map((results, index) => {
              return (
                <p style={{ color: statusToColor(checkStatusFromTest(results)) }} key={index}>
                  {results}
                </p>
              );
            })
            } </>}
            </div>
      </div>
      <div className='config-result-container'>
        {remediations.length > 0 &&
            <>
              <button className='center-result-button' onClick={() => { setShowRemediations(!showRemediations); }}>
              <i className="fa-solid fa-arrow-down" /> remediations <i className="fa-solid fa-arrow-down" /></button>
            {showRemediations && <> { remediations.map((remedies, index) => (
              <p key={index}>
                {remedies}
              </p>)
            )} </>
            }
        </>}
      </div>
      </>}
    </div>
  );
}

export default CISConfigResult;
