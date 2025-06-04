export default function HeroSection({...data}:any){
    console.log({data})
    const data2 = {...data ,name :"aj"}
    console.log({data2})
    return ( <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center h-[90vh] flex items-center justify-center">
        <div className="bg-black/60 p-8 rounded-xl text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Shaurya Defence Academy, Pathankot</h1>
          <p className="text-lg md:text-xl">Your Gateway to NDA, CDS, AFCAT, and SSB Success</p>
        </div>
      </section>)
}