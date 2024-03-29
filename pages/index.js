import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

function HomePage({}) {
  const [feedbackItems, setFeedbackItems] = useState([])
  const emailFieldRef = useRef();
  const feedbackFieldRef = useRef();
  const router = useRouter();

  function onFormSubmit(evt) {
    evt.preventDefault();

    axios({
      method: 'post',
      url: '/api/feedback',
      data: {
        email: emailFieldRef.current.value,
        feedback: feedbackFieldRef.current.value,
      }
    }).then(response=>{
      console.log("RES::", response.data, response.status);
    });
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
    .then(resp=>resp.json())
    .then(data=>{
      setFeedbackItems(data.feedback);
    })
  }

  function onAddFeedback() {
    router.push('/feedback');
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input id="email" name="email" type="email" ref={emailFieldRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" name="feedback" rows='5' ref={feedbackFieldRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={onAddFeedback}>View All Feedback</button>
      <button onClick={loadFeedbackHandler}>Reload Feedback</button>

      {
        feedbackItems && feedbackItems.length > 0 && (
          <ul>
            {
              feedbackItems.map(xx=><li key="xx.id">{xx.email}&mdash;{xx.feedback}</li>)
            }
          </ul>  
        )

      }
    </div>
  );
}

export default HomePage;
