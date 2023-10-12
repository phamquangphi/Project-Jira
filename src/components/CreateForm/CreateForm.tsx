import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { CategoryThunk, CreateAuthorizeThunk } from "store/CreateProject";
import { useForm } from "react-hook-form";
import { AllProjcet } from "types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant/config";

export const CreateForm = () => {
  const handleEditorChange = (content) => {
    setValue("description", content);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { category } = useSelector((state: RootState) => state.createProject);

  const { handleSubmit, register, setValue, reset } = useForm<AllProjcet>();
  useEffect(() => {
    dispatch(CategoryThunk());
  }, []);
  // react - Hook_form;
  const onSubmit = async (value: AllProjcet) => {
    try {
      await dispatch(CreateAuthorizeThunk(value));
      toast.success("Tạo Dự án thành công");
      navigate(PATH.manager);
      reset();
    } catch (err) {
      toast.error("Khởi tạo thất bại");
    }
  };
  return (
    <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
          Name:
        </p>
        <input
          type="text"
          ref={register}
          {...register("projectName")}
          className="bg-[#f4f5f7] w-full h-[35px] rounded-lg border-slate-700"
        />
      </div>
      <div className="mt-9">
        <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
          Description:
        </p>
        <Editor
          tagName="description"
          ref={register}
          {...register("description")}
          onEditorChange={handleEditorChange}
          apiKey="eejb934jxiaq8bwsdxehnv4y2d9ykotevz4ty1d9meth9gjr"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "a11ychecker",
              "advlist",
              "advcode",
              "advtable",
              "autolink",
              "checklist",
              "export",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "powerpaste",
              "fullscreen",
              "formatpainter",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | casechange blocks | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <div className="mt-9">
        <p className="text-base font-semibold text-[rgba(0,0,0,0.5)] ml-2">
          Project Category:
        </p>
        <select
          className="bg-[#f4f5f7] w-full h-[35px] rounded-lg border-slate-700"
          name="categoryId"
          ref={register}
          {...register("categoryId")}
        >
          {category?.map((id) => {
            return (
              <option value={id?.id} key={id.id}>
                {id?.projectCategoryName}
              </option>
            );
          })}
        </select>
      </div>
      <button className="mt-9 px-4 py-2 bg-[#d0644f] rounded-xl hover:bg-[rgba(208,100,79,0.5)] hover:text-white">
        Create Project
      </button>
    </form>
  );
};

export default CreateForm;
