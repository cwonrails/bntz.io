import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout/'
import Blog from '../components/Blog'
import { getPaths, orderPosts } from '../utils/content'

const blog = ({ posts }) => (
  <Layout>
    <Blog posts={posts} />
  </Layout>
)

blog.getInitialProps = async ({ req }) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://bntz.io' : 'http://localhost:3000'
  const paths = await getPaths('posts')
  let posts = []

  for (let path of paths) {
    const jsonFilePath = path.replace('.md', '.json')
    const res = await fetch(`${baseUrl}/static/${jsonFilePath}`)
    const data = await res.json()
    posts.push(data)
  }

  const orderedPosts = await orderPosts(posts)

  return { posts: orderedPosts }
}

export default blog
