
export default function MenuMain() {
  return (
    <>
      <div className="w-full bg-white border border-gray-200 mt-10 py-2">
      <div className="max-w-7xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Main Menu</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center">
            Add New
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
            </button>
          </div>
         {/* Add new content here */}
      </div>
    </div>
    </>
  )
}
