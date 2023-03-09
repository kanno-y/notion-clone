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
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (error) {
    res.status(500).json(error);
  }
};
// 該当のメモを更新
exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    if (title === "") req.body.title = "無題";
    if (description === "")
      req.body.description = "ここに自由に記入してください。";
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    });
    console.log("updatedMemo", updatedMemo);
    res.status(200).json(updatedMemo);
  } catch (error) {
    res.status(500).json(error);
  }
};
// 該当のメモを削除
exports.delete = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("メモが存在しません");

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("メモを削除しました");
  } catch (error) {
    res.status(500).json(error);
  }
};
