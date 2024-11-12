import NavBar from '../navBar/NavBar';
import List from './List';

const CompanyMain = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <NavBar />
      <List />
    </div>
  );
};

export default CompanyMain;
