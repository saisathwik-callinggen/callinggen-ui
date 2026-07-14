export const mockContacts = [
  {
    id: "1",
    name: "Rahul Sharma",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    lastMessage: "Yes, the pricing works for...",
    time: "14:30",
    tags: [{ label: "INTERESTED", color: "green" }],
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Ananya Iyer",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    lastMessage: "When can we schedule th...",
    time: "12:15",
    tags: [{ label: "MEETING SCHEDULED", color: "blue" }],
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    lastMessage: "Shared the catalog, waitin...",
    time: "Yesterday",
    tags: [{ label: "FOLLOW UP", color: "orange" }],
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Karan Singh",
    avatar: "https://i.pravatar.cc/150?u=karan",
    lastMessage: "Send brochure again.",
    time: "Yesterday",
    tags: [{ label: "LEAD", color: "gray" }],
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Marcus Holloway",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    lastMessage: "Can we see the kitchen again?",
    time: "14:30",
    tags: [{ label: "INTERESTED", color: "green" }, { label: "LEAD SCORE: 85", color: "blue" }],
    unread: 0,
    online: true,
  },
];

export const mockMessages = [
  {
    id: "1",
    senderId: "1",
    text: "Hello! I was looking at the property listings you shared earlier. Do you have anything specifically in the North Delhi region?",
    time: "12:05",
    isMe: false,
  },
  {
    id: "2",
    senderId: "me",
    text: "Hi Rahul, Absolutely. We currently have 3 premium 3BHK villas and 2 luxury apartments available in Rohini Sector 13 and Pitampura. Would you like me to share the digital brochures for these specifically?",
    time: "12:15",
    isMe: true,
    agentLabel: "AI RESPONSE AGENT",
  },
  {
    id: "3",
    senderId: "1",
    text: "Yes, the 3BHK villas sound perfect. Also, does the pricing work for us within the 3.5Cr budget we discussed over the call?",
    time: "12:20",
    isMe: false,
  },
];

export const mockAiContext = {
  lastCallOutcome: "Interested in 3BHK, price sensitive",
  intent: "High",
  budget: "₹3.5 - 4.0Cr",
};
