import { useState } from 'react';
import LocFilter from '../locFilter/LocFilter';
import List from './List';

const CompanyMain = () => {
  const [loc, setLoc] = useState('전체');
  //console.log(loc);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <LocFilter loc={loc} setLoc={setLoc} />
      <List loc={loc} setLoc={setLoc} />
    </div>
  );
};

export default CompanyMain;
