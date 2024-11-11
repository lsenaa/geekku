import styles from './Register.module.scss'


const Register = () => {
    return (
        <div className={styles.regDesign}>
            <div>업체 등록하기</div>
            <div><span>업체정보</span><span>필수입력항목</span></div>
            <hr />
            <form>
                <ul>
                    <li>
                        업체명 <input name="name" />
                    </li>
                    <li>
                        부분시공 가능여부
                        <label>
                            <input type="radio" name="possiblePart" value="possible" />
                            가능
                        </label>
                        <label>
                            <input type="radio" name="possiblePart" value="impossible" />
                            불가능
                        </label>
                    </li>
                    <li>
                        경력 <input name="period" />
                    </li>
                    <li>
                        최근 계약 <input name="recentCount" />
                    </li>
                    <li>
                        보수 기간 <input name="repairDate" />
                    </li>
                    <li>
                        시공 가능 지역
                    </li>
                </ul>
                <div>
                    추가하기 버튼으로 커버사진을 업로드 해주세요.<br />
                    <input type="file" accept="image/*" />
                </div>
                <div>
                    소개글 작성
                    <hr />
                    <ul>
                        <li>
                            한줄소개 <input name="intro" />
                        </li>
                        <li>
                            소개글
                            <input name="content" style={{ width: "800px", height: "300px" }} />
                        </li>
                    </ul>
                </div>
            </form>
            <button>등록하기</button>
        </div>
    )
}

export default Register;