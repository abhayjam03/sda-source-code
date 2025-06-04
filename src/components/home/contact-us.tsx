export default function ContactUs(){
    return (   <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Get in Touch</h2>
        <form className="grid gap-4">
          <input type="text" placeholder="Your Name" className="border p-3 rounded-xl" />
          <input type="email" placeholder="Email Address" className="border p-3 rounded-xl" />
          <textarea placeholder="Message" className="border p-3 rounded-xl"  />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>)
}