import { useState } from 'react';
import img from '../../../assets/images/interiorEx.png';
import bookmark from '../../../assets/images/bookmark.png';
import './Card.css';
import { Link } from 'react-router-dom';
import trueBookmark from '../../../assets/images/bookmarkTrue.png';
import falseBookmark from '../../../assets/images/bookmarkFalse.png';

const Card = ({ interiorList }) => {
  const [interiorBookmark, setInteriorBookmark] = useState(false);

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
            <img
              src={interior.coverImage}
              style={{ width: '384px', height: '242px' }}
            />
          </Link>
          <div className="wrap-title">
            <div className="title">
              {interior.companyName}
              <button id="loc">{interior.possibleLocation}</button>
            </div>
            <div className="fix">
              <div style={{ width: '200px' }} className="title" id="possible">
                {interior.possiblePart === false ? (
                  <>전체시공</>
                ) : (
                  <>전체시공/부분시공</>
                )}
              </div>
              <span>
                <img
                  src={interiorBookmark === true ? trueBookmark : falseBookmark}
                  onClick={() => setInteriorBookmark(!interiorBookmark)}
                />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
