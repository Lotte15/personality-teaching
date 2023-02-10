export const mapTree = (data) => {
  // console.log('res', data)
  const level1 = []
  const other = []
  data.forEach((item) => {
    // 获取一级知识点 （父id=自己）
    if (item.knp_id === item.parent_knp_id) {
      const newItem = {}
      newItem.id = item.knp_id // 知识点id
      newItem.label = item.name // 知识点名称
      newItem.children = [] // 子知识点
      newItem.level = 1 // 子知识点知识点层级
      level1.push(newItem)
    } else {
      // 获取非一级知识点 （父id不=自己）
      const newItem = {}
      newItem.id = item.knp_id
      newItem.label = item.name
      newItem.parent_knp_id = item.parent_knp_id
      newItem.children = []
      other.push(newItem)
    }
  })

  // 通过非一级知识点other 获取二级知识点
  const level2 = []
  other.forEach((item) => {
    level1.forEach((item1) => {
      if (item1.id === item.parent_knp_id) {
        item.level = 2 // 知识点层级
        item1.children.push(item)
        level2.push(item)
      }
    })
  })

  mapChildren(other, level2)

  // console.log('level1', level1)
  return level1
}

// 映射3-6级知识点
function mapChildren(other, level2) {
  const level3 = []
  // 循环其它非一级知识点的数组
  other.forEach((item) => {
    // 判断其它知识点的父id是否与二级知识点id相等 或3级知识点 循环往复 之后level2就为level3的3级知识点遍历 判断other中是否有父知识点与3级的知识点相等
    level2.forEach((item2) => {
      if (item2.id === item.parent_knp_id) {
        item.level = item2.level + 1 // 知识点层级
        item2.children.push(item)
        level3.push(item)
      }
    })
  })

  if (level3.length === 0) {
    return
  } else {
    mapChildren(other, level3)
  }
}
