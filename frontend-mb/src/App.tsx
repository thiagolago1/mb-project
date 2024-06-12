import './index.css'
import { useEffect, useState } from "react";
import Stepper from "./components/stepper/Stepper";
import FormStep1 from "./components/form/FormStep1";
import FormStep2PF from "./components/form/FormStep2PF";
import FormStep2PJ from "./components/form/FormStep2PJ";
import FormStep3 from "./components/form/FormStep3";
import FormStep4 from "./components/form/FormStep4";
import React from 'react';
import { api } from './api/api';

interface step1DataProps {
  email: string;
  accountType: string;
}

interface step2PFDataProps {
  name: string;
  cpf: string;
  birthday: string;
  phone: string;
}

interface step2PJDataProps {
  socialName: string;
  cnpj: string;
  openDate: string;
  phone: string;
}

interface InputsStep3 {
  password: string;
}

export default function App() {
  const [isSlidingOut, setIsSlidingOut] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Boas vindas', 'Passo 2', 'Passo 3', 'Passo 4'];
  const [accountType, setAccountType] = useState('Pessoa física');
  const [step1Data, setStep1Data] = useState<step1DataProps>();
  const [step2PFData, setStep2PFData] = useState<step2PFDataProps>();
  const [step2PJData, setStep2PJData] = useState<step2PJDataProps>();
  const [step3Data, setStep3Data] = useState<InputsStep3>();
  const [allData, setAllData] = useState<object>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSlidingOut(false);
    }, 1666);

    return () => clearTimeout(timeout);
  }, []);

  async function handleOnSubmitStep1(data: any) {
    setAccountType(data.accountType);
    setStep1Data(data);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  async function handleOnSubmitStep2PF(data: any) {
    setStep2PFData(data);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  async function handleOnSubmitStep2PJ(data: any) {
    setStep2PJData(data);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  async function handleOnSubmitStep3(data: any) {
    setStep3Data(data);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))

    const pfOrPj = accountType === "Pessoa física" ? step2PFData : step2PJData

    const body: object = {
      ...step1Data,
      ...pfOrPj,
      ...step3Data
    }

    setAllData(body);
  }

  async function handleClickStepBack() {
    if(currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleFinishRegister() {
    console.log("allData", allData)

    const body = allData;

    let header = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept-Language': 'pt-BR',
      }
    }

    let UrlApi = 'registration';

    await api(UrlApi, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        ...header.headers
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.statusCode === 200) {
        console.log(data);
        alert('Você foi cadastrado com sucesso!');
      } else {
        console.log(data);
        console.error('Erro ao efetuar cadastro! Verifique se está faltando alguma informação ou existe alguma informação mal preenchida: ', data.errors);
        alert('Erro ao efetuar cadastro! Verifique se está faltando alguma informação ou existe alguma informação mal preenchida.')
      }
    })
    .catch(error => {
      console.error('Erro ao executar api: ', error);
    })
  }

  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="w-[592px] bg-[#EF4623] max-[1025px]:hidden">
          <svg className="mt-[147px]" width="194" height="182" viewBox="0 0 194 182" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="194" height="182" fill="url(#pattern0_7_21)"/>
            <defs>
            <pattern id="pattern0_7_21" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_7_21" transform="matrix(0.0043299 0 0 0.00461539 0.0257732 -0.0384615)"/>
            </pattern>
            <image id="image0_7_21" width="225" height="225" href="data:image/png;base64,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"/>
            </defs>
          </svg>

          <div className="ml-[50px]">
            <span className="text-white text-5xl font-extrabold">O Mercado Bitcoin <br/> nasceu para <br/></span>
            <div className="mt-6">
              <span className={`text-[#EF4623] bg-white text-5xl font-extrabold ${isSlidingOut ? 'slideOut' : 'slideIn'}`}>revolucionar a <br/></span>
            </div>
            <div className="mt-6">
              <span className={`text-[#EF4623] bg-white text-5xl font-extrabold mt-8 ${isSlidingOut ? 'slideOut' : 'slideIn'}`}>criptoeconomia.</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className={`md:w-1/2 xs:w-full mx-auto bg-white shadow-lg rounded-lg p-8 ${currentStep === 4 ? "h-[650px]" : "h-[600px]"} `}>
            <div className="ml-6 mr-6 flex flex-row justify-center items-center">
              <Stepper onBackClick={handleClickStepBack} steps={steps} currentStep={currentStep} />
            </div>

            <div>
              <div className={`${currentStep === 1 ? '' : 'hidden'}`}>
                <FormStep1 handleSave={handleOnSubmitStep1} />
              </div>

              <div className={`${currentStep === 2 && accountType === 'Pessoa física' ? '' : 'hidden'}`}>
                <FormStep2PF handleSave={handleOnSubmitStep2PF} />
              </div>

              <div className={`${currentStep === 2 && accountType === 'Pessoa jurídica' ? '' : 'hidden'}`}>
                <FormStep2PJ handleSave={handleOnSubmitStep2PJ} />
              </div>

              <div className={`${currentStep === 3 ? '' : 'hidden'}`}>
                <FormStep3 handleSave={handleOnSubmitStep3} />
              </div>

              <div className={`${currentStep === 4 ? '' : 'hidden'}`}>
                <FormStep4 handleSave={handleFinishRegister} bodyData={allData}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
