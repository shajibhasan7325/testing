import React, { Fragment } from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ImgA from "../assets/img/a (1).png";
import ImgA2 from "../assets/img/a (2).png";
import ImgA3 from "../assets/img/a (3).png";
import ImgA4 from "../assets/img/a (4).png";

import Sonnet from "../components/WalletTab";
import { AiOutlineArrowRight } from "react-icons/ai";

import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const Wallet = () => {
  return (
    <Fragment>
      {localStorage.getItem("devise") === "D" ? (
        <div className="background3">
          <div className="refer-head-d appointments-head">
            <IoIosArrowBack size={35} className="refer-arrow-icon" />

            <h2 className="refer-title-d">Wallet & Cash Back</h2>
          </div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="appointments-nav">
              <Nav variant="pills" className="d-flex">
                <Nav.Item>
                  <Nav.Link eventKey="first">ONGOING</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">HISTORY</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Row>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="jus-for-bg">
                    <Sonnet />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Sonnet />
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Tab.Container>
        </div>
      ) : (
        <div className="background3">
          <div className="refer-head">
            <IoIosArrowBack size={30} className="refer-arrow-icon" />
            <h2 className="refer-title">Glamcode Scratch Card</h2>
          </div>
          <div className="wallet-mobile-bg">
            <div className="wallet-mobile-bg-card">
              <h2 className="wallet-mobile-bg-card-h2">GC</h2>
              <p>Scratch card unlocked!</p>
              <p>Worth up to ₹1000 </p>
            </div>
          </div>
          <div className="wallet-button">
            <button className="" type="button">
              Upcoming rewards on your path <AiOutlineArrowRight size={15} />
            </button>
          </div>
          <h2>My Rewards</h2>
          <div className="wallet-img-grid">
            <Image
              src={ImgA.src}
              width={200}
              height={150}
              style={{ objectFit: "cover" }}
            />
            <Image
              src={ImgA2.src}
              width={200}
              height={150}
              style={{ objectFit: "contain" }}
            />
            <Image
              src={ImgA3.src}
              width={200}
              height={150}
              style={{ objectFit: "cover" }}
            />
            <Image
              src={ImgA4.src}
              width={200}
              height={150}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Wallet;
