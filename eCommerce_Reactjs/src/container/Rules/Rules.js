import React from 'react';
import './Rules.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTruck, faUser, faClock, faTag, faHandHolding, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Rules = () => {
    return (
        <div className="rules-container">
            <h1>QUY ĐỊNH CHO THUÊ</h1>
            <p><FontAwesomeIcon icon={faUser} />  Điều kiện để thuê: CCCD/Bằng Lái/Cà Vẹt Xe và cọc tiền tùy theo giá trị trang phục (do giá trị đồ cao nên các nàng thông cảm cho shop nhé, có thể trao đổi trực tiếp với shop về vấn đề cọc).</p>
            <p><FontAwesomeIcon icon={faClock} />  Thời gian:</p>
            <ul>
                <li> Thuê trong ngày: Các nàng thuê và trả trong 24h sẽ được tính giá thuê trong ngày, giá cụ thể sẽ cập nhật trong từng mẫu.</li>
                <li> Thuê nhiều ngày: Các nàng thuê và trả sau 24h sẽ tính giá thuê nhiều ngày, giá cụ thể sẽ cập nhật trong từng mẫu.</li>
            </ul>
            <p><FontAwesomeIcon icon={faTag} />  Giá sinh viên:</p>
            <ul>
                <li> Từ 80k – 300k đối với Lolita.</li>
                <li> Từ 50k – 350k đối với các loại trang phục khác.</li>
                <li> Từ 10k – 50k đối với phụ kiện: giày, ô, giỏ trái cây, phụ kiện tóc, khăn, mũ , túi…. (một vài phụ kiện nhỏ có thể miễn phí).</li>
            </ul>
            <p><FontAwesomeIcon icon={faHandHolding} />  Hình thức thuê:</p>
            <ul>
                <li> Thuê trực tiếp: Shop khuyến khích nàng nên tới shop để lựa và thử để chọn được trang phục yêu thích nhất và phù hợp nhất với cơ thể của mình nhé! Thuê xong nàng tới tiệm trả đồ cho shop nha.</li>
                <li> Thuê Online: Nàng chọn mẫu qua hình ảnh trên web và trao đổi với shop qua inbox nhé.</li>
            </ul>
            <p><FontAwesomeIcon icon={faTruck} />  Ship: Shop miễn phí ship trong nội thành Đà Nẵng (3 km tính từ địa chỉ shop) khi nàng thuê từ 2 bộ. Nàng thuê chỉ 1 bộ thu 30k (cho 2 chiều giao nhận).</p>
            <p> <strong><span style={{ textTransform: 'uppercase' }}>ĐẶC BIỆT:</span></strong> Khi thuê xong nàng gửi feedback ảnh đẹp cho shop sẽ được hưởng ưu đãi nha!</p>
            <p><FontAwesomeIcon icon={faArrowRight} />  Thuê xong bạn trả luôn giúp shop nhé, shop sẽ tự giặt đồ ạ!</p>

            <h1>QUY ĐỊNH ĐỀN BÙ</h1>
            <p><FontAwesomeIcon icon={faCheckCircle} />  Kiểm tra đồ trước khi nhận, đảm bảo khi trả phải nguyên vẹn.</p>
            <p><FontAwesomeIcon icon={faExclamationCircle} />  Nếu đồ bị rách, lem màu hoặc mất phụ kiện kèm theo, bạn phải đền bù bằng cách mua nguyên trang phục ấy.</p>
        </div>
    );
};

export default Rules;
