import { Outlet } from 'react-router';
import CompanyList from './CompanyList';
import InteriorBar from './InteriorBar';
import Sample from './Sample';

const InteriorMain = () => {
  return (
    <>
      <InteriorBar />
      <CompanyList />
      <Sample />
      <Outlet />
    </>
  );
};

export default InteriorMain;
