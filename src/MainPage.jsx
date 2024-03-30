import { useState } from 'react'

export default function ParentComponent() {
  const [showProfile, setShowProfile] = useState(true)
  return (
    <>
      <UserComponent name = 'test' />
      {showProfile && <ProfileComponent />}
      <FeedComponent showProfile={showProfile} setShowProfile={setShowProfile}/>
    </>
  );
}

function UserComponent() {
  return (
    <>
      <h1 className='text-lowercase'> User Component </h1>
      <h3> Below the User Component</h3>
    </>
  );
}

function ProfileComponent() {
  return <h1> Profile Component </h1>;
}

function FeedComponent({showProfile, setShowProfile}) {
  
  return (
    <>
      <h1> Feed Component</h1>
      {/* button that makes profile component visible/hidden */}
      <button onClick={() => setShowProfile(!showProfile)}>Toggle Profile</button>
    </>
  );
}