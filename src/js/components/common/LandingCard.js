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
      <div className="tools-intro">
        <div className="info">
          <h4>{cardTitle}</h4>
          <p className="span_book_15">{cardDescription}</p>
          <ul className="lists">
            {cardLists.map(data => {
              return <li className="span_heavy_15">{data}</li>;
            })}
            {/* <li className="span_heavy_15">Project Intervention</li>
            <li className="span_heavy_15">Outreach Beneficiaries</li>
            <li className="span_heavy_15">
              <span>and</span>
              Benefits
            </li> */}
          </ul>
        </div>
        {permissions &&
        permissions[0] &&
        permissions[0].permission.includes(cardPermission) ? (
          <Link to={cardUrl}>
            <button type="button" className="access_button">
              <span className="span_heavy_15">View</span>
            </button>
          </Link>
        ) : permissions && permissions[0] && permissions[0].email ? (
          <>
            <button type="button" className="deny_button">
              <span className="span_heavy_15">No Access</span>
            </button>
            <a href="#/" className="span_book_14">
              You dont have permission to get an access!
            </a>
          </>
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
            >
              <span className="view">Log in</span>
              to get an access!
            </Link>
          </>
        )}
        <img className="grid-img" src={cardImage} alt="" />
      </div>
    </div>
  );
};
export default LandingCard;
