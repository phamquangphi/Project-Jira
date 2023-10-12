import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { CategoryThunk, UpdateProjectThunk } from "store/CreateProject";
import { useForm } from "react-hook-form";
import { EditProject } from "types";
import { toast } from "react-toastify";
export const EditProjectForm = () => {
  const dispatch = useAppDispatch();
  //edit
  const handleEditorChange = (content) => {
    setValue("description", content);
  };

  const { category, editInfo } = useSelector(
    (state: RootState) => state.createProject
  );

  const { handleSubmit, setValue, getValues, register, reset } =
    useForm<EditProject>();
  useEffect(() => {
    dispatch(CategoryThunk());
    reset(editInfo);
  }, [editInfo, reset, dispatch]);

  const onSubmit = async (value: EditProject) => {
    try {
      value.creator = value.creator.id;
      const { id } = editInfo;
      const update = { id, payload: value };
      await dispatch(UpdateProjectThunk(update));
      toast.success("Cập nhật thành công");
    } catch (err) {
      toast.error("Thất bại");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            ID
          </p>
          <input
            ref={register}
            {...register("id")}
            name="id"
            type="text"
            className="bg-[#f4f5f7] w-[120%] h-[35px] rounded-lg border-slate-700"
          />
        </div>
        <div className="ml-[4.375rem]">
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Project Name:
          </p>
          <input
            ref={register}
            {...register("projectName")}
            name="projectName"
            type="text"
            className="bg-[#f4f5f7] w-[120%] h-[35px] rounded-lg border-slate-700"
          />
        </div>

        <div className="ml-[4.375rem]">
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Category
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
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
          Description:
        </p>
        <Editor
          tagName="description"
          ref={register}
          {...register("description")}
          initialValue={getValues("description")}
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
      <div>
        <button className="mt-9 px-4 py-2 bg-blue-500 rounded-xl ">
          Submit
        </button>
      </div>
    </form>
  );
};
export default EditProjectForm;
