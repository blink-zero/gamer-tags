import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, Trash2, Moon, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import BusinessCard from './components/BusinessCard';
import TagInput from './components/TagInput';

const PLATFORMS = ['steam', 'xbox', 'playstation', 'nintendo', 'twitch', 'discord'];

function App() {
  const [gamerTags, setGamerTags] = useState(() => {
    const savedTags = localStorage.getItem('gamerTags');
    return savedTags ? JSON.parse(savedTags) : Object.fromEntries(PLATFORMS.map(p => [p, '']));
  });
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('gamerTags', JSON.stringify(gamerTags));
  }, [gamerTags]);

  const handleInputChange = (platform: string, value: string) => {
    setGamerTags(prev => ({ ...prev, [platform]: value }));
  };

  const getShareText = () => {
    return `Check out my gaming profiles!\n${Object.entries(gamerTags)
      .filter(([, tag]) => tag)
      .map(([platform, tag]) => `${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${tag}`)
      .join('\n')}`;
  };

  const handleCopy = async () => {
    const shareText = getShareText();

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Unable to copy. Please manually copy the information to share.');
    }
  };

  const handleShare = async () => {
    const shareText = getShareText();
    const shareData = {
      title: 'My Gaming Profiles',
      text: shareText,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        fallbackShare(shareText);
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      alert('Copied to clipboard! You can now paste and share it.');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert('Oops, unable to copy. Please manually copy the text to share.');
    }
    document.body.removeChild(textarea);
  };

  const handleClear = () => {
    setGamerTags(Object.fromEntries(PLATFORMS.map(p => [p, ''])));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'} flex flex-col items-center justify-center p-4 transition-colors duration-500`}>
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Gamer Tags
          </h1>
          <p className="text-lg opacity-80">Create and share your gaming profile</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column: Input fields */}
          <div className="flex-1 space-y-4">
            {PLATFORMS.map(platform => (
              <TagInput
                key={platform}
                platform={platform}
                value={gamerTags[platform]}
                onChange={(value) => handleInputChange(platform, value)}
                theme={theme}
              />
            ))}
          </div>

          {/* Right column: Business card */}
          <div className="flex-1">
            <BusinessCard gamerTags={gamerTags} theme={theme} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-purple-700"
            onClick={handleCopy}
          >
            {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-blue-700"
            onClick={handleShare}
          >
            <Share2 className="mr-2" />
            Share
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-red-700"
            onClick={handleClear}
          >
            <Trash2 className="mr-2" />
            Clear All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-600 text-white rounded-full font-semibold flex items-center justify-center transition-colors hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default App;