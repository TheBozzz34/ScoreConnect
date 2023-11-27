/* eslint-disable tailwindcss/migration-from-tailwind-2 */
const EmailSignup: React.FC = () => {
  return (
    <form className="flex flex-col items-center gap-4 py-8 bg-[#454138] rounded-lg shadow-md w-1/3 mx-auto" method="post" action="https://app.loops.so/api/newsletter-form/clllo99t7017zmh0nk22kjv59">
      <h2 className="text-[#dcd8c0] font-semibold text-xl">Subscribe to Our Newsletter</h2>
      <div className="flex flex-col items-center w-full">
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className="p-2 bg-[#dcd8c0] rounded-md w-64 text-[#454138] placeholder-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent mb-2"
        />
        <input type="text" name="firstName" placeholder="Joe" className="p-2 bg-[#dcd8c0] rounded-md w-64 text-[#454138] placeholder-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent mb-2" required />
        <input type="hidden" name="userGroup" value="Website signups" />
        <button
          type="submit"
          className="py-2 px-4 bg-[#302d29] text-[#dcd8c0] font-semibold rounded-md transition duration-300 ease-in-out hover:bg-[#bab5a1] hover:text-[#454138] focus:outline-none focus:ring-2 focus:ring-[#bab5a1] focus:border-transparent"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default EmailSignup;
