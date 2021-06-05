import React, { useState, useEffect } from 'react';
import { getProjects } from '../../api/projects';
import MButton from '../../components/m-button/MButton';
import './Projects.scss';

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const getProjectsCallback = (nextProjects, isError) => {
    if (isError) {
      setIsError(true);
    } else if (nextProjects && nextProjects.length) {
      setProjects(projects.concat(nextProjects));
    } else {
      setIsAllLoaded(true);
    }
    setIsLoading(false);
  }

  const getNextProjects = () => {
    setIsLoading(true);
    getProjects(projects[projects.length-1]?.id, getProjectsCallback);
  }

  useEffect(() => {
    getNextProjects();
  }, []);

  return (
    <div className="projects">
      <h2>How can I help?</h2>
      <div className="projects-list">
        {projects?.map((project) => {
          return project.name;
        })}
        {isError ? 'Error getting projects': ''}
        {isLoading ? 'Loading...' : (
          !isAllLoaded ? <MButton color="primary" onClick={getNextProjects}>Show more</MButton> : null
        )}
        {projects && !projects.length && !isLoading && !isError && (
          <div>No projects have been shared yet, post one below!</div>
        )}
      </div>
    </div>
  );
}

export default Projects;