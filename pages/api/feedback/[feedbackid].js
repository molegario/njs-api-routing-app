import { buildFeedbackPath, extractFeedback } from ".";

export default function handler(req, res) {

  if(req.method === 'GET') {
    const dataDirectoryPath = buildFeedbackPath();
    const prevFeedback = extractFeedback(dataDirectoryPath);
    const { feedbackid } = req.query;
    const feedbackItem = prevFeedback.find(itm=>itm.id === feedbackid);

    res.status(200).json({
      ...feedbackItem
    })

  } else {
    res.status(200).json({
      message: `API ready. No valid requests to process.`
    });
  }
}