import React, { useState } from 'react'
import { sectionResultsInfo } from '../../../types'
import { statusToColor, passedNumberFromTest, checkStatusFromTest } from '../../../functions'

type benchResult = {
  data: sectionResultsInfo,
  testName: string
}

function CISConfigResult(props: benchResult) {
  const { data, testName } = props
  const { remediations, summary, testResults } = data;
  let mutableSummary = [...summary]
  const [showMore, setShowMore] = useState(false);
  const [showRemediations, setShowRemediations] = useState(false);
  const [showResults, setShowResults] = useState(true);
  if (summary[0].includes('== Summary')) summary.shift();
  
  const renderResult = (resultText: string) => (
    <>
      <h5>{passedNumberFromTest(resultText)}</h5>
      <br />
      <p style={{ color: statusToColor(checkStatusFromTest(resultText)) }}>{checkStatusFromTest(resultText)}</p>
    </>
  )

  return (
    <div className='config-container'>
      <button onClick={() => setShowMore(!showMore)}>
       <i className="fa-solid fa-arrow-down" /> {testName} <i className="fa-solid fa-arrow-down" /></button>
      {showMore && <>
      <div className='result-container' style={{margin: 0}}>
          {summary.map((summaryText: string, index) => {
          return (
            <div key={index}>
              {renderResult(summaryText)}
            </div>
          )
        })}
      </div>
      <div className='config-result-container'>
        <button onClick={() => setShowResults(!showResults)}><i className="fa-solid fa-arrow-down" /> results <i className="fa-solid fa-arrow-down" /></button>
          {showResults && <> {
            testResults.map((results, index) => {
              return (
                <p key={index}>
                  {results}
                </p>
              )
            })
          } </>}
      </div>
      <div className='config-result-container'>
        {remediations.length > 0 &&
            <>
              <button onClick={() => setShowRemediations(!showRemediations)}>
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
  )
}

export default CISConfigResult