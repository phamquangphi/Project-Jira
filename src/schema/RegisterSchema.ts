import { z } from "zod";
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
const nameRegex = /^[^\d]+$/;
export const RegisterSchema = z.object({
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
  name: z
    .string()
    .nonempty("Vui lòng nhập tên")
    .refine((value) => nameRegex.test(value), {
      message: "tên của bạn không chứ số",
    }),
  phoneNumber: z.string().nonempty("Vui lòng nhập số điện thoại"),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
