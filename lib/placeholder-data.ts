// This file contains placeholder data that you'll be replacing with real data later.
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'User',
    email: 'user@atlasmail.com',
    password: '123456',
  },
];

const topics = [
  { id: '1a8de96c-3688-4c65-8771-c0136dbd97f5', title: 'React' },
  { id: '7bb14f87-be4e-4662-a0e0-97dce25d432f', title: 'Tailwind' },
  { id: 'f9641d15-0185-4b4c-a747-403f80b0becb', title: 'Typescript' },
];

const questions = [
  {
    id: '23f406e3-7045-4989-85de-8108a28ba27f',
    title: 'What is React?',
    topic_id: '1a8de96c-3688-4c65-8771-c0136dbd97f5',
    votes: 9,
  },
  {
    id: '814f6a71-cecb-4ba5-a67b-90b7904e55f6',
    title: 'What is JSX?',
    topic_id: '1a8de96c-3688-4c65-8771-c0136dbd97f5',
    votes: 0,
  },
  // ... ensure all other questions also use 'topic_id'
];

export { users, topics, questions };