import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Home.module.scss'
import BannerItem from '../../components/BannerItem'
import Banner from '../../components/Banner'
import { faHandshake } from '@fortawesome/free-regular-svg-icons'
import { faArrowsRotate, faGift, faPhone, faRightLong } from '@fortawesome/free-solid-svg-icons'
import Title from '../../components/Title'
import ProductItem from '../../components/ProductItem'
import data from '../../data/db.json'
import FeedBack from '../../components/FeedBack'
import Blog from '../../components/Blog'
import routes from '../../routes'

const cx = classNames.bind(styles)
const products = data.products

const feedback = data.feedback
const blogs = data.blogs
const Adidas = products.filter((product) => product.brand.toLowerCase() === 'adidas')
const Nike = products.filter((product) => product.brand.toLowerCase() === 'nike')
const Converse = products.filter((product) => product.brand.toLowerCase() === 'converse')
const Vans = products.filter((product) => product.brand.toLowerCase() === 'vans')
const Puma = products.filter((product) => product.brand.toLowerCase() === 'puma')
const Fila = products.filter((product) => product.brand.toLowerCase() === 'fila')
const MLB = products.filter((product) => product.brand.toLowerCase() === 'mlb')
const NewBalance = products.filter((product) => product.brand.toLowerCase() === 'new balance')

function Home({ cart, setCart }) {

    const [elementActive, setElementActive] = useState()
    const [productKind, setProductKind] = useState([...Adidas])
    const refAdidas = useRef()
    const refSubBanner = useRef()
    const refNewProducts = useRef();
    const refHotProducts = useRef();
    const refProductsKind = useRef()
    const refFeedBack = useRef()

    const handleActive = (element) => {
        element.classList.add('active')
        setElementActive((pre) => {
            if (pre.classList.contains('active')) {
                pre.classList.remove('active')
            }
            return element
        })
    }

    useEffect(() => {
        let element = refAdidas.current
        setElementActive(element)
        setProductKind(pre => [...pre])
    }, [])

    const scrollX = (list) => {
        let isMouseDown = false
        let startX, scrollLeft

        list.addEventListener('mousedown', (e) => {
            isMouseDown = true
            startX = e.pageX - list.offsetLeft
            scrollLeft = list.scrollLeft
        })

        list.addEventListener('mouseleave', () => {
            isMouseDown = false
        })

        list.addEventListener('mouseup', () => {
            isMouseDown = false
        })

        list.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return

            const x = e.pageX - list.offsetLeft
            // 3 l?? t???c ????? scroll
            const walk = (x - startX) * 1.5
            list.scrollLeft = scrollLeft - walk
        })
    }

    useEffect(() => {
        const list = refSubBanner.current;
        scrollX(list)
    }, [])

    useEffect(() => {
        const list = refNewProducts.current;
        scrollX(list)
    }, [])

    useEffect(() => {
        const list = refHotProducts.current;
        scrollX(list)
    }, [])
    useEffect(() => {
        const list = refProductsKind.current;
        scrollX(list)
    }, [])
    useEffect(() => {
        const list = refFeedBack.current;
        scrollX(list)
    }, [])

    const handleProductKind = (element) => {
        switch (element.id) {
            case '1':
                setProductKind([...Adidas])
                break;
            case '2':
                setProductKind([...Nike])
                break;
            case '3':
                setProductKind([...Converse])
                break;
            case '4':
                setProductKind([...Vans])
                break;
            case '5':
                setProductKind([...Puma])
                break;
            case '6':
                setProductKind([...Fila])
                break;
            case '7':
                setProductKind([...MLB])
                break;
            case '8':
                setProductKind([...NewBalance])
                break;
        }
        handleActive(element)
    }

    return (
        <div className={cx('home')}>
            <Banner />
            <div className={cx('sub-banner')} >
                <div className='grid wide'>
                    <div className={cx('sub-banner__section')} ref={refSubBanner}>
                        <div className='row no-gutters no-wrap-2' >
                            <div className='col l-3 m-4 c-12'>
                                <div className={cx('banner-item')}  >
                                    <BannerItem
                                        icon={<FontAwesomeIcon icon={faHandshake} />}
                                        title='Giao h??ng to??n qu???c'
                                        slogan='Mi???n ph?? v???n chuy???n v???i ????n h??ng tr??? gi?? tr??n 2.000.000??'
                                    />
                                </div>
                            </div>
                            <div className='col l-3 m-4 c-12'>
                                <div className={cx('banner-item')}>
                                    <BannerItem
                                        icon={<FontAwesomeIcon icon={faPhone} />}
                                        title='H??? tr??? online 24/24'
                                        slogan='Lu??n h??? tr??? kh??ch h??ng 24/24 t???t c??? c??c ng??y trong tu???n'
                                    />
                                </div>
                            </div>
                            <div className='col l-3 m-4 c-12'>
                                <div className={cx('banner-item')}>
                                    <BannerItem
                                        icon={<FontAwesomeIcon icon={faArrowsRotate} />}
                                        title='?????i h??ng d??? d??ng'
                                        slogan='Mi???n ph?? ?????i tr??? trong v??ng 30 ng??y ?????u ti??n cho t???t c??? c??c m???t h??ng'
                                    />
                                </div>
                            </div>
                            <div className='col l-3 m-4 c-12'>
                                <div className={cx('banner-item')}>
                                    <BannerItem
                                        icon={<FontAwesomeIcon icon={faGift} />}
                                        title='Qu?? t???ng h???p d???n'
                                        slogan='Ch????ng tr??nh khuy???n m??i c???c l???n v?? h???p d???n h??ng th??ng'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* new products */}
            <div className={cx('new-products')}>
                <div className='grid wide'>
                    <Title to={`/collections/${'products'}`} slogan='C??c s???n ph???m m???i c?? t???i c???a h??ng'>
                        S???n ph???m m???i
                    </Title>
                    <div className={cx('products-section')} ref={refNewProducts} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <div className='row no-wrap-2'>
                            {
                                products.map((product, index) => {
                                    if (index < 8) {
                                        return (
                                            <div className='col l-3 m-4 c-6' key={index}>
                                                <ProductItem
                                                    setCart={setCart}
                                                    cart={cart}
                                                    product={product}
                                                // setAllProduct={setAllProduct}
                                                // allProduct={allProduct}
                                                // handleFavoriteSneaker={handleFavoriteSneaker}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                    <Link to={`/collections/${'products'}`} className={cx('see-more')} onClick={() => window.scrollTo(0, 0)}>
                        Xem t???t c???
                    </Link>
                </div>
            </div>

            {/* product hot */}
            <div className={cx('products-hot')}>
                <div className='grid wide'>
                    <Title to={`/collections/${'products'}`} slogan='C??c s???n ph???m b??n ch???y t???i c???a h??ng'>
                        S???n ph???m b??n ch???y
                    </Title>
                    <div className={cx('intro-img')}>
                        <img src="https://bizweb.dktcdn.net/100/437/253/collections/img-best-sellers.jpg?v=1640074839860" />
                    </div>
                    <div className={cx('products-section')} ref={refHotProducts} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <div className='row no-wrap-2'>
                            {
                                products.map((product, index) => {
                                    if (product.id > 9 && product.id < 18) {
                                        return (
                                            <div className='col l-3 m-4 c-6' key={index}>
                                                <ProductItem
                                                    product={product}
                                                // handleFavoriteSneaker={handleFavoriteSneaker}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <Link to={`/collections/${'products'}`} className={cx('see-more')} onClick={() => window.scrollTo(0, 0)}>
                        Xem t???t c???
                    </Link>
                </div>
            </div>

            {/* product classification */}
            <div className={cx('products-kind')}>
                <div className='grid wide'>
                    <Title to={`/collections/${'products'}`} slogan='C??c s???n ph???m Sneakers c?? t???i ND Shoes'>
                        Sneakers
                    </Title>
                    <ul className={cx('options')}>
                        <li id="1" className='active' onClick={(e) => handleProductKind(e.target)} ref={refAdidas}>
                            Adidas
                        </li>
                        <li id="2" onClick={(e) => handleProductKind(e.target)}>
                            Nike
                        </li>
                        <li id="3" onClick={(e) => handleProductKind(e.target)}>
                            Converse
                        </li>
                        <li id="4" onClick={(e) => handleProductKind(e.target)}>
                            Vans
                        </li>
                        <li id="5" onClick={(e) => handleProductKind(e.target)}>
                            Puma
                        </li>
                        <li id="6" onClick={(e) => handleProductKind(e.target)}>
                            FILA
                        </li>
                        <li id="7" onClick={(e) => handleProductKind(e.target)}>
                            MLB
                        </li>
                        <li id="8" onClick={(e) => handleProductKind(e.target)}>
                            New Balance
                        </li>
                    </ul>
                    <div className={cx('products-section')} ref={refProductsKind} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <div className='row no-wrap-2'>
                            {
                                productKind.map((productI, index) => {
                                    if (index < 9) {
                                        return (
                                            <div className='col l-3 m-4 c-6' key={index}>
                                                <ProductItem
                                                    product={productI}
                                                // handleFavoriteSneaker={handleFavoriteSneaker}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* accessory */}
            <div className={cx('accessory')}>
                <Title slogan="T???t c??? ph??? ki???n c?? t???i ND Shoes">
                    Ph??? ki???n
                </Title>
                <div className='grid wide'>
                    <div className={cx('accessory-section')}>
                        <div className='row'>
                            <div className='col l-6 m-6 c-12'>
                                <div className={cx('accessory-img', 'big-img')}>
                                    <img src="https://bizweb.dktcdn.net/100/437/253/themes/872488/assets/accessories_1.jpg?1660294502239" />
                                    <div className={cx('accessory-title')}>
                                        <Link to={`/accessory/${'bag'}`} className={cx('accessory-name')} onClick={() => window.scrollTo(0, 0)}>
                                            Balo-t??i
                                        </Link>
                                        <Link to={`/accessory/${'bag'}`} onClick={() => window.scrollTo(0, 0)}>
                                            Xem th??m
                                            <span> <FontAwesomeIcon icon={faRightLong} /> </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='col l-6 m-6 c-12'>
                                <div className={cx('accessory-img', 'sm-img', 'sm-1')}>
                                    <img src="https://bizweb.dktcdn.net/100/437/253/themes/872488/assets/accessories_2.jpg?1660294502239" />
                                    <div className={cx('accessory-title')}>
                                        <Link to={`/accessory/${'sock'}`} className={cx('accessory-name')} onClick={() => window.scrollTo(0, 0)}>
                                            T???t gi??y
                                        </Link>
                                        <Link to={`/accessory/${'sock'}`} onClick={() => window.scrollTo(0, 0)}>
                                            Xem th??m
                                            <span> <FontAwesomeIcon icon={faRightLong} /> </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className={cx('accessory-img', 'sm-img')}>
                                    <img src="https://bizweb.dktcdn.net/100/437/253/themes/872488/assets/accessories_3.jpg?1660294502239" />
                                    <div className={cx('accessory-title')}>
                                        <Link to={`/accessory/${'hat'}`} className={cx('accessory-name')} onClick={() => window.scrollTo(0, 0)}>
                                            M??
                                        </Link>
                                        <Link to={`/accessory/${'hat'}`} onClick={() => window.scrollTo(0, 0)}>
                                            Xem th??m
                                            <span> <FontAwesomeIcon icon={faRightLong} /> </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/collections/${'accessory'}`} className={cx('see-more')} onClick={() => window.scrollTo(0, 0)}>
                        Xem t???t c???
                    </Link>
                </div>
            </div>

            {/* feedback */}
            <div className={cx('feed-back')}>
                <div className='grid wide' style={{ zIndex: '10' }}>
                    <div className={cx('feedback-section')}>
                        <Title
                            slogan='Album feedback c???a kh??ch h??ng v??? ND Shoes'
                            whiteColor={true}
                        >
                            Feed back
                        </Title>
                        <div ref={refFeedBack} className={cx('feedback-box')}>
                            <div className='row no-wrap-2'>
                                {
                                    feedback.map((fb, index) => {
                                        return (
                                            <div className='col l-3 m-4 c-6' key={index}>
                                                <FeedBack
                                                    feedback={fb}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* news */}
            <div className={cx('news')}>
                <div className='grid wide'>
                    <div className={cx('news-section')}>
                        <Title to={routes.news}
                            slogan='T???ng h???p tin t???c, m???o v???t cho b???n'
                        >
                            Tin t???c
                        </Title>
                        <div className='row'>
                            {
                                blogs.map(blog => {
                                    if (blog.id < 4) {
                                        return (
                                            <div className='col l-4 m-4 c-12'>
                                                <Blog
                                                    blog={blog}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home