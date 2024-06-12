import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import openEye from '../../assets/openEye.svg';
import closedEye from '../../assets/closedEye.svg';

interface FormStepProps {
  handleSave: (value: any) => void;
}

type InputsStep3 = {
  password: string;
}

export default function FormStep3({ handleSave }: FormStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    password: z.string({ required_error: "Campo obrigatório" })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsStep3>({
    resolver: zodResolver(formSchema)
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleOnSubmitStep3(data: any) {
    const step3Data = {
      ...data
    }
    handleSave(step3Data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmitStep3)} className="flex flex-col h-[450px]">
      <h2 className="text-3xl font-extrabold mb-4">Senha de acesso</h2>
      <div className="mt-4 mb-4 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sua senha
        </label>
        <input
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
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
        <span className="text-xs tracking-wide text-red-600">{errors.password ? errors.password?.message : ''}</span>
      </div>
      <div className="flex-grow"></div>
      <button type='submit' className="w-full bg-[#EF4623] text-white py-2 rounded">
        Continuar
      </button>
    </form>
  )
}