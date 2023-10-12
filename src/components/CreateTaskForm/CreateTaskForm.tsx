import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { GetAllProjectThunk, GetProjectDetailThunk } from "store/CreateProject";
import {
  PriorityThunk,
  StatusThunk,
  TaskProjectThunk,
  TaskTypeThunk,
} from "store/TaskProject";
import { GetUserByProjectThunk, GetUserThunk } from "store/Users";
import { CreateTask } from "types";
import { toast } from "react-toastify";

const CreateTaskForm = () => {
  const dispatch = useAppDispatch();
  const { project } = useSelector((state: RootState) => state.createProject);
  const { priority, taskType, status } = useSelector(
    (state: RootState) => state.taskProject
  );
  const { UserByProject } = useSelector((state: RootState) => state.users);
  //hàm biến đổi user
  const userOption = UserByProject?.map((item) => {
    return { value: item.userId, label: item.name };
  });

  const handleEditorChange = (content) => {
    setValue("description", content);
  };
  const handleUserAssign = (values) => {
    setValue("listUserAsign", values);
  };
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const { handleSubmit, register, setValue, reset } = useForm<CreateTask>();
  useEffect(() => {
    dispatch(GetAllProjectThunk());
    dispatch(GetUserThunk(""));
    dispatch(TaskTypeThunk());
    dispatch(PriorityThunk());
    dispatch(StatusThunk());
  }, []);
  const onSubmit = async (value: CreateTask) => {
    try {
      await dispatch(TaskProjectThunk(value));
      await dispatch(GetProjectDetailThunk(value.projectId));
      toast.success("tạo thành công");
      reset();
    } catch (err) {
      toast.error("Khởi tạo thất bại");
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      {/* Project option */}
      <div>
        <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
          Project
        </p>
        <select
          className="bg-[#f4f5f7] w-[650px] h-[35px] rounded-lg border-slate-700"
          name="projectId"
          ref={register}
          {...register("projectId")}
          onChange={(e) => {
            //dispatch giá trị làm thay đổi user
            dispatch(GetUserByProjectThunk(parseInt(e.target.value)));
            //update giá trị cho project ID
            setValue("projectId", parseInt(e.target.value));
          }}
        >
          {project.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      {/* Task name, Status */}
      <div className="mt-3 flex justify-between">
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Task name
          </p>
          <input
            ref={register}
            {...register("taskName")}
            name="taskName"
            className="bg-[#f4f5f7] w-[300px] h-[35px] rounded-lg border-slate-700"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Status
          </p>
          <select
            ref={register}
            {...register("statusId")}
            name="statusId"
            className="bg-[#f4f5f7] w-[300px] h-[35px] rounded-lg border-slate-700"
          >
            {status.map((status, index) => {
              const defaultValue = "";
              return (
                <option
                  key={index}
                  selected={status.statusName === defaultValue ? true : false}
                  value={status.statusId}
                >
                  {status.statusName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Priority, Task Type */}
      <div className="flex justify-between mt-3">
        <div className="">
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Priority
          </p>
          <select
            className="bg-[#f4f5f7] w-[300px] h-[35px] rounded-lg border-slate-700"
            name="priorityId"
            ref={register}
            {...register("priorityId")}
          >
            {priority.map((priority, index) => {
              const defaultValue = "";
              return (
                <option
                  key={index}
                  value={priority.priorityId}
                  selected={priority.priority === defaultValue ? true : false}
                >
                  {priority.priority}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Task type
          </p>
          <select
            className="bg-[#f4f5f7] w-[300px] h-[35px] rounded-lg border-slate-700"
            name="typeId"
            ref={register}
            {...register("typeId")}
          >
            {taskType.map((type, index) => {
              const defaultValue = "";
              return (
                <option
                  key={index}
                  selected={type.taskType === defaultValue ? true : false}
                  value={type.id}
                >
                  {type.taskType}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Asssigness, Time */}
      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Assigness
          </p>
          <Select
            mode="multiple"
            placeholder="Please select"
            style={{ width: "300px" }}
            options={userOption}
            onChange={handleUserAssign}
          />
          <div className="mt-1">
            <p className="text-[10px] font-semibold text-[rgba(0,0,0,0.5)] ml-2">
              original Estimate
            </p>
            <input
              name="originalEstimate"
              ref={register}
              {...register("originalEstimate")}
              defaultValue="0"
              min="0"
              type="number"
              className="bg-[#f4f5f7] w-[300px] h-[30px] rounded-lg border-slate-700"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
            Time tracking
          </p>
          <Slider
            style={{ width: "300px", height: "5px" }}
            defaultValue={0}
            tooltipVisible
            value={timeTracking.timeTrackingSpent}
            max={
              Number(timeTracking.timeTrackingSpent) +
              Number(timeTracking.timeTrackingRemaining)
            }
          />
          <div className="flex justify-between">
            <div className="text-[10px] text-[rgb(0,0,0)] font-semibold">
              {timeTracking.timeTrackingSpent}h logged
            </div>
            <div className="text-[10px] text-[rgb(0,0,0)] font-semibold">
              {timeTracking.timeTrackingRemaining}h remaining
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[10px] font-semibold text-[rgba(0,0,0,0.5)] ml-2">
                Time spent(hours)
              </p>
              <input
                name="timeTrackingSpent"
                ref={register}
                {...register("timeTrackingSpent")}
                defaultValue="0"
                min="0"
                type="number"
                className="bg-[#f4f5f7] w-[140px] h-[35px] rounded-lg border-slate-700"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: parseInt(e.target.value),
                  });
                  setValue("timeTrackingSpent", parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[rgba(0,0,0,0.5)] ml-2">
                Time remaining(hours)
              </p>
              <input
                name="timeTrackingRemaining"
                ref={register}
                {...register("timeTrackingRemaining")}
                defaultValue="0"
                min="0"
                type="number"
                className="bg-[#f4f5f7] w-[140px] h-[35px] rounded-lg border-slate-700"
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: parseInt(e.target.value),
                  });
                  setValue("timeTrackingRemaining", parseInt(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mt-3">
        <p className="text-sm font-semibold text-[rgba(0,0,0,0.5)] ml-2">
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
      <div>
        <button className="mt-9 px-4 py-2 bg-blue-500 rounded-xl ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
