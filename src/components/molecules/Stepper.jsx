import React from "react";

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center justify-between mb-16">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex relative flex-col items-center justify-center">
            <div
              className={
                `w-12 h-12 rounded-full flex items-center justify-center text-sm font-normal text-white transition-colors z-10 relative
                ${index === activeStep ? "bg-primary" : "bg-grey"}`}
            >
              {index + 1}
            </div>
            <span
              className={
                `absolute top-12 sm:top-14 w-24 text-center text-[10px] sm:text-sm font-medium transition-colors ${index === activeStep ? "text-primary" : "text-gray-500"}`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className="w-8 sm:w-16 border-t-2 border-dashed border-grey mx-1 sm:mx-2"
            />
          )}

          {/* {index < steps.length - 1 && (
            <div className="w-10 sm:w-16 border-t-[1.5px] border-dashed border-gray-400 mx-1 md:mx-3 hidden sm:block" />
          )} */}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;