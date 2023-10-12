import ManagerTable from "components/ManagerTable/ManagerTable";
import styled from "styled-components";

export const ManagementTemplate = () => {
  return (
    <Section className="ml-10">
      {/* Header */}
      <header className="mt-[1.25rem]">
        <ol className="flex">
          <li className="text-base font-light pr-[0.5rem]">Projects</li>
          <li className="text-base font-light  pr-[0.5rem] Item-link">
            JiraClone
          </li>
          <li className="text-base font-light Item-link">Project management</li>
        </ol>
      </header>
      <h1 className="mt-5 text-3xl font-semibold">Project Management</h1>
      <ManagerTable />
    </Section>
  );
};

export default ManagementTemplate;
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
