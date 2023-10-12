import { z } from "zod";
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email"),
  passWord: z
    .string()
    .nonempty("Vui lòng nhập mật khẩu")
    .refine((value) => passwordRegex.test(value), {
      message: "Mật khẩu ít nhất có một chữ cái viết hoa, và có chữ số",
    }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
