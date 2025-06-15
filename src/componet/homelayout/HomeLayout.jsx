import AvlavileCars from "../home/AvlavileCars";
import Banner from "../home/Banner";
import SpecialOffers from "../home/SpecialOffers";
import TastyMonile from "../home/TastyMonile";
import WhyChooseUs from "../home/WhyChooseUs";


function HomeLayout() {
   return (
      <>
         
         <Banner />
         <WhyChooseUs />
         <AvlavileCars />

         <SpecialOffers />

         <TastyMonile />
         
      </>
   );
}

export default HomeLayout;