import React from 'react';
import { Link } from 'react-router-dom';

const LandingCard = ({
  cardTitle,
  cardDescription,
  cardLists,
  cardClass,
  permissions,
  cardUrl,
  cardPermission,
  cardImage,
}) => {
  return (
    <div className={cardClass}>
      <div className="sakchyam-card">
        <div className="tools-intro">
          <div className="info">
            <h4>{cardTitle}</h4>
            {/* <p className="span_book_15">{cardDescription}</p>
          <ul className="lists">
            {cardLists.map(data => {
              return <li className="span_heavy_15">{data}</li>;
            })}
            
          </ul> */}
          </div>
          {permissions && permissions[0] && permissions[0].email ? (
            <Link to={cardUrl}>
              <button type="button" className="access_button">
                <span className="span_heavy_15">View</span>
              </button>
            </Link>
          ) : permissions &&
            permissions[0] &&
            !permissions[0].email ? (
            // eslint-disable-next-line react/jsx-indent
            <a>
              <button type="button" className="deny_button">
                <span className="span_heavy_15">No Access</span>
              </button>
            </a>
          ) : null}
          {permissions &&
          permissions[0] &&
          permissions[0].email ? null : (
            <>
              <Link
                to={{
                  pathname: '/login',
                  state: { afterLogin: cardUrl },
                }}
              >
                <button type="button" className="deny_button">
                  <span className="span_heavy_15">No Access</span>
                </button>
              </Link>
              <Link
                to={{
                  pathname: '/login',
                  state: { afterLogin: cardUrl },
                }}
                className="span_book_14"
              />
            </>
          )}
        </div>
        <img className="grid-img" src={cardImage} alt="" />
      </div>
    </div>
  );
};
export default LandingCard;
