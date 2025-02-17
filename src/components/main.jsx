import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Assuming you have a Supabase client set up

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [isSeller, setIsSeller] = useState(false); // Check if the user is a seller

  // Check if user is logged in and is a seller
  useEffect(() => {
    const user = supabase.auth.user(); // Assuming Supabase authentication is set up

    if (user) {
      // Assuming you have a way to check if the user is a seller, for example a 'role' or 'userType' property
      setIsSeller(true);
      fetchProducts(); // Fetch products when a seller is logged in
    }
  }, []);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("pets").select("*");
    if (error) console.error(error);
    else setProducts(data);
  };

  // Handle form submission to add a new pet
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, type, description } = petData;
    if (name && type && description) {
      // Insert new pet data into Supabase
      const { data, error } = await supabase
        .from("pets")
        .insert([{ name, type, description }]);
      if (error) {
        console.error(error);
      } else {
        // Update products list after adding a new pet
        setProducts([...products, data[0]]);
        setShowForm(false); // Hide form after submission
      }
    }
  };

  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                New Season Arrivals
              </h5>
              <p className="card-text fs-5 d-none d-sm-block">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Display products or "Add Product" button */}
      {isSeller && products.length === 0 && !showForm ? (
        <div className="text-center mt-5">
          <p>No products available</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add Product
          </button>
        </div>
      ) : (
        <div className="product-list mt-5">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <h5>{product.name}</h5>
              <p>{product.type}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Show form to add product */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="petName" className="form-label">
              Pet Name:
            </label>
            <input
              type="text"
              id="petName"
              className="form-control"
              value={petData.name}
              onChange={(e) => setPetData({ ...petData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="petType" className="form-label">
              Type:
            </label>
            <input
              type="text"
              id="petType"
              className="form-control"
              value={petData.type}
              onChange={(e) => setPetData({ ...petData, type: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="petDescription" className="form-label">
              Description:
            </label>
            <textarea
              id="petDescription"
              className="form-control"
              value={petData.description}
              onChange={(e) =>
                setPetData({ ...petData, description: e.target.value })
              }
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default Home;
