import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle form submission goes here
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

   alert('This feature is not yet implemented. Please email us at necrozma@catgirlsaresexy.org instead.');  

    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
  };

  return (
    <>
    <div className={`bg-[#454138] rounded-lg shadow-md p-8 w-[80%] max-w-md mx-auto ${submitted ? 'opacity-0' : 'transition-opacity'}`}>
      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#454138] rounded-lg shadow-md p-8 w-[80%] max-w-md mx-auto transition-opacity"
        >
          <h2 className="text-[#dcd8c0] text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-[#dcd8c0] mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-[#dcd8c0] rounded-md text-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-[#dcd8c0] mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 bg-[#dcd8c0] rounded-md text-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent"
          />
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="message" className="text-[#dcd8c0] mb-2">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 bg-[#dcd8c0] rounded-md text-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent h-32 resize-none"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-[#302d29] text-[#dcd8c0] font-semibold rounded-md transition duration-300 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent"
        >
          Submit
        </button>
        </form>
      )}
    </div>
    {submitted && (
        <div className="bg-[#454138] rounded-lg shadow-md p-8 w-[80%] max-w-md mx-auto text-[#dcd8c0] text-center">
          <p className="text-lg mb-4">Thank you for your submission!</p>
          <p className="text-sm">We&apos;ll get back to you soon.</p>
        </div>
      )}
      </>
  );
};

export default ContactPage;

