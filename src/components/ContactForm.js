import React, { useState, useEffect } from 'react'

export const ContactForm = (props) => {

    const initialFieldValues = { fullname: '', mobile: '', email: '', address: '' };
    const [values, setValues] = useState(initialFieldValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name]:value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.addOrEditUserData(values);
        setValues(initialFieldValues);
    }

    useEffect(() => {
        if(props.contactId === '') {
            setValues(initialFieldValues);
        }else {
            const contactInfo = props.contacts.find(contact => contact.id === props.contactId);
            setValues({fullname:contactInfo.fullname, mobile:contactInfo.mobile, email:contactInfo.email, address:contactInfo.address});
        }
    }, [props.contactId]);

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text bg-info">
                        <i className="fa fa-user" style={{ color: 'white' }}></i>
                    </div>
                </div>
                <input type="text"
                       className="form-control"
                       placeholder="Fullname"
                       name="fullname"
                       value={values.fullname}
                       onChange={handleInputChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text bg-info">
                            <i className="fa fa-mobile-alt" style={{ color: 'white' }}></i>
                        </div>
                    </div>
                    <input type="text"
                           className="form-control"
                           placeholder="Mobile"
                           name="mobile"
                           value={values.mobile}
                           onChange={handleInputChange}
                    />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text bg-info">
                            <i className="fa fa-envelope" style={{ color: 'white' }}></i>
                        </div>
                    </div>
                    <input type="text"
                           className="form-control"
                           placeholder="Email"
                           name="email"
                           value={values.email}
                           onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <textarea type="text"
                       className="form-control"
                       placeholder="Adress"
                       name="address"
                       value={values.address}
                       onChange={handleInputChange}
                ></textarea>
            </div>


            <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
    )
}
