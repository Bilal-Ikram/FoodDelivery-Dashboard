
const FeatureItem = ({ icon: Icon, text }) => {
  return (
    <div className="hidden sm:hidden md:flex items-start space-x-4">
      <Icon className="w-6 h-6 text-pink-500 mt-1" />
      <p className="text-[rgb(107,107,107)] text-sm font-figtree font-medium max-w-[232px]">{text}</p>
    </div>
  );
};

export default FeatureItem;