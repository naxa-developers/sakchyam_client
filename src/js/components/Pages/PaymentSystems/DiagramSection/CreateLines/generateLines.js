const generateLines = data => {
  const arr = [];
  data.forEach(item => {
    const mx1 =
      item.boundingRect1.width +
      (item.boundingRect2.left - item.boundingRect1.right) / 2;
    const my1 =
      item.boundingRect2.top +
      (item.boundingRect2.bottom - item.boundingRect2.top) / 2;
    const mx2 =
      item.boundingRect1.width +
      (item.boundingRect2.left - item.boundingRect1.right) / 2;
    const my2 =
      item.boundingRect1.top +
      (item.boundingRect1.bottom - item.boundingRect1.top) / 2;

    const lx1 = item.boundingRect1.right;
    const ly1 =
      item.boundingRect1.top +
      (item.boundingRect1.bottom - item.boundingRect1.top) / 2;
    const lx2 =
      item.boundingRect1.width +
      (item.boundingRect2.left - item.boundingRect1.right) / 2;
    const ly2 =
      item.boundingRect1.top +
      (item.boundingRect1.bottom - item.boundingRect1.top) / 2;

    const rx1 = item.boundingRect2.left;
    const ry1 =
      item.boundingRect2.top +
      (item.boundingRect2.bottom - item.boundingRect2.top) / 2;
    const rx2 =
      item.boundingRect1.width +
      (item.boundingRect2.left - item.boundingRect1.right) / 2;
    const ry2 =
      item.boundingRect2.top +
      (item.boundingRect2.bottom - item.boundingRect2.top) / 2;

    arr.push({
      x1: mx1,
      x2: mx2,
      y1: my1,
      y2: my2,
    });
    arr.push({
      x1: lx1,
      x2: lx2,
      y1: ly1,
      y2: ly2,
    });
    arr.push({
      x1: rx1,
      x2: rx2,
      y1: ry1,
      y2: ry2,
    });
  });
  return arr;
};

export default generateLines;
