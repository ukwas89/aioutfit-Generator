import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const CustomCaptcha: React.FC<CustomCaptchaProps> = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const generateCaptcha = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCaptchaCode(code);
    if (canvasRef) {
      const ctx = canvasRef.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#374151';
        
        // Add noise
        for (let i = 0; i < 50; i++) {
          ctx.fillStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          ctx.fillRect(
            Math.random() * canvasRef.width,
            Math.random() * canvasRef.height,
            2,
            2
          );
        }

        // Add lines
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          ctx.moveTo(Math.random() * canvasRef.width, Math.random() * canvasRef.height);
          ctx.lineTo(Math.random() * canvasRef.width, Math.random() * canvasRef.height);
          ctx.stroke();
        }

        // Draw the code
        ctx.fillStyle = '#374151';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        for (let i = 0; i < code.length; i++) {
          const rotation = (Math.random() - 0.5) * 0.4;
          ctx.save();
          ctx.translate(20 + i * 30, canvasRef.height / 2);
          ctx.rotate(rotation);
          ctx.fillText(code[i], 0, 0);
          ctx.restore();
        }
      }
    }
  };

  useEffect(() => {
    if (canvasRef) {
      generateCaptcha();
    }
  }, [canvasRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    if (value.length === 6) {
      onVerify(value === captchaCode);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <canvas
          ref={setCanvasRef}
          width="200"
          height="60"
          className="border border-gray-200 rounded-md"
        />
        <button
          onClick={generateCaptcha}
          className="text-sm text-primary hover:text-primary/80"
          type="button"
        >
          Refresh CAPTCHA
        </button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="captcha">Enter the 6-digit code</Label>
        <Input
          id="captcha"
          type="text"
          maxLength={6}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter code"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CustomCaptcha;