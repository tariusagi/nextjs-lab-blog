// Note: this file utilize Next's dynamic routing by its special name.
// See https://nextjs.org/docs/routing/dynamic-routes
import Head from 'next/head';
import Layout from "../../components/layout";
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css';

// Note: by defining this function, we tell Next to pre-render this page at
// build time using props returned from this function.
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

// Note: by defining this function, we tell Next to pre-render at build time all
// paths returned by it.
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Note: returns HTML to render this page. Since we have getStaticProps defined
// for this page (see above), Next will call this function with props returned
// from getStaticProps, which includes postData object, which we extract from
// the given props.
// Also because we have getStaticProps defined in this page, so this page will
// rendered at build time, not per request.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}