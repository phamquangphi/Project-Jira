import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { UsersServices } from "services/Users";

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterSchemaType> = async (value) => {
    try {
      await UsersServices.register(value);
      toast.success("Đăng kí thành công");
      navigate("/");
    } catch (error) {}
  };
  return (
    <form
      className="pt-[1.875rem] pb-[3.75rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-[#c75943] lg:text-4xl sm:text-2xl font-sans font-bold text-center">
        SIGN UP
      </h2>
      <div className="mt-4">
        <p className="pl-3 text-[#c75943] lg:text-base sm:text-xs font-semibold">
          Email:
        </p>
        <Input
          placeholder="...@gmail.com"
          register={register}
          name="email"
          error={errors?.email?.message as string}
        />
      </div>
      <div className="mt-4">
        <p className="pl-3 text-[#c75943] text-base sm:text-xs font-semibold">
          Password:
        </p>
        <Input
          placeholder="Mật khẩu bao gồm kí tự viết hoa, và có chữ số"
          register={register}
          type="password"
          name="passWord"
          error={errors?.passWord?.message as string}
        />
      </div>
      <div className="mt-4">
        <p className="pl-3 text-[#c75943] lg:text-base sm:text-xs font-semibold">
          Name:
        </p>
        <Input
          placeholder="name"
          register={register}
          name="name"
          error={errors?.name?.message as string}
        />
      </div>
      <div className="mt-4">
        <p className="pl-3 text-[#d0644f] lg:text-base sm:text-xs font-semibold ">
          Phone Number:
        </p>
        <Input
          placeholder="Phone"
          register={register}
          name="phoneNumber"
          error={errors?.phoneNumber?.message as string}
        />
      </div>
      <button className="mt-5 lg:w-full sm:w-[50%]  h-12 bg-[#d0644f] rounded-xl lg:text-xl sm:text-sm font-semibold hover:bg-[rgba(208,100,79,0.5)] hover:text-white">
        Register
      </button>
    </form>
  );
};

export default RegisterTemplate;
