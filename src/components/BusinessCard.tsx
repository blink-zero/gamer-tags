import React from 'react';
import { motion } from 'framer-motion';
import { SiSteam, SiXbox, SiPlaystation, SiNintendoswitch, SiTwitch, SiDiscord } from 'react-icons/si';

interface GamerTags {
  steam: string;
  xbox: string;
  playstation: string;
  nintendo: string;
  twitch: string;
  discord: string;
}

interface BusinessCardProps {
  gamerTags: GamerTags;
  theme: string;
}

const platformIcons = {
  steam: SiSteam,
  xbox: SiXbox,
  playstation: SiPlaystation,
  nintendo: SiNintendoswitch,
  twitch: SiTwitch,
  discord: SiDiscord,
};

const platformColors = {
  steam: 'from-gray-600 to-blue-500',
  xbox: 'from-green-600 to-green-400',
  playstation: 'from-blue-600 to-blue-400',
  nintendo: 'from-red-600 to-red-400',
  twitch: 'from-purple-600 to-purple-400',
  discord: 'from-indigo-600 to-indigo-400',
};

const BusinessCard: React.FC<BusinessCardProps> = ({ gamerTags, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-white'
      } p-6 rounded-2xl shadow-2xl w-full max-w-md text-white border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
      } relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Gamer Profile
        </h2>
        <div className="space-y-4">
          {Object.entries(gamerTags).map(([platform, tag]) => {
            if (!tag) return null;
            const Icon = platformIcons[platform as keyof typeof platformIcons];
            const color = platformColors[platform as keyof typeof platformColors];
            return (
              <motion.div
                key={platform}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center bg-gradient-to-r ${color} p-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <Icon className="mr-3" size={24} />
                <span className="capitalize font-medium">{platform}:</span>
                <span className="ml-2 font-bold">{tag}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;