// Sample partner data
export const samplePartners = [
  {
    id: 1,
    logo: "https://images.pexels.com/photos/5691543/pexels-photo-5691543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Turkish Foundation",
    type: "Research",
    duration: "1 year",
    contact: "Mr. Johnson",
    status: "expired",
  },
  {
    id: 2,
    logo: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Civil Society",
    type: "Community",
    duration: "5 months",
    contact: "Mrs. Smith",
    status: "active",
  },
  {
    id: 3,
    logo: "https://images.pexels.com/photos/4173136/pexels-photo-4173136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Ministry Of Education",
    type: "Government",
    duration: "2 years",
    contact: "Dr. Williams",
    status: "active",
  },
  {
    id: 4,
    logo: "https://images.pexels.com/photos/5324964/pexels-photo-5324964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Ovid Holdings",
    type: "Corporate",
    duration: "1.5 years",
    contact: "Mr. Davis",
    status: "active",
  },
  {
    id: 5,
    logo: "https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Global Health Initiative",
    type: "Non-profit",
    duration: "3 years",
    contact: "Dr. Martinez",
    status: "active",
  },
  {
    id: 6,
    logo: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Tech Innovators Alliance",
    type: "Corporate",
    duration: "9 months",
    contact: "Ms. Anderson",
    status: "active",
  },
  {
    id: 7,
    logo: "https://images.pexels.com/photos/3182835/pexels-photo-3182835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Urban Development Fund",
    type: "Government",
    duration: "2.5 years",
    contact: "Mr. Thompson",
    status: "active",
  },
  {
    id: 8,
    logo: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Educational Research Center",
    type: "Research",
    duration: "1 year",
    contact: "Dr. Wilson",
    status: "expired",
  },
  {
    id: 9,
    logo: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Community Outreach Network",
    type: "Community",
    duration: "8 months",
    contact: "Ms. Garcia",
    status: "active",
  },
  {
    id: 10,
    logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Sustainable Development Coalition",
    type: "Non-profit",
    duration: "2 years",
    contact: "Mr. Brown",
    status: "pending",
  },
  {
    id: 11,
    logo: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Innovation Research Lab",
    type: "Research",
    duration: "3 years",
    contact: "Dr. Moore",
    status: "active",
  },
  {
    id: 12,
    logo: "https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Healthcare Access Initiative",
    type: "Non-profit",
    duration: "1.5 years",
    contact: "Mrs. Jackson",
    status: "active",
  },
];

// Partner types for filtering
export const partnerTypes = [
  "Research",
  "Community",
  "Government",
  "Corporate",
  "Non-profit",
];

// Organization types for the new model
export const organizationTypes = [
  "Academic",
  "Government",
  "NGO",
  "Private",
  "Research",
  "International",
  "Other",
];

// Areas of collaboration
export const collaborationAreas = [
  "Research/Technology Transfer",
  "Teaching and Learning",
  "Academic Exchange",
  "Joint Programs",
  "Student Exchange",
  "Community Service",
  "Internship",
  "Industrial Attachment",
  "Resource Sharing",
  "Institutional Capacity Building",
  "Other",
];

// Colleges for AAU
export const colleges = [
  "Central",
  "College of Business and Economics",
  "College of Social Science, Arts and Humanities",
  "College of Veterinary Medicine and Agriculture",
  "School of Law",
  "College of Technology and Built Environment",
  "College of Natural and Computational Sciences",
  "College of Education and Language Studies",
  "College of Health Science",
];

// Partnership durations
export const durations = [
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "Indefinite",
];

// Partner statuses for filtering
export const partnerStatuses = ["Active", "Inactive", "Pending", "Expired"];

// Duration categories for filtering
export const durationCategories = [
  "Less than 1 year",
  "1-2 years",
  "More than 2 years",
];

// Column definitions for the table
export const tableColumns = [
  { key: "logo", label: "LOGO" },
  { key: "name", label: "PARTNER'S NAME" },
  { key: "type", label: "TYPE" },
  { key: "duration", label: "DURATION" },
  { key: "contact", label: "LEAD CONTACT" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "ACTIONS" },
];
