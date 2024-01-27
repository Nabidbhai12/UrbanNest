import { useLocation } from "react-router-dom";
const SearchResults = () => {
  const location = useLocation(); // Access location
  const listings = location.state?.listings; // Access listings from state

  // Handle case where listings are not found or an empty array
  if (!listings || listings.length === 0) {
    return (
      <div className="search-results bg-yellow-50 flex flex-col items-center justify-center mx-auto w-full py-[50px]">
        <h2 className="text-2xl font-bold mb-4">No Listings Found</h2>
        <p>Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="search-results bg-yellow-50 flex flex-col items-center justify-start mx-auto w-full py-[50px]">
      <div className="bg-gradient-to-br from-white-A700 to-yellow-50 flex flex-col items-center justify-start px-[120px] py-[50px] w-3/4 h-auto overflow-hidden rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="listings-container space-y-4">
          {listings.map((listing) => (
            <div key={listing._id} className="listing bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{listing.title}</h3>
              <p>{listing.description}</p>
              <div className="images-container flex space-x-2 my-2">
                {listing.images && listing.images.map((image) => (
                  <img key={image._id} src={image.url} alt={image.caption} className="w-20 h-20 object-cover rounded-md" />
                ))}
              </div>
              <div className="details text-sm">
                {/* Check if price and currency exist before accessing them */}
                <p>Price: {listing.price?.currency} {listing.price?.amount}</p>
                {/* Check if location and its properties exist before accessing them */}
                <p>Location: {listing.location?.address}, {listing.location?.city}, {listing.location?.state}, {listing.location?.zipCode}</p>
                <p>Property Type: {listing.propertyType}</p>
                <p>Status: {listing.propertyStatus}</p>
                {/* Check if size exists before accessing it */}
                <p>Size: {listing.size} sqft</p>
                {/* Check if rooms and its properties exist before accessing them */}
                <p>Rooms: Bedrooms: {listing.rooms?.bedrooms}, Bathrooms: {listing.rooms?.bathrooms}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
