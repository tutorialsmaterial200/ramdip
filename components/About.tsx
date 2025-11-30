import { Award, BookOpen, Heart, Users } from "lucide-react";

const highlights = [
	{
		icon: BookOpen,
		title: "Ideology",
		description: "Committed to Marxism-Leninism-Maoism principles",
	},
	{
		icon: Users,
		title: "Experience",
		description: "Decades of service to the people of Nepal",
	},
	{
		icon: Award,
		title: "Recognition",
		description: "Led historic transformation of Nepal",
	},
	{
		icon: Heart,
		title: "Dedication",
		description: "जनता सर्वोपरि - People First Always",
	},
];

const timeline = [
	{
		year: "1994",
		title: "Party Foundation",
		description:
			"CPN (Maoist Center) established with vision for social transformation",
	},
	{
		year: "2006",
		title: "Peace Agreement",
		description: "Historic Comprehensive Peace Accord signed, ending armed conflict",
	},
	{
		year: "2008",
		title: "Federal Republic",
		description: "Nepal declared a Federal Democratic Republic, ending monarchy",
	},
	{
		year: "2015",
		title: "New Constitution",
		description: "New constitution promulgated establishing federal democratic system",
	},
];

export default function About() {
	return (
		<section id="about" className="py-20 lg:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
						हाम्रो बारेमा
					</span>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						A Party Born from the{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
							People
						</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Nepali Communist Party (Maoist Center) has been at the forefront of
						Nepal's transformation, fighting for social justice, equality, and the
						rights of all citizens.
					</p>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
					{/* Image Side */}
					<div className="relative">
						<div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
							<img
								src="/images/profiles.jpg"
								alt="CPN Maoist Center Leader"
								className="w-full aspect-[4/5] object-cover object-top"
							/>
						</div>

						{/* Decorative Elements */}
						<div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-red-600 to-red-800 rounded-3xl" />

						{/* Experience Badge */}
						<div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-2xl shadow-xl">
							<div className="text-4xl font-bold text-red-600">30+</div>
							<div className="text-gray-600">Years of Struggle</div>
						</div>
					</div>

					{/* Content Side */}
					<div>
						<h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
							जनताको पार्टी, जनताको सेवामा
						</h3>
						<p className="text-gray-600 mb-6 leading-relaxed">
							The नेपाली कम्युनिष्ट पार्टी(माओवादी केन्द्र)emerged from the
							struggle for social justice and equality. Our journey has been
							defined by an unwavering commitment to the people of Nepal,
							especially the marginalized and oppressed.
						</p>
						<p className="text-gray-600 mb-8 leading-relaxed">
							From leading the historic transformation that ended centuries of
							monarchy to establishing Nepal as a federal democratic republic, we
							have been at the forefront of progressive change. Our vision
							continues to guide us toward building a prosperous, just, and
							equitable Nepal.
						</p>

						{/* Highlights Grid */}
						<div className="grid grid-cols-2 gap-4">
							{highlights.map((item, index) => (
								<div
									key={index}
									className="p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors duration-200"
								>
									<div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
										<item.icon className="w-5 h-5 text-red-600" />
									</div>
									<h4 className="font-semibold text-gray-900 mb-1">
										{item.title}
									</h4>
									<p className="text-sm text-gray-500">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Timeline */}
				<div className="mt-20">
					<h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
						ऐतिहासिक यात्रा | Historic Journey
					</h3>
					<div className="relative">
						{/* Timeline Line */}
						<div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 to-red-800 hidden md:block" />

						<div className="space-y-8 md:space-y-0">
							{timeline.map((item, index) => (
								<div
									key={index}
									className={`relative md:grid md:grid-cols-2 md:gap-8 ${
										index % 2 === 0 ? "" : "md:direction-rtl"
									}`}
								>
									<div
										className={`md:text-right ${
											index % 2 === 0 ? "" : "md:order-2 md:text-left"
										}`}
									>
										<div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-200">
											<span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">
												{item.year}
											</span>
											<h4 className="text-xl font-bold text-gray-900 mb-2">
												{item.title}
											</h4>
											<p className="text-gray-600">
												{item.description}
											</p>
										</div>
									</div>

									{/* Timeline Dot */}
									<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow hidden md:block" />

									<div className={index % 2 === 0 ? "" : "md:order-1"} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
