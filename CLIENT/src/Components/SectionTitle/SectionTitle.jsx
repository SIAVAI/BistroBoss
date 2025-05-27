const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="text-center mt-20 mb-10">
      <p className="text-yellow-500 italic mb-2 text-sm md:text-base">
        ---{subheading}---
      </p>
      <h2 className="text-3xl md:text-4xl font-bold uppercase border-y-2 inline-block py-2 px-6">
        {heading}
      </h2>
    </div>
  );
};

export default SectionTitle;
