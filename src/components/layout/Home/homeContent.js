import React, { Fragment, useEffect, useState } from 'react'
import { Carousel, Skeleton } from 'antd'
import '../../../styles/Home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
const HomeContent = () => {
    const [listCar, setListCar] = useState([])
    const [listCar2, setListCar2] = useState([])

    useEffect(()=>{
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/vehicle/1')
                .then(res=>setListCar(res.data.data))
            axios.get('https://mighty-meadow-74982.herokuapp.com/vehicle/2')
                .then(res=>setListCar2(res.data.data))
        } catch (error) {
            console.log(error)
        }
    },[])
    const contentStyle = {
        height: '320px',
        color: '#fff',
        lineHeight: '320px',
        textAlign: 'center',
        background: '#232425',
    };
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
    return (
        <Fragment>
            <div className="main">
                <div className="banner-list">
                    <Carousel autoplay>
                        <div>
                            <img style={{width:'100%'}} src='https://auto1-homepage.prod.mp.auto1.cloud/static/optimized/orange-car-hp-right-mercedez.png'/>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </div>
                <div className="container">
                    <div className="row introduction">
                        <h2 className="title">Gi???i thi???u</h2>
                        <div className="col-12">
                            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias voluptatum repellat nam optio magni non, quaerat, delectus eos adipisci accusantium itaque laudantium earum accusamus ut ex nisi sed, vitae odit?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias voluptatum repellat nam optio magni non, quaerat, delectus eos adipisci accusantium itaque laudantium earum accusamus ut ex nisi sed, vitae odit?</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row service">
                        <div className="col-md-6 col-sm-12" data-aos="fade-right">
                            <h3 id="reason"><span>4</span>L?? do ch???n SGVA</h3>
                            <div className="row">
                                <div className="col-6">
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/i.jpg'} alt="" />
                                        <p>1. H???p ?????ng r?? r??ng</p>
                                    </div>
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/c.jpg'} alt="" />
                                        <p>2. H??? tr??? m???i l??c</p>
                                    </div>
                                </div>
                                <div className="col-6 box-2">
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/h.jpg'} alt="" />
                                        <p>3. Giao xe t???n tay</p>
                                    </div>
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/j.jpg'} alt="" />
                                        <p>4. ??u ????i v??? gi??</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12" data-aos="fade-left">
                            <div className="contact">
                                <h3>B???n c???n thu?? xe?</h3>
                                <div className="form">
                                    <input type="text" placeholder="Ch???n lo???i xe" />
                                    <button>Ti???p t???c</button>
                                    <div className="favourable">
                                        <p>??u ????i th??nh vi??n</p>
                                        <ul>
                                            <li>Gi??m 10% cho l???n ?????u ?????t xe v???i t??i kho???n th??nh vi??n</li>
                                            <li>T???ng 200k ph?? x??ng d???u v???i h???p ?????ng tr??n 3 ng??y</li>
                                            <li>s???a s???a s???a</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" data-aos="fade-up">
                    <div className="row part-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h4>D??ng xe cao c???p</h4>
                                    <Swiper
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "968": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                          "1224": {
                                            "slidesPerView": 5,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                    {listCar.length?listCar.map(car=>(
                                        <SwiperSlide>
                                         <div className="card-swiper">
                                             <div className="card-swiper-img">
                                                 <img src={'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/16:9/w_2000,h_1125,c_limit/Transpo_G70_TA-518126.jpg'} alt=""/>
                                             </div>
                                             <div className="card-swiper-body">
                                                <h6>{car.name}</h6>
                                                <p>Gi??: {car.price} </p>
                                                <Link to={`/detail/${car.idVehicle}`}>Xem ngay</Link>
                                             </div>
                                         </div>
                                        </SwiperSlide>
                                        )):<Skeleton/>}
                                    </Swiper>
                                </div>
                                <div className="col-12">
                                    <h4>Nh???ng m???u xe m???i nh???t</h4>
                                    <Swiper
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    grabCursor = {true}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "768": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                          "1024": {
                                            "slidesPerView": 5,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                    {listCar2.length?listCar2.map(car=>(
                                        <SwiperSlide>
                                         <div className="card-swiper">
                                             <div className="card-swiper-img">
                                                 <img src={'https://www.extremetech.com/wp-content/uploads/2019/12/SONATA-hero-option1-764A5360-edit-640x354.jpg'} alt=""/>
                                             </div>
                                             <div className="card-swiper-body">
                                                <h6>{car.name}</h6>
                                                <p>Gi??: {car.price} </p>
                                                <Link to={`/detail/${car.idVehicle}`}>Xem ngay</Link>
                                             </div>
                                         </div>
                                        </SwiperSlide>
                                        )):<Skeleton/>}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ background: 'white' }}
                    data-aos="fade-up"
                    
                    >
                    <div className="container">
                        <div className="row">
                            <h2 className="title">D???ch v??? ti??u chu???n 5 sao</h2>
                        </div>
                        <div className="row part-1">
                            <div className="col-md-6 col-xs-12" style={{ padding: 0, overflow: 'hidden' }}>
                                <img id="img" src={process.env.PUBLIC_URL + '/images/1.jpg'} alt="" />
                            </div>
                            <div className="col-md-6 col-xs-12 text pl-4 pr-4">
                                <p>Tr???i nghi???m kh??ng gian sang tr???ng b??n trong m???u xe gia ????nh 16 ch??? Ford Transit Limousine l?? 1 s??? th?????ng th??? th???t tho???i m??i tr??n nh???ng chuy???n ??i xa c??ng gia ????nh, b???n b??.</p>
                                <div className="star">
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                </div>
                                <div className="button">
                                    <button className="explore-btn">Kh??m ph?? ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid part-3">
                    <div className="row">
                        <h2 className="title">Kh??ch h??ng n??i g?? v??? ch??ng t??i?</h2>
                    </div>
                    <div className="row" data-aos="fade-up"
                        // data-aos-anchor-placement="bottom-center"
                        >
                        <div className="col-12">
                            <Swiper
                                    spaceBetween={10}
                                    grabCursor
                                    slidesPerView={2}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "768": {
                                            "slidesPerView": 3,
                                            "spaceBetween": 20
                                          },
                                          "1024": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                        <img src={'https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>Ch??u Hi???u Ngh??a</h5>
                                            <p>Ch??ng t??i lu??n s???n s??ng h??? tr??? b???n trong su???t qu?? tr??nh ?????c s??ch. K??nh h??? tr??? ??a d???ng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button>?????c th??m</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                        <img src={'https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>KHANG LE</h5>
                                            <p>Ch??ng t??i lu??n s???n s??ng h??? tr??? b???n trong su???t qu?? tr??nh ?????c s??ch. K??nh h??? tr??? ??a d???ng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button style={{ backgroundColor: 'greenyellow' }}>?????c th??m</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                        <img src={'https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>KHANG LE</h5>
                                            <p>Ch??ng t??i lu??n s???n s??ng h??? tr??? b???n trong su???t qu?? tr??nh ?????c s??ch. K??nh h??? tr??? ??a d???ng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button style={{ backgroundColor: 'cornflowerblue' }}>?????c th??m</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                        <img src={'https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>KHANG LE</h5>
                                            <p>Ch??ng t??i lu??n s???n s??ng h??? tr??? b???n trong su???t qu?? tr??nh ?????c s??ch. K??nh h??? tr??? ??a d???ng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button>?????c th??m</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default HomeContent;