import { useState } from 'react'
import './Hello.css'

export default function HelloPage() {
//   const [showProfile, setShowProfile] = useState(true)
  return (
    <div className='hello'>
     <h1 className='name'> Hello, I'm Matthew.</h1>
     <h1 className='description'> I'm a full-stack web developer with a focus in data.</h1>
    </div>
  );
}