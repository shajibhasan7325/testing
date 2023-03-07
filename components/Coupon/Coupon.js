import moment from 'moment';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { frontService } from '../../_services/front.services';
import Paytm_Logo from '../../assets/img/Paytm_Logo.svg';
import CouponAppliedModal from './CouponAppliedModal';

export default function Coupon(props) {
  const { show, handleClose, coupon, setCoupon, total } = props;
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://admin.glamcode.in/api/coupons-list';
      const response = await fetch(apiUrl);
      const data = await response.json();
      //console.log(data.couponData, 'limonnnnn');
      setCouponData(data.couponData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setError('');
    var day = moment().format('dddd');

    frontService.coupons().then(
      (res) => {
        if (res.status === 'success') {
          setCoupons((arr) => [
            ...res.couponData.filter((e) => isDay(e.days, day)),
          ]);
        } else {
          setError('Something went wrong !!');
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError('Something went wrong !!');
      }
    );
  }, []);

  const isDay = (s, day) => {
    let string = s.replaceAll('"', '');
    string = string.replace('[', '');
    string = string.replace(']', '');
    string = string.replaceAll('"', '');
    string = string.split(',');

    let has = false;
    string.forEach((element) => {
      if (!has) {
        if (element === day) {
          has = true;
        }
      }
    });
    return has;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mobilepopud coupon-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Coupon & Offers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <div className="search-box mt-0">
              <div className="search-conatiner me-0">
                <input
                  className="search-input"
                  placeholder="Enter Coupon Code"
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                  }}
                />
                <button
                  className="search-btn me-3"
                  type="button"
                  onClick={() => {
                    if (code) {
                      const c = coupons.find((e) => e.title === code);
                      if (c) {
                        if (total >= c.minimum_purchase_amount) {
                          setCoupon(c);
                          handleClose();
                        } else {
                          setError(
                            'Minimum amount to avail coupon is ' +
                            c.minimum_purchase_amount
                          );
                        }
                      } else {
                        setError('Invalid coupon code');
                      }
                    } else {
                      setError('Enter coupon code');
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            {error && <div className="me-0 text-danger"> {error}</div>}
            {/* {couponData.map((coupon) => (
              <h1>{coupon.title}</h1>
            ))} */}
          </div>
          <div className="row ">
            {couponData.map((e, i) => {
              return (
                <div className="col-lg-12 mt-xl-2" key={i}>
                  <div className="row justify-content-between">
                    <div className="col-lg-3 col-3 text-center">
                      <img src={Paytm_Logo.src} alt="logo" className="logo" />
                    </div>
                    <div className="col-lg-7 col-9">
                      <p className="title offer-title">{e.title}</p>
                      <p className="disacount-amount pt-2">Upto ₹500 off</p>
                      <p className="save-amount pt-2">
                        Save ₹{Math.round(e.amount)} on this order
                      </p>
                      <p className="t-and-c">View T&C</p>
                    </div>
                    <div
                      className="col-lg-2 col-3 text-end"
                      onClick={() => {
                        if (total >= e.minimum_purchase_amount) {
                          setCoupon(e);
                          handleClose();
                        } else {
                          setError(
                            'Minimum amount to avail coupon is ' +
                            e.minimum_purchase_amount
                          );
                        }
                      }}
                    >
                      <p className="apply-btn" role="button">
                        Apply
                      </p>
                    </div>
                  </div>
                  {i === coupons.length - 1 ? '' : <hr />}
                </div>
              );
            })}
            {loading
              ? 'Loading'
              : coupons.length === 0
                ? 'No Coupon available'
                : ''}
          </div>
        </Modal.Body>
      </Modal>
      <CouponAppliedModal show={false} />
    </>
  );
}
