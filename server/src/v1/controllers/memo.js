const Memo = require("../models/memo");

// メモ作成
exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};
// 全てのメモを取得
exports.getAll = async (req, res) => {
  console.log(req);
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position");
    res.status(200).json(memos);
  } catch (error) {
    res.status(500).json(error);
  }
};
// 該当のメモを取得
exports.getOne = async (req, res) => {
  const { memoId } = res.memoId;
  try {
    const memo = Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};
