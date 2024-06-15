import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemCartStart } from '../../action/ShopCartAction';
import './InfoDetailProduct.scss';
import CommonUtils from '../../utils/CommonUtils';
function InfoDetailProduct(props) {
    let { dataProduct } = props
    let [arrDetail, setarrDetail] = useState([])
    const [productDetail, setproductDetail] = useState([])
    const [isOpen, setisOpen] = useState(false)
    const [imgPreview, setimgPreview] = useState('')
    const [activeLinkId, setactiveLinkId] = useState('')
    const [quantity, setquantity] = useState('')
    const [quantityProduct, setquantityProduct] = useState(1)
    const [height, setHeight] = useState(''); // Chiều cao
    const [weight, setWeight] = useState(''); // Cân nặng
    const [recommendedSize, setRecommendedSize] = useState(''); // Size phù hợp

    useEffect(() => {

        let { productDetail } = dataProduct ? dataProduct : []

        if (productDetail) {
            setproductDetail(productDetail)

            setarrDetail(productDetail[0])
            setactiveLinkId(productDetail[0].productDetailSize[0].id)
            setquantity(productDetail[0].productDetailSize[0].stock)

            props.sendDataFromInforDetail(productDetail[0].productDetailSize[0])
        }
    }, [props.dataProduct])

    let handleSelectDetail = (event) => {
        setarrDetail(productDetail[event.target.value])
        if (productDetail[event.target.value] && productDetail[event.target.value].productDetailSize.length > 0) {
            setactiveLinkId(productDetail[event.target.value].productDetailSize[0].id)
            setquantity(productDetail[event.target.value].productDetailSize[0].stock)
            props.sendDataFromInforDetail(productDetail[event.target.value].productDetailSize[0])
        }

    }
    let openPreviewImage = (url) => {


        setimgPreview(url);
        setisOpen(true);

    }
    let handleClickBoxSize = (data) => {

        setactiveLinkId(data.id)
        setquantity(data.stock)
        props.sendDataFromInforDetail(data)
    }
    const dispatch = useDispatch()
    let handleAddShopCart = () => {
        if (props.userId) {
            dispatch(addItemCartStart({
                userId: props.userId,
                productdetailsizeId: activeLinkId,
                quantity: quantityProduct,
            }))
        } else {
            toast.error("Đăng nhập để thêm vào giỏ hàng")
        }

    };
    // Logic gợi ý size phù hợp
    useEffect(() => {
        // Thực hiện logic ở đây để xác định size phù hợp dựa trên chiều cao và cân nặng
        if (height && weight) {
            if (height >= 145 && height <= 158 && weight < 50) {
                setRecommendedSize("S");
            } else if (height >= 155 && height <= 160 && weight >= 45 && weight <= 55) {
                setRecommendedSize("M");
            } else if (height >= 160 && height <= 167 && weight >= 54 && weight <= 60) {
                setRecommendedSize("L");
            } else if (height >= 167 && height <= 173 && weight >= 60 && weight <= 65) {
                setRecommendedSize("XL");
            } else if (height >= 170 && height <= 180 && weight >= 65 && weight <= 80) {
                setRecommendedSize("XXL");
            } else {
                setRecommendedSize("None");
            }
        } else {
            setRecommendedSize("None");
        }
    }, [height, weight]);

    return (
        <div className="row s_product_inner">
            <div className="col-lg-6">
                <div className="s_product_img">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <div>
                            <ol className="carousel-indicators">
                                {arrDetail && arrDetail.productImage && arrDetail.productImage.length > 0 &&
                                    arrDetail.productImage.map((item, index) => {
                                        if (index === 0) {
                                            return (
                                                <li data-target="#carouselExampleIndicators" data-slide-to={index} className="active">
                                                    <img height="60px" className="w-100" src={item.image} alt="" />
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li data-target="#carouselExampleIndicators" data-slide-to={index} className="">
                                                    <img height="60px" className="w-100" src={item.image} alt="" />
                                                </li>
                                            )
                                        }

                                    })
                                }


                            </ol>
                        </div>
                        <div className="carousel-inner">

                            {arrDetail && arrDetail.productImage && arrDetail.productImage.length > 0 &&
                                arrDetail.productImage.map((item, index) => {
                                    if (index === 0) {
                                        return (

                                            <div onClick={() => openPreviewImage(item.image)} style={{ cursor: 'pointer' }} className="carousel-item active">
                                                <img className="d-block w-100"
                                                    src={item.image} alt="Ảnh bị lỗi" />
                                            </div>
                                        )
                                    } else {
                                        return (

                                            <div onClick={() => openPreviewImage(item.image)} style={{ cursor: 'pointer' }} className="carousel-item ">
                                                <img className="d-block w-100"
                                                    src={item.image} alt="Ảnh bị lỗi" />
                                            </div>
                                        )
                                    }



                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
                <div className="s_product_text">
                    <h3>{dataProduct.name}</h3>
                    <h2>{CommonUtils.formatter.format(arrDetail.discountPrice)}</h2>
                    <ul className="list">
                        <li>
                            <a className="active" href="#">
                                <span>Loại</span> : {dataProduct && dataProduct.categoryData ? dataProduct.categoryData.value : ''}</a>
                        </li>
                        <li>
                            <a href="#"> <span>Trạng thái</span> : {quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</a>
                        </li>
                        <li>
                            <div className="box-size">
                                <a href="#"> <span>Size</span></a>
                                {arrDetail && arrDetail.productDetailSize && arrDetail.productDetailSize.length > 0 &&
                                    arrDetail.productDetailSize.map((item, index) => {

                                        return (
                                            <div onClick={() => handleClickBoxSize(item)} key={index} className={item.id === activeLinkId ? 'product-size active' : 'product-size'}>
                                                {item.sizeData.value}
                                            </div>
                                        )


                                    })
                                }
                            </div>
                        </li>
                        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                            Gợi ý chọn size phù hợp dựa trên chiều cao và cân nặng của bạn:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div className="form-group" style={{ marginRight: '10px' }}>
                                <label htmlFor="height">Chiều cao (cm):</label>
                                <input type="number" className="form-control" value={height} onChange={(event) => setHeight(event.target.value)} placeholder='145cm to 180cm' />
                            </div>

                            <div className="form-group" style={{ marginRight: '10px' }}>
                                <label htmlFor="weight">Cân nặng (kg):</label>
                                <input type="number" className="form-control" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder='40kg to 100kg' />
                            </div>

                            <div className="form-group">
                                <label htmlFor="recommendedSize">Size phù hợp:</label>
                                <input type="text" className="form-control" value={recommendedSize} readOnly />
                            </div>
                        </div>
                        <li>
                            <a href="#">{quantity} sản phẩm có sẵn</a>
                        </li>
                    </ul>
                    <p>
                        {arrDetail.description}
                    </p>

                    <div style={{ display: 'flex' }}>
                        <div className="product_count">
                            <label htmlFor="qty">Số lượng</label>
                            {/* <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" /> */}
                            <input type="number" value={quantityProduct} onChange={(event) => setquantityProduct(event.target.value)} min="1" />

                        </div>
                        <div className="form-group">
                            <label style={{ fontSize: '14px', color: '#797979', fontFamily: '"Roboto",sans-serif', marginLeft: '16px' }} htmlFor="type">Loại sản phẩm</label>
                            <select onChange={(event) => handleSelectDetail(event)} className="sorting" name="type" style={{ outline: 'none', border: '1px solid #eee', marginLeft: '16px' }}>
                                {dataProduct && productDetail && productDetail.length > 0 &&
                                    productDetail.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>{item.nameDetail}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>




                    <div className="card_area">
                        <a className="main_btn" onClick={() => handleAddShopCart()}>Thêm vào giỏ</a>
                        <a className="icon_btn" href="#">
                            <i className="lnr lnr lnr-heart" />
                        </a>
                    </div>
                </div>
            </div>
            {
                isOpen === true &&
                <Lightbox mainSrc={imgPreview}
                    onCloseRequest={() => setisOpen(false)}
                />
            }
        </div>

    );
}

export default InfoDetailProduct;