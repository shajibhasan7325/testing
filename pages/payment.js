import Logo from '/glamcode.png';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Coupon from '../components/Coupon/Coupon';
import { frontService } from '../_services/front.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../store/actions';
import useRazorpay from 'react-razorpay';
import AddToCart from '../components/Cart/AddToCart';
import LoginModal from '../components/Login';
import ViewDetails from '../components/ViewDetails/ViewDetails';
import addon_img from '../assets/img/addon_img.svg';
import coupon_icon from '../assets/img/coupon_icon.svg';
import upi_icon from '../assets/img/upi_icon.svg';
import celebration from '../assets/img/celebration.svg';
import AddressAndUserDetail from '../components/AddressAndUserDetail';
import PreferredPackages from '../components/PreferredPackages';

function Payment() {
  const Razorpay = useRazorpay();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cardAdd?.cart);
  const userAddress = useSelector((state) => state.userAddress?.useraddress);
  const [total, setTotal] = React.useState(0);
  const [couponModal, setCouponModal] = useState(false);
  // const [coupon, setCoupon] = useState(null)
  const [sending, setSending] = useState(false);
  const [pType, setPType] = useState('cash');
  const [update, setUpdate] = useState(1);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const coupon_id = localStorage.getItem('coupon_id');
  const coupon_amount = localStorage.getItem('coupon_amount');
  const coupon_min = localStorage.getItem('coupon_min');

  const user = JSON.parse(localStorage.getItem('gluserDetails'));
  //console.log(user);

  // console.log(userAddress)
  useEffect(() => {
    if (!localStorage.getItem('gluserDetails')) {
      // router.push("/login")
    }
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].sum);
    }
    setTotal(total);
  }, [cart]);

  const finalTotal =
    Math.round(total) + 49 - (coupon_id ? Math.round(coupon_amount) : 0);

  const onSubmit = () => {
    const id = JSON.parse(localStorage.getItem('gluserDetails')).id;
    const dateTime = localStorage.getItem('booking_time');
    const data = {
      deal_id: '',
      deal_quantity: '',
      user_id: id,
      date_time: dateTime,
      status: 'pending',
      payment_gateway: pType,
      total_amount: total,
      discount: '',
      coupon_id: coupon_id ? coupon_id : '',
      coupon_discount: coupon_id ? coupon_amount : '',
      discount_percent: '0',
      tax_name: '',
      tax_percent: '',
      tax_amount: '',
      extra_fees: '49',
      distance_fee: '',
      amount_to_pay: finalTotal,
      payment_status: pType === 'cash' ? 'pending' : 'complete',
      additional_notes: '',
      item_details: cart.map((e) => {
        return {
          business_service_id: e.business_service_id || e.id,
          unit_price: Math.round(e.price),
          quantity: e.qty,
          amount: Math.round(e.price) * e.qty,
        };
      }),
    };
    setSending(true);
    frontService.bookOrder(data).then(
      (res) => {
        if (res?.status == 'success') {
          localStorage.removeItem('coupon_id');
          localStorage.removeItem('coupon_amount');
          localStorage.removeItem('coupon_min');
          dispatch(clearCart());
          toast(res.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          router.push('/confirmation');
        } else if (res?.status == 'fail') {
          setSending(true);
          toast(res.message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            type: 'error',
          });
        } else {
          setSending(true);
          toast('Invalid', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            type: 'error',
          });
        }
      },
      (error) => {
        toast('Invalid', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          type: 'error',
        });
        setSending(false);
      }
    );
  };

  const options = {
    key: 'rzp_live_KBMHwbrgS5pC5c',
    amount: finalTotal * 100, //  = INR 1
    name: 'Glam code',
    description: '',
    image: Logo,
    handler: function (response) {
      onSubmit();
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: user?.name,
      contact: user?.mobile,
      email: user?.email,
    },
    notes: {
      address:
        userAddress?.address_heading +
        ', ' +
        userAddress?.address +
        ', ' +
        userAddress?.street,
    },
    theme: {
      color: '#3399cc',
      hide_topbar: false,
    },
  };
  const openPayModal = () => {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const mapItems = (items) => {
    return items.map((item, index) => {
      return (
        <li
          key={index}
          className="text listService pb-2"
          style={{ listStyle: 'disc' }}
        >
          {` ` + item.toString()}
        </li>
      );
    });
  };
  let minAmount = localStorage.getItem('loc_min_booking_amount') || '0';
  return (
    <>
      {!user && <LoginModal show={!user} />}
      <Coupon
        show={couponModal}
        coupon={coupon_id}
        setCoupon={(c) => {
          console.log(c);
          localStorage.setItem('coupon_id', c.id);
          localStorage.setItem('coupon_amount', c.amount);
          localStorage.setItem('coupon_min', c.minimum_purchase_amount);
        }}
        total={total}
        handleClose={() => {
          setCouponModal(!couponModal);
        }}
      />
      <div
        className="servicedesk-bg checkout-all"
        style={{ paddingBottom: '50px' }}
      >
        <div className="header-css-head">
          <Container fluid>
            <div className="d-flex flex-row py-2" onClick={() => router.back()}>
              <div className="icon-alignments">
                <i className="fa fa-chevron-left fontSize-m-20" />
              </div>
              <h3 className="inside-text-head">Payment</h3>
            </div>
          </Container>
        </div>
        <Row className="mt-5 py-4 card-container">
          <Col md={1}></Col>
          <Col md={5}>
            <div className="section-address d-block d-md-none">
              <a
                onClick={() => setShowAddressModal(true)}
                className="inside-title"
                style={{ fontSize: 22 }}
              >
                Address<span className="inside-checkall">Change</span>
              </a>
              <p className="inside-items">
                {userAddress?.address_heading},{userAddress?.address},
                {userAddress?.street}
              </p>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="row card-container">
                  {cart.map((item, index) => (
                    <>
                      <div
                        className="col-12 p-md-5 pt-md-3 pb-md-0 p-2"
                        key={index}
                      >
                        <div className="servicesMD row servicesMD-bg-color-1 px-4 py-3">
                          {/* <a className="col-4 p-0" href="#">
                                            <img
                                                className="image"
                                                src={item.service_image_url}
                                                alt={item.name}

                                            />
                                        </a> */}
                          <div className="col-12 pt-1 position-relative">
                            <div className="title d-flex align-items-center justify-content-between">
                              <a
                                href="#"
                                className="service-title"
                                style={{
                                  fontWeight: '500',
                                  fontFamily: 'Alata',
                                }}
                              >
                                {item.name}
                              </a>
                              <AddToCart data={item} />
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <div className="d-flex flex-row align-items-center">
                                <div className="p-rl-2 Price">
                                  ₹ {Math.round(item.price)}
                                </div>
                                <div className="offerPrice">
                                  ₹ {Math.round(item.discounted_price)}
                                </div>
                                <div className="px-1 discountTitle">
                                  {item.discount}%
                                </div>
                              </div>
                              <ViewDetails
                                alldata={item}
                                className="w-auto m-0"
                              />
                            </div>
                            <div className="descriptionServices d-flex justify-content-between align-items-center mt-3">
                              <ul
                                className="p-0 ps-2 m-0"
                                style={{ fontSize: 10 }}
                              >
                                {mapItems(
                                  item.description
                                    .replace(/(<([^>]+)>)/gi, '')
                                    .replace(/(?:\r\n|\r|\n)/g, '')
                                    .replace(/(?:&nbsp;)/g, '')
                                    .replace(/&amp;/g, '&')
                                    .toString()
                                    .split('.')
                                )}
                              </ul>
                              <button className="remove">REMOVE</button>
                            </div>
                            {/* <div className="title">
                                                <a href="#"> {item.name}</a>
                                            </div>
                                            <div className="d-flex flex-row mt-2">
                                                <div className="Price">₹{Math.round(item.price)}</div>
                                                <div className="p-rl-2 offerPrice">₹{Math.round(item.discounted_price)}</div>
                                                <div className="p-rl-2 discountTitle">{item.discount}%</div>
                                            </div>
                                            <div className="d-flex flex-column-m mt-2">
                                                <p className="p-rl-1 ratting" style={{ fontSize: 12 }}>
                                                    <i className="fa fa-star" /> {Math.round(item.rating_pop / 1000)}K reviews
                                                </p>


                                                <p className="p-rl-1 time-settings" style={{ fontSize: 12, marginLeft: '15px', marginTop: '2px' }}><i className="fa fa-clock-o"></i>
                                                    {item.time + ` ` + item.time_type}
                                                </p>
                                            </div>
                                            <AddToCart data={item} />

                                            <div className="lineDiv" />
                                            <div className="descriptionServices">
                                                <ul className="p-2" style={{ fontSize: 10, }}>
                                                    {mapItems(item.description.replace(/(<([^>]+)>)/ig, '').replace(/(?:\r\n|\r|\n)/g, '').replace(/(?:&nbsp;)/g, '')
                                                        .replace(/&amp;/g, '&').toString().split('.'))}
                                                </ul>
                                            </div> */}
                          </div>
                        </div>
                        {/* Here */}
                      </div>
                    </>
                  ))}
                </div>
                <h4 className="my-3 d-none d-md-block">Frequently Added</h4>
                {/* <PreferredPackages /> */}
                <div className="d-none d-md-flex row">
                  <div className="freq-wrapper col-6 col-md-3 mb-3 mb-md-0">
                    <img src={addon_img.src} width="100%" />
                    <div className="bg-white py-2 pb-3 w-100 d-flex align-items-center flex-column">
                      <h6 className="freq-text text-center">Party Makeup</h6>
                      <Button className="freq-add-btn px-3 py-0">Add</Button>
                    </div>
                  </div>
                  <div className="freq-wrapper col-6 col-md-3 mb-3 mb-md-0">
                    <img src={addon_img.src} width="100%" />
                    <div className="bg-white py-2 pb-3 w-100 d-flex align-items-center flex-column">
                      <h6 className="freq-text text-center">Party Makeup</h6>
                      <Button className="freq-add-btn px-3 py-0">Add</Button>
                    </div>
                  </div>
                  <div className="freq-wrapper col-6 col-md-3 mb-3 mb-md-0">
                    <img src={addon_img.src} width="100%" />
                    <div className="bg-white py-2 pb-3 w-100 d-flex align-items-center flex-column">
                      <h6 className="freq-text text-center">Party Makeup</h6>
                      <Button className="freq-add-btn px-3 py-0">Add</Button>
                    </div>
                  </div>
                  <div className="freq-wrapper col-6 col-md-3 mb-3 mb-md-0">
                    <img src={addon_img.src} width="100%" />
                    <div className="bg-white py-2 pb-3 w-100 d-flex align-items-center flex-column">
                      <h6 className="freq-text text-center">Party Makeup</h6>
                      <Button className="freq-add-btn px-3 py-0">Add</Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>No Data</>
            )}
          </Col>
          <Col md={1}></Col>
          <Col md={4}>
            <div className="section-address d-none d-md-block">
              <a
                onClick={() => setShowAddressModal(true)}
                className="inside-title"
                style={{ fontSize: 22 }}
              >
                Address<span className="inside-checkall">Change</span>
              </a>
              <p className="inside-items">
                {userAddress?.address_heading},{userAddress?.address},
                {userAddress?.street}
              </p>
            </div>
            <div className="">
              {/* <p className="inside-title">Summary</p> */}
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    setPType('cash');
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <i
                          className="fa fa-inr fontSize-m-20"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div style={{ marginLeft: '10px' }}>Cash</div>
                    </div>
                    <div>
                      {pType === 'cash' ? (
                        <i
                          className="fa fa-dot-circle-o  fontSize-m-20"
                          style={{ fontSize: 24 }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-circle-thin  fontSize-m-20"
                          style={{ fontSize: 24 }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    setPType('razorpay');
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      setPType('razorpay');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <img src={upi_icon.src} width="36px" />
                      </div>
                      <div style={{ marginLeft: '10px' }}>Card & Upi</div>
                    </div>

                    <div>
                      {pType === 'razorpay' ? (
                        <i
                          className="fa fa-dot-circle-o  fontSize-m-24"
                          style={{ fontSize: 24 }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-circle-thin  fontSize-m-24"
                          style={{ fontSize: 24 }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div
                  className="background-deflex"
                  onClick={() => {
                    if (!coupon_id) {
                      setCouponModal(true);
                      setUpdate(update - 1);
                    } else {
                      setUpdate(update + 1);
                      localStorage.removeItem('coupon_id');
                      localStorage.removeItem('coupon_amount');
                      localStorage.removeItem('coupon_min');
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <img src={coupon_icon.src} width="32px" />
                      </div>
                      <div style={{ marginLeft: '10px' }}>
                        {!coupon_id ? 'Apply Coupon' : 'Remove Coupon'}
                      </div>
                    </div>

                    <div>
                      <i className="fa fa-chevron-right fontSize-m-20"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="offerSuccess mt-3 d-flex align-items-center px-4">
              <img src={celebration.src} width={28} height={28} />
              <h6 className="p-2 m-0">
                Yay! you have saved ₹850 on final bill
              </h6>
            </div>
            <Card className="timeSlot-all">
              <p className="inside-title">Summary</p>

              <div className="row-m-check py-2">
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata">Service Charge</p>
                    <p className="m-1 font-family-alata">₹ {total}</p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata">Transport Fees</p>
                    <p className="m-1 font-family-alata">₹ 0</p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata">
                      {' '}
                      Safety & Hygiene Fee
                    </p>
                    <p className="m-1 font-family-alata">₹ 49</p>
                  </div>
                </div>

                {!coupon_id ? null : (
                  <div className="col-12">
                    <div className="d-flex flex-row justify-content-between-flex">
                      <p className="m-1 font-family-alata">Coupon</p>
                      <p className="m-1 font-family-alata">
                        -₹ {Math.round(coupon_amount)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Card.Footer className="bg-white">
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-between-flex">
                    <p className="m-1 font-family-alata">
                      Total Service Amount Payable
                    </p>
                    <p className="m-1 font-family-alata">₹ {finalTotal}</p>
                  </div>
                </div>
              </Card.Footer>
            </Card>
            <p className="checkout-text mt-3">
              <p className="fw-semibold m-0">
                *A small fee towards 100% care for you!
              </p>
              This fee is spent on the traing of the Proffessional and safety of
              the Customer & Service Provider suring the time of service which
              also includes like disposables.
            </p>

            <div className="checkoutBtn-container ">
              <button
                className="checkoutBtn-all"
                type="button"
                //disabled={cart.length === 0 || sending}
                disabled={minAmount >= finalTotal ? 'true' : ''}
                onClick={() => {
                  if (!userAddress || userAddress.length === 0) {
                    toast('Add address to book order', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light',
                      type: 'error',
                    });
                    return;
                  }
                  if (pType === 'cash') {
                    onSubmit();
                  } else {
                    openPayModal();
                  }
                }}
              >
                {sending ? 'Booking' : 'Book Service'}
              </button>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
        <ToastContainer />
        <AddressAndUserDetail
          show={showAddressModal}
          onHide={() => setShowAddressModal(false)}
        />
      </div>
    </>
  );
}
export default Payment;
