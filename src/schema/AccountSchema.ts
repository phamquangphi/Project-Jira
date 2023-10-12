import { z } from "zod";
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

export const AccountSchema = z.object({
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email")
    .email("Email cuả bạn chưa đúng"),
  passWord: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .refine((value) => passwordRegex.test(value), {
      message: "Mật khẩu ít nhất có một chữ cái viết hoa, và có chữ số",
    }),
  name: z.string().nonempty("Vui lòng nhập tên"),
  phoneNumber: z.string().nonempty("Vui lòng nhập số điện thoại"),
});
export type AccountSchemaType = z.infer<typeof AccountSchema>;
