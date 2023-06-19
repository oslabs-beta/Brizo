import React from 'react'
import NamespaceComponent from './NamespaceComponent';
// switch to carousel instead of static cards?
// TODO: add scrolling for multiple cards
// TODO: generate cards on # of namespaces
// TODO: define card width on # of namespaces
const StructureOverview = () => {
  return (
    <>
    <div>
      <h2 style={{color: 'white', textAlign: 'center'}}>Namespace dropdown/buttons TBD</h2>
        <div className='test-display'>
          <button style={{backgroundColor: 'white'}}>namespace1</button>
          <button style={{backgroundColor: 'white'}}>namespace2</button>
          <button style={{backgroundColor: 'white'}}>namespace3</button>
        </div>
        <div className='test-display'>
          <select className='test-dropdown'>
            <option>Generate</option>
            <option>On</option>
            <option>Namespace#</option>
          </select>
        </div>
      </div>
      <hr />
    <div className='main-info-container'>
        {/* generated panel components for namespace details */}
      <div className="card-container">
        <NamespaceComponent />
        <NamespaceComponent />
      </div>
      </div>
    </>
  )
}

export default StructureOverview