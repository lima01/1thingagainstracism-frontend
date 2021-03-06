import React, { useState, useEffect } from 'react';
import { getActions } from '../../api/actions';
import ActionListItem from '../../components/action-list-item/ActionListItem';
import Loading from '../../components/loading/Loading';
import MButton from '../../components/m-button/MButton';
import ShareAction from '../../components/share-action/ShareAction';
import { DOMAIN } from '../../constants';
import './AllActions.scss';

function AllActions() {
  const [isLoading, setIsLoading] = useState(true);
  const [actions, setActions] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const getActionsCallback = (nextActions, isError) => {
    if (isError) {
      setIsError(true);
    } else if (nextActions && nextActions.length) {
      setActions(actions.concat(nextActions));
    } else {
      setIsAllLoaded(true);
    }
    setIsLoading(false);
  }

  const getNextActions = () => {
    setIsLoading(true);
    getActions(actions[actions.length-1]?.id, getActionsCallback);
  }

  useEffect(() => {
    getNextActions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all-actions">
      <div className="action-list">
        {actions?.map((action, idx) => {
          return (
            <ActionListItem
              key={action?.id || `action-${idx}`}
              id={action?.id || ''}
              name={action?.created_by || 'Anonymous'}
              description={action?.description || ''}
              voteCount={action?.vote_count || 0}
              images={action?.images || []}
              shareLink={action?.id ? `${DOMAIN}/action/${action.id}` : DOMAIN}
            />
          );
        })}
        {isError ? 'Error getting actions': ''}
        {isLoading ? <Loading /> : (
          !isAllLoaded ? <MButton color="primary" onClick={getNextActions}>Show more</MButton> : null
        )}
        {actions && !actions.length && !isLoading && !isError && (
          <div>No actions have been shared yet, post one below!</div>
        )}
      </div>
      <ShareAction submitCallback={() => window.location.reload()} />
    </div>
  );
}

export default AllActions;
