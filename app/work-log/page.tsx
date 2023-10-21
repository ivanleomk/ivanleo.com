import { allPosts } from '@/.contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'
import { CodeBlocks } from '../components/CodeBlocks'

const getWorklogPost = () => {

  return allPosts.find(item => item.title === "Machine Learning Roadmap")
}

const page = async () => {
  const worklogPost = await getWorklogPost()

  if (!worklogPost) {
    throw Error("Post does not exist")
  }

  const Content = getMDXComponent(worklogPost.body.code)


  return (
    <article className="max-w-3xl mx-auto w-100 pb-20">
      <Content components={{ ...CodeBlocks }} />
      <p>---La Fin----</p>
    </article>
  )
}

export default page