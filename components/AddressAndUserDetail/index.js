import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PlaceAutocomplete from '../../components/PlaceAutocomplete';
import { frontService } from '../../_services/front.services';

const AddressAndUserDetail = (props) => {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userdetails?.userdetails);

  const [location, setLocation] = useState('');
  const [latLng, setLatLng] = useState({ lat: '', lng: '' });

  const router = useRouter();
  const [addressl, setAddresslist] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const user = JSON.parse(localStorage.getItem('gluserDetails'));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!localStorage.getItem('gluserDetails')) {
      router.push('/login');
    }
    frontService.addressList(userdetails?.id).then(
      (res) => {
        if (res.status === 'success') {
          setAddresslist(res.address);
        } else {
          toast.error(res.message, 'error');
        }
      },
      (error) => {
        console.log('Something went wrong !!');
        //toast.error("Something went wrong !!", "Fashion Store");
      }
    );
  }, []);

  const handleRegistration = (data) => {
    const adde = {
      addressHome: data.addressHome,
      address: data.address,
      id: data.id,
      location: location,
      lat: latLng.lat,
      lng: latLng.lng,
    };
    frontService.updateAddress(adde).then(
      (res) => {
        if (res.status === 'success') {
          dispatch(userAddress(res.data));
          dispatch(userData(res.user));
          if (!localStorage.getItem('booking_time')) {
            Router.push('/checkout');
          } else {
            Router.push('/payment');
          }
        } else {
          toast.error(res.message, 'error');
        }
      },
      (error) => {
        console.log('Something went wrong !!');
        //toast.error("Something went wrong !!", "Fashion Store");
      }
    );
  };

  const handleUserRegistration = (data) => {
    frontService.useSave(data).then(
      (res) => {
        if (res.status == 'success') {
          localStorage.setItem('gluserDetails', JSON.stringify(res.user));
          dispatch(userData(res.user));
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
        } else if (res.status == 'fail') {
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
        } else {
          toast('Invalid', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
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
        });
      }
    );
  };

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className="modbox"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Address
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <Modal.Body className="show-grid">
          <div className="card p-4 mb-2">
            <div className="form-group mb-2">
              <label htmlFor="addressHome">Building Name*</label>
              <input
                type="text"
                className="form-control"
                id="addressHome"
                placeholder="Building Name*"
                name="addressHome"
                {...register('addressHome')}
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="home">Address*</label>
              <input
                type="text"
                className="form-control"
                id="home"
                name="address"
                {...register('address')}
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="location">Location*</label>
              <input
                name="id"
                {...register('id')}
                type="hidden"
                defaultValue={userdetails?.id}
              />
              <input
                name="location"
                {...register('location')}
                type="hidden"
                value={location}
              />
              <input
                name="lat"
                {...register('lat')}
                type="hidden"
                value={latLng?.lat}
              />
              <input
                name="lng"
                {...register('lng')}
                type="hidden"
                value={latLng?.lng}
              />
              <PlaceAutocomplete
                onChangeValue={setLocation}
                onValue={setLatLng}
              />
            </div>
            <div className="d-flex justify-content-end">
              {/* <Button
                onClick={props.onHide}
                style={{ background: '#7c00b7', border: '1px solid #7c00b7' }}
              >
                Close
              </Button> */}
              <Button
                variant="primary"
                type="submit"
                className="ms-2"
                style={{ background: '#7c00b7', border: '1px solid #7c00b7' }}
              >
                Save changes
              </Button>
            </div>
          </div>
          {/* <div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Details</h5>
                <form onSubmit={handleSubmit(handleUserRegistration)}>
                  <div className="form-group mb-2">
                    <label htmlFor="exampleInputPhone">Phone No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Phone"
                      name="name"
                      defaultValue={userdetails?.mobile}
                      {...register('mobile')}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="exampleInputName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Name"
                      defaultValue={userdetails?.name}
                      name="name"
                      {...register('name')}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      {...register('email')}
                      defaultValue={userdetails?.email}
                      required
                    />
                  </div>

                  <input
                    type="hidden"
                    className="form-control"
                    name="id"
                    defaultValue={userdetails?.id}
                    {...register('id')}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      background: '#7c00b7',
                      border: '1px solid #7c00b7',
                    }}
                  >
                    Save Profile
                  </button>
                </form>
              </div>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddressAndUserDetail;
