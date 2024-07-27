import { useState, useContext } from "react"; 
import { StepperContext } from "./components/contexts/StepperContext";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Account from "./components/steps/Accounts";
import Details from "./components/steps/Details";
import Payment from "./components/steps/Payment";
import Final from "./components/steps/Final";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);

  const steps = ["Account Information", "Personal Details", "Payment", "confirm"];

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final /> ; 
      default:    
    }
  };
   
  const handleClick = (direction) => {
    let newStep = currentStep;
    if (direction === "next") {
      if (currentStep === 1) {
        const accountForm = document.getElementById('accountForm');
        accountForm.requestSubmit();
      } else if (currentStep === 2) {
        const detailsForm = document.getElementById('detailsForm');
        detailsForm.requestSubmit();
      }
      else if (currentStep === 3) {
        const paymentForm = document.getElementById('paymentForm');
        paymentForm.requestSubmit();
      }
      
    } else {
      newStep--;
      newStep > 0 && setCurrentStep(newStep);
    }
  };

  const handleNextStep = () => {
    let newStep = currentStep;
    newStep++;
    newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="md: w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <Stepper 
          steps={steps}
          currentStep={currentStep}
        />
        {/* Display Components */}
        <div className="my-10 p-10">
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData,
            handleNextStep
          }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
}

export default App;

