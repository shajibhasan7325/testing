import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import facebook2 from "../../assets/img/facebook2.svg";
import instargram from "../../assets/img/instargram.svg";
import pin from "../../assets/img/pin.svg";
import reddit from "../../assets/img/reddit.svg";
import twitter from "../../assets/img/twitter.svg";
import youtube from "../../assets/img/youtube.svg";
import moment from "moment";
import { frontService } from "../../_services/front.services";

import Logo from "../../glamcode.png";
import mobile_icon from "../../assets/img/mobile_icon.svg";
import email_icon from "../../assets/img/email_icon.svg";
import playstore from "../../assets/img/playstore.svg";
import appstore from "../../assets/img/appstore.svg";
import twitter_icon from "../../assets/img/twitter_icon.svg";
import youtube_icon from "../../assets/img/youtube_icon.svg";
import instagram_icon from "../../assets/img/instagram_icon.svg";
import facebook_icon from "../../assets/img/facebook_icon.svg";

import { Container } from "react-bootstrap";
import { useAmp } from "next/amp";
import { BiMobile } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";
import OtpModal from "../Modal/OtpModal";

export const config = { amp: "hybrid" };

function Footer() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const cart = useSelector((state) => state.cardAdd?.cart);
  const [total, setTotal] = React.useState(0);
  const [coupons, setCoupons] = useState([]);
  const isAmp = useAmp();
  const dataloctions = useSelector((state) => state.loctions);
  const renderInput = () => {
    router.push("/login");
  };
  useEffect(() => {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].sum);
    }
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    // setError("")
    var day = moment().format("dddd");

    frontService.coupons().then(
      (res) => {
        if (res.status === "success") {
          setCoupons((arr) => [
            ...res.couponData.filter((e) => isDay(e.days, day)),
          ]);
        } else {
          // setError('Something went wrong !!');
        }
        // setLoading(false)
      },
      (error) => {
        // setLoading(false)
        // setError('Something went wrong !!');
      }
    );
  }, []);

  const selecthandleclick = (
    locId,
    locName,
    locAddress,
    locationslug,
    locMinBookingAmount
  ) => {
    localStorage.setItem("id", locId);
    localStorage.setItem("cityname", locName);

    localStorage.setItem("locAddress", locAddress);
    localStorage.setItem("loc_min_booking_amount", locMinBookingAmount);
    Router.push("/" + locationslug);
    window.location.href = "/" + locationslug;
    //Router.reload(window.location.pathname)
  };
  const shortedCoupons = coupons.sort(
    (a, b) => a.minimum_purchase_amount - b.minimum_purchase_amount
  );

  let dif = ((shortedCoupons[0] || {}).minimum_purchase_amount || 0) - total;

  let minAmount = localStorage.getItem("loc_min_booking_amount") || "0";
  minAmount = parseInt(minAmount);
  if (minAmount > total) {
    dif = 0;
  }

  const isDay = (s, day) => {
    let string = s.replaceAll('"', "");
    string = string.replace("[", "");
    string = string.replace("]", "");
    string = string.replaceAll('"', "");
    string = string.split(",");

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

  //console.log(isAmp);

  return (
    <>
      <footer className="footer-container">
        <Container>
          {isAmp ? (
            <h1>tesabasbda</h1>
          ) : (
            <>
              <div className="row mt-5 desc-footer d-none d-md-flex py-5">
                <div className="d-md-none d-lg-inline-flex col-lg-3">
                  <div className="log footer-logo">
                    {/* <a href="/">
                    <img
                      src={Logo.src}
                      alt="Glam code"
                      width="100%"
                      height="100%"
                    />
                  </a> */}

                    <Link href="#">
                      <Image
                        src={Logo.src}
                        alt="Glam code"
                        width={152}
                        height={152}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 col-lg-9">
                  <div className="row text-white">
                    <div className="col-5">
                      <h4 className="text-white footer-heading">
                        Contact Information
                      </h4>
                      <div className="d-flex align-items-center mt-3">
                        <BiMobile size={28} />
                        <p className="m-0 ps-3">+91-812-7111-333</p>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <CgMail size={28} />
                        <p className="m-0 ps-3">glamourministry@gmail.com</p>
                      </div>
                    </div>
                    <div className="col-3 footer-menu-text">
                      <h4 className="text-white footer-heading">Main Menu</h4>
                      <p className="mb-1">
                        <a href="/about-us" className="footer-text">
                          About Us
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Contact Us
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Membership
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Refer and Earn
                        </a>
                      </p>
                    </div>
                    <div className="col-3 footer-menu-text">
                      <h4 className="text-white footer-heading">Serving in</h4>
                      {dataloctions.location?.map((x, i) => (
                        <p className="mb-1">
                          <a
                            key={i}
                            onClick={() =>
                              selecthandleclick(
                                x.id,
                                x.city,
                                x.name,
                                x.slug,
                                x.price
                              )
                            }
                            style={{ color: "#fff" }}
                            href={`/${x.slug}`}
                          >
                            {" "}
                            {x.city}{" "}
                          </a>
                        </p>
                      ))}
                    </div>
                    <h4 className="footer-heading">Download the GC App</h4>
                    <div className="d-flex align-items-center ">
                      {/* <a href="#">
                      <img
                        className="me-2"
                        src={playstore.src}
                        alt="Glam code"
                      />
                    </a> */}
                      <Link href="#">
                        <Image
                          src={playstore.src}
                          alt="Glam code"
                          className="me-2"
                          width={135}
                          height={45}
                        />
                      </Link>
                      {/* <a href="#">
                      <img src={appstore.src} alt="Glam code" />
                    </a> */}

                      <Link href="#">
                        <Image
                          src={appstore.src}
                          alt="Glam code"
                          className="me-2"
                          width={135}
                          height={45}
                        />
                      </Link>
                    </div>
                    <div className="d-flex justify-content-end">
                      <a
                        href="https://instagram.com/myglamcode?igshid=YmMyMTA2M2Y="
                        className="social-icon me-3"
                        style={{
                          display: "inline-block",
                          width: 40,
                          height: 40,
                          position: "relative",
                          overflow: "hidden",
                          verticalAlign: "middle",
                        }}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <div
                          className="social-container"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <img src={instagram_icon.src} />
                        </div>
                      </a>
                      <a
                        href="https://youtube.com/channel/UC0tPgNGS96oVlkUqBf4ZM2Q"
                        className="social-icon me-3"
                        style={{
                          display: "inline-block",
                          width: 40,
                          height: 40,
                          position: "relative",
                          overflow: "hidden",
                          verticalAlign: "middle",
                        }}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <div
                          className="social-container"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <img src={youtube_icon.src} />
                        </div>
                      </a>
                      <a
                        href="https://twitter.com/GlamCode3?t=medt6YYBVczVXZ-IWiUObg&s=08"
                        className="social-icon me-3"
                        style={{
                          display: "inline-block",
                          width: 40,
                          height: 40,
                          position: "relative",
                          overflow: "hidden",
                          verticalAlign: "middle",
                        }}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <div
                          className="social-container"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <img src={twitter_icon.src} />
                        </div>
                      </a>
                      <a
                        href="https://www.facebook.com/myglamcode"
                        className="social-icon me-3"
                        style={{
                          display: "inline-block",
                          width: 40,
                          height: 40,
                          position: "relative",
                          overflow: "hidden",
                          verticalAlign: "middle",
                        }}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <div
                          className="social-container"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <img src={facebook_icon.src} />
                        </div>
                      </a>
                    </div>
                    <h6 className="mt-3 ps-5 last-text">
                      Copyright 2022 @Glamcode
                    </h6>
                  </div>
                </div>
                {/* <div className="col-12">
                <hr style={{ border: "1px solid rgb(255, 255, 255)" }} />
              </div>
              <div className="row">
                <div className="col-md-7 col-lg-7">
                  <p className="footer-text">
                    {localStorage.getItem("locAddress")
                      ? localStorage.getItem("locAddress")
                      : "Amrapali Zodiac, Sector 120, Noida, Uttar Pradesh, India"}
                  </p>
                </div>
                <div className="col-md-5 col-lg-5 bv" style={{ color: "#fff" }}>
                  {dataloctions.location?.map((x, i) => (
                    <a
                      key={i}
                      onClick={() =>
                        selecthandleclick(x.id, x.city, x.name, x.slug, x.price)
                      }
                      style={{ color: "#fff" }}
                      href={`/${x.slug}`}
                    >
                      {" "}
                      {x.city},{" "}
                    </a>
                  ))}
                </div>
              </div> */}
              </div>
              <div className="row mobile-footer d-md-none py-5">
                <div className="col-12">
                  <div className="row text-white">
                    <div className="col-12 text-center">
                      <p className="mb-1">
                        <a href="/about-us" className="footer-text">
                          About Us
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Terms & Condition
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Privacy Policy
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          FAQs
                        </a>
                      </p>
                      <p className="mb-1">
                        <a href="/" className="footer-text">
                          Contact Us
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="bg-white w-full border" />

                  <div className="d-flex justify-content-center">
                    <a
                      href="https://instagram.com/myglamcode?igshid=YmMyMTA2M2Y="
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <img src={instagram_icon.src} />
                      </div>
                    </a>
                    <a
                      href="https://youtube.com/channel/UC0tPgNGS96oVlkUqBf4ZM2Q"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <img src={youtube_icon.src} />
                      </div>
                    </a>
                    <a
                      href="https://twitter.com/GlamCode3?t=medt6YYBVczVXZ-IWiUObg&s=08"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <img src={twitter_icon.src} />
                      </div>
                    </a>
                    <a
                      href="https://www.facebook.com/myglamcode"
                      className="social-icon me-3"
                      style={{
                        display: "inline-block",
                        width: 40,
                        height: 40,
                        position: "relative",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                      target="_blank"
                      aria-label="twitter"
                    >
                      <div
                        className="social-container"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <img src={facebook_icon.src} />
                      </div>
                    </a>
                  </div>
                  <h6 className="mt-3 ps-5 text-white text-center">
                    Copyright 2022 @Glamcode
                  </h6>
                </div>
              </div>
            </>
          )}
        </Container>
      </footer>

      {router.pathname === "/login" ||
      router.pathname === "/payment" ||
      router.pathname === "/checkout" ? (
        ""
      ) : cart.length > 0 ? (
        <div className="bottomservicesCheckout" key={0}>
          <div className="topinside">
            <p className="text">{`Minimum Booking Amount :- ₹  ${localStorage.getItem(
              "loc_min_booking_amount"
            )}`}</p>
          </div>
          <div className="bottominside">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column-m">
                <p className="textHead">
                  Total Price ₹ {total}{" "}
                  {dif > 0 && (
                    <span
                      style={{ paddingLeft: "6px" }}
                    >{` Add ₹${dif} more to avail coupon`}</span>
                  )}
                </p>
              </div>

              <span
                onClick={() => {
                  let minAmount =
                    localStorage.getItem("loc_min_booking_amount") || "0";
                  minAmount = parseInt(minAmount);
                  localStorage.setItem("page", "checkout");
                  if (minAmount > total) {
                    toast.error("Add more items to checkout");
                  } else if (!localStorage.getItem("gluserDetails")) {
                    // router.push('/login');
                    handleShow();
                  } else {
                    router.push("/checkout");
                  }
                }}
                className="textHead"
                style={{ cursor: "pointer" }}
              >
                Checkout{" "}
                <i
                  className="fa fa-chevron-right"
                  style={{ marginLeft: 10 }}
                  aria-hidden="true"
                ></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {show && (
        <OtpModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default Footer;
