import { CheckBadgeIcon, CurrencyDollarIcon, ClipboardDocumentCheckIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const features = [
   {
      title: "বিভিন্ন ধরণের গাড়ি",
      description: "বাজেট ফ্রেন্ডলি থেকে বিলাসবহুল পর্যন্ত গাড়ির বিশাল সংগ্রহ।",
      icon: CheckBadgeIcon,
   },
   {
      title: "সাশ্রয়ী মূল্য",
      description: "প্রতিদিনের জন্য প্রতিযোগিতামূলক রেট আপনি নির্ভর করতে পারেন।",
      icon: CurrencyDollarIcon,
   },
   {
      title: "সহজ বুকিং প্রক্রিয়া",
      description: "মাত্র কয়েক ক্লিকে গাড়ি বুক করুন সহজেই।",
      icon: ClipboardDocumentCheckIcon,
   },
   {
      title: "২৪/৭ সাপোর্ট",
      description: "যেকোনো প্রশ্ন বা সমস্যা সমাধানে সর্বক্ষণিক সহায়তা।",
      icon: ChatBubbleBottomCenterTextIcon,
   },
];

const WhyChooseUs = () => {
   return (
      <section className="py-28 bg-gray-50 dark:bg-gray-900">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
               আমাদের কেন বেছে নিবেন?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {features.map((feature, index) => (
                  <div
                     key={index}
                     className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                  >
                     <feature.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                     <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                        {feature.title}
                     </h3>
                     <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default WhyChooseUs;

