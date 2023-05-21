import React, { useState  } from 'react';
// import axios from 'axios';
import  { useNotification } from 'use-toast-notification'


import {
  Container,
  Button,
  
  Row,
  Col,
} from "react-bootstrap";
const App = () => {
  const notification = useNotification()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  // useEffect(() => {
  //   fetchContacts();
  // }, []);

  // const fetchContacts = () => {
  //   axios.get('http://localhost:3010/items')
  //     .then((response) => {
  //       setContacts(response.data);
  //     })
  //     .catch((error) => {
  //       alert(error)
  //       console.error('Error fetching contacts:', error);
  //     });
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);

  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (name.length < 5 || !email.includes('@') || mobile.length > 10 || isNaN(mobile)) {
      // alert('Please enter valid details!');
      try {
        notification.show({
            message: 'Enter Correct name, phone number and email', 
            title: 'Enter Correct Details',
            variant: 'error'
        })
    } catch(e){
      notification.show({
          message: ' delivery could not be processed', 
          title: 'Delivery Status',
          variant: 'error'
      })
  }
      return;
    }

    if (editIndex === -1) {
      // Add new contact
      const newContact = {
        name: name,
        email: email,
        mobile: mobile,
      };
      setContacts([...contacts, newContact]);
  
          // Reset form fields
          setName('');
          setEmail('');
          setMobile('');
          try {
            notification.show({
                message: 'Your name, phone number and email is stored', 
                title: 'successfully saved',
                variant: 'success'
            })
        } catch(e){
            notification.show({
                message: ' delivery could not be processed', 
                title: 'Delivery Status',
                variant: 'error'
            })
        }
      // POST the new contact to the API
      // axios.post('http://localhost:3010/items', newContact)
      //   .then((response) => {
      //     // Add the new contact to the local state
      //     setContacts([...contacts, response.data]);
  
      //     // Reset form fields
      //     setName('');
      //     setEmail('');
      //     setMobile('');
      //   })
        // .catch((error) => {
          
        //   console.error('Error adding contact:', error);
        // });
        
 
      // setContacts([...contacts, { name, email, mobile }]);
    } else {
      // Edit existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = { name, email, mobile };
      setContacts(updatedContacts);
      setEditIndex(-1);
      try {
        notification.show({
            message: 'Your name, phone number and email is Edited', 
            title: 'successfully Edited',
            variant: 'info'
        })
    } catch(e){
        notification.show({
            message: ' delivery could not be processed', 
            title: 'Delivery Status',
            variant: 'error'
        })
    }
    }

    // Reset form fields
    setName('');
    setEmail('');
    setMobile('');
  };

  const handleEdit = (index) => {
    const { name, email, mobile } = contacts[index];
    setName(name);
    setEmail(email);
    setMobile(mobile);
    setEditIndex(index);
    

    
  };

  const handleDelete = (index) => {
    // const updatedContacts = contacts.filter((contact) => contact.id !== index);
    // setContacts(updatedContacts);
    // axios.delete(`http://localhost:3010/items/${index}`)
    //   .then(() => {
    //     const updatedContacts = contacts.filter((contact) => contact.id !== index);
    //     setContacts(updatedContacts);
    //     // Remove the contact from the local state
    //   })
    //   .catch((error) => {
    //     alert(error)
    //     console.error('Error deleting contact:', error);
    //   });
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    try {
      notification.show({
          message: 'Your name, phone number and email is deleted', 
          title: 'successfully Deleted',
          variant: 'error'
      })
  } catch(e){
      notification.show({
          message: ' delivery could not be processed', 
          title: 'Delivery Status',
          variant: 'error'
      })
  }
  };

  return (
    <div  style={{backgroundColor:"rgb(100,128,128)" ,minHeight:"100vh",marginBottom :"-16px", color:"white"}}>
    < Container >
    <div className='pt-5 pb-3'>
      <h2 >Contact Form</h2></div>
      <form onSubmit={handleSubmit} className='ms-4'>
        
          <label for="name" className="form-label">Name:</label>
          <input type="text" className="form-control " id="name"  value={name} onChange={handleNameChange} />

        
        <br />
        
        <label for="email" className="form-label">
          Email:</label>
          <input type="email" className="form-control " id="email"  value={email} onChange={handleEmailChange} />
        
        <br />
       
        <label for="mobile" className="form-label" >Mobile:</label>
          <input type="tel" className="form-control " id="mobile" value={mobile} onChange={handleMobileChange} />
        
        <br />
        <Button type="submit">{editIndex === -1 ? 'Add Contact' : 'Update Contact'}</Button>
      </form>
<hr/>
      <h2 className='mt-3'>Contact List</h2>
      <ul>
      <Row className='fw-bold fs-5'>
      <Col sm={1}>S.N</Col>

        <Col sm={2}>Name</Col>
        <Col sm={4}>Email</Col>
        <Col sm={3}>Mobile</Col>
        <Col sm={1}>Edit</Col>
        <Col sm={1}>Delete</Col>

      </Row>
            <span>
            
            </span>
            
          
        <br/>
        {contacts.map((contact, index) => (
      
        <Row key={index} className='mt-3'>
        <Col sm={1} >{index+1}</Col>

        <Col sm={2} >{contact.name}</Col>
        <Col sm={4}>{contact.email}</Col>
        <Col sm={3}>{contact.mobile}</Col>
        <Col sm={1} className='sm-1' ><Button onClick={() => handleEdit(index)}>Edit</Button></Col>
        <Col sm={1}><Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button></Col>
        <hr className='mt-1'/>

            
            </Row>
          
        ))}
      </ul>
    </Container>
    </div>
  );
};

export default App;
