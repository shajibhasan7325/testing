import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from './Card';
export default function Maincategory() {
  const [showCategory, setShowcategory] = React.useState([]);
  const datacat = useSelector((state) => state.maincat);

  return (
    <div className="small-card">
      <Row>
        <div className="title-content">
          <h2
            className="title font-familt-jost"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Home Salon Services
          </h2>
        </div>
        {datacat.maincategory?.map((item, index) => {
          return (
            <Col lg="2" md="4" sm="5" className="mt-5 " key={index}>
              <Card
                cname="salonehome-all-Category"
                id={item.id}
                name={item.name}
                image={item.image}
                slug={item.slug}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
