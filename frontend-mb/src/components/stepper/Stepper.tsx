import React from 'react';

interface StepperProps {
  steps: Array<any>;
  currentStep: number;
  onBackClick: () => void;
}

const Stepper = ({ steps, currentStep, onBackClick}: StepperProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <button onClick={onBackClick} className={`flex items-center mr-4 ${currentStep == 1 ? "hidden" : ""}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.2375 21.4875C16.0125 21.4875 15.7875 21.4125 15.6375 21.225L7.16255 12.6C6.82505 12.2625 6.82505 11.7375 7.16255 11.4L15.6375 2.775C15.975 2.4375 16.5 2.4375 16.8375 2.775C17.175 3.1125 17.175 3.6375 16.8375 3.975L8.96255 12L16.875 20.025C17.2125 20.3625 17.2125 20.8875 16.875 21.225C16.65 21.375 16.4625 21.4875 16.2375 21.4875Z" fill="#EF4623"/>
        </svg>
      </button>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
              currentStep === index + 1 ? 'bg-[#EF4623] border-[#EF4623] text-white' : 'bg-white border-[#EF4623] text-[#EF4623]'
            }`}
          >
            {index + 1}
          </div>
          {index !== steps.length - 1 && (
            <div className="flex-grow h-0.5 bg-[#EF4623] mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
