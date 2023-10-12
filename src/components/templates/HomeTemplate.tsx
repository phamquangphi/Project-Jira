import { RootState, useAppDispatch } from "store";
import { useEffect } from "react";
import styled from "styled-components";
import { GetProjectDetailThunk } from "store/CreateProject";
import { useParams } from "react-router-dom";
import { Content } from "components/Board";
import { useSelector } from "react-redux";
import Search from "antd/es/input/Search";

export const HomeTemplate = () => {
  const { Detail } = useSelector((state: RootState) => state.createProject);
  const dispatch = useAppDispatch();
  const { ProjectId } = useParams<{ ProjectId: string }>();
  useEffect(() => {
    if (!isNaN(Number(ProjectId))) {
      dispatch(GetProjectDetailThunk(Number(ProjectId)));
    }
  }, [ProjectId]);
  const renderAvatar = () => {
    return Detail?.members.map((user, index) => {
      return (
        <div key={index}>
          <img
            className="w-10 h-10 border-2 border-solid border-transparent rounded-[50%]"
            style={{ borderImage: "initial" }}
            src={user?.avatar}
            alt={user?.avatar}
          />
        </div>
      );
    });
  };
  return (
    <Section className="ml-10">
      {/* Header */}
      <header className="mt-[1.25rem]">
        <ol className="flex">
          <li className="text-base font-light pr-[0.5rem]">Projects</li>
          <li className="text-base font-light  pr-[0.5rem] Item-link">
            JiraClone
          </li>
          <li className="text-base font-light  pr-[0.5rem] Item-link">
            Project management
          </li>
          <li className="text-base font-light Item-link">
            {Detail?.projectName}
          </li>
        </ol>
      </header>
      <h3 className="mt-5 text-3xl font-semibold">{Detail?.projectName}</h3>
      {/* info */}
      <div className="flex items-center mt-5">
        {/* search-block */}
        <Search
          placeholder="input search text"
          style={{ width: 208, height: 32, background: "#f4f5f7" }}
        />
        {/* avatar group */}
        <div className="flex ml-5">{renderAvatar()}</div>
        <div className="font-light ml-5 text-lg leading-9 text-center">
          Only My Issues
        </div>
        <div className="font-light ml-5 text-lg leading-9 text-center">
          Recently Updated
        </div>
      </div>
      {/* Content */}
      <Content />
    </Section>
  );
};

export default HomeTemplate;
const Section = styled.section`
  header {
    ol {
      .Item-link::before {
        display: inline-block;
        padding-right: 0.5rem;
        color: #6c757d;
        content: "/";
      }
    }
  }
`;
