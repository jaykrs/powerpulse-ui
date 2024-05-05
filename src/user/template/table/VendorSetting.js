import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const VendorSetting = () => {

  useEffect(()=>{
    set_Form_Data(prev=>{
      return {...prev, ["vendorId"]:"abc@gmail.com"}
    })
	},[])
  
  const [edit, setEdit] = useState(false);
  let [form_Data, set_Form_Data] = useState({
    vendorId: "",
    vendor_name: "",
    contact_email: "",
    contact_person_name: "",
    contact_person_phone: "",
    vendor_brief: "",
    vendor_city: "",
    metadata: "",
    vendor_user_limit: 0,
    vendor_delivery_channel: "",
    additional_data: "",
    active: true
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    set_Form_Data({
      ...form_Data,
      [name]: value,
    });
  };
  const handleOnEdit = (event) => {
   edit === false ? setEdit(true) : setEdit(false);
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Vendor Setting Profile</Card.Title>
              { edit === false ? <Button variant="outline-primary" size="sm" onClick={handleOnEdit} >Edit</Button> : null }
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="vendorId">
                      <Form.Label>Email / VendorId</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="vendorId" value={form_Data.vendorId} onChange={handleOnChange} disabled={!edit} />
                      <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="vendor_name">
                      <Form.Label>Vendor Name</Form.Label>
                      <Form.Control type="text" placeholder="Vendor Name" name="vendor_name" value={form_Data.vendor_name} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Contact Email</Form.Label>
                      <Form.Control type="email" placeholder="Contact email" name="contact_email" value={form_Data.contact_email} onChange={handleOnChange} disabled={!edit}/>
                      <Form.Text className="text-muted">We&apos;ll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contact Person Phone</Form.Label>
                      <Form.Control type="text" placeholder="Contact Phone Number" name="contact_person_phone" value={form_Data.contact_person_phone} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Contact Name</Form.Label>
                      <Form.Control type="email" placeholder="Contact Name" name="contact_person_name" value={form_Data.contact_person_name} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicChecbox">
                      <Form.Check type="checkbox" label="Active" name="active" value={form_Data.active} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>

                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Text</Form.Label>
                      <Form.Control type="email" placeholder="Text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>Vendor User Limit</Form.Label>
                      <Form.Control as="select" name="vendor_user_limit" value={form_Data.vendor_user_limit} onChange={handleOnChange} disabled={!edit}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Vendor Brief</Form.Label>
                      <Form.Control as="textarea" rows="3" name="vendor_brief" value={form_Data.vendor_brief} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Additional Data</Form.Label>
                      <Form.Control as="textarea" rows="3" name="additional_data" value={form_Data.additional_data} onChange={handleOnChange} disabled={!edit}/>
                    </Form.Group>
                  </Col>
                </Row>
                {edit === true ? <Button variant="primary" size="sm" type="submit" onClick={handleSubmit}> Save</Button> : null }
                {edit === true ? <Button variant="secondary" type="submit" size="sm" onClick={handleOnEdit} >Cancel</Button> : null}
              </Form>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </React.Fragment>
  );
};

export default VendorSetting;
