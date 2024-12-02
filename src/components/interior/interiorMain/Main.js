import { Outlet } from 'react-router';
import InteriorBar from './InteriorBar';
import Sample from './Sample';
import InteriorList from './InteriorList';

const InteriorMain = () => {
  return (
    <>
      <InteriorBar />
      <InteriorList />
      <Sample />
      <Outlet />
    </>
  );
};

export default InteriorMain;
