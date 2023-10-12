import { Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";

import {
  GetTaskDetailThunk,
  PriorityThunk,
  StatusThunk,
  TaskProjectAction,
  UpdateDescriptionTaskThunk,
  UpdatePriorityTaskThunk,
  UpdateStatusTaskThunk,
} from "store/TaskProject";
import { GetProjectDetailThunk } from "store/CreateProject";
import { useForm } from "react-hook-form";
import { Comment } from "types";
import { CreateCommentThunk, DeleteCommentThunk } from "store/Comment/thunk";

export const ModalTask = () => {
  const dispatch = useAppDispatch();

  const { listTaskDetial } = useSelector(
    (state: RootState) => state.taskProject
  );
  const { status, priority } = useSelector(
    (state: RootState) => state.taskProject
  );
  const { Detail } = useSelector((state: RootState) => state.createProject);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [historyCmt, setHistoryCmt] = useState(listTaskDetial?.description);
  const [content, setContent] = useState(listTaskDetial?.description);
  const { handleSubmit, register, reset } = useForm<Comment>();
  const onSubmit = async (value: Comment) => {
    try {
      await dispatch(
        CreateCommentThunk({
          taskId: taskid,
          contentComment: value.contentComment,
        })
      );
      await dispatch(GetTaskDetailThunk(taskid));
      reset();
    } catch (error) {}
  };
  const taskid = listTaskDetial?.taskId;

  useEffect(() => {
    dispatch(StatusThunk());
    dispatch(PriorityThunk());
    dispatch(GetTaskDetailThunk(taskid));
  }, [taskid]);

  const renderDescription = () => {
    const tsxDescription = ReactHtmlParser(listTaskDetial?.description);
    return (
      <div>
        {visibleEdit ? (
          <div>
            <Editor
              tagName="description"
              initialValue={listTaskDetial?.description}
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
              onEditorChange={(content) => {
                setContent(content);
              }}
            />
            <button
              onClick={async () => {
                setVisibleEdit(false);
                await dispatch(
                  UpdateDescriptionTaskThunk({
                    taskId: taskid,
                    description: content,
                  })
                );
                await dispatch(GetTaskDetailThunk(taskid));
                await dispatch(GetProjectDetailThunk(listTaskDetial.projectId));
              }}
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded-xl "
            >
              Save
            </button>
            <button
              onClick={() => {
                setVisibleEdit(false);
                dispatch(
                  UpdateDescriptionTaskThunk({
                    taskId: taskid,
                    description: historyCmt,
                  })
                );
              }}
              className="mt-4 ml-3 px-4 py-1 bg-red-600 text-white rounded-xl "
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setVisibleEdit(!visibleEdit);
              setHistoryCmt(listTaskDetial.description);
            }}
          >
            {tsxDescription}
          </div>
        )}
      </div>
    );
  };
  const renderTimeStracking = () => {
    return (
      <div>
        <div className="flex items-center">
          <i className="fa-solid fa-clock text-[1.25rem]"></i>
          <div className="flex items-center">
            <div className=" ml-4 text-[12px] text-[rgb(0,0,0)] font-semibold">
              {listTaskDetial?.timeTrackingSpent}h logged
            </div>
            <i className="fa-solid fa-arrows-left-right mx-4"></i>
            <div className=" text-[12px] text-[rgb(0,0,0)] font-semibold">
              {listTaskDetial?.timeTrackingRemaining}h remaining
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-4 ">
      <div className="flex justify-between">
        {/* TITLE */}
        <div className="ml-5 w-[37.5rem]">
          <div className="flex items-center">
            <i className="fa-solid fa-bookmark text-green-500 text-[20px] mr-2"></i>
            <p>{listTaskDetial?.taskTypeDetail.taskType}</p>
          </div>
          <h5 className="text-xl font-semibold">{listTaskDetial?.taskName}</h5>

          <h3 className="font-semibold text-xl mt-8">
            This is an issue of type: Task.
          </h3>
          {/* Description */}
          <div className="mt-4">{renderDescription()}</div>
          {/* Coment */}
          <div className="Coment mt-4">
            <h3 className="font-semibold text-[0.938rem]">Comment</h3>
            {/* CMT 1 */}
            <div className="flex mt-2">
              {listTaskDetial?.assigness?.map((uscmt, index) => {
                return (
                  <img
                    key={index}
                    className="w-10 h-10 border-2 border-solid border-transparent rounded-[50%]"
                    src={uscmt?.avatar}
                    alt={uscmt?.avatar}
                  />
                );
              })}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className=" w-[18.75rem] h-[2.5rem] pl-2 rounded-lg border-solid border-2 border-black"
                  type="text"
                  ref={register}
                  {...register("contentComment")}
                />
                <button className=" ml-2 px-3 py-1 bg-blue-500 rounded-xl">
                  save
                </button>
              </form>
            </div>
            {/* CMT 2 */}
            <div className=" mt-2">
              {listTaskDetial?.lstComment.map((cmt, index) => {
                return (
                  <div>
                    <div className="flex mb-2" key={index}>
                      <img
                        className="w-10 h-10 border-2 border-solid border-transparent rounded-[50%]"
                        src={cmt?.avatar}
                        alt={cmt?.avatar}
                      />
                      <div>
                        <p className="text-[0.938rem]">{cmt?.name}</p>
                        <p className="text-[0.938rem]">{cmt?.commentContent}</p>
                      </div>
                      <button
                        onClick={async () => {
                          await dispatch(DeleteCommentThunk(cmt.id));
                          await dispatch(GetTaskDetailThunk(taskid));
                        }}
                        className=" font-semibold text-red-600 ml-3"
                      >
                        Delete
                      </button>
                    </div>
                    <hr className="w-[50%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* FUNCTION */}
        <div className="w-[25rem]">
          <div className="mr-5 ml-4">
            {/* item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fa-brands fa-telegram text-[1.25rem]"></i>
                <p className="text-[0.938rem] pl-2">Give feedback</p>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-link text-[1.25rem]"></i>
                <p className="text-[0.938rem] pl-2">Copy link</p>
              </div>
            </div>
            {/* STATUS */}
            <div className="mt-8">
              <p className="text-[0.75rem] font-semibold text-black">STATUS</p>
              <select
                name="statusId"
                className="bg-[#f4f5f7] w-full h-[2.188rem] rounded-lg border-slate-700 border-2"
                value={listTaskDetial?.statusId}
                onChange={async (e) => {
                  try {
                    await dispatch(
                      UpdateStatusTaskThunk({
                        taskId: taskid,
                        statusId: e.target.value,
                      })
                    );
                    await dispatch(GetTaskDetailThunk(taskid));
                    await dispatch(
                      GetProjectDetailThunk(listTaskDetial.projectId)
                    );
                  } catch (error) {}
                }}
              >
                {status?.map((status, index) => {
                  return (
                    <option key={index} value={status.statusId}>
                      {status.statusName}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* ASSIGNESS */}
            <div className="">
              <p className="text-[0.75rem] font-semibold text-black">
                ASSIGNESS
              </p>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  {listTaskDetial?.assigness?.map((assign, index) => {
                    return (
                      <div
                        className="flex items-center bg-[#e9eaf0] px-2 py-1 mb-2"
                        key={index}
                      >
                        <img
                          className="w-9 h-9 border-2 border-solid border-transparent rounded-[50%]"
                          src={assign?.avatar}
                          alt={assign?.avatar}
                        />
                        <p className="text-[0.938rem]">{assign?.name}</p>
                        <i
                          className="fa-solid fa-xmark text-[0.938rem] ml-2"
                          onClick={() => {
                            dispatch(TaskProjectAction.DeleteAssign(assign.id));
                          }}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 ml-5">
                <p>add more</p>
                <Select
                  style={{ width: "40%" }}
                  options={Detail?.members
                    ?.filter((mem) => {
                      let index = listTaskDetial?.assigness?.findIndex(
                        (us) => us.id == mem.userId || us.name === mem.name
                      );
                      if (index !== -1) {
                        return false;
                      }
                      return true;
                    })
                    ?.map((user) => {
                      return { value: user.userId, lable: user.name };
                    })}
                  value="+ add more"
                  optionFilterProp="value"
                  className="border-2"
                  onSelect={async (value) => {
                    try {
                      if (value === "0") {
                        return;
                      }
                      let userSelected = Detail?.members?.find(
                        (mem) =>
                          mem.userId === parseInt(value) || mem.name === value
                      );
                      userSelected = {
                        ...userSelected,
                        userId: userSelected?.userId,
                        name: userSelected?.name,
                      };
                      await dispatch(
                        TaskProjectAction.ChangeAssign(userSelected)
                      );
                      await dispatch(
                        GetProjectDetailThunk(listTaskDetial.projectId)
                      );
                    } catch (error) {}
                  }}
                ></Select>
              </div>
            </div>
            {/* PRIORITY */}
            <div className="mt-4">
              <p className="text-[0.75rem] font-semibold text-black">
                PRIORITY
              </p>
              <select
                className="bg-[#f4f5f7] w-full h-[2.188rem] rounded-lg border-slate-700 border-2"
                name="priorityId"
                value={listTaskDetial?.priorityTask?.priorityId}
                onChange={async (e) => {
                  try {
                    await dispatch(
                      UpdatePriorityTaskThunk({
                        taskId: listTaskDetial.taskId,
                        priorityId: parseInt(e.target.value),
                      })
                    );
                    await dispatch(GetTaskDetailThunk(taskid));
                    await dispatch(
                      GetProjectDetailThunk(listTaskDetial.projectId)
                    );
                  } catch (error) {}
                }}
              >
                {priority?.map((priority, index) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* ORIGINAL ESTIMATE */}
            <div className="mt-4">
              <p className="text-[0.75rem] font-semibold text-black">
                ORIGINAL ESTIMATE (HOURS)
              </p>
              <input
                type="text"
                name="originalEstimate"
                className="bg-[#f4f5f7] w-full h-[2.5rem] pl-2  border-slate-700"
                value={listTaskDetial?.originalEstimate}
              />
            </div>
            {/* TIME TRACKING */}
            <div className="mt-4">
              <p className="text-[0.75rem] font-semibold text-[rgba(0,0,0,0.6)]">
                TIME TRACKING
              </p>
              {renderTimeStracking()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTask;
