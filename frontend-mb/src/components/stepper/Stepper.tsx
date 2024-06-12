import stepperBackImg from '../../assets/stepperBack.svg'

interface StepperProps {
  steps: Array<any>;
  currentStep: number;
  onBackClick: () => void;
}

const Stepper = ({ steps, currentStep, onBackClick}: StepperProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <button onClick={onBackClick} className={`flex items-center mr-4 ${currentStep == 1 ? "hidden" : ""}`}>
        <img src={stepperBackImg} alt="stepper img" />
      </button>
      {steps.map((step, index) => (
        <div key={index + step} className="flex items-center">
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
