import { useEffect } from "react";

const Navbar = ({ menu, setMenu }) => {


  useEffect(() => {

    console.log(menu)

  }, [menu])


  return (

<nav className="fixed z-100 w-full top-0 start-0">
  <div className="max-w-screen-xl flex flex-wrap items-center md:justify-start justify-end ml-4 mr-auto py-2 px-6">
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-none focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col md:justify-between py-2 md:p-0 rounded-lg bg-none md:flex-row md:gap-12 md:pt-4 md:space-x-8 rtl:space-x-reverse md:mt-0">
        <li>

      <button value={'movie'} onClick={() => setMenu('movie')} className={`py-2 px-3 flex items-center space-x-3 rtl:space-x-reverse ${menu === 'movie'? 'text-red-600' :'text-gray-200'} bg-none rounded-sm md:bg-transparent  md:p-0`} >
               <span className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
        </span>
     <span className="self-center text-lg md:text-md  font-semibold whitespace-nowrap ">Movies</span>
            </button>
        </li>
        <li>
          <button value={'tv'} onClick={() =>  setMenu('tv')} className={`py-2 px-3 flex items-center space-x-3 rtl:space-x-reverse ${menu === 'tv'? 'text-red-600' :'text-gray-200'} bg-none rounded-sm md:bg-transparent  md:p-0`}  >
          <span className="icon00">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="currentColor"><path d="M320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"/></svg>
        </span>
          <span className="self-center text-lg md:text-md  font-semibold whitespace-nowrap ">TV Shows</span>
        </button>
        </li>
        <li>
          <button value={'search'} onClick={() =>  setMenu('search')} className={`py-2 px-3 flex items-center space-x-3 rtl:space-x-reverse ${menu === 'search'? 'text-red-600' :'text-gray-200'} bg-none rounded-sm md:bg-transparent  md:p-0`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
      <span className="self-center text-lg md:text-md  font-semibold whitespace-nowrap ">Search</span>
        </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;