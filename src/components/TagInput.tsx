import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TagInputProps {
  platform: string;
  value: string;
  onChange: (value: string) => void;
  theme: string;
}

const TagInput: React.FC<TagInputProps> = ({ platform, value, onChange, theme }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6"
    >
      <input
        type="text"
        id={platform}
        name={platform}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 pt-6 rounded-md ${
          theme === 'dark'
            ? 'bg-gray-700 text-white border-gray-600'
            : 'bg-gray-100 text-gray-900 border-gray-300'
        } border-2 placeholder-transparent focus:ring focus:ring-opacity-50 transition duration-300 ${
          isFocused
            ? 'border-purple-500 ring-purple-500'
            : 'focus:border-purple-500 focus:ring-purple-500'
        }`}
        placeholder={platform.charAt(0).toUpperCase() + platform.slice(1) + ' Tag'}
      />
      <motion.label
        htmlFor={platform}
        initial={false}
        animate={{
          top: '0.5rem',
          fontSize: '0.75rem',
          color: isFocused ? '#A855F7' : theme === 'dark' ? '#9CA3AF' : '#6B7280',
        }}
        transition={{ duration: 0.2 }}
        className={`absolute left-4 transition-all pointer-events-none ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {platform.charAt(0).toUpperCase() + platform.slice(1)} Tag
      </motion.label>
    </motion.div>
  );
};

export default TagInput;