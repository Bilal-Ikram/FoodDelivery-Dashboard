import React from 'react'

export default function SignupPage(){
  return (
    <>
        <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div className="fixed inset-0 w-full h-full">
        {/* Background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: "url('/images/new_bg.jpg')"
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Main content container */}
      <div className="relative min-h-screen flex flex-col ">
        {/* Header with logo */}
        <header className=" bg-white z-10 p-5 ">
          <img 
            src="/images/logo-foodpanda.png" 
            alt="Foodpanda" 
            className="h-[42px] pl-4"
          />
        </header>

        {/* Scrollable form section */}
        <main className="flex-1 overflow-auto px-4 py-6 mt-32 ml-32">
          <div className="max-w-xl  bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-center mb-6">
              Interested? Fill out the form below to register your business on foodpanda, and start partnering with us today!
            </h2>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">
                    Restaurant or store name*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    Business Type*
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  >
                    <option value="">--No--</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    First name*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    Last name*
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    Upload Menu
                  </label>
                  <input
                    type="file"
                    className="mt-1 block w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload the menu according to the prices currently being sold at your store. You can use files such as pdf, excel, word, jpg.
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">
                    Restaurant or store address
                  </label>
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                SUBMIT FORM
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative bg-gray-900 text-white p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <img 
                src="/your-logo.png" 
                alt="Foodpanda" 
                className="h-6"
              />
            </div>
            <div>
              <span>Social</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}