// // fakeApi.js

// export const fetchProjects = async (page, searchQuery) => {
//     const limit = 20; // Projects per page
//     const offset = (page - 1) * limit;
  
//     // Example projects data (replace with actual API call)
//     const allProjects = [
//       { id: 1, name: "Project 1", postedBy: "Alumni 1", datePosted: "2024-01-01", description: "Description of Project 1", image: "/path/to/image1.jpg" },
//       { id: 2, name: "Project 2", postedBy: "Alumni 2", datePosted: "2024-02-01", description: "Description of Project 2", image: "/path/to/image2.jpg" },
//       // More projects here...
//     ];
  
//     const filteredProjects = allProjects.filter((project) => 
//       project.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
  
//     const paginatedProjects = filteredProjects.slice(offset, offset + limit);
  
//     return {
//       projects: paginatedProjects,
//       totalPages: Math.ceil(filteredProjects.length / limit),
//     };
//   };
  
// fakeApi_Project.js
const projectCategories = [
  "Web Development", 
  "Mobile App", 
  "Data Science", 
  "Machine Learning", 
  "UI/UX Design", 
  "Blockchain", 
  "Cybersecurity"
];

const generateRandomProjects = (count) => {
  const alumni = [
    "John Smith", "Emily Chen", "Michael Rodriguez", 
    "Sarah Kim", "David Johnson", "Maria Garcia", 
    "Alex Wong", "Emma Thompson", "Carlos Mendez"
  ];

  const projectNames = [
    "Smart Home Automation System",
    "Personal Finance Tracker",
    "E-Learning Platform",
    "Mental Health Companion App",
    "Sustainable Agriculture Platform",
    "Urban Mobility Solution",
    "AI-Powered Recruitment Tool",
    "Cryptocurrency Portfolio Manager",
    "Climate Change Awareness App",
    "Augmented Reality Shopping Experience"
  ];

  const projects = [];

  for (let i = 0; i < count; i++) {
    const category = projectCategories[Math.floor(Math.random() * projectCategories.length)];
    
    projects.push({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      category: category,
      postedBy: alumni[Math.floor(Math.random() * alumni.length)],
      datePosted: new Date(
        2023 + Math.floor(Math.random() * 2), 
        Math.floor(Math.random() * 12), 
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
      description: `An innovative ${category} project designed to solve real-world challenges.`,
      technologies: [
        "React", "Node.js", "Python", "Machine Learning", 
        "Docker", "TensorFlow", "Blockchain"
      ].sort(() => 0.5 - Math.random()).slice(0, 3),
      image: `/images/project-placeholder-${(i % 5) + 1}.jpg`,
      githubLink: `https://github.com/alumni-projects/project-${i + 1}`,
      status: ["Completed", "In Progress", "Looking for Collaborators"][Math.floor(Math.random() * 3)]
    });
  }

  return projects;
};

// Pre-generate a large pool of projects
const ALL_PROJECTS = generateRandomProjects(100);

export const fetchProjects = async (page, searchQuery = '', category = '') => {
  const limit = 8; // Projects per page
  const offset = (page - 1) * limit;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Filter projects based on search query and/or category
  const filteredProjects = ALL_PROJECTS.filter(project => {
    const matchesSearch = searchQuery 
      ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.postedBy.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = category 
      ? project.category === category 
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sort projects by most recent date
  filteredProjects.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  // Paginate results
  const paginatedProjects = filteredProjects.slice(offset, offset + limit);

  return {
    projects: paginatedProjects,
    totalPages: Math.ceil(filteredProjects.length / limit),
    totalProjects: filteredProjects.length,
    categories: projectCategories
  };
};

// Additional helper function to fetch project details
export const fetchProjectDetails = async (projectId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const project = ALL_PROJECTS.find(p => p.id === parseInt(projectId));
  
  if (!project) {
    throw new Error('Project not found');
  }

  return {
    ...project,
    // You could add more detailed information here
    fullDescription: `Detailed description for ${project.name}. This project aims to revolutionize ${project.category} by implementing innovative solutions.`,
    teamMembers: [project.postedBy, 'Additional Team Member 1', 'Additional Team Member 2']
  };
};

// Function to get project categories
export const getProjectCategories = () => {
  return projectCategories;
};