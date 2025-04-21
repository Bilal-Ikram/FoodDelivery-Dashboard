import { BarChart, Volume2, Settings } from 'lucide-react';
import Logo from '../components/Logo/Logo';
import RestaurantIllustration from '../components/RestaurantIllustration/RestaurantIllustration';
import FeatureItem from '../components/FeatureItem/FeatureItem';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = () => {
  const features = [
    {
      icon: BarChart,
      text: (
        <>
          <span className="block">Track performance and get</span>
          <span className="block">invaluable insights to improve</span>
          <span className="block">customer loyalty and sales.</span>
        </>
      )
    },
    {
      icon: Volume2,
      text:  (
        <>
          <span className="block">Offer discounts and launch ad</span>
          <span className="block">campaigns to attract new</span>
          <span className="block">customers.</span>
        </>
      )
    },
    {
      icon: Settings,
      text:  (
        <>
          <span className="block">Manage your menu and opening</span>
          <span className="block">times more easily, so they are always</span>
          <span className="block">up to date.</span>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 bg-[#f9f9f9] m-5 rounded-3xl md:flex justify-center items-center flex-col flex-1 overflow-hidden  hidden ">
        <div className="mb-8">
          <RestaurantIllustration />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Transform your business<br />with Panda Partner
        </h1>

        <div className="space-y-6 hidden md:block">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              text={feature.text}
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
        <div className="mb-12">
          <Logo />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Log in with your email
          </h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;