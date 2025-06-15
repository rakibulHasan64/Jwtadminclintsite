

const Footer = () => {
   return (
      <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
         <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
               <img src="/logo.png" alt="Logo" className="w-6 h-6" />
               <span>© {new Date().getFullYear()} CarRental</span>
            </div>
            <div className="space-x-4">
               <a href="#">Facebook</a>
               <a href="#">Twitter</a>
               <a href="#">Instagram</a>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
