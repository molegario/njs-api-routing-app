import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import useSWR from "swr";

export default function FeedbackItemPage() {
  const router = useRouter();
  const feedbackid = router.query.feedbackid;
  const [feedback, setFeedback] = useState();
  const [email, setEmail] = useState();

  const {
    data,
    error
  } = useSWR(
    `/api/feedback/${feedbackid}`,
    (url)=> fetch(url).then(res => res.json())
  );

  useEffect(
    () => {
      if(typeof data !== 'undefined') {
        setEmail(data.email);
        setFeedback(data.feedback);
      }
    },
    [data]
  );

  if(!data) {
    return <p>loading...</p>;
  }

  return <div>
    <h1>Item Details: {feedbackid}</h1>
    <h1>{feedback}</h1>
    <p>{email}</p>
    <p><Link href="/feedback">Back to All Feedback</Link></p>
  </div>

}