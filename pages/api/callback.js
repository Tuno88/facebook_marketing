export default function handler(req, res) {
  const query = req.query;
  console.log("adasd");
  if (req.query["hub.verify_token"] === "sohardtogetthisverifytoken") {
    const inputData = req.body;
    console.log(inputData); // You can log the input data to the console for debugging purposes
    res.status(200).json(parseInt(query["hub.challenge"]));
  } else {
    res.status(400);
  }
}
