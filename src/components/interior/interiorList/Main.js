import { useState } from 'react';
import TopButton from 'components/layout/topbutton/TopButton';
import LocFilter from '../locFilter/LocFilter';
import List from './List';

const CompanyMain = () => {
  const [loc, setLoc] = useState('전체');

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <LocFilter loc={loc} setLoc={setLoc} />
      <List loc={loc} setLoc={setLoc} />
      <TopButton />
    </div>
  );
};

export default CompanyMain;
