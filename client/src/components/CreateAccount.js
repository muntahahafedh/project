import React, { useState } from 'react';
import { Button } from './ui/button.js';
import { Input } from './ui/input.js';
import { Label } from './ui/label.js';

export function CreateAccount({ onNext, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <Label htmlFor="name">Name</Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <Label htmlFor="email">Email</Label>
      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Button onClick={() => onNext({ name, email })}>Next</Button>
      <Button variant="outline" onClick={onBack}>Back</Button>
    </div>
  );
}
