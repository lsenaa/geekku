import React from 'react';
import CommunityFilterBar from './CommunityFilterBar';
import CommunityList from './CommunityList';

function CommunityMain() {
  return (
    //커뮤니티 메인페이지
    <div className="App">
      <CommunityFilterBar />
      <CommunityList />
    </div>
  );
}
export default CommunityMain;
