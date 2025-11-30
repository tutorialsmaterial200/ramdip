import { CheckCircle, TrendingUp } from "lucide-react";

const achievements = [
  {
    title: "Federal Republic Established",
    description: "Led the historic transformation of Nepal from a monarchy to a Federal Democratic Republic, giving power to the people.",
    impact: "30 Million+ Nepalis",
    status: "Historic",
    year: "2008",
  },
  {
    title: "New Constitution of Nepal",
    description: "Played key role in drafting and promulgating Nepal's constitution establishing federal democratic governance.",
    impact: "National Milestone",
    status: "Historic",
    year: "2015",
  },
  {
    title: "Land Reform Initiatives",
    description: "Implemented land reform programs benefiting landless farmers and ensuring fair distribution of agricultural resources.",
    impact: "50,000+ families",
    status: "Ongoing",
    year: "2020",
  },
  {
    title: "Education Access Program",
    description: "Established schools and scholarship programs in rural areas ensuring education reaches every child.",
    impact: "100,000+ students",
    status: "Ongoing",
    year: "2021",
  },
  {
    title: "Healthcare Outreach",
    description: "Mobile health camps and rural health centers providing medical services to underserved communities.",
    impact: "200,000+ treated",
    status: "Ongoing",
    year: "2022",
  },
  {
    title: "Women Empowerment",
    description: "Programs supporting women's rights, political participation, and economic independence across Nepal.",
    impact: "75,000+ women",
    status: "Ongoing",
    year: "2023",
  },
];

const stats = [
  { value: "30M+", label: "Lives Transformed" },
  { value: "77", label: "Districts Reached" },
  { value: "7", label: "Provinces United" },
  { value: "100%", label: "Commitment" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            उपलब्धिहरू
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Achievements &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Impact
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From historic political transformation to grassroots development, 
            our work speaks through the lives we have touched and changed.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-2xl text-center text-white"
            >
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-red-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-red-200 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {achievement.year}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    achievement.status === "Historic"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {achievement.status}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {achievement.description}
              </p>

              {/* Impact */}
              <div className="flex items-center gap-2 text-red-600 font-medium">
                <TrendingUp size={18} />
                <span>{achievement.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 mb-6">
            <CheckCircle className="text-green-600" size={20} />
            <span>Verified achievements in service of the people</span>
          </div>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-xl shadow-red-500/25"
            >
              Join the Movement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
