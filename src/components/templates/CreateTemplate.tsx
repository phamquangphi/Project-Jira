import CreateForm from "components/CreateForm/CreateForm";

import styled from "styled-components";

export const CreateTemplate = () => {
  return (
    <Section className="ml-10">
      {/* Header */}
      <header className="mt-[1.25rem]">
        <ol className="flex">
          <li className="text-base font-light pr-[0.5rem]">Projects</li>
          <li className="text-base font-light  pr-[0.5rem] Item-link">
            Jira Clone
          </li>
          <li className="text-base font-light Item-link">Create Project</li>
        </ol>
      </header>
      <h1 className="mt-5 text-3xl font-semibold">Create Projects</h1>
      <CreateForm />
    </Section>
  );
};

export default CreateTemplate;
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
