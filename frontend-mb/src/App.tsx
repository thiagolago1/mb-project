import './index.css'
import logo from './assets/logo.svg';
import { useEffect, useState } from "react";
import Stepper from "./components/stepper/Stepper";
import FormStep1 from "./components/form/FormStep1";
import FormStep2PF from "./components/form/FormStep2PF";
import FormStep2PJ from "./components/form/FormStep2PJ";
import FormStep3 from "./components/form/FormStep3";
import FormStep4 from "./components/form/FormStep4";
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
  const [, setStep3Data] = useState<InputsStep3>();
  const [allData, setAllData] = useState<object>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSlidingOut(!isSlidingOut);
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
      ...data
    }

    setAllData(body);
  }

  async function handleClickStepBack() {
    if(currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleFinishRegister() {
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
      body: JSON.stringify(body),
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
          <img src={logo} className="mt-[147px]" alt="mb logo" />
          <div className="ml-[50px]">
            <span className="text-white text-5xl font-extrabold">O Mercado Bitcoin <br/> nasceu para <br/></span>
            <div className="mt-6">
              <span className="text-[#EF4623] bg-white text-5xl font-extrabold">
                {isSlidingOut ? (
                  <span className={`${isSlidingOut ? 'slideOut' : 'slideIn'}`}>revolucionar a</span>
                ) : (
                  Array.from('revolucionar a ').map((letter, index) => (
                    <span key={index} className={`slideIn ${index !== 0 ? '' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>{letter}</span>
                  ))
                )}
                <br />
              </span>
            </div>
            <div className="mt-6">
            <span className="text-[#EF4623] bg-white text-5xl font-extrabold mt-8">
              {isSlidingOut ? (
                <span className={`${isSlidingOut ? 'slideOut' : 'slideIn'}`}>criptoeconomia.</span>
              ) : (
                Array.from('criptoeconomia.').map((letter, index) => (
                  <span key={index} className={`slideIn ${index !== 0 ? '' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>{letter}</span>
                ))
              )}
            </span>
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
