import React from "react";
import { useState } from "react";

interface FormStepProps {
  bodyData: any;
  handleSave: (value: any) => void;
}

export default function FormStep4({ bodyData, handleSave }: FormStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col h-[460px]">
    {
      bodyData &&
      <React.Fragment>
        <h2 className="text-3xl font-extrabold mb-4">Revise suas informações</h2>
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de e-mail
          </label>
          <input
            value={bodyData.email}
            readOnly
            name="email"
            type="email"
            placeholder="example@email.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
          />
        </div>
        {
          bodyData?.cpf &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              value={bodyData.name}
              readOnly
              name="Nome"
              type="email"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }
        {
          bodyData?.cpf &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF
            </label>
            <input
              value={bodyData.cpf}
              readOnly
              name="CPF"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }
        {
          bodyData?.cpf &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de nascimento
            </label>
            <input
              value={bodyData.birthday}
              readOnly
              name="Data de nascimento"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }
        {
          bodyData?.cnpj &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Razão social
            </label>
            <input
              value={bodyData.socialName}
              readOnly
              name="Razão Social"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }
        {
          bodyData?.cnpj &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CNPJ
            </label>
            <input
              value={bodyData.cnpj}
              readOnly
              name="CNPJ"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }
        {
          bodyData?.cnpj &&
          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de abertura
            </label>
            <input
              value={bodyData.openDate}
              readOnly
              name="Data de abertura"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>
        }

          <div className="">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              value={bodyData.phone}
              readOnly
              name="Telefone"
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
          </div>

          <div className="mt-4 mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sua senha
            </label>
            <input
              value={bodyData.password}
              readOnly
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Insira sua senha"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none mt-6"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg className="h-6 w-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>
              ) : (
                <svg className="h-6 w-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
              )}
            </button>
          </div>

          <div className="flex-grow"></div>
          <button onClick={handleSave} className="w-full bg-[#EF4623] text-white py-2 rounded mt-2">
            Cadastrar
          </button>
      </React.Fragment>
    }
    </div>
  )
}