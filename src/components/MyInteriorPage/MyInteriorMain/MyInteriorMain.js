import styles from './MyInteriorMain.module.css';

const MyInteriorMain = () => {
    return (
        <div className={styles.mainbody}>
            <div className={styles.main}>업체 정보 관리</div>
            <div className={styles.containerbox}>
                <div className={styles.title}>내 업체 정보</div><br />
                <tbody>
                    <tr>
                        <td className={styles.leftcol}>
                            업체명
                        </td>
                        <td className={styles.rightcol}>코스타 인테리어</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            부분시공 가능 여부
                        </td>
                        <td className={styles.rightcol}>가능</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            경력
                        </td>
                        <td className={styles.rightcol}>5년</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            최근계약
                        </td>
                        <td className={styles.rightcol}>20241029</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            a/s보수기간
                        </td>
                        <td className={styles.rightcol}>24개월</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            시공 가능 지역
                        </td>
                        <td className={styles.rightcol}>경기 전라</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            한 줄 소개
                        </td>
                        <td className={styles.rightcol}>모던...isdone</td>
                    </tr>
                    <tr>
                        <td className={styles.leftcol}>
                            소개글
                        </td>
                        <td className={styles.rightcol}>300자이내소개글을표현해봐요
                            구구절절이
                            아파트아파트아파트아파트아파트아파트어허어허
                            소개글예시500자이내로작성</td>
                    </tr>
                    <tr></tr>
                </tbody>
            </div>
            <br />
            <br />
            <button className="submit-button">수정하기</button>

            <br />
            <br />
        </div>
    )
}
export default MyInteriorMain;