import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "schema";
import { useAppDispatch } from "store";
import { LoginThunk } from "store/Users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "components/ui";
import { PATH } from "constant/config";
export const LoginTemplate = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
    dispatch(LoginThunk(value))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công");
        navigate(PATH.manager);
      });
  };
  return (
    <form
      className="lg:pt-[1.875rem] lg:pb-[3.75rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-[#d0644f] lg:text-4xl sm:text-2xl font-sans font-bold text-center">
        LOG IN
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
        <p className="pl-3 text-[#c75943] lg:text-base sm:text-xs font-semibold">
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
      <div className="mt-5 flex items-center lg:justify-around  sm:justify-around">
        <button className="lg:px-6 lg:py-3 sm:py-2 sm:px-2 bg-[#d0644f] rounded-xl sm:text-[14px] lg:text-base font-semibold hover:bg-[rgba(208,100,79,0.5)] hover:text-white">
          Login
        </button>
        <p className="text-white lg:text-[16px] sm:text-[14px] sm:ml-2">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => {
              navigate(PATH.register);
            }}
          >
            Đăng Kí
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginTemplate;
