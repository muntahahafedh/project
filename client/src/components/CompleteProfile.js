import React, { useState } from 'react';
import { Button } from './ui/button.js';

export function CompleteProfile({ user, onComplete }) {
  const [profile, setProfile] = useState(user || {});

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h2>Complete your profile</h2>
      <Button onClick={() => onComplete(profile)}>Finish</Button>
    </div>
  );
}
