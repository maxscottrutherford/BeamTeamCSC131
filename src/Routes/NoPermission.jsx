// NoPermission.jsx
import React, { useState } from 'react';

const NoPermission = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log to console
        console.log(`Message sent to admin:\nEmail: ${email}\nMessage: ${message}`);

        // Display alert with email address and clear textboxes
        alert(`Your message was sent to ${email}.`);
        setEmail('');
        setMessage('');
    };


    return (
        <div className="container my-5 text-center">
            <h2 className="mb-4">Permission Denied</h2>
            <p>You are not an admin and do not have permission to add new tests.</p>
            <p>Please send a message to the admin to request permission:</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Admin's Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ maxWidth: '300px', margin: 'auto' }}
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        className="form-control"
                        name="message"
                        placeholder="Your Message to Admin"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '80%', margin: 'auto', minHeight: '150px' }}
                    />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoPermission;
