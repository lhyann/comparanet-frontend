export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="w-full px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Compara<span className="text-blue-600">Net</span>
          </span>
        </div>
        
        {/* 
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">Inicio</a>
          <a href="#" className="hover:text-blue-600 transition">Proveedores</a>
          <a href="#" className="hover:text-blue-600 transition">Acerca de</a>
          <a href="#" className="hover:text-blue-600 transition">FAQ</a>
        </nav> 
        */}

        {/* 
        <div>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
            Contacto
          </button>
        </div>
         */}


      </div>
    </header>
  );
}