import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validCNPJ } from '../../helpers/utils';
import InputMask from "react-input-mask";

interface FormStepProps {
  handleSave: (value: any) => void;
}

type InputsStep2PJ = {
  socialName: string;
  cnpj: string;
  openDate: string;
  phone: string;
}

export default function FormStep2PJ({ handleSave }: FormStepProps) {
  const formSchema = z.object({
    socialName: z.string({required_error: "Campo obrigatório", message: 'Campo obrigatório'}).min(3, {message: 'Campo obrigatório'}),
    cnpj: z.string({ required_error: "Campo obrigatório" }).refine(validCNPJ, { message: 'CNPJ inválido' }),
    openDate: z
    .string({required_error: "Campo obrigatório", message: 'Campo obrigatório'})
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Formato inválido. Use DD/MM/AAAA'
    ),
    phone: z.string({required_error: "Campo obrigatório", message: 'Campo obrigatório'}).regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'Formato inválido. Use (00) 00000-0000'
    )
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputsStep2PJ>({
    resolver: zodResolver(formSchema)
  });


  async function handleOnSubmitStep2(data: any) {
    const step2Data = {
      ...data
    }

    handleSave(step2Data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmitStep2)}>
      <h2 className="text-3xl font-extrabold mb-4">Pessoa Jurídica</h2>
      <div className="mt-4 mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          {...register("socialName", { required: true })}
            aria-invalid={errors.socialName ? "true" : "false"}
            name="socialName"
            type="text"
            placeholder=""
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
          />
        <span className="text-xs tracking-wide text-red-600">{errors.socialName ? errors.socialName?.message : ''}</span>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CNPJ
        </label>
        <input
          type="text"
          {...register('cnpj')}
          placeholder="Ex: 12.456.789/0001-00"
          className="w-full border-2 rounded p-2"
        />
        <span className="text-xs tracking-wide text-red-600">{errors.cnpj ? errors.cnpj?.message : ''}</span>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data de nascimento
        </label>
          <Controller
            name="openDate"
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
        <span className="text-xs tracking-wide text-red-600">{errors.openDate ? errors.openDate?.message : ''}</span>
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
      <button type='submit' className="w-full bg-[#EF4623] text-white py-2 rounded">
        Continuar
      </button>
    </form>
  )
}