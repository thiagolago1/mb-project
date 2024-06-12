import React from "react";
import { useState } from "react";
import openEye from '../../assets/openEye.svg';
import closedEye from '../../assets/closedEye.svg';

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
                <img className="h-6 w-6 text-gray-500" src={closedEye} alt="closed eye" />
              ) : (
                <img className="h-6 w-6 text-gray-500" src={openEye} alt="open eye" />
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