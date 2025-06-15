


import { Circles } from 'react-loader-spinner';

function Loddinge() {
   return (
      <div className="flex justify-center items-center min-h-screen">
         <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
         />
      </div>
   );
}

export default Loddinge;
