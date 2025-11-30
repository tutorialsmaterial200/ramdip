import { 
  GraduationCap, 
  Heart, 
  Building2, 
  Leaf, 
  Users, 
  Scale,
  ArrowRight
} from "lucide-react";

const visionItems = [
  {
    icon: Scale,
    title: "Social Justice",
    description: "Ensuring equal rights and opportunities for all citizens regardless of caste, gender, or economic background.",
    color: "red",
  },
  {
    icon: GraduationCap,
    title: "Free Education",
    description: "Quality education accessible to every child. Building schools and providing scholarships for underprivileged students.",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Healthcare for All",
    description: "Universal healthcare system ensuring affordable medical services reach every village and community.",
    color: "green",
  },
  {
    icon: Building2,
    title: "Land Reform",
    description: "Fair distribution of land and resources to farmers and landless citizens for agricultural prosperity.",
    color: "orange",
  },
  {
    icon: Users,
    title: "Workers' Rights",
    description: "Protecting labor rights, fair wages, and safe working conditions for all workers across Nepal.",
    color: "purple",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    description: "Balancing economic growth with environmental protection for future generations of Nepal.",
    color: "teal",
  },
];

const colorClasses = {
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    hover: "hover:border-red-400",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    hover: "hover:border-blue-400",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    hover: "hover:border-orange-400",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    hover: "hover:border-green-400",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    hover: "hover:border-purple-400",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    hover: "hover:border-teal-400",
  },
};

export default function Vision() {
  return (
    <section id="vision" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
            हाम्रो दृष्टिकोण
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Vision for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              New Nepal
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Building a socialist society where prosperity is shared, justice prevails, 
            and every Nepali citizen lives with dignity and equal opportunity.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visionItems.map((item, index) => {
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className={`group p-6 lg:p-8 bg-white rounded-2xl border-2 ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 ${colors.text} font-medium group-hover:gap-3 transition-all duration-200`}
                >
                  Learn More
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Quote Section */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 lg:p-12 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              <div className="text-6xl mb-6">✊</div>
              <blockquote className="text-xl lg:text-2xl text-white font-medium mb-6 max-w-4xl mx-auto">
                "जनताको शक्ति नै वास्तविक शक्ति हो। हामी एकताबद्ध भएर समृद्ध र न्यायपूर्ण नेपाल निर्माण गर्नेछौं।"
              </blockquote>
              <p className="text-white/80 text-lg mb-4">
                "The power of the people is the true power. United, we shall build a prosperous and just Nepal."
              </p>
              <div className="text-red-200">
                <div className="font-semibold text-white">CPN (Maoist Center)</div>
                <div>नेकपा (माओवादी केन्द्र)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
