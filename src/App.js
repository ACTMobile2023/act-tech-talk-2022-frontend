import './App.css';
import RegisterForm from "./components/RegisterForm/AttenderForm";
import {useState} from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

function App() {
    const [showAddNew, setShowAddNew] = useState(false)
    const navigate = useNavigate();
    return (
        <div className="container">
            <img src={'./assets/banner.jpeg'} alt="banner" style={{width: '100%'}}/>

            <div>
                <h2>ASCEND TECHTALK 2022 CHÍNH THỨC KHỞI ĐỘNG!
                    <Button type={'link'} style={{paddingLeft: 5}}
                            onClick={() => setShowAddNew(true)}>
                        <h2 style={{color: '#1890ff', padding: 0}}>HÃY ĐĂNG KÍ NGAY!</h2>
                    </Button>
                </h2>
                <p>Với chủ đề HOW PROFESSIONAL DEV AND QA WORK, Ascend TechTalk 2022 sẽ đem đến cho bạn cơ hội được:</p>
                <p>🎯 Trải nghiệm quy trình làm việc của 1 Dev hay 1 QA thực thụ</p>
                <p>🎯 Tìm hiểu các kiến thức bổ ích về công nghệ, đặc biệt trong fintech domain</p>
                <p>🎯 Được kết nối, chia sẻ và lắng nghe từ các anh chị nhiều năm kinh nghiệm trong nghề</p>
                <p>🎯 Tìm hiểu về môi trường làm việc cùng các cơ hội phát triển tại Ascend</p>
                <p>🎁 Cùng nhiều phần quà hấp dẫn khác….</p>
                <p>Chương trình bao gồm:</p>
                <ul>
                    <li>Phần 1: Giới thiệu về Ascend Technology Vietnam và tech-stack tại Ascend</li>
                    <li>Phần 2: Những giá trị cốt lõi trong phát triển sản phẩm lớn bởi anh Nguyễn Quang Vinh – Senior
                        Software Development Manager
                    </li>
                    <li>Phần 3: Trải nghiệm quy trình làm việc thực tế tại Ascend Technology</li>
                </ul>

                <p>🗓 <b>Thời gian</b>: 8h30 sáng Thứ 7, ngày 17/09/2022.</p>
                <p>🏡 <b>Địa điểm</b>: Văn phòng Ascend Technology Vietnam, tầng 9, tòa nhà Sông Hồng Park View, số 165,
                    phố Thái Hà, phường Láng Hạ, quận Đống Đa, thành phố Hà Nội.</p>
                <p>📋 Đăng kí tham gia Ascend TechTalk 2022 tại link:
                    <Button type={'link'}
                            onClick={() =>
                                setShowAddNew(true)
                            }
                            style={{fontWeight: 'bold', padding: 5}}>
                        Đăng ký tham gia
                    </Button>
                    <Button type={'link'}
                            onClick={() =>navigate("attenders")}
                            style={{fontWeight: 'bold', color: '#d136f3', padding: 5}}>
                        Danh sách người tham gia
                    </Button>
                </p>
                <p>🗓 <b>Thời hạn đăng kí</b>: 23h59, 15/09/2022</p>
            </div>

            <RegisterForm
                show={showAddNew}
                onOk={() => {
                    setShowAddNew(false)
                    navigate('add-success')
                }}
                onCancel={() => {
                    setShowAddNew(false)
                }}/>
        </div>
    );
}

export default App;
