import React from "react";
import { useState } from "react";

// Components
import PlanningStep from "../components/PlanningStep";
import SelectDate from "../components/SelectDate";
import SelectPlace from "../components/SelectPlace";
import SelectHotel from "../components/SelectHotel";

const PlanningPage = () => {
  // 1: step1 2: step2 3: step3
  const [step, setStep] = useState(1);

  function setStepHandler(num) {
    setStep(num);
  }

  let stepBox;
  if (step === 1) {
    stepBox = <SelectDate />;
  } else if (step === 2) {
    stepBox = <SelectPlace />;
  } else if (step === 3) {
    stepBox = <SelectHotel />;
  }

  console.log(step);
  return (
    <main className="flex">
      <PlanningStep onStep={setStepHandler} />
      {stepBox}
    </main>
  );
};

export default PlanningPage;
