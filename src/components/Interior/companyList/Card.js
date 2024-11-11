import img from '../../../assets/images/interiorEx.png'
import bookmark from '../../../assets/images/bookmark.png'
// import './Card.module.css'
import styles from './Card.module.css'

const Card = () => {
  return (
    <div className={styles.fix}>
      <img src={img} style={{ width: "384px", height: "242px" }} />
      <div className="wrap-title">
        <div className="title">
          코스타 인테리어
          <button id="loc">경상도</button>
        </div>
        <div className="fix">
          <div style={{ width: "200px" }} className="title" id="possible">
            전체시공/부분시공
          </div>
          <span>
            <img src={bookmark} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card;