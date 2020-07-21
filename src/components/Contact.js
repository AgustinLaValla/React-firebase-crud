import React, { Fragment, useEffect, useState } from 'react'
import { ContactForm } from './ContactForm'
import { db } from '../firebase';
import { toast } from 'react-toastify';

export const Contact = () => {

    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState('');

    const addOrEditUserData = async (contactData) => {
        if (contactId === '') {
            await db.collection('contacts').doc().set(contactData);
            toast('Contact successfully added', { type: "success", autoClose: 2000, position: "top-center" });
        } else {
            await db.collection('contacts').doc(contactId).update(contactData);
            toast('Contact successfully updated', { type: "success", autoClose: 2000, position: "top-center" });
            setContactId('');
        }
    }

    const editData = (id) => setContactId(id)

    const deleteData = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            await db.collection('contacts').doc(id).delete();
            toast('Contact successfully deleted', { type: 'success', autoClose: 2000, position: 'top-center' });

        }
    };

    useEffect(() => {
        db.collection('contacts').onSnapshot((snap) => {
            let contactsArray = [];
            snap.docs.map(doc => contactsArray.push({ ...doc.data(), id: doc.id }));
            setContacts(contactsArray);
        })
    }, [])

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...{ addOrEditUserData, contacts, contactId }} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderlesss table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Adrress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.fullname}</td>
                                    <td>{contact.mobile}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.address}</td>
                                    <td>
                                        <a className="btn text-primary">
                                            <i className="fa fa-pencil-alt" onClick={() => editData(contact.id)}></i>
                                        </a>
                                        <a className="btn text-danger">
                                            <i className="fa fa-trash-alt" onClick={() => deleteData(contact.id)}></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
