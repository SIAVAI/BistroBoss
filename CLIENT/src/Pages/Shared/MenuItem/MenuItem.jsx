const MenuItem = ({ items }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div key={item._id} className="flex items-start gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-l-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 font-semibold uppercase text-sm md:text-base">
                  {item.name}
                </h3>
                <span className="text-yellow-500 font-semibold text-sm md:text-base">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{item.recipe}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="btn btn-ghost text-black text-sm font-semibold uppercase border-t-0 border-x-0 border-b-2 border-gray-800 hover:text-yellow-500 transition">
          View Full Menu
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
