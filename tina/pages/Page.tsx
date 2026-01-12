import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Banner from "../components/Banner";
import Blocks from "../components/Blocks";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
};

const TinaPage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  return (
    <>
      <Banner page={page} />

      <div className="py-6 bg-[#045472]">
        <div className="container uppercase text-white font-medium text-2xl">
          {page.seoTitle}
        </div>
      </div>
      <main className="container">
        <Blocks page={page} />
        {/*<div className="prose py-8" data-tina-field={tinaField(page, "body")}>
          <TinaMarkdown content={page.body} />
        </div>*/}
      </main>
    </>
  );
};

export default TinaPage;
