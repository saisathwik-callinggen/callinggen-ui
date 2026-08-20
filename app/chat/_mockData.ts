export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  time: string;
  tags: { label: string; color: string }[];
  unread: number;
  online: boolean;
  category: "hot" | "warm" | "cold";
  interestTag: "Interested" | "Callback" | "Not Interested";
  campaignId: string;
}

export interface MaterialImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  size: string;
}

export interface MaterialText {
  id: string;
  title: string;
  body: string;
}

export interface MaterialDoc {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

export const mockCampaignsList = [
  { id: "1", name: "Fall Promo 2023", status: "Completed", totalLeads: 500 },
  { id: "2", name: "Q4 Outreach", status: "Running", totalLeads: 1200 },
  { id: "3", name: "Holiday Special", status: "Scheduled", totalLeads: 3000 },
  { id: "4", name: "Inactive Users Reactivation", status: "Completed", totalLeads: 800 },
  { id: "5", name: "New Feature Announcement", status: "Draft", totalLeads: 150 },
];

export const mockMaterialImages: MaterialImage[] = [
  {
    id: "img-1",
    title: "Fall Special Discount Flyer",
    description: "20% off on all premium subscriptions with high resolution banner",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60",
    size: "1.2 MB",
  },
  {
    id: "img-2",
    title: "Product Showcase & Portfolio",
    description: "Visual breakdown of core software features and benefits",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
    size: "2.4 MB",
  },
  {
    id: "img-3",
    title: "Festive Holiday Greetings Card",
    description: "Customized holiday greeting card with promo coupon",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60",
    size: "980 KB",
  },
];

export const mockMaterialTexts: MaterialText[] = [
  {
    id: "txt-1",
    title: "Exclusive Campaign Intro",
    body: "Hi {contact_name}, we noticed your interest in our latest solutions. We are excited to offer you an exclusive 20% discount on your next upgrade! Let us know if you would like a quick demo.",
  },
  {
    id: "txt-2",
    title: "Follow-up & Meeting Request",
    body: "Hello {contact_name}, following up on our previous conversation. We have updated our pricing and packages to better suit your business requirements. Are you available for a 5-minute call today?",
  },
  {
    id: "txt-3",
    title: "Feature Update Announcement",
    body: "Dear {contact_name}, we have just launched automated campaign tracking on CallingGen! Check out how you can boost conversion rates by 40% with our new tool.",
  },
];

export const mockMaterialDocs: MaterialDoc[] = [
  {
    id: "doc-1",
    title: "Product Brochure 2024",
    fileName: "CallingGen_Product_Brochure.pdf",
    fileSize: "3.4 MB",
    fileType: "PDF Document",
  },
  {
    id: "doc-2",
    title: "Pricing & Plans Guide",
    fileName: "CallingGen_Pricing_Q4.pdf",
    fileSize: "1.8 MB",
    fileType: "PDF Document",
  },
  {
    id: "doc-3",
    title: "Case Study & Results",
    fileName: "Customer_Success_Stories.pdf",
    fileSize: "5.1 MB",
    fileType: "PDF Document",
  },
];

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    lastMessage: "Yes, the pricing works for...",
    time: "14:30",
    tags: [{ label: "INTERESTED", color: "green" }],
    unread: 2,
    online: true,
    category: "hot",
    interestTag: "Interested",
    campaignId: "1",
  },
  {
    id: "2",
    name: "Ananya Iyer",
    phone: "+91 98123 45678",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    lastMessage: "When can we schedule th...",
    time: "12:15",
    tags: [{ label: "MEETING SCHEDULED", color: "blue" }],
    unread: 0,
    online: false,
    category: "warm",
    interestTag: "Callback",
    campaignId: "1",
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    phone: "+91 99887 76655",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    lastMessage: "Shared the catalog, waitin...",
    time: "Yesterday",
    tags: [{ label: "FOLLOW UP", color: "orange" }],
    unread: 0,
    online: true,
    category: "hot",
    interestTag: "Interested",
    campaignId: "2",
  },
  {
    id: "4",
    name: "Karan Singh",
    phone: "+91 91234 56789",
    avatar: "https://i.pravatar.cc/150?u=karan",
    lastMessage: "Send brochure again.",
    time: "Yesterday",
    tags: [{ label: "LEAD", color: "gray" }],
    unread: 0,
    online: false,
    category: "cold",
    interestTag: "Not Interested",
    campaignId: "4",
  },
  {
    id: "5",
    name: "Marcus Holloway",
    phone: "+1 (555) 234-5678",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    lastMessage: "Can we see the kitchen again?",
    time: "14:30",
    tags: [{ label: "INTERESTED", color: "green" }, { label: "LEAD SCORE: 85", color: "blue" }],
    unread: 0,
    online: true,
    category: "hot",
    interestTag: "Interested",
    campaignId: "1",
  },
  {
    id: "6",
    name: "Priya Patel",
    phone: "+91 97654 32109",
    avatar: "https://i.pravatar.cc/150?u=priya",
    lastMessage: "Interested in the Q4 promo deal.",
    time: "10:05",
    tags: [{ label: "HOT LEAD", color: "green" }],
    unread: 1,
    online: true,
    category: "hot",
    interestTag: "Interested",
    campaignId: "4",
  },
  {
    id: "7",
    name: "David Chen",
    phone: "+1 (555) 876-5432",
    avatar: "https://i.pravatar.cc/150?u=david",
    lastMessage: "Please call back tomorrow at 3 PM.",
    time: "09:40",
    tags: [{ label: "CALLBACK", color: "orange" }],
    unread: 0,
    online: false,
    category: "warm",
    interestTag: "Callback",
    campaignId: "4",
  },
  {
    id: "8",
    name: "Sophia Martinez",
    phone: "+1 (555) 345-6789",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    lastMessage: "Not looking for subscriptions right now.",
    time: "2 days ago",
    tags: [{ label: "COLD", color: "gray" }],
    unread: 0,
    online: false,
    category: "cold",
    interestTag: "Not Interested",
    campaignId: "1",
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
    agentLabel: "SENT VIA BROADCAST",
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
