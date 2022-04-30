import db from "../../utils/db"
db.connect();

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
