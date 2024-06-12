import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

interface FormStepProps {
  handleSave: (value: any) => void;
}

type InputsStep1 = {
  email: string;
}

export default function FormStep1({ handleSave }: FormStepProps) {
  const [accountType, setAccountType] = useState('Pessoa física');
  const formSchema = z.object({
    email: z.string({ required_error: "Campo obrigatório" })
    .email({ message: 'Formato de e-mail inválido' })
    .min(1, { message: 'Campo obrigatório' })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsStep1>({
    resolver: zodResolver(formSchema)
  });

  const handleRadioChange = (event: { target: { value: any; }}) => {
    setAccountType(event.target.value);
  };

  async function handleOnSubmitStep1(data: any) {
    const step1Data = {
      email: data.email,
      accountType: accountType
    }

    handleSave(step1Data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmitStep1)} className="flex flex-col h-[450px]">
        <h2 className="text-3xl font-extrabold mb-4">Boas vindas</h2>
        <div className="mt-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de e-mail
          </label>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            name="email"
            type="email"
            placeholder="example@email.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
          />
          <span className="text-xs tracking-wide text-red-600">
            {errors.email ? errors.email?.message : ''}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="tipoPessoa"
              value="Pessoa física"
              checked={accountType === 'Pessoa física'}
              onChange={handleRadioChange}
              className="mr-1"
            />
            Pessoa física
          </label>
          <label>
            <input
              type="radio"
              name="tipoPessoa"
              value="Pessoa jurídica"
              checked={accountType === 'Pessoa jurídica'}
              onChange={handleRadioChange}
              className="mr-1"
            />
            Pessoa jurídica
          </label>
        </div>
        <div className="flex-grow"></div>
        <button type="submit" className="w-full bg-[#EF4623] text-white py-2 rounded">
          Continuar
        </button>
      </form>
  )
}