"use client";

import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    category: "Events",
    title: "National Convention 2024",
    description: "Party's national gathering with leaders and cadres from across Nepal",
  },
  {
    id: 2,
    category: "Development",
    title: "Infrastructure Inauguration",
    description: "Opening of new development projects in rural areas",
  },
  {
    id: 3,
    category: "Social",
    title: "Health Camp",
    description: "Free medical checkup camp for rural communities",
  },
  {
    id: 4,
    category: "Events",
    title: "Youth Conference",
    description: "Young leaders gathering to shape Nepal's future",
  },
  {
    id: 5,
    category: "Development",
    title: "School Inauguration",
    description: "New school building in remote village",
  },
  {
    id: 6,
    category: "Social",
    title: "Women's Assembly",
    description: "Women leaders discussing empowerment initiatives",
  },
];

const categories = ["All", "Events", "Development", "Social"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
            ग्यालरी
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Moments of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Unity
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Capturing our journey with the people — from conventions and rallies
            to community service and development initiatives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <div className="text-center text-red-400">
                  <div className="text-6xl mb-2">📸</div>
                  <p className="text-sm font-medium text-red-500">
                    {image.category}
                  </p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-red-600/80 backdrop-blur-sm rounded-full text-sm mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </div>

              {/* Info Card (Mobile) */}
              <div className="p-4 md:hidden">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm mb-2">
                  {image.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-red-300 hover:text-red-600 transition-all duration-200">
            View All Photos
          </button>
        </div>
      </div>
    </section>
  );
}
