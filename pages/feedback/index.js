import Link from "next/link";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { useRouter } from "next/router";

export default function FeedbackPage({ feedbackItems }) {
  const router = useRouter();

  const setClickEventById = (id) => {
    return (evt) => {
      evt.stopPropagation();
      router.push(`/feedback/${id}`);
    }
  }; 

  return <>
      <h1>FEEDBACK</h1>
      {
        feedbackItems && feedbackItems.length > 0 && (
          <ul>
            {
              feedbackItems.map(xx=><li key={xx.id}><button onClick={setClickEventById(xx.id)}>{xx.email}&mdash;{xx.feedback}</button></li>)
            }
          </ul>  
        )
      }
      {
        feedbackItems && feedbackItems.length === 0 && <p>No Items Available</p>
      }
      <Link href="/">Add Feedback</Link>
  </>;

}

export async function getStaticProps() {
  const dataDirectoryPath = buildFeedbackPath();
  const prevFeedback = extractFeedback(dataDirectoryPath);

  return {
    props: {
      feedbackItems: prevFeedback ?? []
    },
    revalidate: 10
  };
}