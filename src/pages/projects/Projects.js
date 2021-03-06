import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProjects } from '../../api/projects';
import Loading from '../../components/loading/Loading';
import MButton from '../../components/m-button/MButton';
import ProjectListItem from '../../components/project-list-item/ProjectListItem';
import './Projects.scss';

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="projects">
      <div className="projects-list">
        {projects?.map((project, idx) => {
          return (
            <ProjectListItem
              key={project?.id || `project-${idx}`}
              id={project?.id || ''}
              title={project?.name || ''}
              description={project?.description || ''}
              image={project?.images && project?.images[0]}
              voteCount={project?.signups || 0}
            />
          );
        })}
        {isError ? 'Error getting projects': ''}
        {isLoading ? <Loading /> : (
          !isAllLoaded ? <MButton color="primary" onClick={getNextProjects}>Show more</MButton> : null
        )}
        {projects && !projects.length && !isLoading && !isError && (
          <div>No projects have been shared yet, post one below!</div>
        )}
      </div>
      <div className="projects__propose">
        <h2>Take actions to stop racism. We???re here to help.</h2>
        <MButton variant="contained" color="primary" onClick={() => history.push('/propose')}>Propose Your Idea Now</MButton>
      </div>
    </div>
  );
}

export default Projects;
