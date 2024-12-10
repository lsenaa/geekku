import { Outlet } from 'react-router';
import InteriorBar from './InteriorBar';
import Sample from './Sample';
import InteriorList from './InteriorList';

const InteriorMain = () => {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <InteriorBar />
      <InteriorList />
      <Sample />
      <Outlet />
    </div>
  );
};

export default InteriorMain;
