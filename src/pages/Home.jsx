import React from "react";
import hero from "../assets/hero-sec.png";
import {
  UserPlus,
  ListChecks,
  Vote,
  BarChart3,
  ShieldCheck,
  Lock,
  UserCheck,
  Smartphone,
  Eye,
  Globe,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <UserPlus className="w-10 h-10 text-blue-600" />,
      title: "Register / Login",
      desc: "Create an account or log in securely to start voting.",
    },
    {
      icon: <ListChecks className="w-10 h-10 text-green-600" />,
      title: "Choose Election",
      desc: "Browse available elections and select the one you want to join.",
    },
    {
      icon: <Vote className="w-10 h-10 text-yellow-600" />,
      title: "Cast Your Vote",
      desc: "Make your choice with a single click, quickly and securely.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-purple-600" />,
      title: "View Results",
      desc: "See real-time election results with full transparency.",
    },
  ];

  const features = [
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "End-to-End Encryption",
      desc: "Every vote is securely encrypted from the moment you cast it until final counting.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Anonymous & Fair Counting",
      desc: "Votes are counted fairly and anonymously to ensure unbiased results.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-purple-600" />,
      title: "Verified Voter ID",
      desc: "Only verified voters can participate, preventing fraud or duplication.",
    },
  ];

  const benefits = [
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Easy to Use",
      desc: "A simple and intuitive interface designed for everyone.",
      color: "bg-blue-500",
    },
    {
      icon: <Eye className="w-8 h-8 text-white" />,
      title: "Transparent Process",
      desc: "Clear and open elections with complete transparency.",
      color: "bg-green-500",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Accessible Anywhere",
      desc: "Vote from any device, anytime, anywhere in the world.",
      color: "bg-purple-500",
    },
    {
      icon: <Activity className="w-8 h-8 text-white" />,
      title: "Real-time Updates",
      desc: "Track live voting results and updates instantly.",
      color: "bg-yellow-500",
    },
  ];

  const testimonials = [
    { name: "Aisha R.", feedback: "Voting was so easy and transparent!" },
    { name: "Omar K.", feedback: "Secure and fast process, highly recommended." },
    { name: "Ali M.", feedback: "I can track my vote safely from anywhere." },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="space-y-6 mb-6 md:ml-4 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 animate-gradient-x">
              Your <span>Voice</span>,<br />
              Your <span>Choice</span>,<br />
              Your <span>Vote</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100">
              Secure and Accessible Online Elections. Cast your vote anytime, anywhere with trust and transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-lg bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 transition"
              >
                Login to Vote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/results")}
                className="px-6 py-3 rounded-lg border border-white font-bold hover:bg-white hover:text-blue-600 transition"
              >
                View Results
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center md:justify-end"
          >
            <img
              src={hero}
              alt="Voting Illustration"
              className="w-[450px] max-w-xs sm:max-w-md drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center py-2">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              🔒 Security & <span className="text-blue-600">Trust</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We prioritize integrity and transparency at every step of the election process. Our platform is built with cutting-edge technology to ensure your vote is secure, anonymous, and verifiable.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="bg-white p-3 rounded-full shadow-md">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-2 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Why Choose <span className="text-blue-600">Our System</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex-1 flex flex-col items-center text-center px-4 mb-12 md:mb-0"
              >
                <div className={`${benefit.color} w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Trusted by Thousands of <span className="text-blue-600">Voters</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-gray-600 mb-4">"{t.feedback}"</p>
                <h4 className="font-bold text-gray-800">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Cast Your Vote?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Join thousands of voters now. Your vote counts!
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 rounded-full bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 transition"
        >
          Login / Register
        </button>
      </section>
    </div>
  );
};

export default Home;
