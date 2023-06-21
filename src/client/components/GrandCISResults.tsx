import React from 'react'

type CISSummary = {
  data: String[]
}

function GrandCISResults(props: CISSummary) {
  return (
    <div>
      {props.data.map((item, index) => {
        return (
          <div key={index}>
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default GrandCISResults