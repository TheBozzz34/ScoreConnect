/* eslint-disable tailwindcss/migration-from-tailwind-2 */
const EmailSignup: React.FC = () => {
  return (
    <form
      className="mx-auto flex w-1/3 flex-col items-center gap-4 rounded-lg bg-[#454138] py-8 shadow-md"
      method="post"
      action="https://app.loops.so/api/newsletter-form/clllo99t7017zmh0nk22kjv59"
    >
      <h2 className="text-xl font-semibold text-[#dcd8c0]">Subscribe to Our Newsletter</h2>
      <div className="flex w-full flex-col items-center">
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className="mb-2 w-64 rounded-md bg-[#dcd8c0] p-2 text-[#454138] placeholder-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
        />
        <div className="w-full flex flex-row justify-center">
        <input
          type="text"
          name="firstName"
          placeholder="Jon"
          className="mb-2 w-1/6 mr-4 rounded-md bg-[#dcd8c0] p-2 text-[#454138] placeholder-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Snow"
          className="mb-2 w-1/6 rounded-md bg-[#dcd8c0] p-2 text-[#454138] placeholder-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
          required
        />
        </div>
        <input type="hidden" name="userGroup" value="Website signups" />
        <button
          type="submit"
          className="rounded-md bg-[#302d29] px-4 py-2 font-semibold text-[#dcd8c0] transition duration-300 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#bab5a1]"
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}

export default EmailSignup
