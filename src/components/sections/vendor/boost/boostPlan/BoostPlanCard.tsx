import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { type Plan } from "./boostPlanData";

const getBgClasses = (colorScheme: Plan["colorScheme"]) => {
  switch (colorScheme) {
    case "orange":
      return "bg-orange-50 border border-orange-200";
    case "gray":
      return "bg-gray-100 border-2 border-gray-300";
    case "yellow":
      return "bg-yellow-50 border border-yellow-300";
  }
};

const getMedalGradient = (colorScheme: Plan["colorScheme"]) => {
  switch (colorScheme) {
    case "orange":
      return "from-amber-600 to-amber-300";
    case "gray":
      return "from-gray-400 to-gray-200";
    case "yellow":
      return "from-yellow-500 to-yellow-300";
  }
};

const getRadioBorder = (colorScheme: Plan["colorScheme"]) => {
  return colorScheme === "yellow" ? "border-yellow-600" : "border-gray-700";
};

const getRadioAccent = (colorScheme: Plan["colorScheme"]) => {
  return colorScheme === "yellow" ? "accent-yellow-600" : "accent-gray-800";
};

const getButtonClasses = (colorScheme: Plan["colorScheme"]) => {
  switch (colorScheme) {
    case "orange":
      return "bg-red-500 hover:bg-red-600";
    case "gray":
      return "bg-gray-800 hover:bg-gray-900";
    case "yellow":
      return "bg-yellow-700 hover:bg-yellow-800";
  }
};

const getSlotText = (slotStatus: Plan["slotStatus"]) => {
  return slotStatus === "available"
    ? "Slots available in this LGA"
    : "Slot currently occupied";
};

const getSlotColor = (slotStatus: Plan["slotStatus"]) => {
  return slotStatus === "available" ? "text-green-600" : "text-red-500";
};

const getSlotDotColor = (slotStatus: Plan["slotStatus"]) => {
  return slotStatus === "available" ? "bg-green-500" : "bg-red-500";
};

export function BoostPlanCard({ plan }: { plan: Plan }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(
    plan.pricingOptions.length - 1,
  );

  return (
    <div
      className={`flex-1 flex flex-col rounded-2xl p-6 relative ${getBgClasses(plan.colorScheme)} ${plan.highlighted ? "mt-5 md:mt-0" : ""}`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-red-500 text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            {plan.badge}
          </span>
        </div>
      )}
      <div className={`flex flex-col flex-1 ${plan.highlighted ? "pt-8" : ""}`}>
        <div className="flex flex-col items-center mb-5 scale-90">
          {" "}
          <div className="relative flex items-center w-20 h-24 rounded-lg overflow-hidden">
            <div className="absolute w-14 h-6 bg-[#4A90E2] transform rotate-45 -translate-x-0 translate-y-3 rounded-sm"></div>
            <div className="absolute w-14 h-6 bg-[#357ABD] transform -rotate-45 translate-x-6 translate-y-3 rounded-sm"></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${getMedalGradient(plan.colorScheme)} flex items-center justify-center text-white font-bold text-sm -mt-4 z-20 shadow-md`}
          >
            {plan.medal}
          </div>
        </div>
        <h2 className="text-center text-xl font-extrabold text-gray-900 mb-1">
          {plan.title}
        </h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          {plan.subtitle}
        </p>
        {/* Pricing Options */}
        <div className="flex flex-col gap-2 mb-4">
          {plan.pricingOptions.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-2.5 cursor-pointer transition-colors ${
                selectedOption === index
                  ? `${getRadioBorder(plan.colorScheme)} bg-gray-50`
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name={plan.id}
                className={`${getRadioAccent(plan.colorScheme)} w-4 h-4 shrink-0`}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              <span className="text-sm font-semibold text-gray-800">
                {option.duration} –{" "}
                <span className="font-extrabold">{option.price}</span>
              </span>
            </label>
          ))}
        </div>
        {/* Slot Status */}
        <p
          className={`flex items-center gap-2 font-semibold text-sm mb-4 ${getSlotColor(plan.slotStatus)}`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block ${getSlotDotColor(plan.slotStatus)}`}
          />
          {getSlotText(plan.slotStatus)}
        </p>
        {/* Features */}
        <ul className="flex-1 flex flex-col gap-2 mb-6 text-sm text-gray-700">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature.checked ? (
                <span className="text-green-500 font-bold">✓</span>
              ) : plan.id === "gold" && index === plan.features.length - 1 ? (
                <span className="text-yellow-500">★</span>
              ) : (
                <span className="text-gray-400 font-bold">✕</span>
              )}
              <span
                className={
                  plan.id === "gold" && index === plan.features.length - 1
                    ? "text-blue-600 font-semibold"
                    : feature.checked
                      ? ""
                      : "text-gray-400"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/vendor/review-pay")}
          className={`w-full ${getButtonClasses(plan.colorScheme)} active:scale-[0.98] transition-all text-white font-bold text-sm py-3.5 rounded-xl`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}
