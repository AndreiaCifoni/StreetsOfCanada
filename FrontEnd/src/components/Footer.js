import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-8 bg-indigo-300 h-20 shadow-md flex font-bold text-purple-900">
      <p className="w-1/2 text-xl md:text-lg sm:text-base my-auto text-center   ">
        Created by{" "}
        <a
          className="underline hover:text-blue-800"
          href="https://andreiacifoni.github.io/Portifolio/"
          target="_blank"
          rel="noreferrer"
        >
          Andreia Cifoni
        </a>
      </p>
      <div className="w-1/2 text-2xl md:text-xl sm:text-lg flex gap-24 md:gap-20 sm:gap-12 items-center justify-center">
        <div>
          <a
            href="mailto:andreiacifoni@gmail.com?subject='subject text'"
            target="_blank"
            rel="noreferrer"
          >
            <ion-icon className="" name="mail-outline"></ion-icon>
          </a>
        </div>
        <div>
          <a
            href="https://linkedin.com/in/andreiacifoni"
            target="_blank"
            rel="noreferrer"
          >
            <ion-icon className="" name="logo-linkedin"></ion-icon>
          </a>
        </div>
        <div>
          <a
            href="https://github.com/AndreiaCifoni/StreetsOfCanada"
            target="_blank"
            rel="noreferrer"
          >
            <ion-icon className="" name="logo-github"></ion-icon>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
