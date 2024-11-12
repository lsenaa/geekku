import './List.css';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();

  const moveRegister = () => {
    navigate('/CompanyRegister');
  };

  return (
    <div className="companyPage">
      <div className="topBar" style={{ marginBottom: '30px' }}>
        시공업체
        <button id="btn" onClick={moveRegister}>
          등록하기
        </button>
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default List;
