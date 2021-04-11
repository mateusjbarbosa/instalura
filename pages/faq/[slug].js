import React from 'react';

import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';

import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternalQuestionScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

export default websitePageHOC(FAQInternalQuestionScreen);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (serverResponse) => {
      const response = await serverResponse.json();
      return response.data;
    });

  const pageData = faqCategories.reduce((accumulatedValue, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => {
      if (question.slug === params.slug) {
        return true;
      }
      return false;
    });

    if (foundQuestion) {
      return {
        ...accumulatedValue,
        category: faqCategory,
        question: foundQuestion,
      };
    }

    return accumulatedValue;
  }, {});

  return {
    props: {
      category: pageData.category,
      question: pageData.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: pageData.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (serverResponse) => {
      const response = await serverResponse.json();
      return response.data;
    });

  const paths = faqCategories.reduce((accumulatedValue, faqCategory) => {
    const questionsPaths = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { slug: questionSlug } };
    });

    return [
      ...accumulatedValue,
      ...questionsPaths,
    ];
  }, []);

  return {
    paths,
    fallback: false,
  };
}

FAQInternalQuestionScreen.propTypes = FAQQuestionScreen.propTypes;
