
import * as Icons from 'hugeicons-react';

const targets = [
  "AtSign", "Bike", "Book", "Briefcase", "Building", "Car", "Code", "Cpu", "Euro", 
  "File", "Git", "Globe", "Handshake", "Heart", "Bank", "Bulb", "Link", "Mail", 
  "Map", "Mic", "News", "Airplane", "Plane", "Rocket", "Shirt", "Shopping", "Skull", 
  "Smile", "Happy", "Sparkle", "Star", "Terminal", "Command", "Trophy", "User", "Users"
];

const allIcons = Object.keys(Icons);

targets.forEach(target => {
  const matches = allIcons.filter(k => k.toLowerCase().includes(target.toLowerCase()));
  console.log(`Matches for ${target}:`, matches.slice(0, 5).join(', '));
});
