import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidCPF } from '../../helpers/utils';
import InputMask from "react-input-mask";

interface FormStepProps {
  handleSave: (value: any) => void;
}

type InputsStep2PF = {
  name: string;
  cpf: string;
  birthday: string;
  phone: string;
}

export default function FormStep2PF({ handleSave }: FormStepProps) {
  const formSchema = z.object({
    name: z.string({required_error: "Campo obrigatório", message: 'Campo obrigatório'}).min(3, {message: 'Campo obrigatório'}),
    cpf: z.string({ required_error: "Campo obrigatório" }).refine(isValidCPF, { message: 'CPF inválido' }),
    birthday: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Formato inválido. Use DD/MM/AAAA'
    )
    .nonempty({ message: 'Campo obrigatório' }),
    phone: z.string().regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'Formato inválido. Use (00) 00000-0000'
    ).nonempty({ message: 'Campo obrigatório' })
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputsStep2PF>({
    resolver: zodResolver(formSchema)
  });


  async function handleOnSubmitStep2(data: any) {
    console.log("data", data)
    const step2Data = {
      ...data
    }

    handleSave(step2Data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmitStep2)}>
      <h2 className="text-3xl font-extrabold mb-4">Pessoa Física</h2>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
            name="name"
            type="text"
            placeholder=""
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
          />
        <span className="text-xs tracking-wide text-red-600">{errors.name ? errors.name?.message : ''}</span>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CPF
        </label>
        <input
          type="text"
          {...register('cpf')}
          placeholder="Ex: 123.456.789-10"
          className="w-full border-2 rounded p-2 mb-4"
        />
        <span className="text-xs tracking-wide text-red-600">{errors.cpf ? errors.cpf?.message : ''}</span>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data de nascimento
        </label>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="99/99/9999"
                placeholder="DD/MM/AAAA"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        <span className="text-xs tracking-wide text-red-600">{errors.birthday ? errors.birthday?.message : ''}</span>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
        <span className="text-xs tracking-wide text-red-600">{errors.phone ? errors.phone?.message : ''}</span>
      </div>
      <button type='submit' className="w-full bg-[#EF4623] text-white py-2 rounded mt-4">
        Continuar
      </button>
    </form>
  )
}