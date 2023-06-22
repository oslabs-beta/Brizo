import React from 'react'
import { statusToColor, passedNumberFromTest, checkStatusFromTest } from '../../../functions'
interface CISSummary {
  data: string[]
}

function GrandCISResults(props: CISSummary) {
  const { data } = props;
  data.shift() // remove '=== Summary Total ===' 

  const renderResult = (resultText: string) => (
    <>
      <h5>{passedNumberFromTest(resultText)}</h5>
      <br />
      <p style={{ color: statusToColor(checkStatusFromTest(resultText)) }}>{checkStatusFromTest(resultText)}</p>
    </>
  )

  return (
    <div className='summary-container'>
      <h3>cis check summary</h3>
      <div className='result-container'>
      {data.map((item, index) => {
        return (
          <div key={index}>
            {renderResult(item)}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default GrandCISResults