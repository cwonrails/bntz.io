import styled from 'styled-components'
import { Link } from '../routes'

const BlogItem = ({ key, title, route, slug }) => {
  return (
    <Item key={key}>
      <h2>
        <Link route={route} params={{ slug }}>
          <Wrapper>
            <a>{title}</a>
          </Wrapper>
        </Link>
      </h2>
    </Item>
  )
}

const Item = styled.div`
  position: relative;
  text-align: center;

  h2 {
    font-family: 'Roboto Mono', monospace;
    font-weight: 400;
    line-height: 1.6rem;
    font-size: 1rem;
    margin: 0.2rem 0;

    a {
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #ff3b6b;
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

export default BlogItem
