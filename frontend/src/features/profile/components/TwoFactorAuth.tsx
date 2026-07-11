import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export const TwoFactorAuth = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-blue-400" />
        Two-Factor Authentication
      </h3>
      <ToggleSwitch
        enabled={twoFactor}
        onChange={setTwoFactor}
        label="Enable Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      />
    </motion.div>
  );
};

export default TwoFactorAuth;
