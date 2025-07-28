export const users = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
    status: "active",
  },
  {
    id: 3,
    name: "Michael Johnson",
    phone: "+1 (555) 234-5678",
    email: "michael.j@example.com",
    status: "freezed",
  },
  {
    id: 4,
    name: "Emily Williams",
    phone: "+1 (555) 876-5432",
    email: "emily.w@example.com",
    status: "active",
  },
  {
    id: 5,
    name: "Robert Brown",
    phone: "+1 (555) 345-6789",
    email: "robert.b@example.com",
    status: "deleted",
  },
  {
    id: 6,
    name: "Sarah Davis",
    phone: "+1 (555) 765-4321",
    email: "sarah.d@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "David Miller",
    phone: "+1 (555) 456-7890",
    email: "david.m@example.com",
    status: "freezed",
  },
  {
    id: 8,
    name: "Jennifer Wilson",
    phone: "+1 (555) 654-3210",
    email: "jennifer.w@example.com",
    status: "active",
  },
  {
    id: 9,
    name: "Thomas Moore",
    phone: "+1 (555) 567-8901",
    email: "thomas.m@example.com",
    status: "active",
  },
  {
    id: 10,
    name: "Lisa Taylor",
    phone: "+1 (555) 543-2109",
    email: "lisa.t@example.com",
    status: "deleted",
  },
  {
    id: 11,
    name: "Christopher Anderson",
    phone: "+1 (555) 678-9012",
    email: "chris.a@example.com",
    status: "active",
  },
  {
    id: 12,
    name: "Amanda Thomas",
    phone: "+1 (555) 432-1098",
    email: "amanda.t@example.com",
    status: "freezed",
  },
  {
    id: 13,
    name: "Daniel Jackson",
    phone: "+1 (555) 789-0123",
    email: "daniel.j@example.com",
    status: "active",
  },
  {
    id: 14,
    name: "Michelle White",
    phone: "+1 (555) 321-0987",
    email: "michelle.w@example.com",
    status: "active",
  },
  {
    id: 15,
    name: "Matthew Harris",
    phone: "+1 (555) 890-1234",
    email: "matthew.h@example.com",
    status: "deleted",
  },
  {
    id: 16,
    name: "Jessica Martin",
    phone: "+1 (555) 210-9876",
    email: "jessica.m@example.com",
    status: "active",
  },
  {
    id: 17,
    name: "Kevin Thompson",
    phone: "+1 (555) 901-2345",
    email: "kevin.t@example.com",
    status: "freezed",
  },
  {
    id: 18,
    name: "Stephanie Garcia",
    phone: "+1 (555) 109-8765",
    email: "stephanie.g@example.com",
    status: "active",
  },
  {
    id: 19,
    name: "Andrew Martinez",
    phone: "+1 (555) 012-3456",
    email: "andrew.m@example.com",
    status: "active",
  },
  {
    id: 20,
    name: "Nicole Robinson",
    phone: "+1 (555) 098-7654",
    email: "nicole.r@example.com",
    status: "deleted",
  },
  {
    id: 21,
    name: "James Clark",
    phone: "+1 (555) 123-7890",
    email: "james.c@example.com",
    status: "active",
  },
  {
    id: 22,
    name: "Melissa Rodriguez",
    phone: "+1 (555) 987-0123",
    email: "melissa.r@example.com",
    status: "freezed",
  },
  {
    id: 23,
    name: "Joshua Lewis",
    phone: "+1 (555) 234-8901",
    email: "joshua.l@example.com",
    status: "active",
  },
  {
    id: 24,
    name: "Rebecca Lee",
    phone: "+1 (555) 876-1092",
    email: "rebecca.l@example.com",
    status: "active",
  },
  {
    id: 25,
    name: "Ryan Walker",
    phone: "+1 (555) 345-9012",
    email: "ryan.w@example.com",
    status: "deleted",
  },
  {
    id: 26,
    name: "Laura Hall",
    phone: "+1 (555) 765-2103",
    email: "laura.h@example.com",
    status: "active",
  },
  {
    id: 27,
    name: "Jason Allen",
    phone: "+1 (555) 456-0123",
    email: "jason.a@example.com",
    status: "freezed",
  },
  {
    id: 28,
    name: "Hannah Young",
    phone: "+1 (555) 654-3219",
    email: "hannah.y@example.com",
    status: "active",
  },
  {
    id: 29,
    name: "Brian King",
    phone: "+1 (555) 567-8902",
    email: "brian.k@example.com",
    status: "active",
  },
  {
    id: 30,
    name: "Olivia Scott",
    phone: "+1 (555) 543-2108",
    email: "olivia.s@example.com",
    status: "deleted",
  },
];

export const warnings = [
  {
    id: 1,
    user_id: 1,
    reason:
      "reasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreasonreas",
    severity: "medium",
    expires_at: "01/01/2026",
  },
  {
    id: 2,
    user_id: 1,
    reason: "reason",
    severity: "high",
    expires_at: "01/01/2026",
  },
];

export const reports = [
  {
    report_id: 1,
    type: "Content Violation",
    reported_user: 1,
    reporting_user: "moderator456",
    created_at: "05/15/2023",
    status: "Under Review",
    priority: "High",
  },
  {
    report_id: 2,
    type: "User Behavior",
    reported_user: 1,
    reporting_user: "user101",
    created_at: "06/20/2023",
    status: "Pending",
    priority: "Medium",
  },
  {
    report_id: 3,
    type: "Payment Issue",
    reported_user: 1,
    reporting_user: "customer303",
    created_at: "07/01/2023",
    status: "Resolved",
    priority: "Critical",
  },
];



export const options = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const userInitialValues = (mode, selectedItem) => {
  if (mode === "edit" && selectedItem) {
    return {
      name: selectedItem.name,
      image: selectedItem.image,
    };
  }
  return {
    name: "",
    image: null,
  };
};

// the backend logic here ...
export const userSubmit = (mode, selectedItem, values, closeModal) => {
  if (mode === "add") {
    console.log("Adding new user", values);
  } else if (mode === "edit") {
    console.log("Updating user", {
      id: selectedItem.id,
      ...values,
    });
  }
  closeModal();
};

export const userDelete = (user, t) => {
  console.log("Deleting user:", user);
  console.log(t);
};

export const userFreeze = (user, t) => {
  console.log("Freezing user:", user);
  console.log(t);
};

// User Page
export const getInitialValues = (id) => ({
  user_id: id,
  reason: "",
  severity: "medium",
  expires_at: null,
});



export const editWarning = (values) => {
  console.log("Updating warning:", values);
};

export const delWarning = (item) => {
  console.log("Deleting warning:", item);
};

export const delReport = (item) => {
  console.log("Deleting report:", item);
};





