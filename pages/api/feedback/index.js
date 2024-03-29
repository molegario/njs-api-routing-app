import fs from 'fs';
import path from 'path';

// const dataDirectoryPath = path.join(process.cwd(), 'data/');
export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(dataDirectoryPath) {
  const storeTxt = fs.readFileSync(`${dataDirectoryPath}`, {
    encoding: 'utf8',
    flag: 'r'
  });
  const store = storeTxt && JSON.parse(storeTxt);
  return store.feedback || [];
}

function handler(req, res) {

  if(req.method === 'POST') {
    const { email, feedback } = req.body;
    const dataDirectoryPath = buildFeedbackPath();
    const prevFeedback = extractFeedback(dataDirectoryPath);
    const newId = new Date().toISOString();

    fs.writeFileSync(
      dataDirectoryPath,
      JSON.stringify({
        feedback: [
          ...prevFeedback,
          {
            id: newId,
            email,
            feedback
          }
        ]
      }),
    );

    res.status(201).json({
      message: `Success. Added new record ${newId}`
    });
  } else if (req.method === 'GET') {
    const dataDirectoryPath = buildFeedbackPath();
    const prevFeedback = extractFeedback(dataDirectoryPath);
    
    res.status(200).json({
      feedback: prevFeedback
    });
  } else {
    res.status(200).json({
      message: `API ready. No valid requests to process.`
    });
  }
}

export default handler;