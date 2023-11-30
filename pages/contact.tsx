import React, { useState } from "react"

const ContactPage: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logic to handle form submission goes here
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`)

    alert("This feature is not yet implemented. Please email us at necrozma@catgirlsaresexy.org instead.")

    setName("")
    setEmail("")
    setMessage("")
    setSubmitted(true)
  }

  return (
    <>
      <div
        className={`mx-auto w-[80%] max-w-md rounded-lg bg-[#454138] p-8 shadow-md ${
          submitted ? "opacity-0" : "transition-opacity"
        }`}
      >
        {!submitted && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-[80%] max-w-md rounded-lg bg-[#454138] p-8 shadow-md transition-opacity"
          >
            <h2 className="mb-4 text-2xl font-semibold text-[#dcd8c0]">Contact Us</h2>
            <div className="mb-4 flex flex-col">
              <label htmlFor="name" className="mb-2 text-[#dcd8c0]">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md bg-[#dcd8c0] p-2 text-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="mb-2 text-[#dcd8c0]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md bg-[#dcd8c0] p-2 text-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
              />
            </div>
            <div className="mb-6 flex flex-col">
              <label htmlFor="message" className="mb-2 text-[#dcd8c0]">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-32 resize-none rounded-md bg-[#dcd8c0] p-2 text-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-[#302d29] px-4 py-2 font-semibold text-[#dcd8c0] transition duration-300 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      {submitted && (
        <div className="mx-auto w-[80%] max-w-md rounded-lg bg-[#454138] p-8 text-center text-[#dcd8c0] shadow-md">
          <p className="mb-4 text-lg">Thank you for your submission!</p>
          <p className="text-sm">We&apos;ll get back to you soon.</p>
        </div>
      )}
    </>
  )
}

export default ContactPage
