/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // console.log('Infos que o Next da pra nós:', context.query.id);
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((responseToJson) => responseToJson)
      .catch((err) => {
        console.log(err);
      });

    return {
      props: { dbExterno },
    };
  } catch (err) {
    throw new Error(err);
  }
}
