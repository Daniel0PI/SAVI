import { InternetIdentityButton } from "@bundly/ares-react";

export default function Header() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
        <img src="/IMAGES/LOGO.png" alt="Logo" style={{ width: '70px', marginRight: '10px' }} /> {/* Aumenta el tamaño del logo */}
          <strong style={{ fontSize: '2.5em' }}>SAVI</strong> {/* Aumenta el tamaño de las letras */}
        </div>
        <div className="lg:flex lg:flex-2 lg:justify-end lg:gap-x-12">
          <span>MAPA</span> {/* Texto MAPA */}
          <span>USUARIO</span> {/* Texto USUARIO */}
          
         <InternetIdentityButton />
        </div>
      </nav>
    </header>
  );
}