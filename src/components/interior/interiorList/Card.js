import { useState } from 'react';
import img from '../../../assets/images/interiorEx.png';
import bookmark from '../../../assets/images/bookmark.png';
import './Card.css';
import { Link } from 'react-router-dom';
import trueBookmark from '../../../assets/images/bookmarkTrue.png';
import falseBookmark from '../../../assets/images/bookmarkFalse.png';

const Card = ({ interiorList }) => {
  const [interiorBookmark, setInteriorBookmark] = useState({});

  const handleBookmarkClick = (interiorNum) => {
    setInteriorBookmark((prev) => ({
      ...prev,
      [interiorNum]: !prev[interiorNum],
    }));
  };

  return (
    <>
      {interiorList.map((interior) => (
        <div
          className="card"
          style={{ width: '384px', marginBottom: '50px' }}
          key={interior.interiorNum}
        >
          <Link
            to={`/profile/interior/${interior.interiorNum}`}
            key={interior.interiorNum}
          >
            <div
              style={{
                width: '100%',
                height: '242px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <img
                src={`data:image/png;base64, ${interior.coverImage}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Link>
          <div className="wrap-title">
            <div className="title">
              <div className="nameWidth">{interior.companyName}</div>
              <div style={{ marginRight: '3px' }}>
                {Array.isArray(interior.possibleLocation)
                  ? interior.possibleLocation.map((location, index) => (
                      <button key={index} id="loc">
                        {location}
                      </button>
                    ))
                  : interior.possibleLocation
                      .split(',')
                      .map((location, index) => (
                        <button key={index} id="loc">
                          {location.trim()}
                        </button>
                      ))}
              </div>
            </div>
            <div className="fix">
              <div style={{ width: '200px' }} className="title" id="possible">
                {interior.possiblePart === false ? (
                  <>전체시공</>
                ) : (
                  <>전체시공/부분시공</>
                )}
              </div>

              {/* 북마크보류 */}
              {/* <span>
                <img
                  onClick={() => handleBookmarkClick(interior.interiorNum)}
                  src={
                    interiorBookmark[interior.interiorNum] === true
                      ? trueBookmark
                      : falseBookmark
                  }
                />
              </span> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
