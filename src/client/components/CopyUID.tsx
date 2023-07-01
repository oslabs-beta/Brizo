import React from 'react';

interface propObject {
  uid: string | undefined
}
const CopyUID = (props: propObject) => {
  const { uid } = props;
  if (uid !== undefined) {
    return (
    <button className='uid-button' onClick={() => { void navigator.clipboard.writeText(uid); }}><i className="fa-regular fa-copy"></i></button>
    );
  } else {
    return (<></>);
  }
};

export default CopyUID;
