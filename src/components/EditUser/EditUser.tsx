import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { AccountSchema, AccountSchemaType } from "schema";
import { RootState, useAppDispatch } from "store";
import { GetUserThunk, UpdateUsertThunk } from "store/Users";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { editUser } from "types";

export const EditUser = () => {
  const { EditUsers } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AccountSchemaType>({
    mode: "onChange",
    resolver: zodResolver(AccountSchema),
  });
  useEffect(() => {
    reset();
  }, [reset, EditUsers]);
  const onSubmit: SubmitHandler<AccountSchemaType> = async (
    value: editUser
  ) => {
    try {
      await dispatch(UpdateUsertThunk(value));
      await dispatch(GetUserThunk(EditUsers.name));
      toast.success("Thành Công");
      reset();
    } catch (error) {
      toast.error("Thất bại");
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Name:
          </p>
          <input
            name="name"
            {...register("name")}
            type="text"
            defaultValue={EditUsers.name}
            className="bg-[#f4f5f7] w-full  h-[35px] rounded-lg border-slate-700"
          />
          {<p className="text-red-500">{errors?.name?.message as string}</p>}
        </div>
        <div>
          <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Email:
          </p>
          <input
            ref={register}
            {...register("email")}
            defaultValue={EditUsers.email}
            name="email"
            type="text"
            className="bg-[#f4f5f7] w-full h-[35px] rounded-lg border-slate-700"
          />
          {<p className="text-red-500">{errors?.email?.message as string}</p>}
        </div>
        <div>
          <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Password:
          </p>
          <input
            ref={register}
            {...register("passWord")}
            defaultValue={EditUsers?.passWord}
            name="passWord"
            type="password"
            className="bg-[#f4f5f7] w-full  h-[35px] rounded-lg border-slate-700"
          />
          {
            <p className="text-red-500">
              {errors?.passWord?.message as string}
            </p>
          }
        </div>
        <div>
          <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Phone number:
          </p>
          <input
            name="phoneNumber"
            {...register("phoneNumber")}
            defaultValue={EditUsers.phoneNumber}
            type="text"
            className="bg-[#f4f5f7] w-full h-[35px] rounded-lg border-slate-700"
          />
          {
            <p className="text-red-500">
              {errors?.phoneNumber?.message as string}
            </p>
          }
        </div>
      </div>
      <button className="mt-5 px-4 py-2 bg-[#d0644f] rounded-xl hover:bg-[rgba(208,100,79,0.5)] hover:text-white">
        Update
      </button>
    </form>
  );
};

export default EditUser;
