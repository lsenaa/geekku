import TopButton from 'components/layout/topbutton/TopButton';
import NavBar from '../navBar/NavBar';
import List from './List';

const CompanyMain = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <NavBar />
      <List />
      <TopButton />
    </div>
  );
};

export default CompanyMain;
