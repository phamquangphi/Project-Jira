import { Modal } from "components/ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { GetProjectDetailThunk } from "store/CreateProject";
import { ModalTask } from ".";
import {
  GetTaskDetailThunk,
  RemoveTaskThunk,
  UpdateStatusTaskThunk,
} from "store/TaskProject";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Content = () => {
  const { Detail } = useSelector((state: RootState) => state.createProject);
  const dispatch = useAppDispatch();
  const { ProjectId } = useParams<{ ProjectId: string }>();
  useEffect(() => {
    const id = Number(ProjectId);
    if (!isNaN(id)) {
      dispatch(GetProjectDetailThunk(id));
    }
  }, [Number(ProjectId)]);
  // Event open/close Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    const { PrId, TiD } = JSON.parse(result.draggableId);

    const { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    dispatch(
      UpdateStatusTaskThunk({
        taskId: TiD,
        statusId: destination.droppableId,
      })
    );
    dispatch(GetProjectDetailThunk(Number(PrId)));
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {Detail?.lstTask.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail?.statusId}>
              {(provided) => (
                <div className="w-[16.875rem] h-auto bg-[#f4f5f7] mr-2 rounded-xl">
                  <h3 className="font-light mt-3 ml-3">
                    {taskListDetail?.statusName}
                  </h3>
                  {/* ul */}
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={index}
                    className="h-[auto]"
                  >
                    {taskListDetail?.lstTaskDeTail?.map((task, index) => {
                      return (
                        <Draggable
                          draggableId={JSON.stringify({
                            PrId: task?.projectId,
                            TiD: task?.taskId,
                          })}
                          key={task?.taskId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            // Li
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              className=" bg-white mb-3 mt-4 mx-2 w-[15.625rem]"
                              onClick={() => {
                                dispatch(GetTaskDetailThunk(task?.taskId));
                                setIsModalOpen(true);
                              }}
                            >
                              <div className="pt-2 pb-2 ml-3 mr-3">
                                <div className="flex justify-between items-center">
                                  <p className="font-semibold">
                                    {task?.taskName}
                                  </p>
                                  <i
                                    onClick={async () => {
                                      await dispatch(
                                        RemoveTaskThunk(task.taskId)
                                      );
                                      await dispatch(
                                        GetProjectDetailThunk(Number(ProjectId))
                                      );
                                      setIsModalOpen(false);
                                    }}
                                    className="fa-solid fa-trash-arrow-up text-red-500 text-xl"
                                  ></i>
                                </div>
                                {/* Icons */}
                                <div className="flex justify-between items-center pt-8">
                                  <div className="">
                                    <p className="text-red-700 text-xs font-medium">
                                      {" "}
                                      {task?.priorityTask?.priority}{" "}
                                    </p>
                                  </div>
                                  <div className="flex">
                                    {task?.assigness?.map((avatar, index) => {
                                      return (
                                        <img
                                          key={index}
                                          className="w-10 h-10 border-2 border-solid border-transparent rounded-[50%]"
                                          style={{ borderImage: "initial" }}
                                          src={avatar.avatar}
                                          alt={avatar.name}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              {/* LI */}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    {/* ul */}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return (
    <div>
      <div className="mt-5 flex ">{renderCardTaskList()}</div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        footer={null}
      >
        <ModalTask />
      </Modal>
    </div>
  );
};

export default Content;
