import React from 'react'
import { sectionResultsInfo } from '../../../types'

type benchResult = {
  data: sectionResultsInfo,
  testName: string
}

function CISConfigResult(props: benchResult) {
  const { data, testName } = props
  const { remediations, summary, testResults } = data;
  return (
    <div className='config-container'>
      <h3>{testName}</h3>
      <div className='config-result-container' style={{margin: 0}}>
        SUMMARY
        {summary.map((summaryText, index) => {
          return (
            <p key={index} style={{margin: 0}}>
              {summaryText}
            </p>
          )
        })}
      </div>
      <div className='config-result-container'>
        RESULTS
        {testResults.map((results, index) => {
          return (
            <p key={index}>
              {results}
            </p>
          )
        })}
      </div>
      <div className='config-result-container'>
        REMEDIATIONS
        {remediations.map((remedies, index) => {
          return (
            <p key={index}>
              {remedies}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default CISConfigResult