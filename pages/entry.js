import fetch from 'isomorphic-unfetch'
import Entry from '../components/Entry'
import Layout from '../components/layout/'
import { getSlugsAndPaths } from '../utils/content'

const entry = ({ title, body, feel }) => (
  <Layout>
    <Entry title={title} body={body} feel={feel} />
  </Layout>
)

const findBySlug = async (slug) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://bntz.io' : 'http://localhost:3000'
  const slugsAndPaths = await getSlugsAndPaths()
  let entryPath
  let entry

  slugsAndPaths.forEach(file => {
    if (file.slug === slug) {
      entryPath = file.path
    }
  })

  const res = await fetch(`${baseUrl}/${entryPath}`)
  entry = await res.json()

  return entry
}

entry.getInitialProps = async ({ query }) => {
  const slug = query.slug
  const entry = await findBySlug(slug)

  return { title: entry.title, body: entry.bodyHtml, feel: entry.feel }
}

export default entry
