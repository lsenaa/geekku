import img from '../../../assets/images/interiorEx.png';
import bookmark from '../../../assets/images/bookmark.png';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ interiorList }) => {
  return (
    <>
      {interiorList.map((interior) => (
        <Link
          to={`/profile/interior/${interior.interiorNum}`}
          key={interior.interiorNum}
        >
          <div
            className="card"
            style={{ width: '384px', marginBottom: '50px' }}
          >
            <img
              src={interior.coverImage}
              style={{ width: '384px', height: '242px' }}
            />
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
                  <img src={bookmark} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Card;
