
import { Link } from 'react-router-dom';

function ErrorPage() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
         <img
            src="https://i.ibb.co/JFqSR3PG/images-q-tbn-ANd9-Gc-Sf3z-Dwawvi6-EHqq-E96-Kz2e-Dy-RNt-MG-go-62-Zd-Wi-Bzy4-OPyg-PWs-Whp-2-Jkyf-Sv-Zx.png"
            alt="404 Not Found"
            className="w-96 mb-6"
         />
         <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page not found.</h1>
         <p className="text-gray-600 mb-6 text-center">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
         </p>
         <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
         >
            🔙 Back to Home
         </Link>
      </div>
   );
}

export default ErrorPage;
