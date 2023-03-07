import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter, withRouter } from 'next/router'
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

import clock from '../../../assets/img/clock.png';
const LoadingScreen = dynamic(() => import('../../../components/LoadingScreen/loadingScreen'));
//import LoadingScreen from "../../../components/LoadingScreen/loadingScreen";
import { frontService } from "../../../_services/front.services";
import { Audio } from 'react-loader-spinner'
import Head from 'next/head'

const ViewDetails = dynamic(() => import('../../../components/ViewDetails/ViewDetails'));
//import ViewDetails from '../../../components/ViewDetails/ViewDetails'
const AddToCart = dynamic(() => import('../../../components/Cart/AddToCart'));

//import AddToCart from '../../../components/Cart/AddToCart';
import { Link } from 'react-scroll';
import * as actionTypes from "../../../store/actionTypes";
import { useDispatch } from 'react-redux';
export default function Categoryslug() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { asPath, pathname } = useRouter();

  const slug = asPath.split('/')[2];
  const slug1 = asPath.split('/')[3];

  //console.log(slug);
  //console.log(slug1);


  const [mainCategory, setMaincategory] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const datacat = useSelector(state => state.maincat);

  useEffect(() => {

    frontService.datamancat(slug, slug1)
      .then(
        res => {
          if (res?.status === 'success') {

            localStorage.setItem("id", res?.location?.id);
            dispatch({ type: actionTypes.MAIN_LOCATION_ID, payload: res?.location?.id });

            localStorage.setItem("cityname", res?.location?.city);
            localStorage.setItem("locAddress", res?.location?.name);
            localStorage.setItem("loc_min_booking_amount", res?.location?.price);

            localStorage.setItem("mid", res?.mainCategory?.id);

            setMaincategory(res.mainCategory);
            setCategories(res.categories);
          } else {
            console.log('Something went wrong !!');
          }
        },
        error => {
          console.log('Something went wrong !!');
        }
      )
  }, [slug, slug1]);
  const mapItems = (items) => {
    return (
      items.map((item, index) => {
        return (<li className="listService" key={index}>
          <i className="fa fa-snowflake-o" aria-hidden="true" />
          {` ` + item.toString()}</li>);
      })
    );
  }

  const callurl = (slug, id) => {
    localStorage.setItem('mid', id);
    //router.push('/category/' + slug + '/' + localStorage.getItem('cityname').toLowerCase())
  }


  const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset

      setVisible(position > moving);
      setPosition(moving)
    };



    window.addEventListener("scroll", handleScroll);
    return (() => {
      window.removeEventListener("scroll", handleScroll);
    })
  })

  const cls = visible ? "visible" : "hidden";
  return (
    <>
      <Head>
        <title>{mainCategory.seo_title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="title"
          content={mainCategory.seo_title}
          data-react-helmet="true"
        ></meta>
        <meta
          name="description"
          content={mainCategory.seo_desc}
          data-react-helmet="true"
        ></meta>
        <meta
          name="keywords"
          content={mainCategory.seo_key}
          data-react-helmet="true"
        ></meta>
        <meta
          name="robots"
          content="index, follow"
          data-react-helmet="true"
        ></meta>
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=utf-8"
          data-react-helmet="true"
        ></meta>
        <meta name="language" content="English" data-react-helmet="true"></meta>
        <meta
          name="revisit-after"
          content="1 days"
          data-react-helmet="true"
        ></meta>
        <meta name="author" content="Glamcode" data-react-helmet="true"></meta>
        <meta name="zipcode" content="201301" data-react-helmet="true"></meta>
        <meta name="city" content="Noida" data-react-helmet="true"></meta>
        <meta name="country" content="India" data-react-helmet="true"></meta>
        <meta
          name="Geography"
          content="B1002 Amrapali Zodiac, Sector 120, Noida, Uttar Pradesh 201301"
          data-react-helmet="true"
        ></meta>
        <meta
          name="geo.position"
          content="28.5839021,77.3959942"
          data-react-helmet="true"
        ></meta>
        <meta
          name="ICBM"
          content="28.5839021,77.3959942"
          data-react-helmet="true"
        ></meta>
      </Head>

      <div className="servicedesk-bg" style={{ paddingBottom: '50px' }}>
        <div className="header-css-head">
          <Container fluid className="custom-shadow py-2">
            <div className="d-flex flex-row" onClick={() => router.back()}>
              <div className="icon-alignments">
                <i className="fa fa-chevron-left fontSize-m-20" />
              </div>
              <h3 className="inside-text-head">
                {mainCategory ? mainCategory.name : 'loging...'}
              </h3>
            </div>
          </Container>
          {categories ? (
            <>
              <div className="g-3 g-sm-6 gap-2 categories-top-header">
                {categories?.map((x, i) => (
                  <Link
                    spy={true}
                    // smooth={true}
                    activeClass="product-category-item-selected text-white"
                    id="cat210"
                    to={`${x.slug}`}
                    className="product-category-item cat210 mt-0"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                      padding: '12px 8px',
                    }}
                    key={i}
                  >
                    <h3
                      className="fontFamily-alata-only"
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        textAlign: 'center',
                        marginBottom: 0,
                        position: 'relative',
                        marginTop: 0,
                      }}
                    >
                      {x.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </>
          )}
        </div>
        <div>
          {categories.length > 0 ? (
            <>
              <Container>
                <Row className="card-container">
                  {categories?.map((x, i) => (
                    <div
                      id={x.slug}
                      style={{ paddingTop: i === 0 ? 140 : 15 }}
                      className="col-md-12 col-12 "
                      key={i}
                    >
                      <div
                        className="p-md-5 pt-md-3 pb-md-0 p-2 d-xl-none"
                        id={x.slug}
                        style={{ marginTop: 0 }}
                      >
                        <div className="row justify-content-center">
                          <div className="col-lg-6 col-12">
                            <div className="servicesMD row servicesMD-bg-color-1">
                              <div
                                className="pcats product-category-item-services"
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0)',
                                  padding: 0,
                                }}
                              >
                                <a className="col-4-m p-0 image-m" href="#">
                                  <img
                                    className="image"
                                    src={x.category_image_url}
                                    alt={x.name}
                                    id={x.id}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      margin: 0,
                                      border: 'medium none',
                                    }}
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row style={{ marginTop: '1rem' }}>
                        {x?.service.map((y, i) => (
                          <>
                            {localStorage.getItem('devise') === 'M' ? (
                              <div
                                className="col-md-6 col-12 p-md-5 pt-md-3 pb-md-0 p-2"
                                key={i}
                              >
                                <div className="servicesMD row servicesMD-bg-color-1">
                                  <a className="col-5 p-0" href="#">
                                    <img
                                      className="image"
                                      src={y.service_image_url}
                                      alt={y.name}
                                    />
                                  </a>
                                  <div className="col-7 position-relative pt-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <a href="#" className="service-title">
                                        {y.name}
                                      </a>
                                      <AddToCart data={y} />
                                    </div>
                                    <div
                                      className="d-flex flex-row align-items-center"
                                      style={{ margin: '4% 0.625rem -2% 0%' }}
                                    >
                                      <div className="p-rl-2 Price">
                                        ₹ {Math.round(y.price)}
                                      </div>
                                      <div className="offerPrice">
                                        ₹ {Math.round(y.discounted_price)}
                                      </div>
                                      <div className="px-1 discountTitle">
                                        {y.discount}%
                                      </div>
                                    </div>
                                    <div className="lineDiv" />
                                    <div className="descriptionServices">
                                      <ul
                                        className="p-0 pt-2"
                                        style={{ marginBottom: '-25px' }}
                                      >
                                        {mapItems(
                                          y.description
                                            .replace(/(<([^>]+)>)/gi, '')
                                            .replace(/(?:\r\n|\r|\n)/g, '')
                                            .replace(/(?:&nbsp;)/g, '')
                                            .replace(/&amp;/g, '&')
                                            .toString()
                                            .split('.')
                                        )}
                                      </ul>
                                    </div>
                                    <ViewDetails alldata={y} />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="col-lg-6 col-12 p-md-5 pt-md-4 pb-md-0 p-4"
                                key={i}
                              >
                                <div className="servicesMD services-m-card row servicesMD-bg-color-1">
                                  <a className="col-5 p-0" href="#">
                                    <img
                                      className="service-m-image"
                                      src={y.service_image_url}
                                      alt={y.name}
                                    />
                                  </a>
                                  <div className="col-7 d-flex flex-column justify-content-start position-relative p-4">
                                    <div>
                                      <div className="title d-flex align-items-end justify-content-between">
                                        <a href="#" className="service-m-title">
                                          {y.name}
                                        </a>
                                        <AddToCart data={y} />
                                      </div>
                                      <div className="d-flex flex-row align-items-center flex-wrap mt-2">
                                        <div className="pe-1 Price price-m">
                                          ₹ {Math.round(y.price)}
                                        </div>
                                        <div className="offerPrice price-m">
                                          ₹ {Math.round(y.discounted_price)}
                                        </div>
                                        <div className="px-1 discountTitle-m me-4">
                                          {y.discount}%
                                        </div>
                                      </div>
                                      <div className="time-text mt-2 mb-3">
                                        <li className="list-group-item">
                                          <img
                                            src={clock.src}
                                            width={15}
                                            height={15}
                                            className="me-2"
                                            alt=""
                                          />
                                          {y.time} {y.time_type}
                                        </li>
                                      </div>
                                      <div className="lineDiv" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end descriptionServices descriptionService-m">
                                      <ul className="p-0 pt-2 m-0 mt-2 line">
                                        {mapItems(
                                          y.description
                                            .replace(/(<([^>]+)>)/gi, '')
                                            .replace(/(?:\r\n|\r|\n)/g, '')
                                            .replace(/(?:&nbsp;)/g, '')
                                            .replace(/&amp;/g, '&')
                                            .toString()
                                            .split('.')
                                        )}
                                      </ul>
                                    </div>
                                    <div className="view-detail-m ms-auto m-0">
                                      <ViewDetails
                                        alldata={y}
                                        className="viewDetail-m m-0"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                        {/* <div className="d-flex flex-row align-items-center" style={{ margin: "4% 0.625rem -2% 0%" }}>
                                                                <div className="p-rl-2 Price">₹ {Math.round(y.price)}</div>
                                                                <div className="p-rl-2 offerPrice">₹ {Math.round(y.discounted_price)}</div>
                                                                <div className="p-rl-2 discountTitle">{y.discount}%</div>
                                                            </div>
                                                            <div
                                                                className="d-flex flex-row"
                                                                style={{ margin: "0.625rem 0.625rem 1%" }}
                                                            >
                                                                <div className="p-2 time-settings">
                                                                    <i className="fa fa-clock-o" />
                                                                    {y.time} {y.time_type}
                                                                </div>
                                                            </div>
                                                            <AddToCart data={y} />
                                                            <div className="lineDiv" />
                                                            <div className="descriptionServices">
                                                                <ul className="p-2" style={{ marginBottom: "-25px" }}>
                                                                    {mapItems(y.description.replace(/(<([^>]+)>)/ig, '').replace(/(?:\r\n|\r|\n)/g, '').replace(/(?:&nbsp;)/g, '')
                                                                        .replace(/&amp;/g, '&').toString().split('.'))}
                                                                </ul>
                                                            </div>
                                                            <ViewDetails
                                                                alldata={y}
                                                            /> */}
                      </Row>
                    </div>
                  ))}
                </Row>
              </Container>

              <div className={`menu-category-d ${cls}`} onClick={handleShow}>
                Menu
              </div>

              <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="mobilepopud"
              >
                <div onClick={handleClose} className="image-d-location-close">
                  x
                </div>
                <Modal.Body>
                  <div className="productcatpage">
                    {datacat.maincategory?.map((item, index) => {
                      return (
                        <div key={index}>
                          <a
                            onClick={() => callurl(item.slug, item.id)}
                            href={`/category/${item.slug}/${localStorage
                              .getItem('cityname')
                              .toLowerCase()}`}
                            style={{ color: '#000' }}
                          >
                            <img
                              className="images-m center-img-all"
                              src={`https://admin.glamcode.in/user-uploads/maincategory/${item.image}`}
                              alt={item.name}
                            />
                            <div className="center-content-all">
                              <span style={{ fontSize: 13 }}>{item.name}</span>
                            </div>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </>
  );
}
