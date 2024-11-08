const navBar = () => {

    <div className='locationTab'>
    {/* 카테고리별 이동 링크 */}
    <ul className='locationTab'>
      {['전체', '경기', '인천', '충청', '강원', '전라', '경상', '제주'].map(location => {
        return (
          <li key={location}>
            
          </li>
        );
      })}
    </ul>
  </div>
}

export default navBar;