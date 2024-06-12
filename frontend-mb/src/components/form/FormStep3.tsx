import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

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
    watch,
    formState: { errors },
  } = useForm<InputsStep3>({
    resolver: zodResolver(formSchema)
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleOnSubmitStep3(data: any) {
    console.log("data", data)
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
          type={showPassword ? "text" : "password"} // Alterna entre text e password
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
        <span className="text-xs tracking-wide text-red-600">{errors.password ? errors.password?.message : ''}</span>
      </div>
      <div className="flex-grow"></div>
      <button type='submit' className="w-full bg-[#EF4623] text-white py-2 rounded">
        Continuar
      </button>
    </form>
  )
}