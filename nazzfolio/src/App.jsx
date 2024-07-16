import { useState } from 'react';
import { Github, Linkedin, Youtube, Mail, Camera, Cpu, Building, Menu } from 'lucide-react';
import logo from './assets/logo.svg';
import hero from './assets/hero.jpg';

const PersonalWebsite = () => {
  const [setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const expertise = [
    { image: 'https://via.placeholder.com/400x300', title: 'Technical Manager & Speaker', description: 'Creating photorealistic 3D renderings and animations' },
    { image: 'https://via.placeholder.com/400x300', title: 'Training', description: 'Experienced Unreal Authorized Instructor, Blender trainer. Notion and Coda ambassador' },
    { image: 'https://via.placeholder.com/400x300', title: 'Real-Time Design', description: 'Product design, interior design and real-time architectural visualization' },
    { image: 'https://via.placeholder.com/400x300', title: '3D Pipeline Development', description: 'Extensive knowledge into digital, interactive content workflows' },
    { image: 'https://via.placeholder.com/400x300', title: 'Junior Full Stack Developer', description: 'I never stop learning, so in 2024 I am focusing on full stack development' }
  ];

  const projects = [
    { image: 'https://via.placeholder.com/400x300', link: 'https://r3plica.space/', title: 'R3PLICA', description: 'Branded furniture certified digital replicas for real-time architectural visualization' },
    { image: 'https://via.placeholder.com/400x300', link: 'https://metayouman.com/', title: 'Metayouman', description: 'Brief description of the architectural visualization project' },
    { image: 'https://via.placeholder.com/400x300', link: 'https://www.instagram.com/art_picker/', title: 'Art Picker', description: 'Brief description of the architectural visualization project' }
  ];

  const products = [
    { image: 'https://via.placeholder.com/400x300', title: 'Blender Addons', description: 'Short description of the product or tool' },
    { image: 'https://via.placeholder.com/400x300', title: 'Unreal Engine Tools', description: 'Short description of the product or tool' },
    { image: 'https://via.placeholder.com/400x300', title: 'Notion Templates', description: 'Short description of the product or tool' }
  ];

  const social = [
    { Icon: Linkedin, link: 'https://www.linkedin.com/in/nazzarenogiannelli/' },
    { Icon: Github, link: 'https://github.com/NazzarenoGiannelli' },
    { Icon: Youtube, link: 'https://www.youtube.com/@NazzarenoGiannelliCG' },
    { Icon: Mail, link: 'mailto:nazzareno@r3plica.space' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans" style={{ fontFamily: 'Fira Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-black text-white shadow-md z-20 sticky top-0 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className='flex items-center'>
            <div className="w-12 h-12 rounded-none overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-white text-lg font-semibold pl-3">Nazzareno Giannelli</div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['about', 'expertise', 'projects', 'products', 'contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className={`hover:border-b-2 border-[#4037db]`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#121212] py-4 px-4 absolute top-full left-0 right-0 border-b border-gray-800">
            <ul className="space-y-2">
              {['about', 'expertise', 'projects', 'products', 'contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className="block py-2 hover:bg-[#4037db] hover:text-gray-200 transition-colors duration-300"
                    onClick={() => {
                      setActiveSection(section);
                      setIsMenuOpen(false);
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden border-b border-gray-800 px-4"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container text-left mx-auto px-4 z-10">
          <h1 className="text-6xl md:text-9xl mb-4 animate-fade-in-down" style={{ fontFamily: 'Playfair Display, serif' }}>Hi,</h1>
          <h1 className="text-4xl md:text-6xl mb-4 animate-fade-in-down" style={{ fontFamily: 'Playfair Display, serif' }}>It&apos;s Nazz here.</h1>
          <h2 className="text-xl md:text-3xl italic mb-4 animate-fade-in-down">Ciao mamma guarda come mi diverto</h2>
          <a href="#contact" className="bg-[#4037db] text-white hover:border-2 hover:border-[#4037db] hover:bg-inherit font-bold py-2 px-6 rounded-none transition-colors duration-200 animate-fade-in border border-gray-800">
            Get in Touch
          </a>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-full h-full border border-gray-800 rounded-none"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section id="about" className="mb-20 transform transition-all duration-500 border border-gray-800 p-6">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>About Me</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            As the CTO of R3PLICA, I, Nazzareno Giannelli, specialize in pushing the boundaries of real-time architectural visualization. 
            With a keen eye for design and a passion for digital craftsmanship, I blend cutting-edge technology 
            with artistic vision to create stunning, immersive environments.
          </p>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="mb-20">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {expertise.map(({image, title, description}, index) => (
              <div key={index} className="bg-[#121212] hover:border-[#4037db] flex flex-col transform transition-all border border-gray-800">
                <img src={image} alt="Expertise preview" className="w-full h-40 object-cover" />
                <div className="flex flex-col p-6">
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
                  <p className="text-gray-400 text-left">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(({image, link, title, description}, index) => (
              <a href={link} target='_blank' rel='noreferrer' key={index} className="bg-[#121212] hover:border-[#4037db] overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 border border-gray-800">
                <img src={image} alt="Product preview" className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
                  <p className="text-gray-400">{description}</p>
                </div>
              </a>
              ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products" className="mb-20">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map(({image, title, description}, index) => (
            <div key={index} className="bg-[#121212] hover:border-[#4037db] overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 border border-gray-800">
              <img src={image} alt="Product preview" className="w-full h-80 object-cover" />
              <div className="p-6">
                <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <a href="#contact" className="bg-[#4037db] text-white hover:border-2 border-[#4037db] hover:bg-inherit font-bold py-2 px-6 rounded-none transition-colors duration-200 animate-fade-in border">
                  Learn more
                </a>
              </div>
            </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-12 border border-gray-800 p-6 ">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Get in Touch</h2>
          <div className="flex space-x-6">
            {social.map(({Icon, link}, index) => (
              <a key={index} href={link} target='_blank' rel="noreferrer" className="text-gray-400 hover:text-[#4037db] transition-colors duration-300 transform hover:scale-110">
                <Icon size={32} stroke-width={2}/>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className=" text-white py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Nazzareno Giannelli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalWebsite;