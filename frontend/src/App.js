import React, { useEffect, useState } from 'react';

function App() {
  // State to store projects fetched from the backend
  const [projects, setProjects] = useState([]);

  // Fetch projects data once the component mounts
  useEffect(() => {
    // Adjust the URL if your backend is hosted elsewhere
    fetch('http://localhost:5000/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">My Portfolio</h1>
        <p className="text-center text-gray-600">
          Welcome to my portfolio website built with React, Tailwind CSS, Node, Express, and MySQL.
        </p>
      </header>
      
      {/* Projects Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover mb-2"
                />
              )}
              {project.link && (
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
