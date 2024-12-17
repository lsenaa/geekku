//알람 테스트용 코드
import { Table, Input, Button, Label } from 'reactstrap';
import { useState } from 'react';
import { url } from 'lib/axios';
import axios from 'axios';

const SendAlarm = () => {
  const divStyle = {
    margin: '0 auto',
    width: '400px',
    border: '1px solid lightgray',
    borderRadius: '7px',
    padding: '10px',
  };
  const [alarm, setAlarm] = useState({ recvname: '', title: '', body: '' });
  const changeValue = (e) => {
    setAlarm({ ...alarm, [e.target.name]: e.target.value });
  };
  const sendAlarm = () => {
    axios
      .post(`${url}/sendAlarm`, alarm)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <h4 style={{ textAlign: 'center', margin: '20px' }}>알람 전송</h4>
      <div style={divStyle}>
        <Table borderless>
          <tbody>
            <tr>
              <td>
                <Label>받는사람</Label>
              </td>
              <td>
                <Input type="text" name="recvname" onChange={changeValue} />
              </td>
            </tr>
            <tr>
              <td>
                <Label>제목</Label>
              </td>
              <td>
                <Input type="text" name="title" onChange={changeValue} />
              </td>
            </tr>
            <tr>
              <td>
                <Label>내용</Label>
              </td>
              <td>
                <Input type="text" name="body" onChange={changeValue} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button onClick={sendAlarm}>알람전송</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default SendAlarm;
