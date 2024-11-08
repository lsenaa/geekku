import { Table, Input, Button, Label, ListGroup, ListGroupItem } from 'reactstrap';
import styles from './common.module.scss';

const MyInteriorMain = () => {
    return (
        <div  className={styles.mainbody}>
업체 정보 관리
            <div className={styles.containerbox}>
                <div className="title">내 업체 정보</div><br />

                <Table>
                    <tbody>
                        <tr>
                            <td>
                                업체명
                            </td>
                            <td>코스타 인테리어</td>
                        </tr>
                        <tr>
                            <td>
                                부분시공 가능 여부
                            </td>
                            <td>가능</td>
                        </tr>
                        <tr>
                            <td>
                                경력
                            </td>
                            <td>5년</td>
                        </tr>
                        <tr>
                            <td>
                                최근계약
                            </td>
                            <td>20241029</td>
                        </tr>
                        <tr>
                            <td>
                                a/s보수기간
                            </td>
                            <td>24개월</td>
                        </tr>
                        <tr>
                            <td>
                                시공 가능 지역
                            </td>
                            <td>경기 전라</td>
                        </tr>
                        <tr>
                            <td>
                                한 줄 소개
                            </td>
                            <td>모던...isdone</td>
                        </tr>
                        <tr>
                            <td>
                                소개글
                            </td>
                            <td>300자이내소개글을표현해봐요
                                구구절절이
                                아파트아파트아파트아파트아파트아파트어허어허
                                소개글예시500자이내로작성</td>
                        </tr>
                    </tbody>

                </Table>
            </div>
            <br/>
            <br/>
            <button>ㅇㅅㅇ</button>
        </div>
    )
}
export default MyInteriorMain;